import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from '@/components/content/external-link'
import { SiteDivider } from '@/components/layout/site-divider'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteQedFooter } from '@/components/layout/site-sticky-qed-page'
import { WritingNav } from './writing-nav'

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

function MarginFigure({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <aside className={`writing-margin-figure ${className}`} aria-hidden="true">
      {children}
    </aside>
  )
}

function MarginFigureWithCaption({ children, caption, captionHint, href, className = '' }: { children: React.ReactNode; caption?: string; captionHint?: string; href?: string; className?: string }) {
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

/* ── Right-margin SVG illustrations ── */

function TreeSvg() {
  return (
    <svg width="48" height="72" viewBox="0 0 48 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="24" y1="72" x2="24" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 40C14 40 6 30 10 20C12 14 18 8 24 6C30 8 36 14 38 20C42 30 34 40 24 40Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="24" y1="40" x2="16" y2="50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="24" y1="40" x2="32" y2="48" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function LoopSvg() {
  return (
    <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 8C14 8 6 16 6 26C6 36 14 44 24 44C34 44 42 36 42 26C42 20 39 14 34 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <polyline points="36,6 34,11 39,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="24" cy="26" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function DoorwaySvg() {
  return (
    <svg width="32" height="60" viewBox="0 0 32 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 58V20A12 12 0 0 1 28 20V58" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <line x1="4" y1="58" x2="28" y2="58" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    </svg>
  )
}

function MapSvg() {
  return (
    <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="44" height="32" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="16" y1="2" x2="16" y2="34" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
      <line x1="32" y1="2" x2="32" y2="34" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
      <circle cx="36" cy="20" r="2.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="36" cy="20" r="0.8" fill="currentColor" />
    </svg>
  )
}

function PlumbSvg() {
  return (
    <svg width="24" height="72" viewBox="0 0 24 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="4" x2="12" y2="58" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="12" cy="64" r="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="64" r="1.5" fill="currentColor" opacity="0.4" />
      <line x1="7" y1="18" x2="17" y2="18" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
      <line x1="7" y1="32" x2="17" y2="32" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
      <line x1="7" y1="46" x2="17" y2="46" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
    </svg>
  )
}

function PathSvg() {
  return (
    <svg width="32" height="96" viewBox="0 0 32 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4C8 16 24 32 16 48C8 64 24 80 16 92" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="24" r="1.2" fill="currentColor" opacity="0.25" />
      <circle cx="20" cy="56" r="1.2" fill="currentColor" opacity="0.25" />
      <circle cx="14" cy="76" r="1.2" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

function TreeLineSvg() {
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default function ForestInterfacePage() {
  return (
    <div className="flex min-h-[calc(100dvh-5.5rem)] flex-col">
      <SiteHeader />

      <WritingNav />

      <article className="writing-article">

        {/* Title & date */}
        <header className="writing-article__header">
          <h1 className="writing-article__title">The Forest and the Interface</h1>
          <time className="writing-article__date" dateTime="2026-06" aria-label="Published June 2026 by Du">
            June 2026 · Du
          </time>
        </header>

        {/* §1 — Photos */}
        <section id="photos" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              I have a small folder of forest photos that I keep coming back to.
            </p>
            <p>
              They are not especially good photographs. Some are blurry, taken too quickly while walking or riding past something I did not have time to understand. A few are from places meant to be visited: paths, signs, families moving slowly through a weekend. Others are from the edges of cities, where the green looks less like a destination and more like something that stayed behind.
            </p>
            <p>
              I keep them anyway. I liked them all.
            </p>
            <p>
              I like all of these versions because they were mixed with ordinary life and still not fully absorbed by it. That is the feeling I keep returning to. A forest can have benches, fences, maps, litter, children, mobile reception, and still refuse to become completely explainable. It lets you enter, but it does not make itself small for you. You can follow the path and still not know what you are looking at.
            </p>
            <p>
              I can tell when a place makes me quieter, but I cannot always tell why. At first everything is too general. Trees. Ground. Water. Green. Then, if I stay long enough, the place begins to separate. I notice the lake before the ground that leads to it. I notice the light before the shapes it makes.
            </p>
            <p>
              My first attention is usually lazy. Maybe the forest is correcting me.
            </p>
            <p>
              Nothing has happened, exactly, but the world has become less flat.
            </p>
          </div>
          <MarginFigure className="writing-margin-figure--top">
            <TreeSvg />
          </MarginFigure>
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
              A forest is not outside design. Many forests we move through are designed, managed, damaged, restored, named, protected, entered through signs and paths, and monitored through maps and policies. The point is not that forest is natural and interface is artificial. That distinction is too easy and mostly unhelpful.
            </p>
            <p>
              The better distinction is between systems that hold the world open and systems that close it too quickly.
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
              The world keeps asking you to respond. The forest does not ask so much. It gives you more than enough to notice, but less pressure to turn noticing into action.
            </p>
            <p>
              I find that generous.
            </p>
            <p>
              When I look at the photos now, I do not think first about nature. I think about this feeling of being gently made less competent.
            </p>
            <p>
              The pace drops first. Not in a noble way. More like the mind has fewer handles for what to do next. In a city, even when I am lost, I still know the general grammar of the place. Cross here. Wait there. Enter. Pay. Scan. Sit. Leave. In a forest, even a very managed one, the grammar becomes less obvious. A path may be clear, but the place around the path is not explaining itself.
            </p>
            <p>
              They let you enter without becoming fully available. They offer enough to begin, but not enough to feel finished. They do not rush to turn themselves into an experience. If you want more from them, you have to become a little more specific.
            </p>
            <p>
              That seems worth thinking about now.
            </p>
          </div>
          <MarginFigure>
            <DoorwaySvg />
          </MarginFigure>
        </section>

        {/* §4 — User-friendly */}
        <section id="user-friendly" className="writing-article__section">
          <div className="writing-article__body">
            <p className="writing-article__pullquote">
              A forest has an interface that is not user-friendly.
            </p>
            <p>
              I was thinking about this because <em>user-friendly</em> is such a polite phrase. In software it usually means the tool has done some work before you arrive. It has guessed what you probably want. It has removed some choices, softened some edges, and made the next action obvious.
            </p>
            <p>
              Most of the time, this is good. A good form should not make you suffer. A map should help. A button should look like a button. Nobody wants a clever checkout page.
            </p>
            <p>
              But user-friendly can also become a way of saying: the world has been made smaller for you.
            </p>
            <p>
              A forest does not do this. It does not arrange itself around your task. It does not care whether you are trying to get somewhere quickly. Still, it is full of information. A path is worn into the ground. Mud keeps a record of the last rain. Light changes where the trees thin out. Moss grows more easily in some places than others. A fallen branch tells you something happened here, even if you do not know what.
            </p>
            <p>
              None of this is hidden. It just has not been formatted as instructions.
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
          <MarginFigureWithCaption
            caption="After Korzybski — 'the map is not the territory', 1931"
            href="https://en.wikipedia.org/wiki/Map%E2%80%93territory_relation"
          >
            <MapSvg />
          </MarginFigureWithCaption>
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
            <p>
              This is where the idea of <em>environmental fitness</em> becomes useful.
            </p>
            <p>
              A good interface is not only friendly to the user. It is fit for the environment it enters.
            </p>
            <p>
              Does it fit the attention of the person? Does it fit the material of the place? Does it fit the pace at which understanding should happen? Does it fit the maintenance it requires? Does it fit the forms of life already there?
            </p>
            <p>
              A design can be elegant and still be environmentally wrong. It can make the surface clearer while making the relation poorer. It can make a place more legible while making people less present.
            </p>
            <p className="writing-article__pullquote">
              This matters for interface because an interface is never only a surface. It teaches a posture.
            </p>
            <p>
              Some interfaces teach nothing except where to click next.
            </p>
          </div>
          <MarginFigure>
            <PlumbSvg />
          </MarginFigure>
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
            <p>
              This assumption often ends in something like a game.
            </p>
            <p>
              A game is a beautiful form when it is honest about being one. It draws a boundary around a world and gives that world rules. It makes action meaningful by giving it consequence inside the boundary. It can turn boredom into attention and confusion into play. It is one of the oldest technologies humans have for making behavior feel alive.
            </p>
            <p>
              The trouble begins when the game becomes the imagined endpoint for everything.
            </p>
            <p>
              The game is often presented as the final form because it knows how to hold attention. It gives the user something to do next. It makes progress visible. It knows how to reward return. It gives shape to uncertainty. It turns vague effort into readable movement.
            </p>
            <p>
              None of these are inherently terrible. Many are useful. Some are even beautiful. But after a while the same shape keeps appearing: attention is invited in, given something to do, rewarded for returning, and trained to expect the world to answer in loops.
            </p>
            <p>
              When something becomes too game-shaped, the world inside it starts to become answerable to the loop. The question is no longer &ldquo;what kind of attention does this place deserve?&rdquo; but &ldquo;what action should happen next?&rdquo; The surface becomes more alive, but sometimes the person becomes less present. Attention is routed, not deepened.
            </p>
            <p>
              The forest does not answer this way.
            </p>
          </div>
          <MarginFigure>
            <LoopSvg />
          </MarginFigure>
        </section>

        {/* §7 — Trail */}
        <section id="trail" className="writing-article__section">
          <div className="writing-article__body">
            <p>
              A forest routes attention differently.
            </p>
            <p>
              It does not do this through points or prompts. It does it through changes in ground, light, density, temperature, sound, and repetition. You begin to notice where the path holds water, where the trees thin out, where the air becomes cooler, where something has moved before you arrived. You do not receive feedback in the usual sense. You become slightly more able to read.
            </p>
            <p>
              That difference matters.
            </p>
            <p>
              A trail is not a quest line. A trail is a trace of use. It does not tell you that you are winning. It tells you that others have passed here, and that this might be a way through. It helps without making itself the whole event.
            </p>
            <p>
              A{' '}
              <ExternalLink href="https://en.wikipedia.org/wiki/Field_guide">field guide</ExternalLink>
              {' '}works in a similar way. It does not turn the forest into a game of identification, though it can be used that way. At its best, it gives names and distinctions without replacing the encounter. It lets the world keep some authority. You still have to look. You still have to be wrong. You still have to learn the difference between two things that used to be one thing to you.
            </p>
            <p>
              This is the kind of interface I find myself trusting more.
            </p>
            <p>
              Not an interface with no rules. Not an interface with no design. Not an interface that makes difficulty feel noble. Just one that does not confuse engagement with capture.
            </p>
            <p>
              A good interface can help a person begin without deciding too much on their behalf. It can leave some uncertainty intact without abandoning them to confusion. It can make the next step possible without making the whole experience about next steps.
            </p>
            <p>
              This is easier to say about forests than software, but software is where the question has become harder to avoid. The default shape of many tools is becoming smoother, more conversational, more complete. You describe an intention and a result returns. Sometimes this is exactly right. There are many parts of life that deserve to be made easier, shorter, and less humiliating.
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
              This is where the &ldquo;<ExternalLink href="https://en.wikipedia.org/wiki/Mycorrhizal_network">Wood-Wide Web</ExternalLink>&rdquo; is useful to think with, even if the metaphor should be handled carefully. The phrase makes visible a hidden layer: trees, roots, fungi, soil, exchange, dependency, competition, signaling, decay. It reminds us that a forest is not only what stands above the ground. It is also a set of relations below visibility.
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
          <MarginFigureWithCaption
            caption="Suzanne Simard — mycorrhizal networks and the intelligence of forests"
            href="https://www.ted.com/talks/suzanne_simard_how_trees_talk_to_each_other"
          >
            <RootsSvg />
          </MarginFigureWithCaption>
        </section>

        {/* §9 — Walkable (coda) */}
        <section id="walkable" className="writing-article__section writing-article__coda">
          <MarginFigure>
            <TreeLineSvg />
          </MarginFigure>
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
              They should have paths, not levels. Signs, not constant feedback. Difficulty, not as punishment, but as the natural resistance of something that was not made entirely for you. They should allow repetition without turning repetition into a streak. They should let someone return because the place is worth returning to, not because a system learned how to ask.
            </p>
            <p>
              This is where I start thinking about tools again.
            </p>
            <p>
              Not every tool should become a forest. That would be unbearable. Most tools should simply do their job and get out of the way. I believe that too.
            </p>
            <p>
              But there is a class of tools, places, and systems that should do something more subtle. They should come back to the forest and learn from the forest. They should help without enclosing. They should invite without capturing. They should give enough structure for attention to begin, and then leave enough of the world unfinished for attention to become real.
            </p>
            <p>
              A forest does this without trying.
            </p>
            <p>
              That is why it remains a useful embarrassment for design.
            </p>

            <p className="writing-article__signoff--divider">—</p>
            <p className="writing-article__signoff">
              This joins <Link href="/writing/strange-tools">Strange Tools</Link> in our{' '}
              <Link href="/writing">Writing</Link>.
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
