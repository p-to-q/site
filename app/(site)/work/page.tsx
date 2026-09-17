import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { WorkPreviewLink } from '@/components/content/work-preview-link'
import { SiteStickyQedPage } from '@/components/layout/site-sticky-qed-page'
import { getWorkPreviewMap, preloadWorkPreviews } from '@/lib/work-previews'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, centrifuge-sort, aleph, agent lifeRestart, murmur, jiko, via, matter, and see-me-see-u.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Work',
    description:
      'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, centrifuge-sort, aleph, agent lifeRestart, murmur, jiko, via, matter, and see-me-see-u.',
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
      'Selected projects from our practice: wittgenstein, sonde, autoclicker, flatus, carburetor, centrifuge-sort, aleph, agent lifeRestart, murmur, jiko, via, matter, and see-me-see-u.',
    images: ['/og?title=Work'],
  },
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

function ArtifactLink({ project, artifact, preview }: {
  project: 'jiko' | 'matter' | 'murmur' | 'see-me-see-u' | 'wittgenstein'
  artifact: 'pitch' | 'poster'
  preview: string
}) {
  const label = artifact === 'poster' ? 'POSTER' : 'PDF'

  return (
    <WorkPreviewLink
      href={encodeURI(`/pitches/${project}_[p→q]_hack_${artifact}.pdf`)}
      preview={preview}
      previewVariant={artifact === 'poster' ? 'banner' : 'standard'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project} [p→q] hackathon ${artifact} PDF`}
    >
      [{label}]
    </WorkPreviewLink>
  )
}

export default function WorkPage() {
  // Direct visits still load the full preview set before any hover interaction.
  preloadWorkPreviews()
  const thumbs = getWorkPreviewMap()
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
          <ArtifactLink
            project="wittgenstein"
            artifact="pitch"
            preview={thumb('wittgenstein-pitch')}
          />
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
          <ArtifactLink project="murmur" artifact="pitch" preview={thumb('murmur-pitch')} />
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://jiko.ptoq.io" preview={thumb('jiko')}>
            [jiko]
          </WorkPreviewLink>
          {' - '}
          instant decision making instrument.{' '}
          <ArtifactLink project="jiko" artifact="pitch" preview={thumb('jiko-pitch')} />
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
          make thought matter (as a BCI){' '}
          <ArtifactLink project="matter" artifact="pitch" preview={thumb('matter-pitch')} />
        </WorkItem>
        <WorkItem>
          <WorkPreviewLink href="https://useeme.ptoq.io/" preview={thumb('see-me-see-u')}>
            SEE-ME SEE-U
          </WorkPreviewLink>
          {' - '}
          what kinds of bodies can a self inhabit{' '}
          <ArtifactLink
            project="see-me-see-u"
            artifact="poster"
            preview={thumb('see-me-see-u-poster')}
          />
        </WorkItem>
      </section>
    </SiteStickyQedPage>
  )
}
