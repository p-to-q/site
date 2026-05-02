import { siteUrl } from '@/lib/site'
import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'

const llms = `# [p → q]

> Experimental craft and research over scale.

## Preferred entry
- ${siteUrl}/

## Machine-readable endpoints
- Sitemap: ${siteUrl}/sitemap.xml
- RSS: ${siteUrl}/rss
- Robots: ${siteUrl}/robots.txt
- LLM full map: ${siteUrl}/llms-full.txt

## Freshness
- Last content/build update: ${SITE_LAST_UPDATED_ISO}
`

export async function GET() {
  return new Response(llms, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
