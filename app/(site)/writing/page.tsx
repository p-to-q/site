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
      <section className="flex flex-col gap-3">
        <p className="heading-text">continuously updating</p>
        {WRITINGS.map((entry) => (
          <p key={entry.slug} className="body-text">
            <Link href={`/writing/${entry.slug}`}>{entry.title}</Link>
            {' - '}
            <span style={{ color: 'var(--site-link)' }}>{entry.description}</span>
          </p>
        ))}
      </section>
    </SiteStickyQedPage>
  )
}
