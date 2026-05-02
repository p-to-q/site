import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Capricho Árabe',
  description:
    'Capricho Árabe — a solo classical guitar piece by Francisco Tárrega. Track by Yiming Sun.',
})

export default function CaprichoArabe() {
  return (
    <DetailPageTemplate
      title="Capricho Árabe"
      date="Oct '25"
      backHref="/"
      backLabel="back to sounds"
      hero={
        <div className="overflow-hidden">
          <video
            src="/resources/videos/capricho-arabe.mp4"
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
      <div className="space-y-8">
        <div className="prose prose-invert max-w-none">
          <p className="body-text">
            A solo classical guitar piece by Francisco Tárrega
          </p>
          <p className="body-text">
            A humble offering from an amateur classical guitarist. Tárrega deserves better, but here we are.
          </p>
        </div>
      </div>
    </DetailPageTemplate>
  )
}
