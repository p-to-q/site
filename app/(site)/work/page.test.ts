import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createElement, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { WORK_PREVIEW_MEDIA, WORK_PREVIEW_ORDER, getWorkPreviewMap } from '@/lib/work-previews'

// Page chrome (header, footer) is outside the scope of this test.
vi.mock('@/components/layout/site-sticky-qed-page', () => ({
  SiteStickyQedPage: ({ children }: { children: ReactNode }) => children,
}))

const { default: WorkPage } = await import('./page')
const html = renderToStaticMarkup(createElement(WorkPage))

const attr = (tag: string, name: string) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]
const links = [...html.matchAll(/<a\s[^>]*>/g)].map(([tag]) => tag)
const previewSrcs = [...html.matchAll(/<span[^>]*class="work-thumb[^"]*"[^>]*><img\s[^>]*>/g)].map(
  ([tag]) => attr(tag, 'src')
)
const decode = (href: string) => decodeURI(href.replace(/&amp;/g, '&'))

describe('Work page (rendered)', () => {
  it('renders one preview per link, in WORK_PREVIEW_ORDER (top to bottom, left to right)', () => {
    const previews = getWorkPreviewMap()
    expect(previewSrcs).toEqual(WORK_PREVIEW_ORDER.map((basename) => previews[basename].src))
    expect(links.filter((tag) => tag.includes('work-preview-link'))).toHaveLength(previewSrcs.length)
  })

  it('uses every preview image in public/work', () => {
    expect([...WORK_PREVIEW_ORDER].sort()).toEqual(Object.keys(getWorkPreviewMap()).sort())
  })

  it('opens every link in a new tab, and labels same-site files', () => {
    for (const tag of links) {
      expect(attr(tag, 'target'), tag).toBe('_blank')
      expect(attr(tag, 'rel'), tag).toBe('noopener noreferrer')
      const href = attr(tag, 'href') ?? ''
      if (href.startsWith('/')) {
        expect(attr(tag, 'aria-label'), tag).toBeTruthy()
        // Same-site files must exist, or the link would 404.
        expect(existsSync(join(process.cwd(), 'public', decode(href))), href).toBe(true)
      }
    }
  })

  it('never uses a video as a preview', () => {
    expect(previewSrcs.some((src) => /\.(mp4|webm|mov)$/i.test(src ?? ''))).toBe(false)
  })

  it('keeps the preview media query identical in CSS and preloads', () => {
    const css = readFileSync(join(process.cwd(), 'app', 'global.css'), 'utf8')
    expect(css).toContain(`@media ${WORK_PREVIEW_MEDIA} {\n  .work-thumb {\n    display: block;`)
  })
})
