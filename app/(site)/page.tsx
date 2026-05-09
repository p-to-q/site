import type { Metadata } from 'next'
import { ExternalLink } from '@/components/content/external-link'
import { SiteDivider } from '@/components/layout/site-divider'
import { SiteHeader } from '@/components/layout/site-header'

/** `absolute` bypasses root `title.template` so the tab is exactly `[p → q]`. */
export const metadata: Metadata = {
  title: { absolute: '[p → q]' },
  description: 'We study the layer between language and consequence.',
}

const ARROW_ROWS: [string, string][] = [
  ['p', 'what can be said'],
  ['→', 'how it becomes something'],
  ['q', 'what actually happens'],
]

export default function Page() {
  return (
    <>
      <SiteHeader />

      <section className="overflow-x-clip">

        {/* Hero copy */}
        <div className="flex flex-col gap-6">
          <p className="heading-text home-page-heading home-page-tagline">if p, then q</p>

          <p className="body-text">We&apos;re interested in the arrow.</p>

          <div className="flex flex-col">
            {ARROW_ROWS.map(([sym, desc]) => (
              <div key={sym} className="flex gap-6 items-baseline">
                <span className={`sym-col body-text${sym === '→' ? ' arr' : ''}`}>{sym}</span>
                <span className="body-text" style={{ color: 'var(--site-link)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <SiteDivider />

        {/* About */}
        <div className="flex flex-col gap-3">
          <p className="body-text">An independent research practice working on the gap between what language models can express and what happens because of it.</p>
          <p className="body-text">
            Current focus: structured representations as an alternative to scaling. The first prove is{' '}
            <ExternalLink href="https://github.com/p-to-q/wittgenstein">Wittgenstein</ExternalLink>
            , a modality harness for text-first LLMs.
          </p>
        </div>

        <SiteDivider />

        {/* Closing */}
        <div className="flex flex-col gap-3">
          <p className="body-text">
            Talk to us if you are interested in the arrow <span className="arr">→</span>{' '}
            <ExternalLink href="mailto:hi@ptoq.io">hi@ptoq.io</ExternalLink>
          </p>
        </div>

      </section>

      <SiteDivider />

      <footer>
        <p className="heading-text home-page-heading">Q.E.D.</p>
        <p className="site-copyright-text">© 2026 Wooden Computer Co., Ltd. All rights reserved.</p>
      </footer>
    </>
  )
}
