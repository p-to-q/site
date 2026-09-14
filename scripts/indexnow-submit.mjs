#!/usr/bin/env node

/**
 * IndexNow submission script.
 * Reads sitemap URLs and submits them to IndexNow API.
 *
 * Usage: node scripts/indexnow-submit.mjs [url1 url2 ...]
 * If no URLs provided, submits all sitemap URLs.
 */

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ptoq.io'
const INDEXNOW_KEY = '565d375ed0c2ecbf770bba85ee337d57'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

const SITEMAP_URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/work`,
  `${SITE_URL}/writing`,
  `${SITE_URL}/writing/strange-tools`,
  `${SITE_URL}/writing/the-forest-and-the-interface`,
]

async function submit(urls) {
  const host = new URL(SITE_URL).host
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  console.log(`Submitting ${urls.length} URL(s) to IndexNow...`)
  urls.forEach((u) => console.log(`  ${u}`))

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  console.log(`\nResponse: ${res.status} ${res.statusText}`)
  if (res.ok || res.status === 202) {
    console.log('Submitted successfully.')
  } else {
    const text = await res.text().catch(() => '')
    console.error('Submission failed:', text)
    process.exit(1)
  }
}

const customUrls = process.argv.slice(2)
submit(customUrls.length > 0 ? customUrls : SITEMAP_URLS)
