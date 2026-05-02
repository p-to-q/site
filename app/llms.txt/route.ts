import { siteUrl } from '@/lib/site'
import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'

const llms = `# Yiming Sun

> Personal site about electronic musical instruments, research projects, sounds, posts, and events.

## Preferred entry
- ${siteUrl}/

## Reading guidance
- This is a personal portfolio and publishing site.
- Most pages are static and canonical under ${siteUrl}.
- Use page-level metadata descriptions for quick summaries.

## Main sections
- Projects
- Posts
- Sounds
- Events

## Key pages
- ${siteUrl}/earmodular
- ${siteUrl}/latent-electone
- ${siteUrl}/motion-shaper
- ${siteUrl}/foosball
- ${siteUrl}/capricho-arabe
- ${siteUrl}/low-light
- ${siteUrl}/posts/down-to-earth
- ${siteUrl}/posts/papa-james-workshop
- ${siteUrl}/trigger-tutorial
- ${siteUrl}/polymer
- ${siteUrl}/emochine
- ${siteUrl}/superbooth-25

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

