import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
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

const cx = (...classes: (string | undefined | null | false)[]): string => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(GeistSans.variable)}
      style={{ backgroundColor: 'var(--site-bg)' }}
    >
      <body
        className="antialiased mx-4 mt-8 max-w-[36rem] lowercase font-sans sm:mx-6 sm:max-w-2xl lg:mx-auto"
        style={{ backgroundColor: 'var(--site-bg)', color: 'var(--site-text)' }}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
