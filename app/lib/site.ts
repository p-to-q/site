import { SITE_CONFIG } from './constants'

/**
 * Canonical site URL without trailing slash (safe for `${siteUrl}/path`).
 */
export const siteUrl = SITE_CONFIG.url.replace(/\/$/, '')
