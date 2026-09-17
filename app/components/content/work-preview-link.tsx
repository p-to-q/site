import type { ComponentProps } from 'react'
import { ExternalLink } from '@/components/content/external-link'

type WorkPreviewLinkProps = ComponentProps<typeof ExternalLink> & {
  preview: string
  previewVariant?: 'standard' | 'banner'
}

export function WorkPreviewLink({
  preview,
  previewVariant = 'standard',
  children,
  className = '',
  ...props
}: WorkPreviewLinkProps) {
  return (
    <ExternalLink
      {...props}
      className={`work-preview-link ${className}`.trim()}
    >
      {children}
      <span
        className={`work-thumb work-thumb--${previewVariant}`}
        aria-hidden="true"
      >
        {/* Page-level preload warms every source; lazy avoids duplicate React hints. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </span>
    </ExternalLink>
  )
}
