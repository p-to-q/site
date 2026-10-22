#!/usr/bin/env node
/**
 * Build-time Work preview derivatives.
 *
 * public/work holds the original preview artwork (some of it multi-megabyte
 * GIF/PNG/JPEG). The gutter shows those images at most ~164 CSS px tall, so
 * this step writes a display-sized WebP (2x density) for every raster preview
 * into public/work-derived/ (git-ignored) plus a manifest that
 * app/lib/work-previews.ts reads at build time.
 *
 * Guarantees:
 * - Originals in public/work are never modified; public/work-derived is
 *   disposable and fully regenerated from them.
 * - Derived file names carry a content hash, so they are safe to cache
 *   forever (next.config.js marks /work-derived/* immutable).
 * - A derivative is only used when it is smaller than its source.
 * - Failure is never fatal: if sharp is missing or a conversion throws, that
 *   preview keeps its original file. work-previews.ts also re-checks every
 *   manifest entry against the current source hash, so a stale manifest can
 *   never serve an outdated image.
 *
 * Runs automatically before `npm run dev` and `npm run build`
 * (`npm run previews` runs it alone).
 */
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, existsSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'

const ROOT = process.cwd()
const SOURCE_DIR = join(ROOT, 'public', 'work')
const OUTPUT_DIR = join(ROOT, 'public', 'work-derived')
const MANIFEST = join(OUTPUT_DIR, 'manifest.json')

// Bump when the settings below change so every derivative is regenerated.
const PIPELINE_VERSION = 1
// 2x the 164px gutter height; the width cap covers the widest gutter (1920px+).
const MAX_HEIGHT = 328
const MAX_WIDTH = 1200
const RASTER_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp'])

/** Must match sourceHash() in app/lib/work-previews.ts. */
const sourceHash = (buffer) => createHash('sha1').update(buffer).digest('hex').slice(0, 16)

function readPreviousManifest() {
  try {
    const parsed = JSON.parse(readFileSync(MANIFEST, 'utf8'))
    return parsed?.version === PIPELINE_VERSION ? parsed : null
  } catch {
    return null
  }
}

async function main() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.warn('[work-previews] sharp unavailable; previews will use their original files.')
    return
  }

  mkdirSync(OUTPUT_DIR, { recursive: true })
  const previous = readPreviousManifest()
  const entries = {}
  // Sources whose derivative came out larger; remembered so they are not re-encoded every run.
  const skipped = {}
  const keep = new Set(['manifest.json'])
  let savedBytes = 0

  for (const file of readdirSync(SOURCE_DIR).sort()) {
    const ext = extname(file).toLowerCase()
    if (!RASTER_EXTENSIONS.has(ext)) continue

    const source = readFileSync(join(SOURCE_DIR, file))
    const hash = sourceHash(source)

    if (previous?.skipped?.[file] === hash) {
      skipped[file] = hash
      continue
    }

    const outName = `${file.slice(0, -ext.length)}.${hash.slice(0, 10)}.v${PIPELINE_VERSION}.webp`
    const outPath = join(OUTPUT_DIR, outName)

    try {
      if (!existsSync(outPath)) {
        const animated = ext === '.gif' || ext === '.webp'
        await sharp(source, { animated })
          .rotate() // bake in EXIF orientation; the WebP output carries no tag
          .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: animated ? 75 : 80, effort: 4 })
          .toFile(outPath)
      }

      const outBytes = statSync(outPath).size
      if (outBytes >= source.length) {
        rmSync(outPath, { force: true })
        skipped[file] = hash
        continue
      }

      keep.add(outName)
      savedBytes += source.length - outBytes
      entries[file] = { sourceHash: hash, src: `/work-derived/${outName}`, bytes: outBytes }
    } catch (error) {
      rmSync(outPath, { force: true })
      console.warn(`[work-previews] ${file}: kept original (${error.message})`)
    }
  }

  // Drop derivatives whose source changed or disappeared.
  for (const file of readdirSync(OUTPUT_DIR)) {
    if (!keep.has(file)) rmSync(join(OUTPUT_DIR, file), { force: true })
  }

  writeFileSync(
    MANIFEST,
    `${JSON.stringify({ version: PIPELINE_VERSION, entries, skipped }, null, 2)}\n`
  )
  console.log(
    `[work-previews] ${Object.keys(entries).length} derivatives, ` +
      `${(savedBytes / 1048576).toFixed(1)} MB lighter than the originals.`
  )
}

main().catch((error) => {
  // An optimisation step must never block dev or build.
  console.warn(`[work-previews] skipped: ${error.message}`)
})
