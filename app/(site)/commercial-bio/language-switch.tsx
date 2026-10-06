'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type BioLanguage = 'en' | 'zh'

/* The copy handoff runs on two beats: the old language fades out (leave), then
   the swap happens and the new language fades in (enter). These JS timings sit
   ~20ms past the matching CSS durations (see global.css), so state never
   changes mid-paint: SWAP is leave(100) + cushion, SETTLE is swap + enter(160)
   + cushion. Tied to the CSS — change one, change both. */
const SWAP_MS = 120
const SETTLE_MS = 300

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Both languages stay in the served HTML so the Chinese is crawlable and the
 * page reads without JavaScript; only the inactive one is `hidden`, so reads
 * without JS show EN alone. EN is the server-rendered default, so there is no
 * flash of the wrong language.
 *
 * Once mounted the component takes control of the pair (`data-managed`): it
 * drops the `hidden` attribute (laid down at SSR, restored to the browser only
 * as a no-JS fallback) and marks the off language with `data-inactive`. This
 * sidesteps the preflight `[hidden] { display: none !important }` entirely —
 * no display override to outrank. Both panels stack in one CSS grid cell, so
 * the block always reserves the taller language's height: switching never
 * resizes the document, and a deep scroll position has nothing to clamp.
 *
 * The switch itself is a two-step handoff, pure opacity: the outgoing copy
 * fades out (`data-leaving`), then state swaps and the incoming copy fades in
 * (`data-entered`). No transform — the settled page is still, in line with the
 * rest of the site. Labels and aria-pressed flip together with the copy at the
 * swap beat; the slash takes ink for the whole handoff (`data-switching`).
 *
 * `data-entered` is armed per active panel, so every switch re-adds the
 * attribute and replays the settle-in, while the first paint stays still and
 * defers to the site's font gate. Under reduced motion everything swaps
 * instantly with no lock.
 */
export function LanguageSwitch({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  const [language, setLanguage] = useState<BioLanguage>('en')
  const [managed, setManaged] = useState(false)
  const [leaving, setLeaving] = useState<BioLanguage | null>(null)
  const [hasSwitched, setHasSwitched] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const pending = useRef(false)
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* Pre-paint, so the pair lands stacked without a frame of EN-only layout:
     the switch never rides on the hydration flash. */
  useLayoutEffect(() => {
    setManaged(true)
  }, [])

  useEffect(() => {
    return () => {
      if (swapTimer.current) clearTimeout(swapTimer.current)
      if (settleTimer.current) clearTimeout(settleTimer.current)
    }
  }, [])

  const select = (next: BioLanguage) => {
    if (pending.current || next === language) return
    if (swapTimer.current) clearTimeout(swapTimer.current)
    if (settleTimer.current) clearTimeout(settleTimer.current)

    if (prefersReducedMotion()) {
      setLanguage(next)
      setHasSwitched(true)
      return
    }

    /* Lock the control for the length of the handoff: rapid clicks would
       otherwise queue overlapping leave/enter states. */
    pending.current = true
    setHasSwitched(true)
    setLeaving(language)
    setIsSwitching(true)

    swapTimer.current = setTimeout(() => {
      setLanguage(next)
      setLeaving(null)
    }, SWAP_MS)

    settleTimer.current = setTimeout(() => {
      setIsSwitching(false)
      pending.current = false
    }, SETTLE_MS)
  }

  const armed = (code: BioLanguage) => hasSwitched && language === code
  const off = (code: BioLanguage) => language !== code

  return (
    <>
      <div
        className="commercial-bio-lang"
        role="group"
        aria-label="Language"
        data-switching={isSwitching || undefined}
      >
        <button
          type="button"
          className="commercial-bio-lang__option"
          aria-pressed={language === 'en'}
          onClick={() => select('en')}
        >
          EN
        </button>
        <span className="commercial-bio-lang__sep" aria-hidden="true">
          /
        </span>
        <button
          type="button"
          className="commercial-bio-lang__option"
          lang="zh-CN"
          aria-pressed={language === 'zh'}
          onClick={() => select('zh')}
        >
          中
        </button>
      </div>

      {/* Inline grid layout is the cache-proof floor: this page must never
          render both languages stacked, even if the stylesheet — or the site's
          long-cached global chunk — arrives stale. The rules also live in
          alternative.css, but an inline `display: grid` on the wrapper and
          `grid-area`/`visibility` on each panel cannot be defeated by a cached
          stylesheet, so EN/中 can never appear side by side again. */}
      <div
        className="commercial-bio-panels"
        style={{ display: 'grid' }}
        data-managed={managed || undefined}
      >
        <div
          lang="en"
          hidden={!managed && off('en')}
          data-inactive={managed && off('en') || undefined}
          data-entered={armed('en') || undefined}
          data-leaving={leaving === 'en' || undefined}
          className="commercial-bio-body flex flex-col gap-3"
          style={{ gridArea: '1 / 1', visibility: managed && off('en') ? 'hidden' : undefined }}
        >
          {en}
        </div>

        <div
          lang="zh-CN"
          hidden={!managed && off('zh')}
          data-inactive={managed && off('zh') || undefined}
          data-entered={armed('zh') || undefined}
          data-leaving={leaving === 'zh' || undefined}
          className="commercial-bio-body commercial-bio-zh flex flex-col gap-3"
          style={{ gridArea: '1 / 1', visibility: managed && off('zh') ? 'hidden' : undefined }}
        >
          {zh}
        </div>
      </div>
    </>
  )
}
