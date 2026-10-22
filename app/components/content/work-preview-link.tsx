import type { ComponentProps, CSSProperties } from 'react'
import { ExternalLink } from '@/components/content/external-link'

type WorkPreviewLinkProps = ComponentProps<typeof ExternalLink> & {
  preview: string
  previewVariant?: 'standard' | 'banner'
  /** Shrink the preview toward the link (e.g. 0.6 = 60%). Unified scaling:
      one number per link, applied through a CSS variable, works for both the
      standard and banner layouts without touching the artwork or the size
      specs. */
  previewScale?: number
}

export function WorkPreviewLink({
  preview,
  previewVariant = 'standard',
  previewScale,
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
        style={previewScale ? ({ '--preview-scale': previewScale } as CSSProperties) : undefined}
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
