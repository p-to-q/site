import { siteUrl } from '@/lib/site'
import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'
import type { MetadataRoute } from 'next'

const ROUTES = [
  '/',
  '/capricho-arabe',
  '/earmodular',
  '/emochine',
  '/foosball',
  '/latent-electone',
  '/low-light',
  '/motion-shaper',
  '/polymer',
  '/posts/down-to-earth',
  '/posts/papa-james-workshop',
  '/superbooth-25',
  '/trigger-tutorial',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: SITE_LAST_UPDATED_ISO,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
