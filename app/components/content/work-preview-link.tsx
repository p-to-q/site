'use client'

import { useState, type ComponentProps } from 'react'
import { ExternalLink } from '@/components/content/external-link'

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

type WorkPreviewLinkProps = ComponentProps<typeof ExternalLink> & {
  preview: string
  previewVariant?: 'standard' | 'banner'
}

/**
 * A Work link whose desktop preview is requested only after pointer or keyboard
 * intent. Keeping srcSet absent at rest prevents every hidden preview from being
 * downloaded during the initial page load.
 */
export function WorkPreviewLink({
  preview,
  previewVariant = 'standard',
  children,
  className = '',
  onFocus,
  onPointerEnter,
  ...props
}: WorkPreviewLinkProps) {
  const [previewRequested, setPreviewRequested] = useState(false)
  const requestPreview = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setPreviewRequested(true)
    }
  }

  return (
    <ExternalLink
      {...props}
      className={`work-preview-link ${className}`.trim()}
      onFocus={(event) => {
        requestPreview()
        onFocus?.(event)
      }}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') requestPreview()
        onPointerEnter?.(event)
      }}
    >
      {children}
      <span
        className={`work-thumb work-thumb--${previewVariant}`}
        aria-hidden="true"
      >
        {/* Small screens keep the transparent fallback and never fetch previews. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewRequested ? preview : TRANSPARENT_PIXEL}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </span>
    </ExternalLink>
  )
}
