import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from '@/components/content/external-link'
import { SiteDivider } from '@/components/layout/site-divider'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteQedFooter } from '@/components/layout/site-sticky-qed-page'
import { WritingNav } from './writing-nav'
import { ForestPhotoCarousel } from './forest-photo-carousel'

export const metadata: Metadata = {
  title: 'The Forest and the Interface',
  description: 'A forest has an interface that is not user-friendly.',
  alternates: { canonical: '/writing/the-forest-and-the-interface' },
  openGraph: {
    title: 'The Forest and the Interface',
    description: 'A forest has an interface that is not user-friendly.',
    url: '/writing/the-forest-and-the-interface',
    images: [{ url: '/og?title=The+Forest+and+the+Interface', width: 1200, height: 630, alt: 'The Forest and the Interface — [p → q]' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Forest and the Interface',
    description: 'A forest has an interface that is not user-friendly.',
    images: ['/og?title=The+Forest+and+the+Interface'],
  },
}

/* ── Right-margin components ── */

function MarginNote({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <aside className={`writing-margin-note ${className}`}>
      {children}
    </aside>
  )
}

function MarginFigure({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <aside className={`writing-margin-figure ${className}`} aria-hidden="true">
      {children}
    </aside>
  )
}

function MarginFigureWithCaption({ children, caption, captionHint, href, className = '' }: { children: React.ReactNode; caption?: React.ReactNode; captionHint?: string; href?: string; className?: string }) {
  return (
    <aside className={`writing-margin-figure writing-margin-figure--captioned ${className}`} aria-hidden="true">
      {children}
      {caption && (
        <p className="writing-margin-caption">
          {href ? <a href={href} target="_blank" rel="noopener noreferrer" className="writing-margin-caption__link">{caption}</a> : caption}
          {captionHint && (
            <span className="writing-margin-caption__hint">
              {captionHint}
              <svg className="writing-margin-caption__hint-icon" width="9" height="12" viewBox="0 0 9 12" fill="none" aria-hidden="true">
                <rect x="1.25" y="0.75" width="6.5" height="10.5" rx="3.25" stroke="currentColor" strokeWidth="0.9" />
                <line x1="4.5" y1="2.25" x2="4.5" y2="4.25" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
              </svg>
            </span>
          )}
        </p>
      )}
    </aside>
  )
}

function MarginLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <ExternalLink href={href}>{children}</ExternalLink>
}

/* ── Right-margin SVG illustrations ── */

function LoopSvg() {
  return (
    <svg width="60" height="70" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 8C14 8 6 16 6 26C6 36 14 44 24 44C34 44 42 36 42 26C42 20 39 14 34 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <polyline points="36,6 34,11 39,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="24" cy="26" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function MapSvg() {
  return (
    <svg width="64" height="48" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="44" height="32" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="16" y1="2" x2="16" y2="34" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
      <line x1="32" y1="2" x2="32" y2="34" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
      <circle cx="36" cy="20" r="2.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="36" cy="20" r="0.8" fill="currentColor" />
    </svg>
  )
}

function PathSvg() {
  return (
    <svg width="42" height="126" viewBox="0 0 32 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4C8 16 24 32 16 48C8 64 24 80 16 92" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="24" r="1.2" fill="currentColor" opacity="0.25" />
      <circle cx="20" cy="56" r="1.2" fill="currentColor" opacity="0.25" />
      <circle cx="14" cy="76" r="1.2" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

function TreeLineSvg() {
  return (
    <svg width="128" height="80" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="36" x2="64" y2="36" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
      <line x1="8" y1="36" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="36" x2="17" y2="19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="25" y1="36" x2="25" y2="23" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
      <line x1="32" y1="36" x2="32" y2="27" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="38" y1="36" x2="38" y2="30" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
      <line x1="43" y1="36" x2="43" y2="32" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.25" />
    </svg>
  )
}

function RootsSvg() {
  return (
    <svg width="72" height="80" viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trees above ground */}
      <line x1="16" y1="28" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="28" x2="36" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="56" y1="28" x2="56" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Canopy hints */}
      <path d="M12 10C14 6 18 6 20 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M32 14C34 10 38 10 40 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M52 8C54 4 58 4 60 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Ground line */}
      <line x1="2" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Root connections below ground */}
      <path d="M16 30C16 46 36 46 36 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M36 30C36 52 56 52 56 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M16 30C16 58 56 58 56 30" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />
      {/* Fungi nodes */}
      <circle cx="26" cy="40" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="46" cy="44" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="36" cy="52" r="1.5" fill="currentColor" opacity="0.35" />
      {/* Deep root tendrils */}
      <line x1="26" y1="42" x2="22" y2="56" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
      <line x1="46" y1="46" x2="50" y2="60" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

function GrugIcon() {
  return (
    <ExternalLink href="https://www.grug.so/" className="writing-margin-app-icon" aria-label="Open grug">
      <img src="/resources/pictures/forest-interface/grug-logo-transparent.png" alt="" width="82" height="36" loading="lazy" />
    </ExternalLink>
  )
}

export default function ForestInterfacePage() {
  return (
    <div className="flex min-h-[calc(100dvh-5.5rem)] flex-col">
      <SiteHeader />

      <WritingNav />

      <article className="writing-article">

        {/* Title & date */}
        <header className="writing-article__header">
          <h1 className="writing-article__title">The Forest and the Interface</h1>
          <time className="writing-article__date" dateTime="2026-06" aria-label="Published June 2026 by Du, Sym, sharpened with Claude Opus 4.6">
            June 2026 · Du, Sym, sharpened with Claude Opus 4.6
          </time>
        </header>

        {/* §1 — Photos */}
        <section id="photos" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              I have a small folder of forest photos that I keep coming back to.
            </p>

            <ForestPhotoCarousel />

            <p>
              They are not especially good photographs. Some are blurry, taken too quickly while walking or riding past something I did not have time to understand. A few are from places meant to be visited: paths, signs, families moving slowly through a weekend. Others are from the edges of cities, where the green looks less like a destination and more like something that stayed behind.
            </p>
            <p>
              I keep them anyway. I liked them all.
            </p>
            <p>
              I like all of these versions because they were mixed with ordinary life and still <em>not fully absorbed by it</em>. That is the feeling I keep returning to. A forest can be public, managed, interrupted, full of signs of use, and still refuse to become completely explainable. <em>It lets you enter, but it does not make itself small for you.</em> You can follow the path and still not know what you are looking at.
            </p>
            <p>
              I can tell when a place makes me quieter, but I cannot always tell why. At first everything is too general. Trees. Ground. Water. Green. Then, if I stay long enough, the place begins to separate. I notice the lake before the ground that leads to it. I notice the light before the shapes it makes.
            </p>
            <p>
              My first attention is usually lazy. Maybe the forest is correcting me.<br />
              Nothing has happened, exactly, <em>but the world has become less flat</em>.
            </p>
          </div>
        </section>

        {/* §2 — Semi-structured */}
        <section id="semi-structured" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              I think this is what I like most about forests. Not that they are wild, or pure, or outside human life. Most of the forests I know are not. They have signs, paths, bikes, benches, fences, histories of use and management. They are already mixed with us.
            </p>
            <p className="writing-article__pullquote">
              The world we actually live in is semi-structured. Half designed, half not. Half planned, half grown. Half interface, half weather.
            </p>
            <p>
              This is <ExternalLink href="https://www.nps.gov/subjects/hfc/waysides.htm">interpretation</ExternalLink> at its gentlest, and it is not always bad. The point is not that forest is natural and interface is artificial. That distinction is too easy and mostly unhelpful.
            </p>
            <p>
              <em>The better distinction is between systems that hold the world open and systems that close it too quickly.</em>
            </p>
          </div>
          <MarginFigure>
            <p className="writing-margin-chinese">
              「天地有大美而不言，四时有明法而不议，万物有成理而不说。」
            </p>
          </MarginFigure>
        </section>

        {/* §3 — Generous */}
        <section id="generous" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              The forest does not ask me to do anything with my attention right away. It does not reward me for returning, or punish me for misunderstanding, or turn my walk into evidence of itself. It is not generous in the way a good service is generous. It is generous in the way a place can be generous: by allowing me to arrive before I know what I am doing there.
            </p>
            <p>
              For a while, that is enough.
            </p>
            <p>
              The world keeps asking you to respond. The forest does not ask so much. It gives you more than enough to notice, but <em>less pressure to turn noticing into action</em>.
            </p>
            <p className="writing-article__pullquote">
              I find that generous.
            </p>
            <p>
              When I look at the photos now, I do not think first about nature. I think about this feeling of being gently made less competent.
            </p>
            <p>
              The pace drops first. Not in a noble way. More like the mind has fewer handles for what to do next. In a city, even when I am lost, I still know the general grammar of the place. Cross here. Wait there. Enter. Pay. Scan. Sit. Leave. In a forest, even a very managed one, the grammar becomes less obvious. A path may be clear, but the place around the path is not explaining itself.
            </p>
            <p>
              They let you enter without becoming fully available. They offer enough to begin, but not enough to feel finished. They do not rush to turn themselves into an experience. If you want more from them, you have to become a little <em>more specific</em>.
            </p>
          </div>
        </section>

        {/* §4 — User-friendly */}
        <section id="user-friendly" className="writing-article__section">
          <div className="writing-article__body">
            <p className="writing-article__pullquote">
              A forest has an interface that is not user-friendly.
            </p>
            <p>
              I was thinking about this because <ExternalLink href="https://ux.stackexchange.com/questions/34051/is-user-friendly-a-valid-term-in-user-experience"><em>user-friendly</em></ExternalLink> is such a polite phrase. In software it usually means the tool has done some work before you arrive. It has guessed what you probably want. It has removed some choices, softened some edges, and made the next action obvious.
            </p>
            <p>
              Most of the time, this is good. A good form should not make you suffer. A map should help. A button should look like a button. Nobody wants a clever checkout page.
            </p>
            <p>
              But user-friendly can also become a way of saying: the world has been made smaller for you.
            </p>
            <p>
              A forest does not do this. It does not arrange itself around your task. It does not care whether you are trying to get somewhere quickly. Still, it is full of <ExternalLink href="https://cs.brown.edu/courses/cs137/2017/readings/Gibson-AFF.pdf">information for action</ExternalLink>. A path is worn into the ground. Mud keeps a record of the last rain. Light changes where the trees thin out. Moss grows more easily in some places than others. A fallen branch tells you something happened here, even if you do not know what.
            </p>
            <p>
              None of this is hidden. It just has <em>not been formatted as instructions</em>.
            </p>
            <p>
              That is the part I like.
            </p>
            <p>
              A lot of interface design is about reducing the amount a person has to notice. The interface decides what matters, then presents that part cleanly. This is a real skill. It is also a little dangerous, because after enough of it, you can forget that the clean version is only a version.
            </p>
            <p className="writing-article__pullquote">
              The map is not the place. The weather icon is not the air. The battery percentage is not energy. The prompt is not the work.
            </p>
          </div>
          <MarginNote>
            <MapSvg />
            <p>
              <MarginLink href="https://en.wikipedia.org/wiki/Map%E2%80%93territory_relation">After Korzybski</MarginLink> (1931). &ldquo;The map is not the territory.&rdquo;
            </p>
          </MarginNote>
        </section>

        {/* §5 — Fitness */}
        <section id="fitness" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              User-friendly often means the system asks less of the person. This is often good. Much of life is already too demanding in useless ways. Bad forms, hostile machines, confusing workflows, ugly bureaucracies — these do not make anyone more alive.
            </p>
            <p>
              But there is another kind of friendliness that does not reduce the world so quickly. It gives a person a way in, then leaves enough contact for perception to develop.
            </p>
            <p>
              A forest is not unstructured, but its structure is not built around you. It is full of relations before it is full of tasks. Root, soil, fungus, bird, insect, water, rot, light, season, path, person. Much of what matters is not visible at first contact. Some of it is never visible in the ordinary way. A person entering does not master the system. At best, they become a better participant in a place they do not control.
            </p>
            <p className="writing-article__pause-before">
              This is where the idea of <em>environmental fitness</em> becomes useful.
            </p>
            <p>
              <em>A good interface is not only friendly to the user. It is fit for the environment it enters.</em>
            </p>
            <p>
              Does it fit the attention of the person? Does it fit the material of the place? Does it fit the pace at which understanding should happen? Does it fit the maintenance it requires? Does it fit the forms of life already there?
            </p>
            <p>
              <em>A design can be elegant and still be environmentally wrong.</em> It can make the surface clearer while making the relation poorer. It can make a place more legible while making people less present.
            </p>
            <p className="writing-article__pullquote">
              This matters for interface because an interface is never only a surface. It teaches a posture.
            </p>
            <p>
              Some interfaces teach nothing except where to click next.
            </p>
          </div>
          <MarginNote>
            <p>
              A good interface can act like a <MarginLink href="https://scalar.usc.edu/works/boundary-objects-guide/index">boundary object</MarginLink>: flexible enough for different publics, stable enough to coordinate care.
            </p>
            <p>
              Tim Ingold's <MarginLink href="https://www.livinganthropologically.com/perception-of-the-environment/building-dwelling-living/">dwelling perspective</MarginLink> is useful here: perception is trained by moving through a world, not standing outside it.
            </p>
          </MarginNote>
        </section>

        {/* §6 — The game */}
        <section id="game" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              This is where I start to lose patience with certain interfaces.
            </p>
            <p>
              Not because interfaces are bad. A map can save you. A sign can prevent damage. A good path can protect both the visitor and the place. Interface is not the enemy of presence.
            </p>
            <p>
              The problem is the small assumption that the best interface is the one that makes an experience more legible, more actionable, and more repeatable.
            </p>
            <p className="writing-article__pullquote">
              This assumption often ends in something like a game.
            </p>
            <p>
              A game is a beautiful form when it is honest about being one. It draws a boundary around a world and gives that world rules. It makes action meaningful by giving it consequence inside the boundary. It can turn boredom into attention and confusion into play. It is one of the oldest technologies humans have for making behavior feel alive.
            </p>
            <p>
              The trouble begins when that grammar becomes the imagined endpoint for everything: next action, visible progress, reward, return. None of these are inherently terrible. But together they train attention to expect the world to answer in loops.
            </p>
            <p>
              When something becomes too game-shaped, the world inside it starts to become answerable to the loop. The question is no longer &ldquo;what kind of attention does this place deserve?&rdquo; but &ldquo;what action should happen next?&rdquo; The surface becomes more alive, but sometimes the person becomes less present. Attention is routed, not deepened.
            </p>
            <p>
              <em>The forest does not answer this way.</em>
            </p>
          </div>
          <MarginFigure>
            <LoopSvg />
          </MarginFigure>
          <MarginNote className="writing-margin-note--game-note">
            <p>
              <MarginLink href="https://dl.digra.org/index.php/dl/article/download/575/575">Gamification</MarginLink> is the polite term. <MarginLink href="https://bogost.com/writing/blog/gamification_is_bullshit/">Bogost's harsher one</MarginLink> is useful because it keeps the capture motive in view.
            </p>
          </MarginNote>
        </section>

        {/* §7 — Trail */}
        <section id="trail" className="writing-article__section">
          <div className="writing-article__body">
            <p className="writing-article__pullquote">
              A FOREST ROUTES ATTENTION DIFFERENTLY.
            </p>
            <p>
              It does not do this through points or prompts. It does it through changes in ground, light, density, temperature, sound, and repetition. You begin to notice where the path holds water, where the trees thin out, where the air becomes cooler, where something has moved before you arrived. You do not receive feedback in the usual sense. You become slightly more able to read.
            </p>
            <p>
              That difference matters.
            </p>
            <p>
              <em>A trail is not a quest line. A trail is a trace of use.</em> It does not tell you that you are winning. It tells you that others have passed here, and that this might be a way through. <em>It helps without making itself the whole event.</em>
            </p>
            <p>
              A field guide works in a similar way: it gives names and distinctions without replacing the encounter.
            </p>
            <p>
              The interface I trust is designed, but not possessive; structured, but not hungry to become the whole event.
            </p>
            <p>
              A good interface can help a person begin without deciding too much on their behalf. It can leave some uncertainty intact without abandoning them to confusion. It can make the next step possible without making the whole experience about next steps.
            </p>
            <p>
              Software is where this question becomes harder to avoid.
            </p>
            <p>
              But not everything should be optimized for return. Not everything should become a loop. Not every kind of attention improves when it is given a score, a streak, a prompt, or a sense of completion.
            </p>
            <p className="writing-article__pullquote">
              Some things should leave us more present than captured.
            </p>
          </div>
          <MarginFigure>
            <PathSvg />
          </MarginFigure>
        </section>

        {/* §8 — Layers */}
        <section id="layers" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              It comes from being able to enter something without exhausting it.
            </p>
            <p>
              This is different from obscurity. The forest is not hiding in a clever way. It is not trying to be difficult. It simply has more layers than my first attention can hold.
            </p>
            <p>
              A tree is not only a tree. It is shade, habitat, age, water memory, fungal relation, soil work, carbon, damage, shelter, food, rot, future ground. A path is not only a path. It is habit, maintenance, erosion, permission, repeated bodies, convenience, compromise. A clearing is not only open space. It is light, disturbance, chance, edge, new growth.
            </p>
            <p>
              This is where the &ldquo;<ExternalLink href="https://en.wikipedia.org/wiki/Mycorrhizal_network">Wood-Wide Web</ExternalLink>&rdquo; is useful to think with, even if the metaphor should be <ExternalLink href="https://www.nature.com/articles/s41559-023-01986-1">handled carefully</ExternalLink>. The phrase makes visible a hidden layer: trees, roots, fungi, soil, exchange, dependency, competition, signaling, decay. It reminds us that a forest is not only what stands above the ground. It is also a set of relations below visibility.
            </p>
            <p>
              I do not need the forest to become a perfect internet metaphor. I almost prefer that it does not. The point is not that trees are secretly people, or that roots are cables, or that fungi are moral infrastructure. The point is that the forest is a multi-layered relational system, and the visible interface is only the beginning.
            </p>
            <p>
              That is what I keep coming back to. The forest does not refuse interface. It is full of interfaces: paths, signs, maps, seasons, edges, habits, warnings, names. But it resists becoming <em>only</em> interface. It remains more than the systems that help us enter it.
            </p>
            <p>
              A person can spend time there without being asked to win.
            </p>
            <p>
              That is rarer than it sounds.
            </p>
          </div>
          <MarginNote className="writing-margin-note--roots">
            <RootsSvg />
            <p>
              <MarginLink href="https://www.ted.com/talks/suzanne_simard_how_trees_talk_to_each_other">Suzanne Simard</MarginLink> — mycorrhizal networks and the intelligence of forests.
            </p>
            <p>
              The good version of the Wood-Wide Web is not &ldquo;trees are people.&rdquo; It is stranger: <MarginLink href="https://www.nature.com/articles/41557">carbon transfer</MarginLink>, fungal mediation, competition, kinship claims, and enough uncertainty that <MarginLink href="https://www.nature.com/articles/s41559-023-01986-1">over-reading</MarginLink> becomes part of the object lesson.
            </p>
          </MarginNote>
          <MarginFigureWithCaption
            caption={<>Earth&apos;s underground fungal network is so vast that, if it were in outer space, it would span roughly 10% of the <ExternalLink href="https://www.livescience.com/tag/milky-way">Milky Way</ExternalLink> if placed in a straight line, a new study in <ExternalLink href="https://www.science.org/doi/10.1126/science.adu4373">Science</ExternalLink> finds.</>}
            className="writing-margin-figure--mycorrhizal-network"
          >
            <img
              src="/resources/pictures/forest-interface/mycorrhizal-network-science-2026.webp"
              alt=""
              width="160"
              height="90"
              loading="lazy"
              className="writing-margin-photo"
            />
          </MarginFigureWithCaption>
        </section>

        {/* §9 — Walkable (coda) */}
        <section id="walkable" className="writing-article__section writing-article__coda">
          <div className="writing-article__body">
            <p>
              That is a different kind of design.
            </p>
            <p>
              It is not anti-technology. It is not anti-play. It is not nostalgia for a world before screens. It is just a preference for tools that do not need to turn every encounter into a closed system.
            </p>
            <p>
              The more an interface asks to be completed, the more it teaches a person to look for completion. The more it rewards return, the more it teaches return. The more it makes the world legible through its own terms, the more easily those terms become the world.
            </p>
            <p>
              This is why I do not want every good thing to become more playable.
            </p>
            <p className="writing-article__pullquote">
              Some things should remain walkable instead.
            </p>
            <p>
              They should have paths, not levels. They should allow return without turning return into a streak.
            </p>
            <p className="writing-article__pause-before">
              This is where I start thinking about tools again.
            </p>
            <p>
              Not every tool should become a forest. That would be unbearable. Most tools should simply do their job and get out of the way. I believe that too.
            </p>
            <p>
              But there is a class of tools, places, and systems that should do something more subtle. They should come back to the forest and learn from the forest. They should help without enclosing. They should invite without capturing. They should give enough structure for attention to begin, and then leave enough of the world unfinished for attention to become real.
            </p>
            <p>
              <em>A forest does this without trying.</em>
            </p>
            <p>
              That is why it remains a <em>useful embarrassment for design</em>.
            </p>

            <p className="writing-article__signoff--divider">—</p>
            <p className="writing-article__signoff">
              This joins <Link href="/writing/strange-tools">Strange Tools</Link> in our{' '}
              <Link href="/writing">Writing</Link>.
            </p>
          </div>
          <MarginNote className="writing-margin-note--trail">
            <TreeLineSvg />
          </MarginNote>
          <MarginNote className="writing-margin-note--grug">
            <GrugIcon />
            <p>
              Alex pointed me to <MarginLink href="https://www.grug.so/">grug</MarginLink>: open, read a small truth, maybe draw how it feels. A tool that gets out of the way.
            </p>
          </MarginNote>
        </section>

      </article>

      <div className="min-h-0 w-full flex-1" aria-hidden="true" />
      <SiteDivider />
      <SiteQedFooter />
    </div>
  )
}
