import { siteUrl } from '@/lib/site'
import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'
import type { MetadataRoute } from 'next'

const ROUTES: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/commercial-bio', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/work', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/writing', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/writing/strange-tools', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/writing/the-forest-and-the-interface', changeFrequency: 'yearly', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: SITE_LAST_UPDATED_ISO,
    changeFrequency,
    priority,
  }))
}
