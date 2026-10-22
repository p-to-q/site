import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { preload } = vi.hoisted(() => ({ preload: vi.fn() }))
vi.mock('react-dom', () => ({ preload }))

const { getWorkPreviewMap, preloadWorkPreviews, requireWorkFile, WORK_PREVIEW_MEDIA } = await import(
  '@/lib/work-previews'
)

const IMAGE = /\.(jpe?g|png|gif|webp|svg)$/i

describe('work previews', () => {
  beforeEach(() => preload.mockClear())

  it('offers every image in public/work, and nothing else', () => {
    const images = readdirSync(join(process.cwd(), 'public', 'work')).filter((file) => IMAGE.test(file))
    const previews = Object.values(getWorkPreviewMap())

    expect(previews.map((preview) => preview.src).sort()).toEqual(
      images.map((file) => `/work/${file}`).sort()
    )
    for (const preview of previews) {
      expect(preview.width).toBeGreaterThan(0)
      expect(preview.height).toBeGreaterThan(0)
    }
  })

  it('never offers a video as a preview', () => {
    const map = getWorkPreviewMap()
    expect(Object.values(map).some((preview) => /\.mp4$/i.test(preview.src))).toBe(false)
    expect(map['matter-demo']).toBeUndefined()
  })

  it('preloads only images, at low priority, on desktop only', () => {
    preloadWorkPreviews()
    expect(preload).toHaveBeenCalledTimes(Object.keys(getWorkPreviewMap()).length)
    for (const [href, options] of preload.mock.calls) {
      expect(href).not.toMatch(/\.mp4$/i)
      expect(options).toEqual({ as: 'image', fetchPriority: 'low', media: WORK_PREVIEW_MEDIA })
    }
    expect(WORK_PREVIEW_MEDIA).toBe('(min-width: 1024px)')
  })

  it('resolves non-preview files by path and fails loudly when missing', () => {
    expect(requireWorkFile('matter-demo.mp4')).toBe('/work/matter-demo.mp4')
    expect(() => requireWorkFile('does-not-exist.mp4')).toThrow(/Missing Work file/)
  })
})
