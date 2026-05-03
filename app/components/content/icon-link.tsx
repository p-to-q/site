'use client'

import Link from 'next/link'
import { ExternalLinkArrow } from '@/components/content/external-link-arrow'

interface IconLinkProps {
  href: string
  icon?: React.ReactNode
  children: React.ReactNode
  external?: boolean
  className?: string
  'aria-label'?: string
}

export function IconLink({
  href,
  icon,
  children,
  external = false,
  className = '',
  'aria-label': ariaLabel,
}: IconLinkProps) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}

  const linkClass = external
    ? `inline min-w-0 max-w-full break-words text-[var(--site-link)] transition-all hover:text-[var(--site-link-hover)] ${className}`
    : `inline-flex min-w-0 max-w-full flex-wrap items-baseline text-[var(--site-link)] transition-all hover:text-[var(--site-link-hover)] ${className}`

  return (
    <Link href={href} className={linkClass} aria-label={ariaLabel} {...linkProps}>
      {external ? (
        <>
          {children}
          <ExternalLinkArrow />
        </>
      ) : (
        <>
          <span className="link-text min-w-0 break-words leading-[1.45]">{children}</span>
          {icon ? (
            <span className="icon-arrow-wrap shrink-0 leading-none" aria-hidden="true">
              {icon}
            </span>
          ) : null}
        </>
      )}
    </Link>
  )
}
