import type { ListPageItem } from '@/lib/list-page-types'

export const PROJECT_LIST_ITEMS = [
  {
    href: 'https://www.earmodular.com/',
    title: 'Ear Modular',
    description: 'Eurorack modules & handmade gear',
    external: true,
    ariaLabel: 'Ear Modular website',
  },
  {
    href: 'https://github.com/Moapacha/wittgenstein',
    title: 'Wittgenstein',
    description: 'Modality harness for text-first LLMs',
    external: true,
    ariaLabel: 'Wittgenstein on GitHub',
  },
  {
    href: '/latent-electone',
    title: 'Latent Electone',
    description: 'Reconstructing vintage Electone textures with RAVE',
  },
  {
    href: '/motion-shaper',
    title: 'Motion Shaper',
    description: 'Real-time audiovisual composition framework',
  },
  {
    href: '/foosball',
    title: 'Foosball',
    description: 'Spatialized Table Football',
  },
] as const satisfies readonly ListPageItem[]

export const POSTS_LIST_ITEMS = [
  {
    href: '/posts/down-to-earth',
    title: 'Down To Earth',
    description: 'Looking Vertically',
    ariaLabel: 'Down To Earth — Looking Vertically',
  },
  {
    href: '/posts/papa-james-workshop',
    title: 'Papa James Workshop',
    description: 'magical place in downtown Shanghai',
  },
] as const satisfies readonly ListPageItem[]

export const SOUNDS_LIST_ITEMS = [
  {
    href: '/capricho-arabe',
    title: 'Capricho Árabe',
    description: 'classical guitar solo',
  },
  {
    href: '/low-light',
    title: 'Low Light',
    description: 'Modular + Ableton live',
  },
] as const satisfies readonly ListPageItem[]

export const EVENTS_LIST_ITEMS = [
  {
    href: '/trigger-tutorial',
    title: 'a tutorial',
    description: 'Max/MSP & Unreal Engine',
    ariaLabel: 'a tutorial — Max/MSP & Unreal Engine',
  },
  {
    href: '/polymer',
    title: 'polymer 4',
    description: 'holocene electronics',
    ariaLabel: 'polymer 4 — holocene electronics',
  },
  {
    href: '/emochine',
    title: 'emochine 3',
    description: 'a salon for synth makers',
    ariaLabel: 'emochine 3 — a salon for synth makers',
  },
  {
    href: '/superbooth-25',
    title: 'superbooth 25',
    description: 'synth & electronic music expo',
    ariaLabel: 'superbooth 25 — synth & electronic music expo',
  },
] as const satisfies readonly ListPageItem[]
