'use client'

import { useEffect } from 'react'

/** The original Google Fonts stylesheet; keep in sync with scripts/fetch-google-fonts.mjs. */
const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,700&family=Noto+Serif+SC:wght@400;600&display=swap'
const SELF_HOSTED_FAMILIES = new Set(['Inter', 'Noto Serif SC'])

/**
 * Inter and Noto Serif SC are self-hosted (app/google-fonts.css), so they load
 * same-origin with no render-blocking third-party stylesheet. This keeps the
 * original Google Fonts stylesheet as a fallback: only if a self-hosted face
 * fails to load is Google's stylesheet added (once, never render-blocking).
 * Its faces share the family names, so the text picks them up by itself.
 */
export function GoogleFontsFallback() {
  useEffect(() => {
    if (!document.fonts) return
    let added = false

    const addGoogleStylesheet = () => {
      if (added) return
      added = true
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = GOOGLE_FONTS_URL
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    }
    const isSelfHosted = (face: FontFace) =>
      SELF_HOSTED_FAMILIES.has(face.family.replace(/["']/g, ''))

    // Failures that happened before hydration…
    document.fonts.forEach((face) => {
      if (isSelfHosted(face) && face.status === 'error') addGoogleStylesheet()
    })
    // …and later ones (CJK slices load on demand, e.g. on scroll).
    const onError = (event: FontFaceSetLoadEvent) => {
      if (event.fontfaces.some(isSelfHosted)) addGoogleStylesheet()
    }
    document.fonts.addEventListener('loadingerror', onError)
    return () => document.fonts.removeEventListener('loadingerror', onError)
  }, [])

  return null
}
