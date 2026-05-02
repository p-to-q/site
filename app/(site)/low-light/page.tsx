import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Low Light',
  description: 'Modular + Ableton live',
})

export default function LowLight() {
  return (
    <DetailPageTemplate
      title="Low Light"
      date="Aug '25"
      backHref="/"
      backLabel="back to sounds"
      hero={
        <div className="overflow-hidden">
          <video
            src="/resources/videos/low-light.mp4"
            controls
            preload="auto"
            playsInline
            className="w-full h-auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      }
    >
      <div className="prose prose-invert max-w-none">
        <p className="body-text">
          A piece with modular synthesizer live set and Ableton Live
        </p>
      </div>
    </DetailPageTemplate>
  )
}
