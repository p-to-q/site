'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'

const LEAVE_MS = 520
const HOME_LOGO_MAX_WIDTH_PX = 288
const HOME_LOGO_VIEWPORT_RATIO = 0.8

/**
 * 404 canvas. Centerpiece is the actual `[p → q]` logo (1:1 with home);
 * the side brackets drift apart with pointer distance, then return to the
 * original mark when the user chooses to restore the arrow.
 */
export function NotFoundSection() {
  const router = useRouter()
  const logoRef = useRef<HTMLAnchorElement>(null)
  const [restored, setRestored] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [parallax, setParallax] = useState(0)
  const [flyHomeStyle, setFlyHomeStyle] = useState<CSSProperties | null>(null)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const w = window.innerWidth
      const dx = (e.clientX - w / 2) / (w / 2)
      setParallax(Math.max(-1, Math.min(1, dx)))
    }
    const onLeave = () => setParallax(0)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const goHome = (e: MouseEvent) => {
    if (leaving) return
    e.preventDefault()

    const logoRect = logoRef.current?.getBoundingClientRect()
    const main = document.querySelector('main')
    const mainRect = main?.getBoundingClientRect()

    if (logoRect && mainRect && main instanceof HTMLElement) {
      const mainStyle = window.getComputedStyle(main)
      const mainPaddingLeft = Number.parseFloat(mainStyle.paddingLeft) || 0
      const rootStyle = window.getComputedStyle(document.documentElement)
      const rem = Number.parseFloat(rootStyle.fontSize) || 16
      const homeLogoViewportOffset = 3.5 * rem
      const homeHeaderPaddingTop = Math.max(0.75 * rem, window.innerHeight / 3 - homeLogoViewportOffset)
      const targetWidth = Math.min(window.innerWidth * HOME_LOGO_VIEWPORT_RATIO, HOME_LOGO_MAX_WIDTH_PX)
      const targetLeft = mainRect.left + mainPaddingLeft
      const targetTop = mainRect.top + homeHeaderPaddingTop

      setFlyHomeStyle({
        '--fly-x': `${targetLeft - logoRect.left}px`,
        '--fly-y': `${targetTop - logoRect.top}px`,
        '--fly-scale': targetWidth / logoRect.width,
      } as CSSProperties)
    }

    setRestored(true)
    setLeaving(true)
    window.setTimeout(() => router.push('/'), LEAVE_MS)
  }

  const intentOn = () => setRestored(true)
  const intentOff = () => {
    if (!leaving) setRestored(false)
  }

  const splitDistance = restored ? 0 : 2.2 + Math.abs(parallax) * 2.4
  const logoStyle = {
    '--left-split': `${-splitDistance}%`,
    '--right-split': `${splitDistance}%`,
  } as CSSProperties

  return (
    <div
      className={`not-found-canvas${restored ? ' is-whole' : ''}${leaving ? ' is-leaving' : ''}`}
    >
      <Link
        ref={logoRef}
        href="/"
        className="not-found-canvas__logo"
        style={{ ...logoStyle, ...flyHomeStyle }}
        onFocus={intentOn}
        onBlur={intentOff}
        onClick={goHome}
        aria-label="Restore the arrow and return home"
      >
        <span className="not-found-canvas__piece not-found-canvas__piece--left" aria-hidden="true" />
        <span className="not-found-canvas__piece not-found-canvas__piece--middle" aria-hidden="true" />
        <span className="not-found-canvas__piece not-found-canvas__piece--right" aria-hidden="true" />
      </Link>

      <hr className="not-found-canvas__divider" aria-hidden="true" />

      <p className="not-found-canvas__caption heading-text home-page-heading home-page-tagline">
        non sequitur.
      </p>

      <p className="not-found-canvas__sub body-text">404 — this page does not follow.</p>

      <Link
        href="/"
        className="not-found-canvas__return body-text"
        onPointerEnter={intentOn}
        onPointerLeave={intentOff}
        onFocus={intentOn}
        onBlur={intentOff}
        onClick={goHome}
      >
        <span className="arr">←</span> restore the arrow
      </Link>

      <p className="site-copyright-text not-found-canvas__copyright">
        © 2026 Wooden Computer Co., Ltd. All rights reserved.
      </p>
    </div>
  )
}
