import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/constants'

function readText(url: URL, name: string, fallback: string, maxLength: number): string {
  const value = url.searchParams
    .get(name)
    ?.replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return value ? value.slice(0, maxLength) : fallback
}

export function GET(request: Request) {
  const url = new URL(request.url)
  const title = readText(url, 'title', SITE_CONFIG.title, 80)
  const subtitle = readText(url, 'subtitle', SITE_CONFIG.description, 180)

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col justify-center px-16 py-14"
        style={{ backgroundColor: '#DDDDDD', color: '#333333' }}
      >
        <div tw="flex flex-col" style={{ gap: 24 }}>
          <p tw="text-5xl font-bold leading-tight tracking-tight">{title}</p>
          <p tw="text-3xl leading-snug opacity-90" style={{ maxWidth: 900 }}>
            {subtitle}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  )
}
