/** Local dev only when no Vercel host is present. */
const SITE_URL_DEV_FALLBACK = 'http://localhost:3000'

/**
 * Last-resort origin for Vercel **production** when `NEXT_PUBLIC_BASE_URL` is unset.
 * Preview deployments still use `VERCEL_URL` so sitemaps match the preview host.
 * Subdomains (e.g. `https://labs.ptoq.io`): set `NEXT_PUBLIC_BASE_URL` on that project.
 */
const SITE_PRIMARY_PRODUCTION_ORIGIN = 'https://www.ptoq.io'

function tryParseOrigin(raw: string): string | null {
  try {
    return new URL(raw).href
  } catch {
    return null
  }
}

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL?.trim()
  if (fromEnv) {
    const parsed = tryParseOrigin(fromEnv)
    if (parsed) return parsed
  }

  if (process.env.VERCEL_ENV === 'production') {
    const prodHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
    if (prodHost) {
      const normalized = prodHost.replace(/^https?:\/\//i, '')
      const parsed = tryParseOrigin(`https://${normalized}`)
      if (parsed) return parsed
    }
    return new URL(SITE_PRIMARY_PRODUCTION_ORIGIN).href
  }

  const vercelHost = process.env.VERCEL_URL?.trim()
  if (vercelHost) {
    const parsed = tryParseOrigin(`https://${vercelHost}`)
    if (parsed) return parsed
  }

  return new URL(SITE_URL_DEV_FALLBACK).href
}

export const SITE_CONFIG = {
  name: '[p → q]',
  title: '[p → q]',
  description: 'We study the layer between language and consequence.',
  url: resolveSiteUrl(),
} as const
