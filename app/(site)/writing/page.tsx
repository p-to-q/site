import type { Metadata } from 'next'
import { SiteStickyQedPage } from '@/components/layout/site-sticky-qed-page'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Continuously updating.',
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
