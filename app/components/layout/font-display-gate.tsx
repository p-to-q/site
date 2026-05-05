'use client'

import { useLayoutEffect, useRef } from 'react'

const REVEAL_TIMEOUT_MS = 12_000

/**
 * Hides main content until `document.fonts.ready` so first paint with text uses Camingo Mono.
 * Runs in `useLayoutEffect` (after hydration, before the browser’s next paint) to avoid mutating
 * `<html>` before React attaches — that caused hydration mismatches with inline head scripts.
 */
export function FontDisplayGate({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    const reveal = () => {
      el.classList.remove('font-gate-pending')
      el.removeAttribute('aria-busy')
    }

    const timer = window.setTimeout(reveal, REVEAL_TIMEOUT_MS)

    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        window.clearTimeout(timer)
        reveal()
      })
    } else {
      window.clearTimeout(timer)
      reveal()
    }

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={rootRef} className="font-gate-pending min-w-0" aria-busy="true">
      {children}
    </div>
  )
}
