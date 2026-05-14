import { SITE_CONFIG } from './constants'
import { siteUrl } from './site'

/** Organization + WebSite graph for JSON-LD (layout `<script type="application/ld+json">`). */
export function getSiteSchemaOrgGraph() {
  const origin = siteUrl
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: SITE_CONFIG.name,
        url: origin,
        email: 'hi@ptoq.io',
        sameAs: ['https://github.com/p-to-q'],
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: { '@id': `${origin}/#organization` },
      },
    ],
  }
}
