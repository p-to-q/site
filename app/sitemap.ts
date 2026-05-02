import { siteUrl } from '@/lib/site'
import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'
import type { MetadataRoute } from 'next'

const ROUTES = ['/'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: SITE_LAST_UPDATED_ISO,
    changeFrequency: 'weekly',
    priority: 1,
  }))
}
