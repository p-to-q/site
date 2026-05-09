'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { ExternalLink } from '@/components/content/external-link'

export function SiteHeader() {
  const pathname = usePathname()
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [pathname])

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
      className="overflow-x-clip flex flex-col"
      style={{
        paddingTop: 'max(0.75rem, calc(100dvh / 3 - var(--home-logo-viewport-offset, 3.5rem)))',
        gap: 'calc(1.45rem * 3)',
        paddingBottom: '1.45rem',
      }}
    >
      <Link href="/" aria-label="[p → q] home" className="block no-underline" style={{ width: 'min(80vw, 18rem)' }}>
        <Image
          src="/resources/pictures/home/p-to-q_logo.png"
          alt="[p → q]"
          width={726}
          height={235}
          className="block h-auto w-full max-w-full"
          sizes="(max-width: 640px) 80vw, 18rem"
          priority
          unoptimized
        />
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
