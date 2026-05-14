import { SITE_CONFIG } from '@/lib/constants'
import { siteUrl } from '@/lib/site'

export async function GET() {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${SITE_CONFIG.title}</title>
        <link>${siteUrl}</link>
        <description>${SITE_CONFIG.description}</description>
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
