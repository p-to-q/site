import Image from 'next/image'
import { IconLink } from '@/components/content/icon-link'
import { ArrowIcon } from '@/components/content/icons'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { IconLinkList } from '@/components/primitives/icon-link-list'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Motion Shaper',
  description: 'Motion Shaper - Interactive motion control system for audio and visual performance',
})

export default function MotionShaper() {
  return (
    <DetailPageTemplate
      title="Motion Shaper"
      date="Sep '25"
      actions={
        <IconLinkList>
          <li>
            <IconLink href="/resources/files/MaxPDCon2025_MotionShaper_XuSun.pdf" icon={<ArrowIcon />} external aria-label="View PdMaxCon 2025 Paper PDF">
              PdMaxCon~ 2025 Paper
            </IconLink>
          </li>
          <li>
            <IconLink href="https://morphosynch.vercel.app/" icon={<ArrowIcon />} external aria-label="Live Demo">
              Live Demo
            </IconLink>
          </li>
        </IconLinkList>
      }
      backHref="/"
      backLabel="back to projects"
      hero={
        <div className="overflow-hidden">
          <Image
            src="/resources/pictures/projects/motion-shaper/ms_1.jpeg"
            alt="Motion Shaper"
            width={800}
            height={600}
            sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <p className="caption-text mt-2 whitespace-nowrap">
            Image Credit: Smalley, Dennis. “Spectromorphology: Explaining Sound-Shapes.”
          </p>
        </div>
      }
    >
      <div className="prose prose-invert max-w-none">
        <p className="body-text">
          Motion Shaper is a cross-platform system for sound synthesis and visual parameter control, built with Chenghao Xu, and the question that started the project was fairly simple. When sound and image move together in a piece, what is actually connecting them? Most of the approaches we tried early on fell into two shallow camps. Either we mapped one parameter to another, so that an amplitude envelope pushed the brightness of an image and that was the extent of the relationship, or we lined things up on a beat and called the synchronization done. In both cases, the sound and the image were only connected at the surface.
        </p>
        <p className="body-text">
          We went back to spectro-morphology theory for something deeper, and in particular to Dennis Smalley&apos;s writing on sound-shapes. The idea we took from it is that sound carries internal arcs and gestures that exist above any specific timbre, and if those arcs are real, they ought to sit at a layer above both the audio and the visuals, with each of them responding to the same underlying shape.
        </p>
        <p className="body-text">
          In the system, this takes the form of a hierarchical motion envelope with nested sub-envelopes. At any given point in a piece, a top-level envelope might be driving the spectral centroid of a drone, while a nested sub-envelope inside it is driving the orbit of a camera around an object in the scene. The overall arc of the piece stays coherent because everything hangs off the same tree of envelopes, while the individual layers stay free to drift away from each other in the local detail.
        </p>
        <p className="body-text">
          The result is that writing a piece in Motion Shaper starts with sculpting a single shape, and then letting the sound and the image each find their own way through it.
        </p>
      </div>

    </DetailPageTemplate>
  )
}
