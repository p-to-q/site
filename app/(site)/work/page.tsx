import type { Metadata } from 'next'
import { ExternalLink } from '@/components/content/external-link'
import { SiteStickyQedPage } from '@/components/layout/site-sticky-qed-page'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Wittgenstein - a modality harness for text-first LLMs.',
}

export default function WorkPage() {
  return (
    <SiteStickyQedPage>
      <section>
        <p className="body-text">
          <ExternalLink href="https://github.com/p-to-q/wittgenstein">Wittgenstein</ExternalLink>
          {' - '}
          a modality harness for text-first LLMs.
        </p>
      </section>
    </SiteStickyQedPage>
  )
}
