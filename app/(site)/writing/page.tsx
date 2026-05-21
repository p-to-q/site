import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteStickyQedPage } from '@/components/layout/site-sticky-qed-page'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Continuously updating.',
  alternates: {
    canonical: '/writing',
  },
  openGraph: {
    title: 'Writing',
    description: 'Continuously updating.',
    url: '/writing',
    images: [
      {
        url: '/og?title=Writing',
        width: 1200,
        height: 630,
        alt: 'Writing — [p → q]',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing',
    description: 'Continuously updating.',
    images: ['/og?title=Writing'],
  },
}

const WRITINGS = [
  {
    slug: 'strange-tools',
    title: 'Strange Tools',
    date: 'May 2026',
    description: 'Tools whose strangeness continues to pay rent.',
  },
] as const

export default function WritingPage() {
  return (
    <SiteStickyQedPage>
      <section className="writing-index" aria-labelledby="writing-index-status">
        <p id="writing-index-status" className="heading-text writing-index__status"><a
            href="https://medium.com/@kyletmartinez/reverse-engineering-claudes-ascii-spinner-animation-eec2804626e0"
            target="_blank"
            rel="noopener noreferrer"
            className="claude-spinner-link"
            tabIndex={-1}
            aria-hidden="true"
          ><span className="claude-spinner" /></a>{' '}continuously updating</p>
        <div className="writing-index__divider" aria-hidden="true" />
        <div className="writing-index__entries">
          {WRITINGS.map((entry) => (
            <p key={entry.slug} className="body-text writing-index__entry">
              <Link href={`/writing/${entry.slug}`}>{entry.title}</Link>
              {' - '}
              <span className="text-[color:var(--site-link)]">{entry.description}</span>
            </p>
          ))}
        </div>
      </section>
    </SiteStickyQedPage>
  )
}
