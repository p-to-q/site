import Image from 'next/image'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Papa James Workshop',
  description: 'Papa James Workshop — photos and notes by Yiming Sun',
})

const images = [
  { src: '/resources/pictures/posts/papa_james/ppj_1.jpg', alt: 'Papa James workshop second floor', caption: 'on the second floor' },
  { src: '/resources/pictures/posts/papa_james/ppj_2.jpg', alt: 'Papa James workshop bench', caption: 'my dream workbench' },
  { src: '/resources/pictures/posts/papa_james/ppj_3.jpg', alt: 'Papa James workshop factory bulb', caption: 'a giant factory light bulb' },
  { src: '/resources/pictures/posts/papa_james/ppj_4.jpg', alt: 'Papa James workshop wooden box', caption: 'a wooden bullet cartridge box' },
  { src: '/resources/pictures/posts/papa_james/ppj_5.jpg', alt: 'Papa James workshop figure', caption: 'probably zorro?' },
] as const

export default function PapaJamesWorkshopPost() {
  return (
    <DetailPageTemplate
      title="Papa James Workshop"
      date="Apr '26"
      backHref="/"
      backLabel="back to posts"
      hero={
        <div className="space-y-8">
          {images.map(({ src, alt, caption }) => (
            <div key={src} className="overflow-hidden">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1200}
                sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
              <p className="caption-text mt-2">{caption}</p>
            </div>
          ))}
        </div>
      }
    >
      <div className="prose prose-invert max-w-none">
        <p className="body-text">Big thanks to +1 for bringing me here.</p>
      </div>
    </DetailPageTemplate>
  )
}
