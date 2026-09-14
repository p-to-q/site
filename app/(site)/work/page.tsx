import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import type { ComponentProps, ReactNode } from 'react'
import { ExternalLink } from '@/components/content/external-link'
import { SiteStickyQedPage } from '@/components/layout/site-sticky-qed-page'

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, centrifuge-sort, aleph, agent lifeRestart, murmur, jiko, via, and matter.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Work',
    description:
      'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, centrifuge-sort, aleph, agent lifeRestart, murmur, jiko, via, and matter.',
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
      'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, centrifuge-sort, aleph, agent lifeRestart, murmur, jiko, via, and matter.',
    images: ['/og?title=Work'],
  },
}

/** Map preview basenames to files in public/work at build time.
 *  Project links use `<slug>`; secondary artifacts use a descriptive suffix. */
function readWorkThumbs(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const file of readdirSync(join(process.cwd(), 'public', 'work')).sort()) {
    const dot = file.lastIndexOf('.')
    if (dot <= 0) continue
    const base = file.slice(0, dot).toLowerCase()
    if (map[base]) {
      throw new Error(`Duplicate Work preview basename: ${base}`)
    }
    map[base] = `/work/${file}`
  }
  return map
}

function requireWorkThumb(thumbs: Record<string, string>, basename: string): string {
  const thumb = thumbs[basename]
  if (!thumb) throw new Error(`Missing Work preview: public/work/${basename}.*`)
  return thumb
}

/** Keep project lines visually unchanged; previews belong to their exact destination link. */
function WorkItem({ children }: { children: ReactNode }) {
  return (
    <div className="work-row">
      <p className="body-text">{children}</p>
    </div>
  )
}

type WorkPreviewLinkProps = ComponentProps<typeof ExternalLink> & {
  preview: string
}

function WorkPreviewLink({ preview, children, className = '', ...props }: WorkPreviewLinkProps) {
  return (
    <ExternalLink {...props} className={`work-preview-link ${className}`.trim()}>
      {children}
      {preview ? (
        <span className="work-thumb" aria-hidden="true">
          <picture>
            <source media="(min-width: 1024px)" srcSet={preview} />
            {/* The fallback prevents hidden desktop previews from being fetched on small screens. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TRANSPARENT_PIXEL} alt="" loading="lazy" decoding="async" />
          </picture>
        </span>
      ) : null}
    </ExternalLink>
  )
}

function PitchLink({ project, preview }: {
  project: 'jiko' | 'matter' | 'murmur' | 'wittgenstein'
  preview: string
}) {
  return (
    <WorkPreviewLink
      href={encodeURI(`/pitches/${project}_[p→q]_hack_pitch.pdf`)}
      preview={preview}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project} [p→q] hackathon pitch PDF`}
    >
      [PDF]
    </WorkPreviewLink>
  )
}

export default function WorkPage() {
  const thumbs = readWorkThumbs()
  const thumb = (basename: string) => requireWorkThumb(thumbs, basename)
  return (
    <SiteStickyQedPage>
      <h1 className="sr-only">Work</h1>
      <section className="work-list flex flex-col gap-3">
        <WorkItem>
          <WorkPreviewLink href="https://www.wittgenstein.wtf/" preview={thumb('wittgenstein')}>
            wittgenstein
          </WorkPreviewLink>
          {' - '}
          a modality harness for text-first LLMs.{' '}
          <PitchLink project="wittgenstein" preview={thumb('wittgenstein-pitch')} />
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://github.com/moapacha/sonde" preview={thumb('sonde')}>
            sonde
          </WorkPreviewLink>
          {' - '}
          orbital sequencer for low-res earth
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://github.com/Jah-yee/autoclicker" preview={thumb('autoclicker')}>
            autoclicker
          </WorkPreviewLink>
          {' - '}
          keyboard cadence for browser stepping games
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://flatus.ptoq.io" preview={thumb('flatus')}>
            flatus
          </WorkPreviewLink>
          {' - '}
          a small thing that lives in your menubar and occasionally farts
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://github.com/p-to-q/carburetor" preview={thumb('carburetor')}>
            [carburetor]
          </WorkPreviewLink>
          {' - '}
          a phone you refuel
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink
            href="https://gist.github.com/Jah-yee/e12aa64a1a739d9749fdc5955a653740"
            preview={thumb('centrifuge-sort')}
          >
            centrifuge-sort
          </WorkPreviewLink>
          {' - '}
          physical sorting algorithm that shouldn't exist
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://aleph.ptoq.io/" preview={thumb('aleph')}>
            aleph
          </WorkPreviewLink>
          {' - '}
          reverse prompt search engine, also engineering{' '}
          <WorkPreviewLink
            href="https://github.com/p-to-q/aleph-benchmark"
            preview={thumb('aleph-benchmark')}
          >
            benchmark
          </WorkPreviewLink>
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://machinedie.life" preview={thumb('liferestart')}>
            agent lifeRestart
          </WorkPreviewLink>
          {' - '}
          make something an agent want, after{' '}
          <WorkPreviewLink
            href="https://github.com/VickScarlet/lifeRestart"
            preview={thumb('liferestart-upstream')}
          >
            lifeRestart
          </WorkPreviewLink>
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://murmur.ptoq.io/" preview={thumb('murmur')}>
            murmur
          </WorkPreviewLink>
          {' - '}
          get the melody out of your head.{' '}
          <PitchLink project="murmur" preview={thumb('murmur-pitch')} />
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://jiko.ptoq.io" preview={thumb('jiko')}>
            [jiko]
          </WorkPreviewLink>
          {' - '}
          instant decision making instrument.{' '}
          <PitchLink project="jiko" preview={thumb('jiko-pitch')} />
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://github.com/p-to-q/via" preview={thumb('via')}>
            via
          </WorkPreviewLink>
          {' - '}
          Git-tree/Google Map interface for vibe coding decisions
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://matter.ptoq.io" preview={thumb('matter')}>
            matter
          </WorkPreviewLink>
          {' - '}
          make thought matter (as a BCI).{' '}
          <PitchLink project="matter" preview={thumb('matter-pitch')} />
        </WorkItem>
      </section>
    </SiteStickyQedPage>
  )
}
