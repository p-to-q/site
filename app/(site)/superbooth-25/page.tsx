import Image from 'next/image'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Superbooth 25',
  description: 'Superbooth 25',
})

export default function Superbooth25() {
  return (
    <DetailPageTemplate
      title="Superbooth 25"
      date="May '25"
      backHref="/"
      backLabel="back to events"
      hero={
        <div className="overflow-hidden">
          <Image
            src="/resources/pictures/events/superbooth-25/IMG_6809.JPG"
            alt="Superbooth 25"
            width={800}
            height={600}
            sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </div>
      }
    >
      <div className="max-w-none">
        <p className="body-text mb-4">At Superbooth, Berlin, Germany</p>
        <p className="body-text mb-0">as exhibitor</p>
      </div>
    </DetailPageTemplate>
  )
}
