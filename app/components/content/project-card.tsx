import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon } from '@/components/content/icons'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'

interface ProjectCardProps {
  href: string
  imageSrc: string
  imageAlt: string
  title: string
  /** When true, image area is always 3:2 on every viewport (projects + tracks). */
  fixedAspectRatio?: boolean
  imageHeight?: 'h-48' | 'h-auto'
  objectPosition?: string
  /**
   * `tracks` — title below cover; hover only dims (no overlay title).
   * `default` — title appears on hover over the image (Projects / Events style).
   */
  variant?: 'default' | 'tracks'
}

export function ProjectCard({
  href,
  imageSrc,
  imageAlt,
  title,
  fixedAspectRatio = false,
  imageHeight = 'h-48',
  objectPosition,
  variant = 'default',
}: ProjectCardProps) {
  const isExternal = /^https?:\/\//.test(href)
  const tracksLayout = variant === 'tracks'
  const intrinsicW = 800
  const intrinsicH = fixedAspectRatio ? 533 : imageHeight === 'h-48' ? 192 : 600
  const imageClassName = fixedAspectRatio
    ? 'w-full aspect-[3/2] h-auto object-cover group-hover:scale-105 transition-transform duration-300'
    : `w-full ${imageHeight} object-cover group-hover:scale-105 transition-transform duration-300`

  return (
    <article className="group bg-[var(--site-card-bg)] transition-all duration-300 relative">
      <div className="relative overflow-hidden">
        <Link
          href={href}
          className="block relative"
          aria-label={`View ${title} project`}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={intrinsicW}
            height={intrinsicH}
            sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
            className={imageClassName}
            style={objectPosition ? { objectPosition } : undefined}
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 transition-all duration-300 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          {!tracksLayout ? (
            <div className="absolute top-2.5 left-4 text-on-media opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-4">
              <h3 className="flex items-center gap-1 text-lg leading-tight title-text normal-case">
                <span>{title}</span>
                <ArrowIcon className="shrink-0" />
              </h3>
            </div>
          ) : null}
        </div>
      </div>
      {tracksLayout ? (
        <div className="mt-2">
          <h3 className="min-w-0 text-lg leading-tight title-text normal-case">{title}</h3>
        </div>
      ) : null}
    </article>
  )
}
