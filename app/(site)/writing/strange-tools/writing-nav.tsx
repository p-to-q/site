'use client'

import { useEffect, useState } from 'react'

const NAV_SECTIONS = [
  { id: 'strange',        label: 'strange' },
  { id: 'strangeness',    label: 'strangeness' },
  { id: 'judgment',       label: 'judgment' },
  { id: 'builder',        label: 'builder' },
  { id: 'four-qualities', label: 'four qualities' },
  { id: 'middle',         label: 'the middle' },
  { id: 'coda',           label: '[p → q]' },
] as const

export function WritingNav() {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-10% 0px -75% 0px' }
    )

    for (const { id } of NAV_SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="writing-sidebar" aria-label="Article sections">
      <p className="writing-sidebar__label">Strange Tools</p>
      <ul className="writing-sidebar__list">
        {NAV_SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`writing-sidebar__link${activeId === id ? ' is-active' : ''}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
