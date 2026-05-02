import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Continuously updating.',
}

export default function WritingPage() {
  return (
    <>
      <SiteHeader />
      <section>
        <p className="body-text">Continuously Updating</p>
      </section>
    </>
  )
}
