import './global.css'
import type { Metadata } from 'next'
import { preload } from 'react-dom'
import { FontDisplayGate } from '@/components/layout/font-display-gate'
import SiteChrome from '@/components/layout/site-chrome'
import { SITE_CONFIG } from '@/lib/constants'
import { getSiteSchemaOrgGraph } from '@/lib/schema-org-json-ld'
import { siteUrl } from '@/lib/site'

const defaultOgImage = {
  url: '/og',
  width: 1200,
  height: 630,
  alt: SITE_CONFIG.name,
} as const

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: '/',
    siteName: SITE_CONFIG.name,
    locale: 'en_US',
    type: 'website',
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [defaultOgImage.url],
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
  alternates: {
    types: {
      'application/rss+xml': '/rss',
    },
  },
  other: {
    'humans': '/humans.txt',
  },
}

/** Keep the complete local Camingo family warm before the site's all-at-once reveal. */
const CAMINGO_PRELOAD_WOFF2 = [
  'CamingoMono-Regular.woff2',
  'CamingoMono-Light.woff2',
  'CamingoMono-SemiBold.woff2',
  'CamingoMono-SemiBoldItalic.woff2',
  'CamingoMono-ExtraLightItalic.woff2',
  'CamingoMono-Bold.woff2',
] as const

const CAMINGO_FONT_DIR = '/fonts/CamingoMono%20Font/'

const schemaOrgJsonLd = JSON.stringify(getSiteSchemaOrgGraph())

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  CAMINGO_PRELOAD_WOFF2.forEach((file, index) => {
    preload(`${CAMINGO_FONT_DIR}${file}`, {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
      fetchPriority: index === 0 ? 'high' : undefined,
    })
  })

  return (
    <html lang="en" suppressHydrationWarning style={{ backgroundColor: 'var(--site-bg)' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaOrgJsonLd }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,700&family=Noto+Serif+SC:wght@400&display=swap"
          rel="stylesheet"
        />
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
        <a href="#main-content" className="skip-link">Skip to content</a>
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
