import type { Metadata } from 'next'
import { ExternalLink } from '@/components/content/external-link'
import { SiteStickyQedPage } from '@/components/layout/site-sticky-qed-page'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, and centrifuge-sort.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Work',
    description:
      'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, and centrifuge-sort.',
    url: '/work',
    images: [
      {
        url: '/og?title=Work',
        width: 1200,
        height: 630,
        alt: 'Work — [p → q]',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work',
    description:
      'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, and centrifuge-sort.',
    images: ['/og?title=Work'],
  },
}

export default function WorkPage() {
  return (
    <SiteStickyQedPage>
      <section className="flex flex-col gap-3">
        <p className="body-text">
          <ExternalLink href="https://github.com/p-to-q/wittgenstein">wittgenstein</ExternalLink>
          {' - '}
          a modality harness for text-first LLMs
        </p>
        <p className="body-text">
          <ExternalLink href="https://github.com/moapacha/sonde">sonde</ExternalLink>
          {' - '}
          orbital sequencer for low-res earth
        </p>
        <p className="body-text">
          <ExternalLink href="https://github.com/Jah-yee/autoclicker">autoclicker</ExternalLink>
          {' - '}
          keyboard cadence for browser stepping games
        </p>
        <p className="body-text">
          <ExternalLink href="https://github.com/p-to-q/flatus">flatus</ExternalLink>
          {' - '}
          a small thing that lives in your menubar and occasionally farts
        </p>
        <p className="body-text">
          <ExternalLink href="https://github.com/p-to-q/carburetor">[carburetor]</ExternalLink>
          {' - '}
          a phone you refuel
        </p>
        <p className="body-text">
          <ExternalLink href="https://gist.github.com/Jah-yee/e12aa64a1a739d9749fdc5955a653740">centrifuge-sort</ExternalLink>
          {' - '}
          physical sorting algorithm that should not exist
        </p>
      </section>
    </SiteStickyQedPage>
  )
}
