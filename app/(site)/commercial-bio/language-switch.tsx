'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type BioLanguage = 'en' | 'zh'

/**
 * Both languages stay in the served HTML so the Chinese is crawlable and the
 * page reads without JavaScript; only the inactive one is `hidden`. EN is the
 * server-rendered default, so there is no flash of the wrong language.
 *
 * `data-entered` is set only after a real switch: the copy settles in on a
 * change, while the first paint stays still and defers to the site's font gate.
 *
 * `data-switching` is set for the length of one copy transition so the slash
 * participates in that movement — it takes ink mid-transition and settles back
 * to muted, which is how the control reads as one moving unit.
 */
export function LanguageSwitch({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  const [language, setLanguage] = useState<BioLanguage>('en')
  const [hasSwitched, setHasSwitched] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (clearTimer.current) clearTimeout(clearTimer.current)
    }
  }, [])

  const select = (next: BioLanguage) => {
    if (next === language) return
    setLanguage(next)
    setHasSwitched(true)
    setIsSwitching(true)
    if (clearTimer.current) clearTimeout(clearTimer.current)
    clearTimer.current = setTimeout(() => setIsSwitching(false), 200)
  }

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

      <div
        lang="en"
        hidden={language !== 'en'}
        data-entered={hasSwitched || undefined}
        className="commercial-bio-body flex flex-col gap-3"
      >
        {en}
      </div>

      <div
        lang="zh-CN"
        hidden={language !== 'zh'}
        data-entered={hasSwitched || undefined}
        className="commercial-bio-body commercial-bio-zh flex flex-col gap-3"
      >
        {zh}
      </div>
    </>
  )
}