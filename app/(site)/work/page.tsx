import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Wittgenstein — a modality harness for text-first LLMs.',
}

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <section className="flex flex-col gap-1">
        <p className="body-text">
          <a href="https://www.wittgenstein.wtf/" target="_blank" rel="noreferrer">
            Wittgenstein
          </a>
        </p>
        <p className="body-text">a modality harness for text-first LLMs.</p>
      </section>
    </>
  )
}
