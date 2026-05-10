import type { Metadata } from 'next'
import { ExternalLink } from '@/components/content/external-link'
import { SiteStickyQedPage } from '@/components/layout/site-sticky-qed-page'

export const metadata: Metadata = {
  title: 'Work',
  description: 'wittgenstein - a modality harness for text-first LLMs.',
}

export default function WorkPage() {
  return (
    <SiteStickyQedPage>
      <section className="flex flex-col gap-3">
        <p className="body-text">
          <ExternalLink href="https://github.com/p-to-q/wittgenstein">wittgenstein</ExternalLink>
          {' - '}
          a modality harness for text-first LLMs.
        </p>
        <p className="body-text">
          <ExternalLink href="https://github.com/moapacha/sonde">sonde</ExternalLink>
          {' - '}
          orbital sequencer for low-res earth
        </p>
        <p className="body-text">
          <ExternalLink href="https://github.com/Jah-yee/autoclicker">autoclicker</ExternalLink>
          {' - '}
          Keyboard cadence for browser stepping games.
        </p>
      </section>
    </SiteStickyQedPage>
  )
}
