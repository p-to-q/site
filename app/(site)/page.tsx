import type { Metadata } from 'next'
import { SiteDivider } from '@/components/layout/site-divider'
import { SiteHeader } from '@/components/layout/site-header'

/** `absolute` bypasses root `title.template` so the tab is exactly `[p → q]`. */
export const metadata: Metadata = {
  title: { absolute: '[p → q]' },
  description:
    'experimental craft and research over scale. we study the layer between language and consequence.',
}

const BELIEF = [
  "Today's AI is still bad in ordinary ways; tomorrow's will be better.",
  "The bitter lesson: real-world data is continuous, high-dimensional, noisy.",
  "The most successful implementations use simple, composable patterns, not giant frameworks.",
  "Like software in the 80s, the opportunity isn't to build upgrades, but something completely different.",
  "There is a responsibility to recognize and create new things — to take part in the strange, sacred practice.",
]

const TASTE = [
  "Flat is better than nested.",
  "Printability is a great feature.",
  "Human-readable interfaces for machine-produced things.",
  "Overly abstract means narcissism.",
  "Programming is a way of thinking, not a rote skill.",
  "Long variable names don't hurt anyone.",
  "Perception varies; people understand what they can see.",
  "Humans' needs and taste are important.",
  "AI should be the connective tissue that strengthens humans.",
  "To sincerely elevate the species.",
]

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
            <p className="body-text">Experimental craft and research over scale.</p>
            <p className="body-text">We&apos;re interested in the arrow.</p>
            <p className="body-text">We study the layer between language and consequence.</p>
          </div>

          <div className="flex flex-col">
            {ARROW_ROWS.map(([sym, desc]) => (
              <div key={sym} className="flex gap-6 items-center">
                <span
                  className={sym === '→' ? 'body-text arr' : 'body-text'}
                  style={{ minWidth: '1.25rem' }}
                >
                  {sym}
                </span>
                <span className="body-text" style={{ color: 'var(--site-link)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <SiteDivider />

        {/* Belief */}
        <div className="flex flex-col gap-3">
          <p className="body-text">Belief</p>
          <div className="flex flex-col gap-2">
            {BELIEF.map((b, i) => (
              <p key={i} className="body-text">{b}</p>
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

        {/* Taste */}
        <div className="flex flex-col gap-3">
          <p className="body-text">Taste</p>
          <div className="flex flex-col gap-1">
            {TASTE.map((t, i) => (
              <p key={i} className="body-text">{t}</p>
            ))}
          </div>
        </div>

        <SiteDivider />

        {/* Work */}
        <div className="flex flex-col gap-3">
          <p className="body-text">Work</p>
          <p className="body-text">Our first proof is Wittgenstein, a modality harness for text-first LLMs.</p>
        </div>

        <SiteDivider />

        {/* Closing */}
        <div className="flex flex-col gap-3">
          <p className="body-text">At [p <span className="arr">→</span> q] we won&apos;t hide risk from you, but we won&apos;t manufacture panic either. (We have better ways of holding your attention.)</p>
          <p className="body-text">
            or talk to us if you are interested in the arrow <span className="arr">→</span>
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
