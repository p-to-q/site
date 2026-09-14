'use client'

import { useLayoutEffect, useRef } from 'react'

const REVEAL_TIMEOUT_MS = 2_500
const BRAND_FONT_PROBES = [
  ['400 1em CamingoMono', '[p→q] Aa'],
  ['300 1em CamingoMono', '[p→q] Aa'],
  ['600 1em CamingoMono', '[p→q] Aa'],
  ['italic 600 1em CamingoMono', '[p→q] Aa'],
  ['italic 200 1em CamingoMono', '[p→q] Aa'],
  ['700 1em CamingoMono', '[p→q] Aa'],
] as const

/**
 * Preserves the site's original all-at-once reveal while warming the complete local
 * Camingo Mono family. The matching CSS class independently reveals at 2.5s, so a
 * failed font request or hydration never leaves the page blank.
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
      void Promise.all(
        BRAND_FONT_PROBES.map(([font, text]) => document.fonts.load(font, text))
      ).then(revealAfterPaint, reveal)
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
