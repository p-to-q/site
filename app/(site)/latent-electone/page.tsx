import Image from 'next/image'
import { IconLink } from '@/components/content/icon-link'
import { ArrowIcon } from '@/components/content/icons'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { IconLinkList } from '@/components/primitives/icon-link-list'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Latent Electone',
  description:
    'Latent Electone — rebuilding vintage Electone textures with a RAVE v2 model, toward a playable plugin.',
})

export default function LatentElectone() {
  return (
    <DetailPageTemplate
      title="Latent Electone"
      date="Nov '25"
      actions={
        <IconLinkList className="mt-8">
          <li>
            <IconLink href="/resources/files/Vintage_Electone_Textures_with_RAVE.pdf" icon={<ArrowIcon />} external aria-label="View training report PDF">
              Training report
            </IconLink>
          </li>
        </IconLinkList>
      }
      backHref="/"
      backLabel="back to projects"
      hero={
        <div>
          <Image
            src="/resources/pictures/projects/latent_electone/Shigeo%20Sekito%20Electone.jpg"
            alt="Latent Electone"
            width={800}
            height={600}
            sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <p className="caption-text mt-2">Image Credit: Shigeo Sekito</p>
        </div>
      }
    >
      <div className="prose prose-invert max-w-none">
        <p className="body-text">
          This project started from a single Electone recording that a friend sent me. An Electone, for context, is a family of 1970s home organs that Yamaha sold as compact consumer instruments, and the recording that made it to me was nothing dramatic, just a short passage, no production around it, no explanation of where it came from. What held my attention was the texture of it, the way the stacked manuals sat against each other, the sharp and slightly unpolished attacks, and the bright edge that stayed on sustained notes, the kind of sound you very rarely hear in modern keyboard patches.
        </p>

        <p className="body-text">
          Before trying anything clever, I spent a while rebuilding it with ordinary synth programming, and the result kept coming out too clean. Three specific things seemed to be missing. The first was the analog chorus running inside those instruments, which gives the whole sound a soft constant motion. The second was envelope behavior, which on old Electones is slightly lazy or slightly early in ways a modern synth engine quietly corrects. The third was harmonic stack imperfection, the small tuning and level differences between drawbar footages that accumulate across a chord and give the stack its particular color.
        </p>

        <p className="body-text">
          At that point I switched to a different approach and trained a compact <span className="normal-case">RAVE</span> v2 model, a real-time neural audio autoencoder, on archival Electone material. Shigeo Sekito&apos;s recordings were the main reference point, and the model learned the joint distribution of all those small imperfections together, so that they stopped needing to be modeled individually and started simply being present in any sound it generated.
        </p>
        <p className="body-text">
          The current version is stable enough to use in a session, and a single parameter lets the player dial in how much drift the model is allowed to introduce. At zero it stays close to a clean rendering, and pushing it up lets the imperfections grow louder, eventually past the point where the original hardware would have stayed.
        </p>
        <p className="body-text">
          I am turning it into a plugin now, for regular session use.
        </p>
      </div>

    </DetailPageTemplate>
  )
}
