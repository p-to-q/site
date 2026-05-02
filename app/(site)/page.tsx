import type { Metadata } from 'next'
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
          <p className="body-text">if p, then q</p>

          <div className="flex flex-col gap-1">
            <p className="body-text">We&apos;re interested in the arrow.</p>
            <p className="body-text">We study the layer between language and consequence.</p>
          </div>

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

        {/* Scope */}
        <div className="flex flex-col gap-3">
          <p className="body-text">Scope</p>
          <p className="body-text">Seminal work in reasoning, behavioral training, agents, and alignment matters.</p>
          <p className="body-text">Singular focus, no management overhead, no product cycles. A research question before a category.</p>
        </div>

        <SiteDivider />

        {/* Work */}
        <div className="flex flex-col gap-3">
          <p className="body-text">Work</p>
          <p className="body-text">
            Our first proof is{' '}
            <a href="https://github.com/p-to-q/wittgenstein" target="_blank" rel="noopener noreferrer">
              Wittgenstein
            </a>
            , a modality harness for text-first LLMs.
          </p>
        </div>

        <SiteDivider />

        {/* Closing */}
        <div className="flex flex-col gap-3">
          <p className="body-text">At [p <span className="arr">→</span> q] we won&apos;t hide risk from you, but we won&apos;t manufacture panic either. (We have better ways of holding your attention.)</p>
          <p className="body-text">
            or talk to us if you are interested in the arrow <span className="arr">→</span>{' '}
            <a href="mailto:hi@p-to-q.com">hi@p-to-q.com</a>
          </p>
        </div>

      </section>

      <SiteDivider />

      <footer>
        <p className="body-text">Q.E.D.</p>
      </footer>
    </>
  )
}
