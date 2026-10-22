#!/usr/bin/env node
/**
 * Post-deploy smoke check against the live site (default https://www.ptoq.io).
 *
 *   npm run verify:live                 # check once
 *   npm run verify:live -- --wait       # poll until the deploy is live (10 min max)
 *   npm run verify:live -- --base=URL   # another deployment
 *
 * Checks:
 * - CSS is current: the live stylesheet bytes equal the local production
 *   build in .next (build first: `npm run build`, or the pre-push check).
 *   This catches the "new HTML, old CSS" deploy (docs/caching.md).
 * - Work preview preloads: desktop media query, on-page order, no videos.
 * - Every preview image and same-site file linked from Work answers 200.
 * - Work links open in a new tab; same-site files carry an aria-label.
 * - Cache headers: HTML is not cached; previews use stale-while-revalidate.
 * - No render-blocking third-party font stylesheet (fonts are self-hosted).
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)
const base = (args.find((a) => a.startsWith('--base='))?.slice(7) ?? 'https://www.ptoq.io').replace(/\/$/, '')
const wait = args.includes('--wait')
const WAIT_MS = 10 * 60_000
const POLL_MS = 15_000

const root = process.cwd()
const mediaSource = readFileSync(join(root, 'app/lib/work-previews.ts'), 'utf8')
const EXPECTED_MEDIA = /WORK_PREVIEW_MEDIA = '([^']+)'/.exec(mediaSource)?.[1]

const sha = (text) => createHash('sha1').update(text).digest('hex')
const bust = (path) => `${base}${path}${path.includes('?') ? '&' : '?'}verify=${Date.now()}`
const attr = (tag, name) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]
const unescape = (s) => s.replace(/&amp;/g, '&')

// HTML is fetched with a cache-busting query; assets exactly as visitors get
// them (through the CDN), so a stale edge copy would be caught too.
async function get(path, init) {
  const isAsset = /\.[a-z0-9]+$/i.test(path)
  const res = await fetch(isAsset ? `${base}${path}` : bust(path), { redirect: 'follow', ...init })
  return { res, text: init?.method === 'HEAD' ? '' : await res.text() }
}

const cssLinks = (html) => [...new Set(html.match(/\/_next\/static\/[^"?]+\.css/g) ?? [])]

function localCss() {
  const page = join(root, '.next/server/app/work.html')
  if (!existsSync(page)) return null
  return cssLinks(readFileSync(page, 'utf8')).map((href) =>
    sha(readFileSync(join(root, '.next', href.replace(/^\/_next/, '')), 'utf8'))
  )
}

async function checkCss(failures, notes) {
  const local = localCss()
  if (!local) {
    notes.push('CSS freshness skipped: no local build (.next) to compare with')
    return
  }
  const { text: html } = await get('/work')
  const live = await Promise.all(cssLinks(html).map(async (href) => sha((await get(href)).text)))
  if (JSON.stringify([...live].sort()) !== JSON.stringify([...local].sort())) {
    failures.push(
      'CSS differs from the local build (deploy still in progress, a stale compile, or the local build is not from the pushed commit)'
    )
  }
}

async function checkPage(failures) {
  const [{ res: workRes, text: work }, { text: home }] = await Promise.all([get('/work'), get('/')])
  if (!workRes.ok) return failures.push(`/work answered ${workRes.status}`)

  for (const [name, html] of [['/', home], ['/work', work]]) {
    if (/<link[^>]+fonts\.googleapis\.com/.test(html)) failures.push(`${name}: links a Google Fonts stylesheet (render-blocking)`)
  }

  const cacheControl = workRes.headers.get('cache-control') ?? ''
  if (/max-age=(?!0\b)\d+/.test(cacheControl)) failures.push(`/work HTML is cacheable: ${cacheControl}`)

  // Previews as they appear on the page (top to bottom, left to right).
  const previews = [...work.matchAll(/class="work-thumb[^"]*"[^>]*><img\s[^>]*>/g)].map(([tag]) =>
    unescape(attr(tag, 'src') ?? '')
  )
  if (previews.length === 0) failures.push('/work renders no previews')

  for (const [name, html] of [['/', home], ['/work', work]]) {
    const preloads = [...html.matchAll(/<link\s[^>]*rel="preload"[^>]*>/g)]
      .map(([tag]) => tag)
      .filter((tag) => attr(tag, 'as') === 'image')
    const hrefs = preloads.map((tag) => unescape(attr(tag, 'href') ?? ''))
    if (preloads.some((tag) => unescape(attr(tag, 'media') ?? '') !== EXPECTED_MEDIA)) {
      failures.push(`${name}: an image preload lacks media="${EXPECTED_MEDIA}"`)
    }
    if (hrefs.some((href) => /\.(mp4|webm|mov|pdf)$/i.test(href))) failures.push(`${name}: preloads a video/PDF`)
    if (JSON.stringify(hrefs) !== JSON.stringify(previews)) {
      failures.push(`${name}: preloads are not the Work previews in on-page order`)
    }
  }

  const links = [...work.matchAll(/<a\s[^>]*class="[^"]*work-preview-link[^"]*"[^>]*>/g)].map(([tag]) => tag)
  const sameSite = []
  for (const tag of links) {
    const href = unescape(attr(tag, 'href') ?? '')
    if (attr(tag, 'target') !== '_blank') failures.push(`${href}: does not open in a new tab`)
    if (href.startsWith('/')) {
      sameSite.push(href)
      if (!attr(tag, 'aria-label')) failures.push(`${href}: missing aria-label`)
    }
  }

  const assets = [...new Set([...previews, ...sameSite])]
  const results = await Promise.all(
    assets.map(async (path) => [path, (await get(path, { method: 'HEAD' })).res])
  )
  for (const [path, res] of results) {
    if (!res.ok) failures.push(`${path} answered ${res.status}`)
  }
  const previewCache = results.find(([path]) => path.startsWith('/work/'))?.[1].headers.get('cache-control') ?? ''
  if (!previewCache.includes('stale-while-revalidate')) {
    failures.push(`previews are served without stale-while-revalidate: ${previewCache}`)
  }
}

async function runOnce() {
  const failures = []
  const notes = []
  await checkCss(failures, notes)
  if (failures.length === 0) await checkPage(failures)
  return { failures, notes }
}

const started = Date.now()
for (;;) {
  let result
  try {
    result = await runOnce()
  } catch (error) {
    result = { failures: [`request failed: ${error.message}`], notes: [] }
  }
  result.notes.forEach((note) => console.log(`[verify-live] note: ${note}`))
  if (result.failures.length === 0) {
    console.log(`[verify-live] ${base}: all checks passed`)
    process.exit(0)
  }
  if (!wait || Date.now() - started > WAIT_MS) {
    result.failures.forEach((failure) => console.error(`[verify-live] FAIL ${failure}`))
    process.exit(1)
  }
  console.log(`[verify-live] not live yet (${result.failures[0]}); retrying in ${POLL_MS / 1000}s`)
  await new Promise((resolve) => setTimeout(resolve, POLL_MS))
}
