import type { Metadata } from 'next'
import { SiteStickyQedPage } from '@/components/layout/site-sticky-qed-page'
import { LanguageSwitch } from './language-switch'
import './alternative.css'

const DESCRIPTION =
  'An independent research practice concerned with the path between AI, tools, and the real world.'

export const metadata: Metadata = {
  title: 'Commercial Bio',
  description: DESCRIPTION,
  alternates: {
    canonical: '/commercial-bio',
  },
  openGraph: {
    title: 'Commercial Bio',
    description: DESCRIPTION,
    url: '/commercial-bio',
    images: [
      {
        url: '/og?title=Commercial+Bio',
        width: 1200,
        height: 630,
        alt: 'Commercial Bio — [p → q]',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Bio',
    description: DESCRIPTION,
    images: ['/og?title=Commercial+Bio'],
  },
}

export default function CommercialBioPage() {
  return (
    <SiteStickyQedPage>
      <h1 className="sr-only">Commercial Bio</h1>
      <section className="commercial-bio flex flex-col gap-3">
        <LanguageSwitch
          en={
            <>
              <p className="body-text">
                [p → q] is an independent research practice concerned with the path between AI,
                tools, and the real world. We do research, and we make products. We build serious
                foundational tools, as well as playful little things that may not be useful yet, or
                at all. Some of them solve practical problems; others exist simply because of
                curiosity. Holding them together is way of our working: not rushing to define
                ourselves, not in hurry to grow up. Along the way, we try to find things modern
                technology has hidden from view, and let them return in a form that is both absurd
                and sacred.
              </p>
              <p className="body-text">
                We are drawn to high aesthetics, high discipline, and high uncertainty, using small
                projects to shelter large questions at the right scale. We have built a modality
                harness for text-first LLMs, a phone you refuel, a software in menubar that
                occasionally farts to clear dust, a physical sorting algorithm, an agent
                lifeRestarter, an app turns hum into songs, and orbital sequencer for low-res
                earth.
              </p>
              <p className="body-text">
                Our tools have gained unprecedented generative power yet an unprecedented shortage
                of judgment. We place more faith in continuous making, precise feel, and long gaze
                at those problems. Through these small acts of technical culture, we hope to resist
                the cheap renaissance now underway: close enough to its flame, while keeping some
                distance from its froth.
              </p>
            </>
          }
          zh={
            <>
              <p className="body-text">
                一间独立工作室，关注 AI、工具和现实世界之间的中间路径。我们做研究，也做产品，做认真的基础工具，也做一些好玩的、没什么用的东西。有些解决实际问题，有些纯粹因为好奇而存在，放在一起是我们做事的方式：不急着下定义，不急着长大，做完一件再做下一件。然后找到一些被现代技术隐藏掉的东西，让它荒诞而严肃地重新出现。
              </p>
              <p className="body-text">
                我们钟意高审美、高自律、高不确定性的事物，用小项目恰当地保护一些大问题。造过的有多模态输出能力的纯文本大模型，充汽油的手机，偶尔放屁清灰的电脑软件，物理排序算法，Agent 走过一生的模拟器，把哼唱变成歌的工具，还有把卫星轨道变成声音的乐器。
              </p>
              <p className="body-text">
                今天的技术社会拥有前所未有的生成能力，却前所未有地缺乏判断力。我们更相信持续的制作、准确的手感和对问题的长期凝视。希望用一些小型文明练习来抵御正在发生的廉价文艺复兴：足够靠近它的火焰，也和它的泡沫保持一点距离。
              </p>
            </>
          }
        />
      </section>
    </SiteStickyQedPage>
  )
}