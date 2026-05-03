import { siteUrl } from '@/lib/site'
import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'

const llms = `# [p → q]

> An independent research practice working on the gap between what language models can express and what happens because of it.

## Pages
- About: ${siteUrl}/
- Work: ${siteUrl}/work
- Writing: ${siteUrl}/writing

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
