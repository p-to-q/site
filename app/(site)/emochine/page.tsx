import Image from 'next/image'
import { IconLink } from '@/components/content/icon-link'
import { ArrowIcon } from '@/components/content/icons'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Emochine 3: A Salon for Synth Makers',
  description: 'Emochine 3: A Salon for Synth Makers',
})

export default function Emochine3() {
  return (
    <DetailPageTemplate
      title="Emochine 3: A Salon for Synth Makers"
      date="Jun '25"
      backHref="/"
      backLabel="back to events"
      hero={
        <div className="overflow-hidden">
          <Image
            src="/resources/pictures/events/emochine3/emochine3_2.jpg"
            alt="Emochine 3: A Salon for Synth Makers additional"
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
        <p className="mb-4 body-text">At Raw Material Space, Beijing, China</p>
        <p className="mb-0 body-text">
          As Lecturer, with{' '}
          <IconLink
            href="https://www.mengqimusic.com/"
            icon={<ArrowIcon />}
            external
            aria-label="Meng Qi — mengqimusic.com"
            className="!inline-flex min-w-0 max-w-full items-baseline"
          >
            Meng Qi
          </IconLink>{' '}
          and oo.khiat
        </p>
      </div>
    </DetailPageTemplate>
  )
}
