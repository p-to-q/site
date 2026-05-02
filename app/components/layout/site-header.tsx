import Image from 'next/image'
import Link from 'next/link'

export function SiteHeader() {
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
      <nav className="flex flex-wrap gap-6">
        <Link href="/" className="body-text">
          About
        </Link>
        <Link href="/work" className="body-text">
          Work
        </Link>
        <Link href="/writing" className="body-text">
          Writing
        </Link>
      </nav>
    </header>
  )
}
