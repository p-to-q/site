import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteDivider } from '@/components/layout/site-divider'

/** `absolute` bypasses root `title.template` so the tab is exactly `[p → q]`. */
export const metadata: Metadata = {
  title: { absolute: '[p → q]' },
  description:
    'experimental craft and research over scale. we study the layer between language and consequence.',
}

const BULLETS = [
  "Today's AI is still bad in many ordinary ways; tomorrow's technology will be better.",
  "The bitter lesson we learn from it is that real-world data is continuous, high-dimensional, and noisy.",
  "Consistently, the most successful implementations use simple, composable patterns rather than giant complex frameworks.",
  "Like software in the 80s, there is a tremendous opportunity to build things that are not upgrades, but something completely different.",
  "Above all, we think there is a responsibility to recognize and create new things, and to take part in the strange, interesting, and sacred practice.",
  "Our first proof is Wittgenstein, a modality harness for text-first LLMs.",
]

const ARROW_ROWS: [string, string][] = [
  ['p', 'what can be said'],
  ['→', 'how it becomes something'],
  ['q', 'what actually happens'],
]

export default function Page() {
  return (
    <>
      <section className="overflow-x-clip">
        <div className="flex flex-col gap-6">
          <div
            className="flex flex-col gap-[calc(1.45rem*3)]"
            style={{ paddingTop: 'max(0.75rem, calc(100dvh / 3 - var(--home-logo-viewport-offset, 3.5rem)))' }}
          >
            <div style={{ width: 'min(80vw, 18rem)' }}>
              <Image
                src="/resources/pictures/home/p-to-q_logo.png"
                alt="[p → q]"
                width={726}
                height={235}
                className="block h-auto w-full max-w-full"
                sizes="(max-width: 640px) 80vw, 18rem"
                priority
                unoptimized
              />
            </div>
            <p className="body-text">if p, then q</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="body-text">Experimental craft and research over scale.</p>
            <p className="body-text">We&apos;re interested in the arrow.</p>
            <p className="body-text">We study the layer between language and consequence.</p>
          </div>

          <div className="flex flex-col">
            {ARROW_ROWS.map(([sym, desc]) => (
              <div key={sym} className="flex gap-6 items-center">
                <span className="body-text arr" style={{ minWidth: '1.25rem' }}>{sym}</span>
                <span className="body-text" style={{ color: 'var(--site-link)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <SiteDivider />

        <div className="flex flex-col gap-3">
          <p className="body-text">Right now that means:</p>
          <div className="flex flex-col gap-2">
            {BULLETS.map((b, i) => (
              <p key={i} className="body-text">{b}</p>
            ))}
          </div>
        </div>

        <SiteDivider />

        <div className="flex flex-col gap-3">
          <p className="body-text">Scope</p>
          <p className="body-text">Seminal work in reasoning, behavioral training, agents, and alignment matters.</p>
        </div>

        <SiteDivider />

        <div className="flex flex-col gap-3">
          <p className="body-text">Our singular focus means no distraction by management overhead or product cycles, this is a research question before it is a category.</p>
          <p className="body-text">We won&apos;t conceal any risk from you at [p <span className="arr">→</span> q], but nor are we in the game of trying to make you panic. (We have better ways of holding your attention).</p>
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
