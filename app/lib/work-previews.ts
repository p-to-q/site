import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { preload } from 'react-dom'

const WORK_PREVIEW_DIRECTORY = join(process.cwd(), 'public', 'work')

/**
 * Work preview assets are deliberately discovered from the public directory so
 * an extension can change without requiring a second manifest to be updated.
 */
const workPreviewEntries = readdirSync(WORK_PREVIEW_DIRECTORY)
  .sort()
  .map((file) => {
    const dot = file.lastIndexOf('.')
    if (dot <= 0) return null

    return {
      basename: file.slice(0, dot).toLowerCase(),
      url: `/work/${file}`,
    }
  })
  .filter((entry): entry is { basename: string; url: string } => entry !== null)

export const WORK_PREVIEW_URLS = workPreviewEntries.map(({ url }) => url)

export function preloadWorkPreviews() {
  for (const url of WORK_PREVIEW_URLS) {
    preload(url, {
      as: 'image',
      fetchPriority: 'low',
    })
  }
}

export function getWorkPreviewMap(): Record<string, string> {
  const map: Record<string, string> = {}

  for (const { basename, url } of workPreviewEntries) {
    if (map[basename]) {
      throw new Error(`Duplicate Work preview basename: ${basename}`)
    }
    map[basename] = url
  }

  return map
}
