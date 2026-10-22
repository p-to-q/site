'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * The Work project list. Server-rendered as is; after hydration it adds two
 * robustness layers to the CSS-only previews (global.css, "Work"):
 *
 * - Measured room: writes each row's real distance to the list top/bottom as
 *   --space-above/--space-below, so preview clamping stays exact when a row
 *   wraps (zoom, larger default font, fallback font, longer copy). Kept up to
 *   date with a ResizeObserver; the CSS falls back to row counting before
 *   hydration or without JS.
 * - Broken images: a preview whose image fails to load is marked
 *   `data-broken` and hidden, instead of showing an empty frame.
 */
export function WorkList({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const rows = Array.from(list.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el.classList.contains('work-row')
    )

    let frame = 0
    const measure = () => {
      frame = 0
      const bounds = list.getBoundingClientRect()
      for (const row of rows) {
        const rect = row.getBoundingClientRect()
        row.style.setProperty('--space-above', `${Math.max(0, rect.top - bounds.top)}px`)
        row.style.setProperty('--space-below', `${Math.max(0, bounds.bottom - rect.bottom)}px`)
      }
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    let observer: ResizeObserver | undefined
    if (typeof ResizeObserver === 'function') {
      observer = new ResizeObserver(schedule)
      observer.observe(list)
      rows.forEach((row) => observer?.observe(row))
    }
    measure()

    const markBroken = (img: HTMLImageElement) =>
      img.closest('.work-thumb')?.setAttribute('data-broken', '')
    // Errors that happened before hydration have no event left to catch.
    list.querySelectorAll<HTMLImageElement>('.work-thumb img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) markBroken(img)
    })
    // `error` does not bubble; listen in the capture phase.
    const onError = (event: Event) => {
      if (event.target instanceof HTMLImageElement) markBroken(event.target)
    }
    list.addEventListener('error', onError, true)

    return () => {
      observer?.disconnect()
      window.cancelAnimationFrame(frame)
      list.removeEventListener('error', onError, true)
    }
  }, [])

  return (
    <section ref={listRef} className="work-list flex flex-col gap-3">
      {children}
    </section>
  )
}
