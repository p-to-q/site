import Image from 'next/image'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Tutorial: Max/MSP & Unreal Engine',
  description: 'Tutorial: Max/MSP & Unreal Engine',
})

export default function TriggerTutorial() {
  return (
    <DetailPageTemplate
      title="Tutorial: Max/MSP & Unreal Engine"
      titleClassName="min-w-0 flex-1"
      date="Sep '25"
      backHref="/"
      backLabel="back to events"
      hero={
        <div className="overflow-hidden">
          <Image
            src="/resources/pictures/events/trigger_tutorial/trigger_tutorial_2.jpg"
            alt="Trigger Tutorial Content"
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
        <p className="mb-0 body-text">As Lecturer, with Chenghao Xu</p>
      </div>
    </DetailPageTemplate>
  )
}
