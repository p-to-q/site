import { siteUrl } from '@/lib/site'

export async function GET() {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Yiming Sun</title>
        <link>${siteUrl}</link>
        <description>experimental craft and research over scale.</description>
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
