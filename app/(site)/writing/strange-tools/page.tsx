import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from '@/components/content/external-link'
import { SiteDivider } from '@/components/layout/site-divider'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteQedFooter } from '@/components/layout/site-sticky-qed-page'
import { WritingNav } from './writing-nav'

export const metadata: Metadata = {
  title: 'Strange Tools',
  description: 'Tools whose strangeness continues to pay rent.',
  alternates: { canonical: '/writing/strange-tools' },
  openGraph: {
    title: 'Strange Tools',
    description: 'Tools whose strangeness continues to pay rent.',
    url: '/writing/strange-tools',
    images: [{ url: '/og?title=Strange+Tools', width: 1200, height: 630, alt: 'Strange Tools — [p → q]' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strange Tools',
    description: 'Tools whose strangeness continues to pay rent.',
    images: ['/og?title=Strange+Tools'],
  },
}

/* ── Right-margin SVG illustrations ── */

function MarginFigure({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <aside className={`writing-margin-figure ${className}`} aria-hidden="true">
      {children}
    </aside>
  )
}

function MarginFigureWithCaption({ children, caption, href, className = '' }: { children: React.ReactNode; caption?: string; href?: string; className?: string }) {
  return (
    <aside className={`writing-margin-figure writing-margin-figure--captioned ${className}`} aria-hidden="true">
      {children}
      {caption && (
        <p className="writing-margin-caption">
          {href ? <a href={href} target="_blank" rel="noopener noreferrer" className="writing-margin-caption__link">{caption}</a> : caption}
        </p>
      )}
    </aside>
  )
}

function KettleSvg() {
  return (
    <svg width="56" height="68" viewBox="0 0 56 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 14 L12 54 L44 54 L40 14 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      <line x1="13" y1="57" x2="43" y2="57" stroke="currentColor" strokeWidth="1.2" />
      <line x1="12" y1="54" x2="13" y2="57" stroke="currentColor" strokeWidth="1.2" />
      <line x1="44" y1="54" x2="43" y2="57" stroke="currentColor" strokeWidth="1.2" />
      <path d="M20 14 L20 8 C20 2, 8 2, 8 8 L8 30 C8 38, 13 38, 17 34" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M39 24 L48 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function BracketSvg() {
  return (
    <svg width="48" height="80" viewBox="0 0 48 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4C10 4 6 10 6 20V36C6 40 4 44 2 44C4 44 6 48 6 52V68C6 78 10 76 16 76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M32 4C38 4 42 10 42 20V36C42 40 44 44 46 44C44 44 42 48 42 52V68C42 78 38 76 32 76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function ArrowSvg() {
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="16" x2="52" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="48,8 56,16 48,24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}


function FieldGuideSvg() {
  return (
    <svg width="40" height="56" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="28" height="48" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="12" y1="4" x2="12" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="14" x2="30" y2="14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M20 36C22 34 26 34 28 36" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="38" r="1" fill="currentColor" />
    </svg>
  )
}

function FourDotsSvg() {
  return (
    <svg width="32" height="80" viewBox="0 0 32 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="52" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="72" r="4" fill="currentColor" />
    </svg>
  )
}

function TwoByTwoSvg() {
  const f = 'CamingoMono, monospace'
  // Outer frame: 4,4 → 156,156. Dividers at x=80, y=80 (edge to edge).
  // Quadrant centres: Q1=(42,42) Q2=(118,42) Q3=(42,118) Q4=(118,118)
  return (
    <svg width="200" height="200" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* Outer frame */}
      <rect x="4" y="4" width="152" height="152" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

      {/* Highlight: strange tools quadrant (top-right) */}
      <rect x="80" y="4" width="76" height="76" fill="currentColor" opacity="0.06" />

      {/* Dividers — edge to edge within frame */}
      <line x1="4" y1="80" x2="156" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="80" y1="4" x2="80" y2="156" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />

      {/* Axis labels — each at its own edge, above/beside the divider */}
      <text x="7"   y="76" fontFamily={f} fontSize="5.5" fill="currentColor" opacity="0.32">hidden</text>
      <text x="153" y="76" textAnchor="end" fontFamily={f} fontSize="5.5" fill="currentColor" opacity="0.32">exposed</text>
      <text x="83"  y="14" fontFamily={f} fontSize="5.5" fill="currentColor" opacity="0.32">amplifies</text>
      <text x="83"  y="153" fontFamily={f} fontSize="5.5" fill="currentColor" opacity="0.32">diminishes</text>

      {/* Q1 top-left — good abstraction, muted */}
      <text x="42" y="37" textAnchor="middle" fontFamily={f} fontSize="7.5" fill="currentColor" opacity="0.28">good</text>
      <text x="42" y="48" textAnchor="middle" fontFamily={f} fontSize="7.5" fill="currentColor" opacity="0.28">abstraction</text>

      {/* Q2 top-right — strange tools, primary */}
      <text x="118" y="37" textAnchor="middle" fontFamily={f} fontSize="7.5" fill="currentColor">strange</text>
      <text x="118" y="48" textAnchor="middle" fontFamily={f} fontSize="7.5" fill="currentColor">tools</text>

      {/* Q3 bottom-left — service trap, muted */}
      <text x="42" y="117" textAnchor="middle" fontFamily={f} fontSize="7.5" fill="currentColor" opacity="0.28">service</text>
      <text x="42" y="128" textAnchor="middle" fontFamily={f} fontSize="7.5" fill="currentColor" opacity="0.28">trap</text>

      {/* Q4 bottom-right — hostile complexity, muted */}
      <text x="118" y="117" textAnchor="middle" fontFamily={f} fontSize="7.5" fill="currentColor" opacity="0.28">hostile</text>
      <text x="118" y="128" textAnchor="middle" fontFamily={f} fontSize="7.5" fill="currentColor" opacity="0.28">complexity</text>

    </svg>
  )
}

export default function StrangeToolsPage() {
  return (
    <div className="flex min-h-[calc(100dvh-5.5rem)] flex-col">
      <SiteHeader />

      {/* Left sidebar nav — client component for active-section tracking */}
      <WritingNav />

      <article className="writing-article">

        {/* Title & date */}
        <header className="writing-article__header">
          <h1 className="writing-article__title">Strange Tools</h1>
          <time className="writing-article__date" dateTime="2026-05-18" aria-label="Published May 2026 by Du">
            May 2026 · Du
          </time>
        </header>

        {/* §1 — Opening */}
        <section id="strange" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              I have a weakness for tools that are a little hard to explain.
            </p>
            <p>
              They are usually small, slightly illegible, and easy to make sound less interesting than they are.
              A{' '}
              <ExternalLink href="https://us.alessi.com/products/toru-electric-kettle">bottle</ExternalLink>.
              A{' '}
              <ExternalLink href="https://www.are.na/">notebook system</ExternalLink>.
              A{' '}
              <ExternalLink href="https://github.com/strukto-ai/mirage">command line program</ExternalLink>
              {' '}that looks unfriendly until you realize it lets you think in a different shape.
              A{' '}
              <ExternalLink href="https://en.wikipedia.org/wiki/Field_guide">field guide</ExternalLink>.
              A{' '}
              <ExternalLink href="https://www.youtube.com/watch?v=OaPty24UA_E">musical instrument</ExternalLink>.
              A{' '}
              <ExternalLink href="https://karpathy.github.io/2026/02/12/microgpt/">piece of algorithm</ExternalLink>
              {' '}a few hundred people love in a way that is hard to summarize.
            </p>
            <p>
              For a while, I called these &ldquo;niche tools&rdquo;. The word was partly true and partly lazy.{' '}
              &ldquo;Niche&rdquo; describes the size of an audience without saying much about the quality of the need.
              A tool can be niche because almost nobody wants it.
              It can also be niche because the people who want it have not yet learned how to explain what it gives them.
            </p>
            <p>
              &ldquo;Strange&rdquo; feels more useful.
            </p>
          </div>
          <MarginFigureWithCaption
            caption="Alessi® Toru Electric Kettle"
            href="https://us.alessi.com/products/toru-electric-kettle"
            className="writing-margin-figure--top"
          >
            <KettleSvg />
          </MarginFigureWithCaption>
        </section>

        {/* §2 — Pragmatic strangeness */}
        <section id="strangeness" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              The tools I trust tend to have a specific kind of <em>pragmatic strangeness</em>.
              They are not strange because they are obscure, hostile, or decorative.
              They are strange because they refuse the default mold of usefulness while remaining deeply practical about the thing they care about.
            </p>
            <p>
              They are not hard to explain because they are complicated.
              Complicated tools are often very easy to explain: they save time, automate a workflow, replace a person, reduce some cost.
              The hard ones are usually simpler than that.
              Their usefulness is not fully captured by features or convenience.
            </p>
            <p>
              A normal tool is easy to evaluate. Does it save time? Does it remove friction? Does it make a workflow smoother?
              These are good questions, but some tools have the potential to change the person using them.
              They make the user better at noticing, judging, repairing, listening, naming, or staying close to a material.
            </p>
            <p className="writing-article__pullquote">
              Sometimes power is the wrong measure. A tool can be powerful and still make its user smaller. A tool can be limited and still enlarge the person using it.
            </p>
          </div>
          <MarginFigure>
            <p className="writing-margin-chinese">
              「夫器无好恶，利害在人。太阿倒持，授人鳟柄；白旄黄钺，奄有四方。观此物之用，实进学之媒，虽有博戏之法，亦为小休之娱。」
            </p>
          </MarginFigure>
        </section>

        {/* §3 — Services vs. judgment */}
        <section id="judgment" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              This feels especially important now, when the easiest tools to build are services that collapse intention into result.{' '}
              <span className="whitespace-nowrap">ask <span className="arr">→</span> receive <span className="arr">→</span> approve <span className="arr">→</span> ship.</span>{' '}
              That is truly useful when the work is dull.
              But if every tool becomes a service, we lose some of the places where <em>discernment</em> forms.
            </p>
            <p>
              A strange tool keeps some of that place open.
              It helps, but it does not flatter.
              It gives you something to do, something to learn, and enough surface area for <ExternalLink href="https://paulgraham.com/taste.html"><em>taste</em></ExternalLink> to develop.
            </p>
            <p className="writing-article__pullquote">
              The best strange tools are not hard to use because difficulty is a virtue. They are strange because they are still in contact with the material that made them necessary.
            </p>
          </div>
          <MarginFigureWithCaption
            caption="Dynamicland — a humane dynamic medium where the physical room itself acts as the computer"
            href="https://dynamicland.org/2024/The_communal_science_lab.pdf"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dynamicland-illustration.png"
              alt="Illustration of Dynamicland's communal science lab — people working together in a room where computation is embedded in physical space"
              className="writing-margin-photo"
            />
          </MarginFigureWithCaption>
        </section>

        {/* §4 — Builder purpose */}
        <section id="builder" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              This is where <em>builder purpose</em> matters more than user demand.
              Users can often tell you where an existing tool hurts.
              They are less reliable at describing the tool that would let a different version of themselves exist.
              The builder has to carry <ExternalLink href="https://farmerandfarmer.org/mastery/builder.html">some view of the world that has not yet been fully requested</ExternalLink>.
            </p>
            <p>
              A{' '}
              <ExternalLink href="https://en.wikipedia.org/wiki/Field_guide">field guide</ExternalLink>
              {' '}is one of my favorite examples.
              It is not a frictionless birding experience.
              It does not identify everything for you, produce the bird, or remove the walk.
              It gives you enough names, shapes, and differences to become better at looking.
              You still have to go outside. You still have to wait.
              You still have to mistake one thing for another until your eye learns the difference.
            </p>
            <p className="writing-article__pullquote">
              The tool works because the world is still doing some of the teaching.
            </p>
            <p className="writing-article__pullquote">
              The strange tools I trust usually have four qualities.
            </p>
          </div>
          <MarginFigure>
            <FieldGuideSvg />
          </MarginFigure>
        </section>

        {/* §5 — Four qualities */}
        <section id="four-qualities" className="writing-article__section">
          <div className="writing-article__body">
            <ul className="writing-article__qualities">
              <li>
                They make one hidden layer visible (not ten, one).
                A field guide makes small differences visible.
                A command line makes some of the machine&#39;s grammar visible.
                A <ExternalLink href="https://github.com/p-to-q/carburetor">refueled phone</ExternalLink> makes energy visible.
                A receipt-bearing file system makes provenance visible.
              </li>
              <li>
                They ask for <em>participation</em> without romanticizing difficulty.
                The user still has to look, listen, steer, or decide.
                The friction is not there to punish them.
                It is there because removing it would remove the learning.
              </li>
              <li>
                They <em>nourish</em> what they depend on.
                A good instrument makes better listeners and players.
                A good open-source tool makes future maintainers more possible.
                A good creative tool does not only extract output from a person; it leaves ability behind.
              </li>
              <li>
                They become clearer without becoming less themselves.
                Early illegibility can be shelter, but it should not become identity.
                The object should accumulate evidence — after enough contact, the right people usually know why they matter.
              </li>
            </ul>
          </div>
          <MarginFigure>
            <FourDotsSvg />
          </MarginFigure>
        </section>

        {/* §6 — The middle */}
        <section id="middle" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              This is what I look for now: not tools that are weird on first contact, but tools whose strangeness continues to pay rent.
              Tools that make a few people <em>more capable</em>.
              Tools that reveal the builder&#39;s purpose without closing the door to other people.
              Tools with enough texture to be learned, modified, and cared for.
            </p>
            <p>
              For creative and technical work, <em>the middle</em> often matters.
              You need room to inspect, steer, repair, doubt, and develop taste.
              A tool that hides too much of the middle may be efficient, but it may also leave the person less able to judge what happened.
            </p>
            <p>
              A strange tool keeps some of the middle alive.
              It does not make everything difficult. It preserves that kind of contact.
            </p>
            <p>
              This is the part that gets lost when every interface tries to become frictionless.
              Removing friction is useful when friction is accidental.
              It is not useful when the friction is carrying information.
              Some tools should expose enough structure for the user to form judgment.
            </p>
            <p>
              Not because difficulty is virtue. Not because old tools were better.
              Because some part of making should still make the maker <em>more capable</em>.
            </p>
            <p className="writing-article__pullquote">
              A strange tool leaves you more able to begin.
            </p>
          </div>
          <MarginFigure className="writing-margin-figure--diagram">
            <TwoByTwoSvg />
          </MarginFigure>
        </section>

        {/* §7 — p-to-q coda */}
        <section id="coda" className="writing-article__section writing-article__coda">
          <MarginFigureWithCaption
            caption="Notion, 2013 (reconstructed)"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/notion-flint-2013.png"
              alt="A flint hand-axe beside the McLuhan quote — We shape our tools, and thereafter our tools will shape us"
              className="writing-margin-photo writing-margin-photo--blend"
            />
          </MarginFigureWithCaption>
          <div className="writing-article__body">
            <p>
              That is the kind of work we want{' '}
              <ExternalLink href="https://github.com/p-to-q">[p → q]</ExternalLink>
              {' '}to make room for: small, rigorous, uncertain artifacts that find something modern tools have hidden too well and bring it back to the surface.
            </p>
            <p>
              The hope is not to make everything stranger.
              It is to give a small amount of room to the things modern technology has made too easy to miss, and to treat them with enough seriousness that their strangeness can do real work.
            </p>
            <p className="writing-article__signoff--divider">—</p>
            <p className="writing-article__signoff">
              This is our first piece of <Link href="/writing">Writing</Link>.<br />
              Some of the strange tools we built live in{' '}
              <Link href="/work">Work</Link>.
            </p>
          </div>
        </section>

      </article>

      <div className="min-h-0 w-full flex-1" aria-hidden="true" />
      <SiteDivider />
      <SiteQedFooter />
    </div>
  )
}
