import type { ComponentProps, CSSProperties } from 'react'
import { ExternalLink } from '@/components/content/external-link'
import type { WorkPreview } from '@/lib/work-previews'

/**
 * Allowed previewScale range. The upper bound keeps every preview inside the
 * list: global.css only tracks the list edges for the first and last three
 * rows, and a centred five-row preview scaled to 1.4x reaches at most three
 * rows beyond its own.
 */
const MIN_PREVIEW_SCALE = 0.25
const MAX_PREVIEW_SCALE = 1.4

type WorkPreviewLinkProps = ComponentProps<typeof ExternalLink> & {
  preview: WorkPreview
  previewVariant?: 'standard' | 'banner'
  /**
   * Size factor for this link's preview (0.8 = 80%): multiplies the frame
   * height (standard) or width (banner). Placement (centred on the row,
   * clamped inside the list) is computed from the scaled size, so alignment
   * never drifts.
   */
  previewScale?: number
}

export function WorkPreviewLink({
  preview,
  previewVariant = 'standard',
  previewScale = 1,
  children,
  className = '',
  ...props
}: WorkPreviewLinkProps) {
  if (!(previewScale >= MIN_PREVIEW_SCALE && previewScale <= MAX_PREVIEW_SCALE)) {
    throw new Error(
      `previewScale must be between ${MIN_PREVIEW_SCALE} and ${MAX_PREVIEW_SCALE} (got ${previewScale})`
    )
  }

  // Inline custom properties feed the sizing/placement math in global.css.
  // The aspect ratio lets CSS know a banner's height before the image loads.
  const style = {
    '--preview-ar': (preview.width / preview.height).toFixed(4),
    ...(previewScale !== 1 ? { '--preview-scale': previewScale } : {}),
  } as CSSProperties

  return (
    <ExternalLink
      {...props}
      className={`work-preview-link ${className}`.trim()}
    >
      {children}
      <span
        className={`work-thumb work-thumb--${previewVariant}`}
        aria-hidden="true"
        style={style}
      >
        {/* Page-level preload warms every source; lazy avoids duplicate React hints. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview.src}
          width={preview.width}
          height={preview.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </span>
    </ExternalLink>
  )
}
