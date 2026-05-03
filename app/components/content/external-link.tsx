import type { ComponentProps } from 'react'
import { ExternalLinkArrow } from '@/components/content/external-link-arrow'

type ExternalLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string
}

export function ExternalLink({ href, children, className = '', ...rest }: ExternalLinkProps) {
  const openInNewTab = href.startsWith('http://') || href.startsWith('https://')

  return (
    <a
      href={href}
      className={`inline max-w-full break-words ${className}`.trim()}
      {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' as const } : {})}
      {...rest}
    >
      {children}
      <ExternalLinkArrow />
    </a>
  )
}
