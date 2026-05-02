import Image from 'next/image'
import { IconLink } from '@/components/content/icon-link'
import { ArrowIcon } from '@/components/content/icons'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { IconLinkList } from '@/components/primitives/icon-link-list'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Foosball',
  description: 'Foosball - Interactive sound installation and performance system',
})

export default function Foosball() {
  return (
    <DetailPageTemplate
      title="Foosball"
      date="Jul '25"
      actions={
        <IconLinkList>
          <li>
            <IconLink href="https://github.com/Moapacha/Foosball" icon={<ArrowIcon />} external aria-label="View Foosball project on GitHub">
              GitHub
            </IconLink>
          </li>
        </IconLinkList>
      }
      backHref="/"
      backLabel="back to projects"
      hero={
        <div className="overflow-hidden">
          <Image
            src="/resources/pictures/projects/foosballs/foosball_overview.jpg"
            alt="Foosball"
            width={800}
            height={600}
            sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </div>
      }
    >
      <div className="prose prose-invert max-w-none">
        <p className="body-text">
          Foosball was largely inspired by Stanford CCRMA&apos;s Virtual Acoustics in Immersive Audio workshop, and the project continued after I returned to Shenzhen for an event where there happened to be a table football setup to experiment with. The arrangement around the table is fairly straightforward in principle. A contact microphone sits under the playing surface and picks up impacts, spins, and the low continuous rattle the rods make as players move them, while a directional microphone points at the table from a short distance above and captures how each hit moves through the space around it. Both signals feed into Spat Revolution, which treats every ball contact as a moving sound source and places it inside a synthesized sound field that follows the actual position of play in real time.
        </p>

        <p className="body-text">
          What that arrangement produces is a table doing two jobs at once: a foosball match still unfolds in the usual way, while a site-specific sound piece runs alongside it, locked to the geometry of play and following whatever shape the match takes in that moment. A quick score becomes a short musical event, and a long back-and-forth exchange turns into a longer one.
        </p>
        <p className="body-text">
          Due to a tight schedule, video documentation was not captured.
        </p>
        
      </div>

    </DetailPageTemplate>
  )
}
