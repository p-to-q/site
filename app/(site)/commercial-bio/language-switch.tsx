'use client'

import { useState, type ReactNode } from 'react'

type BioLanguage = 'en' | 'zh'

/**
 * Both languages stay in the served HTML so the Chinese is crawlable and the
 * page reads without JavaScript; only the inactive one is `hidden`. EN is the
 * server-rendered default, so there is no flash of the wrong language.
 *
 * `data-entered` is set only after a real switch: the copy settles in on a
 * change, while the first paint stays still and defers to the site's font gate.
 */
export function LanguageSwitch({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  const [language, setLanguage] = useState<BioLanguage>('en')
  const [hasSwitched, setHasSwitched] = useState(false)

  const select = (next: BioLanguage) => {
    if (next === language) return
    setLanguage(next)
    setHasSwitched(true)
  }

  return (
    <>
      <div className="commercial-bio-lang" role="group" aria-label="Language">
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