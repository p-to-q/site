import { SITE_CONFIG } from '@/lib/constants'
import { siteUrl } from '@/lib/site'
import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'

const items = [
  {
    title: 'The Forest and the Interface',
    description: 'A forest has an interface that is not user-friendly.',
    path: '/writing/the-forest-and-the-interface',
    published: '2026-06-01T00:00:00.000Z',
  },
  {
    title: 'Strange Tools',
    description: 'Tools whose strangeness continues to pay rent.',
    path: '/writing/strange-tools',
    published: '2026-05-18T00:00:00.000Z',
  },
]

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character] ?? character)
}

export async function GET() {
  const itemsXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(`${siteUrl}${item.path}`)}</link>
      <description>${escapeXml(item.description)}</description>
      <guid>${escapeXml(`${siteUrl}${item.path}`)}</guid>
      <pubDate>${new Date(item.published).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.title)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(SITE_LAST_UPDATED_ISO).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
