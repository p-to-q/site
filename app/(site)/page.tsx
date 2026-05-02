import Image from 'next/image'
import { IconLink } from '@/components/content/icon-link'
import { ArrowIcon } from '@/components/content/icons'
import { SiteDivider } from '@/components/layout/site-divider'
import { LastUpdated } from '@/components/layout/last-updated'
import { ListPageTemplate } from '@/components/templates/list-page-template'
import { SOCIAL_LINKS } from '@/lib/constants'
import { ICON_ASSETS } from '@/lib/icon-assets'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import {
  PROJECT_LIST_ITEMS,
  POSTS_LIST_ITEMS,
  SOUNDS_LIST_ITEMS,
  EVENTS_LIST_ITEMS,
} from '@/lib/page-data'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Home',
  description:
    'Home page of Yiming Sun — Electronic musical instruments. Applied Mathematics at UC Berkeley, building Ear Modular.',
})

export default function Page() {
  return (
    <>
    <section className="lowercase flex flex-col gap-8">
      <div className="overflow-hidden">
        <Image
          src="/resources/pictures/home/home_banner.jpeg"
          alt="Home banner"
          width={1600}
          height={900}
          sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <h1 className="tracking-tighter title-bold-text normal-case" style={{ letterSpacing: '0px' }}>
          Hi! I&apos;m Yiming!
        </h1>
        <div className="flex shrink-0 items-center gap-4 pt-1">
          <a
            href={SOCIAL_LINKS.email}
            aria-label="Email"
            className="text-[var(--site-link)] transition-colors hover:text-[var(--site-link-hover)]"
          >
            <span
              className="block h-5 w-5 bg-current"
              aria-hidden="true"
              style={{
                WebkitMaskImage: `url("${ICON_ASSETS.email}")`,
                maskImage: `url("${ICON_ASSETS.email}")`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--site-link)] transition-colors hover:text-[var(--site-link-hover)]"
          >
            <span
              className="block h-5 w-5 bg-current"
              aria-hidden="true"
              style={{
                WebkitMaskImage: `url("${ICON_ASSETS.github}")`,
                maskImage: `url("${ICON_ASSETS.github}")`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
          </a>
        </div>
      </div>
      <div>
        <div className="space-y-2">
          <p className="body-text">
            I design and build electronic musical instruments, and think too much about what sound can become
          </p>
          <p className="body-text">
            Currently studying Applied Mathematics at UC Berkeley, building{' '}
            <IconLink
              href="https://www.earmodular.com/"
              icon={<ArrowIcon />}
              external
              aria-label="Ear Modular website"
              className="inline-flex min-w-0 max-w-full items-baseline"
            >
              EarModular
            </IconLink>
          </p>
        </div>

        <SiteDivider />
        <ListPageTemplate title="Projects" items={PROJECT_LIST_ITEMS} />
      </div>
      <ListPageTemplate title="Posts" items={POSTS_LIST_ITEMS} />
      <ListPageTemplate title="Sounds" items={SOUNDS_LIST_ITEMS} />
      <ListPageTemplate title="Events" items={EVENTS_LIST_ITEMS} />
    </section>
    <SiteDivider />
    <footer className="flex items-center gap-2">
      <p className="body-text">Yiming Sun</p>
      <span className="body-text">-</span>
      <LastUpdated />
    </footer>
    </>
  )
}
