'use client'

import { useLayoutEffect, useRef } from 'react'

/** Worst case before revealing with fallback faces; matches .font-gate-pending in global.css. */
const REVEAL_TIMEOUT_MS = 1_500
const BRAND_FAMILY = 'CamingoMono'
/** Used only when the browser cannot report which faces the page uses. */
const BRAND_FONT_PROBES = [
  ['400 1em CamingoMono', '[p→q] Aa'],
  ['300 1em CamingoMono', '[p→q] Aa'],
  ['600 1em CamingoMono', '[p→q] Aa'],
  ['italic 600 1em CamingoMono', '[p→q] Aa'],
  ['italic 200 1em CamingoMono', '[p→q] Aa'],
  ['700 1em CamingoMono', '[p→q] Aa'],
] as const

/**
 * Preserves the site's all-at-once reveal (no flash of fallback text) while
 * waiting only for the Camingo Mono faces this page actually uses: after a
 * forced layout, the browser has started loading exactly those faces, so a
 * page set in Regular does not wait for Bold or the italics. Faces already in
 * cache reveal on the next frame. The matching CSS class independently
 * reveals at 1.5s, so a slow or failed font request or hydration never leaves
 * the page blank for long.
 */
export function FontDisplayGate({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    let timer = 0
    let firstFrame = 0
    let secondFrame = 0
    let disposed = false

    const reveal = () => {
      if (disposed) return
      window.clearTimeout(timer)
      el.classList.remove('font-gate-pending')
    }

    // Let the loaded faces participate in style/layout before making the page visible.
    const revealAfterPaint = () => {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(reveal)
      })
    }

    timer = window.setTimeout(reveal, REVEAL_TIMEOUT_MS)

    if (document.fonts?.load) {
      // Style + layout of the (hidden) page starts the loads of the faces it uses.
      el.getBoundingClientRect()
      const inUse: FontFace[] = []
      document.fonts.forEach((face) => {
        const family = face.family.replace(/["']/g, '')
        if (family === BRAND_FAMILY && (face.status === 'loading' || face.status === 'loaded')) {
          inUse.push(face)
        }
      })
      const ready = inUse.length
        ? Promise.all(inUse.map((face) => face.loaded))
        : Promise.all(BRAND_FONT_PROBES.map(([font, text]) => document.fonts.load(font, text)))
      void ready.then(revealAfterPaint, reveal)
    } else {
      window.clearTimeout(timer)
      reveal()
    }

    return () => {
      disposed = true
      window.clearTimeout(timer)
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [])

  return (
    <div ref={rootRef} className="font-gate-pending min-w-0">
      {children}
    </div>
  )
}
