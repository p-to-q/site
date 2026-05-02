import { siteUrl } from '@/lib/site'
import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'

const full = `# [p → q] — Full LLM Map

## Site
- Base URL: ${siteUrl}
- Last update: ${SITE_LAST_UPDATED_ISO}

## Pages
- ${siteUrl}/

## Feeds and discovery
- ${siteUrl}/sitemap.xml
- ${siteUrl}/rss
- ${siteUrl}/robots.txt
- ${siteUrl}/llms.txt
`

export async function GET() {
  return new Response(full, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
