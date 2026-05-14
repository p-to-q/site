import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/constants'

export function GET(request: Request) {
  const url = new URL(request.url)
  const titleParam = url.searchParams.get('title')?.trim()
  const title = titleParam || SITE_CONFIG.title
  const subtitle = url.searchParams.get('subtitle')?.trim() || SITE_CONFIG.description

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col justify-center px-16 py-14"
        style={{ backgroundColor: '#DDDDDD', color: '#333333' }}
      >
        <div tw="flex flex-col gap-6">
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
    }
  )
}
