'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, type MouseEvent } from 'react'
import { ExternalLink } from '@/components/content/external-link'

const LOGO_SPLIT_MS = 1100
const LOGO_PEAK_PCT = 0.06
const LOGO_PEAK_OFFSET = 0.18
const LOGO_PEAK_HOLD_OFFSET = 0.23

/** Damped spring keyframes (in % of piece width). */
const SPRING_KEYFRAMES: ReadonlyArray<{ offset: number; value: number; easing?: string }> = [
  { offset: 0, value: 0, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { offset: LOGO_PEAK_OFFSET, value: LOGO_PEAK_PCT, easing: 'linear' },
  { offset: LOGO_PEAK_HOLD_OFFSET, value: LOGO_PEAK_PCT, easing: 'cubic-bezier(0.3, 0, 0.6, 1)' },
  { offset: 0.46, value: -0.018, easing: 'cubic-bezier(0.4, 0, 0.6, 1)' },
  { offset: 0.66, value: 0.007, easing: 'cubic-bezier(0.4, 0, 0.6, 1)' },
  { offset: 0.84, value: -0.0025, easing: 'cubic-bezier(0.4, 0, 0.6, 1)' },
  { offset: 1, value: 0 },
]

const readCurrentTranslateX = (el: HTMLElement): number => {
  const t = window.getComputedStyle(el).transform
  if (!t || t === 'none') return 0
  try {
    const m = new DOMMatrixReadOnly(t)
    return m.m41
  } catch {
    return 0
  }
}

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const navigateTimerRef = useRef<number | null>(null)
  const leftPieceRef = useRef<HTMLSpanElement>(null)
  const rightPieceRef = useRef<HTMLSpanElement>(null)
  const animationsRef = useRef<Animation[]>([])

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    return () => {
      if (navigateTimerRef.current) window.clearTimeout(navigateTimerRef.current)
      animationsRef.current.forEach((a) => a.cancel())
    }
  }, [])

  const playSplit = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    animationsRef.current.forEach((a) => a.cancel())
    animationsRef.current = []

    const targets: Array<[HTMLSpanElement | null, number]> = [
      [leftPieceRef.current, -1],
      [rightPieceRef.current, 1],
    ]

    for (const [el, sign] of targets) {
      if (!el) continue
      const width = el.getBoundingClientRect().width
      if (width <= 0) continue
      const startX = readCurrentTranslateX(el)
      const keyframes = SPRING_KEYFRAMES.map((k, i) => {
        const target = sign * k.value * width
        const value = i === 0 ? startX : target
        const frame: Keyframe = { transform: `translateX(${value}px)`, offset: k.offset }
        if (k.easing) frame.easing = k.easing
        return frame
      })
      const anim = el.animate(keyframes, { duration: LOGO_SPLIT_MS, fill: 'none' })
      animationsRef.current.push(anim)
    }
  }

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    if (navigateTimerRef.current) window.clearTimeout(navigateTimerRef.current)

    playSplit()

    if (pathname !== '/') {
      navigateTimerRef.current = window.setTimeout(() => {
        router.push('/')
      }, LOGO_SPLIT_MS)
    }
  }

  const navClass = (href: string) => {
    const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
    return `body-text${active ? ' is-active' : ''}`
  }
  const ariaCurrent = (href: string) => {
    const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
    return active ? ('page' as const) : undefined
  }
  return (
    <header
      className="flex flex-col"
      style={{
        paddingTop: 'max(0.75rem, calc(100dvh / 3 - var(--home-logo-viewport-offset, 3.5rem)))',
        gap: 'calc(1.45rem * 3)',
        paddingBottom: '1.45rem',
      }}
    >
      <Link
        href="/"
        aria-label="[p → q] home"
        className="site-header-logo"
        onClick={handleLogoClick}
      >
        <span ref={leftPieceRef} className="site-header-logo__piece site-header-logo__piece--left" aria-hidden="true" />
        <span className="site-header-logo__piece site-header-logo__piece--middle" aria-hidden="true" />
        <span ref={rightPieceRef} className="site-header-logo__piece site-header-logo__piece--right" aria-hidden="true" />
      </Link>
      <div className="flex w-full flex-col gap-4">
        <nav className="flex flex-wrap gap-6">
          <Link href="/" className={navClass('/')} aria-current={ariaCurrent('/')}>
            About
          </Link>
          <Link href="/work" className={navClass('/work')} aria-current={ariaCurrent('/work')}>
            Work
          </Link>
          <Link href="/writing" className={navClass('/writing')} aria-current={ariaCurrent('/writing')}>
            Writing
          </Link>
        <ExternalLink href="https://github.com/p-to-q" className="body-text">
          GitHub
        </ExternalLink>
        </nav>
        <hr
          className="m-0 w-full border-0 p-0"
          style={{
            backgroundColor: 'var(--site-hr)',
            height: '1px',
          }}
          aria-hidden="true"
        />
      </div>
    </header>
  )
}
