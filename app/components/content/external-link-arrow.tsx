import { EXTERNAL_LINK_ARROW_SRC } from '@/lib/external-link-arrow-src'

export function ExternalLinkArrow() {
  return (
    <img
      src={EXTERNAL_LINK_ARROW_SRC}
      alt=""
      aria-hidden
      width={12}
      height={12}
      decoding="async"
      className="ms-0.5 inline-block h-[0.85em] w-[0.85em] shrink-0 align-[-0.12em]"
    />
  )
}
