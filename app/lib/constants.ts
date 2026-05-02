/** Used only when `NEXT_PUBLIC_BASE_URL` is unset (local dev). Production should set the env var. */
const SITE_URL_DEV_FALLBACK = 'http://localhost:3000'

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL?.trim()
  const fromVercel = process.env.VERCEL_URL?.trim()
    ? `https://${process.env.VERCEL_URL.trim()}`
    : ''
  const raw = fromEnv || fromVercel || SITE_URL_DEV_FALLBACK
  try {
    return new URL(raw).href
  } catch {
    return new URL(SITE_URL_DEV_FALLBACK).href
  }
}

export const SITE_CONFIG = {
  name: '[p → q]',
  title: '[p → q]',
  description: 'We study the layer between language and consequence.',
  url: resolveSiteUrl(),
} as const
