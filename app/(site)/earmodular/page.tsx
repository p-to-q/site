import Image from 'next/image'
import Link from 'next/link'
import { DetailPageTemplate } from '@/components/templates/detail-page-template'
import { SITE_IMAGE_SIZES_FULL_WIDTH } from '@/lib/image-sizes'
import { pageMeta } from '@/lib/page-metadata'

export const metadata = pageMeta({
  title: 'Ear Modular',
  description: 'Ear Modular - Eurorack module design and manufacturing',
})

export default function EarModular() {
  return (
    <DetailPageTemplate
      title="Ear Modular"
      date="Since '23"
      hero={
        <div className="space-y-8 max-w-xl mx-auto">
          <div>
            <div className="group transition-all duration-300 relative overflow-hidden">
              <Link
                href="https://www.earmodular.com/windstring"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <Image
                  src="/resources/pictures/projects/earmodular/framed/Windstring%20%2B%20Paperbird.png"
                  alt="Windstring + Paperbird"
                  width={800}
                  height={600}
                  sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>

          <div>
            <div className="group transition-all duration-300 relative overflow-hidden">
              <Link
                href="https://www.earmodular.com/%E5%89%AF%E6%9C%AC-solar-sound-card-1"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <Image
                  src="/resources/pictures/projects/earmodular/framed/The%20End%20of%20Fall%20FigJam.png"
                  alt="The End of Fall"
                  width={800}
                  height={600}
                  sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>

          <div>
            <div className="group transition-all duration-300 relative overflow-hidden">
              <Link
                href="https://www.earmodular.com/%E5%89%AF%E6%9C%AC-solar-sound-card"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <Image
                  src="/resources/pictures/projects/earmodular/framed/Solar%20Cards.png"
                  alt="Solar Cards"
                  width={800}
                  height={600}
                  sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ transformOrigin: 'top center' }}
                  loading="lazy"
                />
              </Link>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="group transition-all duration-300 relative overflow-hidden">
                  <Image
                    src="/resources/pictures/projects/earmodular/superbooth.jpg"
                    alt="Superbooth 2025"
                    width={400}
                    height={256}
                    sizes="(max-width:639px) calc(100vw - 3rem), (max-width:1279px) 45vw, 400px"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <div className="group transition-all duration-300 relative overflow-hidden">
                  <Image
                    src="/resources/pictures/projects/earmodular/modularcommune.jpg"
                    alt="ModularCommune 2024"
                    width={400}
                    height={256}
                    sizes="(max-width:639px) calc(100vw - 3rem), (max-width:1279px) 45vw, 400px"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="group transition-all duration-300 relative overflow-hidden">
              <Link
                href="https://www.earmodular.com/wildstream"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <Image
                  src="/resources/pictures/projects/earmodular/framed/Wildstream.png"
                  alt="Wildstream"
                  width={800}
                  height={600}
                  sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>

          <div>
            <div className="group transition-all duration-300 relative overflow-hidden">
              <Link
                href="https://www.earmodular.com/%E5%89%AF%E6%9C%AC-zener-click"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <Image
                  src="/resources/pictures/projects/earmodular/framed/Lyra%20FigJam.png"
                  alt="Lyra Adapter"
                  width={800}
                  height={600}
                  sizes={SITE_IMAGE_SIZES_FULL_WIDTH}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </div>
      }
    >
      <div className="prose prose-invert max-w-xl mx-auto mb-8">
        <p className="body-text">
          Independent modular synthesizer and instrument brand, since &apos;23.
        </p>
        <p className="body-text">
          Ear Modular started in 2023, and it came out of a frustration I kept running into while building synths on my own. Everything I made sounded too clean and too solved, as though the interesting parts of the sound had already been smoothed away before I got to play with them. What I wanted was something different, an instrument where small mistakes still made it through, and where turning a knob could take me somewhere I had not planned to go.
        </p>
        <p className="body-text">
          The work since has been about leaving room for those accidents and letting noise and instability act as working material. A patch on one of the modules tends to behave like an ongoing experiment, in the sense that you move something, the instrument answers back, and every so often the answer catches you off guard, which is usually the point where a session starts to get interesting.
        </p>
        <p className="body-text">
          Because a lot of the development has happened in collaboration with visual designers, the modules have quietly drifted toward being objects as much as instruments. I find myself thinking about how a module feels in the hand, about what a panel layout suggests before anything has been plugged in, and about what the thing looks like sitting on a shelf with nothing running on it. Polish, where it happens at all, tends to arrive on its own time.
        </p>
        <p className="body-text">
          Several of these pieces have been shown at sound art exhibitions and live events, where audiences could actually put their hands on the hardware, and watching strangers find their way into a module has been the most useful feedback I have gotten so far. It has taught me where the feel of a module carries as much weight as its sound, and where I had quietly assumed a player would know something they had no reason to know.
        </p>
        <p className="body-text">
          Zener Click is a small example of how this tends to go in practice. The module takes the reverse-biased noise of a Zener diode and uses it directly as its sound source. That noise is the sort of thing most circuits treat as a problem to suppress, and here it becomes the entire signal.
        </p>
        <p className="body-text">
          Continuously updating.
        </p>
      </div>
    </DetailPageTemplate>
  )
}

