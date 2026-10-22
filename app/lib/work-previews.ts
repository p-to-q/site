import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import { preload } from 'react-dom'
import { readImageSize } from '@/lib/image-size'

const WORK_PREVIEW_DIRECTORY = join(process.cwd(), 'public', 'work')

/**
 * Previews only exist where the left gutter does (global.css shows
 * `.work-thumb` from 1024px). Preloads carry the same media query, so phones
 * and tablets never download artwork they cannot see.
 */
export const WORK_PREVIEW_MEDIA = '(min-width: 1024px)'

/**
 * Formats whose intrinsic size image-size.ts can read. public/work also holds
 * download artifacts (e.g. a project's .mp4 demo video); those are not
 * previews: they are never preloaded, never offered by getWorkPreviewMap(),
 * and are linked by path instead (see requireWorkFile()).
 */
const PREVIEW_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'])

export type WorkPreview = {
  /** The original file in public/work, served as is (full quality). */
  src: string
  /** Intrinsic display size (EXIF orientation applied), read at build time. */
  width: number
  height: number
}

/**
 * Work preview assets are deliberately discovered from the public directory so
 * an extension can change without requiring a second manifest to be updated.
 * Each preview's intrinsic size is read once, at build time.
 */
function discoverWorkPreviews() {
  const previews = new Map<string, WorkPreview>()

  for (const file of readdirSync(WORK_PREVIEW_DIRECTORY).sort()) {
    const ext = extname(file).toLowerCase()
    if (file.startsWith('.') || !PREVIEW_IMAGE_EXTENSIONS.has(ext)) continue

    const basename = file.slice(0, -ext.length).toLowerCase()
    if (previews.has(basename)) {
      throw new Error(`Duplicate Work preview basename: ${basename}`)
    }

    const src = `/work/${file}`
    const size = readImageSize(readFileSync(join(WORK_PREVIEW_DIRECTORY, file)), ext)
    if (!size) throw new Error(`Cannot read the dimensions of public${src}`)

    previews.set(basename, { src, width: size.width, height: size.height })
  }

  return previews
}

const workPreviews = discoverWorkPreviews()

/**
 * Warms every preview at low priority (desktop only) so the first hover never
 * waits on the network. Called from both the home page and Work: home warms
 * the cache before the client-side navigation, Work covers direct visits.
 */
export function preloadWorkPreviews() {
  for (const { src } of workPreviews.values()) {
    preload(src, {
      as: 'image',
      fetchPriority: 'low',
      media: WORK_PREVIEW_MEDIA,
    })
  }
}

export function getWorkPreviewMap(): Record<string, WorkPreview> {
  return Object.fromEntries(workPreviews)
}

/** Path of a non-preview file in public/work; fails the build if it is missing. */
export function requireWorkFile(file: string): string {
  if (!existsSync(join(WORK_PREVIEW_DIRECTORY, file))) {
    throw new Error(`Missing Work file: public/work/${file}`)
  }
  return `/work/${file}`
}
