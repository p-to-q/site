'use client'

import { useEffect, useState } from 'react'

const NAV_SECTIONS = [
  { id: 'photos',          label: 'photos' },
  { id: 'semi-structured', label: 'semi-structured' },
  { id: 'generous',        label: 'generous' },
  { id: 'user-friendly',   label: 'user-friendly' },
  { id: 'fitness',         label: 'fitness' },
  { id: 'game',            label: 'the game' },
  { id: 'trail',           label: 'trail' },
  { id: 'layers',          label: 'layers' },
  { id: 'walkable',        label: 'walkable' },
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
      <p className="writing-sidebar__label writing-sidebar__label--forest-interface">
        The Forest and the Interface
      </p>
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
