import Image from 'next/image'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Down To Earth',
  description: 'Down To Earth — LRPT image received from METEOR M2-3 using a handheld antenna',
})

const images = [
  { src: '/resources/pictures/posts/down_to_earth/1.jpg', alt: 'Down To Earth 1' },
  { src: '/resources/pictures/posts/down_to_earth/2.jpg', alt: 'Down To Earth 2' },
  { src: '/resources/pictures/posts/down_to_earth/3.jpg', alt: 'Down To Earth 3' },
] as const

export default function DownToEarthPost() {
  return (
    <DetailPageTemplate
      title="Down To Earth"
      date="Apr '26"
      backHref="/"
      backLabel="back to posts"
      hero={
        <div className="space-y-8">
          {images.map(({ src, alt }) => (
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
            </div>
          ))}
        </div>
      }
    >
      <div className="prose prose-invert max-w-none">
        <p className="body-text">
          LRPT image received from METEOR M2-3 using a handheld antenna.
        </p>
      </div>
    </DetailPageTemplate>
  )
}
