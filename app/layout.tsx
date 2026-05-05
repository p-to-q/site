import './global.css'
import type { Metadata } from 'next'
import { FontDisplayGate } from '@/components/layout/font-display-gate'
import SiteChrome from '@/components/layout/site-chrome'
import { SITE_CONFIG } from '@/lib/constants'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

/** All Camingo Mono woff2 cuts — preload so `document.fonts.ready` resolves quickly when possible. */
const CAMINGO_PRELOAD_WOFF2 = [
  'CamingoMono-Regular.woff2',
  'CamingoMono-SemiBold.woff2',
  'CamingoMono-Bold.woff2',
  'CamingoMono-SemiBoldItalic.woff2',
  'CamingoMono-Light.woff2',
  'CamingoMono-ExtraLightItalic.woff2',
] as const

const CAMINGO_FONT_DIR = '/fonts/CamingoMono%20Font/'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ backgroundColor: 'var(--site-bg)' }}>
      <head>
        {CAMINGO_PRELOAD_WOFF2.map((file, index) => (
          <link
            key={file}
            rel="preload"
            href={`${CAMINGO_FONT_DIR}${file}`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            fetchPriority={index === 0 ? 'high' : undefined}
          />
        ))}
      </head>
      <body
        className="antialiased mx-4 mt-8 max-w-[36rem] font-sans sm:mx-6 sm:max-w-2xl lg:mx-auto"
        style={{
          backgroundColor: 'var(--site-bg)',
          color: 'var(--site-text)',
          // body mt-8 (2rem) + SiteChrome main mt-6 (1.5rem) — home logo uses this to sit at 1/3 viewport
          ['--home-logo-viewport-offset' as string]: '3.5rem',
        }}
      >
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<style>.font-gate-pending{visibility:visible!important}</style>',
          }}
        />
        <FontDisplayGate>
          <SiteChrome>{children}</SiteChrome>
        </FontDisplayGate>
      </body>
    </html>
  )
}
