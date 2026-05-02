import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Wittgenstein - a modality harness for text-first LLMs.',
}

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <section>
        <p className="body-text">
          <a href="https://github.com/p-to-q/wittgenstein" target="_blank" rel="noopener noreferrer">
            Wittgenstein
          </a>
          {' - '}
          a modality harness for text-first LLMs.
        </p>
      </section>
    </>
  )
}
