'use client'

import { useLayoutEffect, useRef } from 'react'

/** Worst case before revealing with fallback faces; matches .font-gate-pending in global.css. */
const REVEAL_TIMEOUT_MS = 1_500
const BRAND_FAMILY = 'CamingoMono'
/** Links turn SemiBold on hover / when active (`a:hover, a.is-active` in global.css). */
const HOVER_WEIGHT = '600'
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
 *
 * States count too: a hovered link turns SemiBold, so for every style in use
 * the gate also waits for that style's SemiBold face; the first hover never
 * shows a synthesized bold or a late swap. Other families (Inter, Noto Serif
 * SC) swap in as before; where a link is set in one of them, its hover weight
 * is warmed in the background (for the characters on the page only).
 */
export function FontDisplayGate({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    let timer = 0
    let warmTimer = 0
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
      const all: FontFace[] = []
      document.fonts.forEach((face) => all.push(face))
      const familyOf = (face: FontFace) => face.family.replace(/["']/g, '')
      const inUse = all.filter((face) => face.status === 'loading' || face.status === 'loaded')
      const brandInUse = inUse.filter((face) => familyOf(face) === BRAND_FAMILY)

      // The hover face of each brand style in use (e.g. SemiBold Italic for a
      // link inside italic text); load() starts it if the page has none yet.
      const brandStyles = new Set(brandInUse.map((face) => face.style))
      const hoverFaces = all.filter(
        (face) =>
          familyOf(face) === BRAND_FAMILY &&
          face.weight === HOVER_WEIGHT &&
          brandStyles.has(face.style) &&
          !brandInUse.includes(face)
      )

      const ready = brandInUse.length
        ? Promise.all([
            ...brandInUse.map((face) => face.loaded),
            ...hoverFaces.map((face) => face.load()),
          ])
        : Promise.all(BRAND_FONT_PROBES.map(([font, text]) => document.fonts.load(font, text)))
      void ready.then(revealAfterPaint, reveal)

      // Warm the hover weight of the other families after the reveal.
      const others = new Map<string, FontFace>()
      for (const face of inUse) {
        if (familyOf(face) !== BRAND_FAMILY) others.set(`${familyOf(face)}|${face.style}`, face)
      }
      if (others.size) {
        warmTimer = window.setTimeout(() => {
          // Only families that a link is actually set in can be hovered.
          const linkFamilies = new Set(
            Array.from(el.querySelectorAll('a'), (a) =>
              getComputedStyle(a).fontFamily.split(',')[0].trim().replace(/["']/g, '')
            )
          )
          const text = Array.from(new Set(el.textContent ?? '')).join('')
          others.forEach((face) => {
            if (!linkFamilies.has(familyOf(face))) return
            const font = `${face.style} ${HOVER_WEIGHT} 16px "${familyOf(face)}"`
            void document.fonts.load(font, text).catch(() => {})
          })
        }, REVEAL_TIMEOUT_MS)
      }
    } else {
      window.clearTimeout(timer)
      reveal()
    }

    return () => {
      disposed = true
      window.clearTimeout(timer)
      window.clearTimeout(warmTimer)
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
