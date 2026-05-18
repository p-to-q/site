import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ExternalLink } from '@/components/content/external-link'
import { SiteStickyQedPage } from '@/components/layout/site-sticky-qed-page'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, centrifuge-sort, aleph, and agent lifeRestart.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Work',
    description:
      'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, centrifuge-sort, aleph, and agent lifeRestart.',
    url: '/work',
    images: [
      {
        url: '/og?title=Work',
        width: 1200,
        height: 630,
        alt: 'Work — [p → q]',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work',
    description:
      'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, centrifuge-sort, aleph, and agent lifeRestart.',
    images: ['/og?title=Work'],
  },
}

/** Map each project slug to whatever image file sits in public/work (any extension).
 *  Resolved at render so swapping a file needs no code change. */
function readWorkThumbs(): Record<string, string> {
  const map: Record<string, string> = {}
  try {
    for (const file of readdirSync(join(process.cwd(), 'public', 'work')).sort()) {
      const dot = file.lastIndexOf('.')
      if (dot <= 0) continue
      const base = file.slice(0, dot).toLowerCase()
      if (!map[base]) map[base] = `/work/${file}`
    }
  } catch {
    // no public/work directory — every project just renders without a thumb
  }
  return map
}

/** A project line. When `thumb` is set, the full photo reveals in the left gutter on link hover (desktop only). */
function WorkItem({ thumb, children }: { thumb?: string; children: ReactNode }) {
  if (!thumb) {
    return <p className="body-text">{children}</p>
  }
  return (
    <div className="work-row">
      <span className="work-thumb" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt="" loading="lazy" decoding="async" />
      </span>
      <p className="body-text">{children}</p>
    </div>
  )
}

export default function WorkPage() {
  const thumbs = readWorkThumbs()
  return (
    <SiteStickyQedPage>
      <section className="flex flex-col gap-3">
        <WorkItem thumb={thumbs['wittgenstein']}>
          <ExternalLink href="https://github.com/p-to-q/wittgenstein">wittgenstein</ExternalLink>
          {' - '}
          a modality harness for text-first LLMs
        </WorkItem>
        <WorkItem thumb={thumbs['sonde']}>
          <ExternalLink href="https://github.com/moapacha/sonde">sonde</ExternalLink>
          {' - '}
          orbital sequencer for low-res earth
        </WorkItem>
        <WorkItem thumb={thumbs['autoclicker']}>
          <ExternalLink href="https://github.com/Jah-yee/autoclicker">autoclicker</ExternalLink>
          {' - '}
          keyboard cadence for browser stepping games
        </WorkItem>
        <WorkItem thumb={thumbs['flatus']}>
          <ExternalLink href="https://github.com/p-to-q/flatus">flatus</ExternalLink>
          {' - '}
          a small thing that lives in your menubar and occasionally farts
        </WorkItem>
        <WorkItem thumb={thumbs['carburetor']}>
          <ExternalLink href="https://github.com/p-to-q/carburetor">[carburetor]</ExternalLink>
          {' - '}
          a phone you refuel
        </WorkItem>
        <WorkItem thumb={thumbs['centrifuge-sort']}>
          <ExternalLink href="https://gist.github.com/Jah-yee/e12aa64a1a739d9749fdc5955a653740">centrifuge-sort</ExternalLink>
          {' - '}
          physical sorting algorithm that shouldn't exist
        </WorkItem>
        <WorkItem thumb={thumbs['aleph']}>
          <ExternalLink href="https://github.com/p-to-q/aleph">aleph</ExternalLink>
          {' - '}
          reverse prompt search engine
        </WorkItem>
        <WorkItem thumb={thumbs['liferestart']}>
          <ExternalLink href="https://github.com/p-to-q/lifeRestart">agent lifeRestart</ExternalLink>
          {' - '}
          make something an agent want, after{' '}
          <ExternalLink href="https://github.com/VickScarlet/lifeRestart">lifeRestart</ExternalLink>
        </WorkItem>
      </section>
    </SiteStickyQedPage>
  )
}
