import type { Metadata } from 'next'
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

export default function WritingPage() {
  return (
    <SiteStickyQedPage>
      <section className="flex flex-col gap-3">
        <p className="heading-text">Continuously Updating</p>
      </section>
    </SiteStickyQedPage>
  )
}
