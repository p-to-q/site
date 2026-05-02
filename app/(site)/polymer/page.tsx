import Image from 'next/image'
import { IconLink } from '@/components/content/icon-link'
import { ArrowIcon } from '@/components/content/icons'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Polymer 4: Holocene Electronics',
  description: 'Polymer 4: Holocene Electronics',
})

export default function Polymer4() {
  return (
    <DetailPageTemplate
      title="Polymer 4: Holocene Electronics"
      date="Jul '25"
      backHref="/"
      backLabel="back to events"
      hero={
        <div className="overflow-hidden">
          <Image
            src="/resources/pictures/events/polymer4/polymer4_2.jpg"
            alt="Polymer 4: Holocene Electronics event content"
            width={800}
            height={600}
            sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      }
    >
      <div className="max-w-none">
        <p className="mb-4 body-text">At Trigger, Shanghai, China</p>
        <p className="mb-0 body-text">
          As Organizer, Performer, Interpreter, with{' '}
          <IconLink
            href="https://holocene-electronics.net/"
            icon={<ArrowIcon />}
            external
            aria-label="Yooleh Noh — Holocene Electronics"
            className="!inline-flex min-w-0 max-w-full items-baseline"
          >
            Yooleh Noh
          </IconLink>
        </p>
      </div>
    </DetailPageTemplate>
  )
}
