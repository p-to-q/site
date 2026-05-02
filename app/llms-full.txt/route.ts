import { siteUrl } from '@/lib/site'
import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'

const full = `# Yiming Sun — Full LLM Map

## Site
- Name: Yiming Sun
- Base URL: ${siteUrl}
- Last update: ${SITE_LAST_UPDATED_ISO}

## Home
- ${siteUrl}/

## Projects
- ${siteUrl}/earmodular
- ${siteUrl}/latent-electone
- ${siteUrl}/motion-shaper
- ${siteUrl}/foosball

## Posts
- ${siteUrl}/posts/down-to-earth
- ${siteUrl}/posts/papa-james-workshop

## Sounds
- ${siteUrl}/capricho-arabe
- ${siteUrl}/low-light

## Events
- ${siteUrl}/trigger-tutorial
- ${siteUrl}/polymer
- ${siteUrl}/emochine
- ${siteUrl}/superbooth-25

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

