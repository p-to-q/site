'use client'

import Link from 'next/link'

interface IconLinkProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  external?: boolean
  className?: string
  'aria-label'?: string
}

export function IconLink({ href, icon, children, external = false, className = '', 'aria-label': ariaLabel }: IconLinkProps) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}

  return (
    <Link
      href={href}
      className={`inline-flex min-w-0 max-w-full flex-wrap items-start text-[var(--site-link)] transition-all hover:text-[var(--site-link-hover)] ${className}`}
      aria-label={ariaLabel}
      {...linkProps}
    >
      <span className="link-text min-w-0 break-words leading-[1.45]">{children}</span>
      {external ? (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </Link>
  )
}
