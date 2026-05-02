'use client'

import * as React from 'react'
import { ICON_ASSETS } from '@/lib/icon-assets'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'site-theme'

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

function getInitialTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // ignore
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme | null>(null)

  React.useEffect(() => {
    const initial = getInitialTheme()
    setTheme(initial)
    applyTheme(initial)
  }, [])

  const onToggle = React.useCallback(() => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    applyTheme(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [theme])

  return (
    <button
      type="button"
      className="relative -top-0.5 text-[var(--site-link)] transition-colors hover:text-[var(--site-link-hover)]"
      onClick={onToggle}
      aria-label="Toggle theme"
    >
      <span
        className="block h-6 w-6 bg-current"
        aria-hidden="true"
        style={{
          WebkitMaskImage: `url("${ICON_ASSETS.theme}")`,
          maskImage: `url("${ICON_ASSETS.theme}")`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
    </button>
  )
}

