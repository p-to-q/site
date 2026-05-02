'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { IconLink } from '@/components/content/icon-link'
import { ArrowIcon } from '@/components/content/icons'
import type { ListPageItem } from '@/lib/list-page-types'

const PRESERVE_CASE_TERMS = [
  'RAVE',
  'LLMs',
] as const

const PRESERVE_CASE_SET = new Set<string>(PRESERVE_CASE_TERMS)
const PRESERVE_CASE_REGEX = new RegExp(
  `(${PRESERVE_CASE_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g',
)

function renderWithPreservedCase(text: string): React.ReactNode {
  return text.split(PRESERVE_CASE_REGEX).map((part, index) =>
    PRESERVE_CASE_SET.has(part) ? (
      <span key={`${part}-${index}`} className="normal-case">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

function measureDescriptionWidth(row: HTMLElement, description: string): number {
  const probe = document.createElement('span')
  probe.textContent = `- ${description}`
  probe.className = 'body-text whitespace-nowrap'
  probe.style.visibility = 'hidden'
  probe.style.position = 'absolute'
  probe.style.left = '0'
  probe.style.top = '0'
  probe.style.whiteSpace = 'nowrap'
  row.appendChild(probe)
  const w = probe.offsetWidth
  row.removeChild(probe)
  return w
}

export function ListPageTemplateRow({ item }: { item: ListPageItem }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const titleProbeRef = useRef<HTMLSpanElement>(null)
  const [descStacked, setDescStacked] = useState(false)

  useLayoutEffect(() => {
    const row = rowRef.current
    const titleProbe = titleProbeRef.current
    if (!row || !item.description) {
      setDescStacked(false)
      return
    }
    if (!titleProbe) {
      setDescStacked(false)
      return
    }

    const mq = window.matchMedia('(max-width: 639px)')

    const measure = () => {
      if (mq.matches) {
        setDescStacked(true)
        return
      }
      const desc = item.description
      if (!desc) {
        setDescStacked(false)
        return
      }
      const rowWidth = row.clientWidth
      const linkNaturalWidth = titleProbe.offsetWidth
      const descWidth = measureDescriptionWidth(row, desc)
      const gap = Number.parseFloat(getComputedStyle(row).columnGap || '0') || 0
      const stacked = linkNaturalWidth + gap + descWidth > rowWidth + 0.5
      setDescStacked(stacked)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(row)
    mq.addEventListener('change', measure)
    return () => {
      ro.disconnect()
      mq.removeEventListener('change', measure)
    }
  }, [item.description, item.title, item.href, item.external])

  return (
    <li>
      <div className="min-w-0">
        <div
          ref={rowRef}
          className="relative flex min-w-0 flex-wrap items-baseline gap-x-0 md:gap-x-1"
        >
          <div className="min-w-0 max-w-full">
            <IconLink
              className="!inline-flex min-w-0 max-w-full"
              href={item.href}
              icon={<ArrowIcon />}
              external={item.external}
              aria-label={item.ariaLabel}
            >
              {renderWithPreservedCase(item.title)}
            </IconLink>
          </div>
          <span
            ref={titleProbeRef}
            className="link-text pointer-events-none absolute invisible inline-flex min-w-0 items-start whitespace-nowrap"
            aria-hidden
          >
            <span>{renderWithPreservedCase(item.title)}</span>
            {item.external ? (
              <span className="inline-flex shrink-0" aria-hidden>
                <ArrowIcon />
              </span>
            ) : null}
          </span>
          {item.description && !descStacked ? (
            <span className="body-text shrink-0 whitespace-nowrap">
              - {renderWithPreservedCase(item.description)}
            </span>
          ) : null}
        </div>
        {item.description && descStacked ? (
          <p className="body-text m-0 mt-0 min-w-0 break-words">
            - {renderWithPreservedCase(item.description)}
          </p>
        ) : null}
      </div>
    </li>
  )
}
