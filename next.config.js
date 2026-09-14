const path = require('path')
const { execFileSync } = require('node:child_process')

const LAST_UPDATED_FALLBACK = '2026-07-05T09:25:43+08:00'

function getSiteLastUpdatedIso() {
  if (process.env.SITE_LAST_UPDATED_ISO) return process.env.SITE_LAST_UPDATED_ISO
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim() || LAST_UPDATED_FALLBACK
  } catch {
    return LAST_UPDATED_FALLBACK
  }
}

// Force React from this repo (avoids mixing with e.g. ~/node_modules/react).
const reactAbsolute = path.join(__dirname, 'node_modules/react')
const reactDomAbsolute = path.join(__dirname, 'node_modules/react-dom')
const reactJsxRuntime = path.join(reactAbsolute, 'jsx-runtime.js')
const reactJsxDevRuntime = path.join(reactAbsolute, 'jsx-dev-runtime.js')
const reactTurbopack = './node_modules/react'
const reactDomTurbopack = './node_modules/react-dom'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  env: {
    SITE_LAST_UPDATED_ISO: getSiteLastUpdatedIso(),
  },
  turbopack: {
    resolveAlias: {
      react: reactTurbopack,
      'react-dom': reactDomTurbopack,
      'react/jsx-runtime': `${reactTurbopack}/jsx-runtime.js`,
      'react/jsx-dev-runtime': `${reactTurbopack}/jsx-dev-runtime.js`,
    },
  },
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/works', destination: '/work', permanent: true },
      { source: '/writings', destination: '/writing', permanent: true },
      { source: '/community-activist', destination: '/', permanent: true },
      { source: '/cv', destination: '/', permanent: true },
      { source: '/resume', destination: '/', permanent: true },
      { source: '/logs', destination: '/', permanent: true },
      { source: '/blogs', destination: '/', permanent: true },
      { source: '/track-recommendation', destination: '/', permanent: true },
      { source: '/modular-commune-24', destination: '/', permanent: true },
      { source: '/modular-commune-25', destination: '/', permanent: true },
      // Legacy slugs → home (pages removed)
      { source: '/latent_electone', destination: '/', permanent: true },
      { source: '/latent-electone', destination: '/', permanent: true },
      { source: '/motion_shaper', destination: '/', permanent: true },
      { source: '/motion-shaper', destination: '/', permanent: true },
      { source: '/low_light', destination: '/', permanent: true },
      { source: '/low-light', destination: '/', permanent: true },
      { source: '/capricho_arabe', destination: '/', permanent: true },
      { source: '/capricho-arabe', destination: '/', permanent: true },
      { source: '/trigger_tutorial', destination: '/', permanent: true },
      { source: '/trigger-tutorial', destination: '/', permanent: true },
      { source: '/polymer4', destination: '/', permanent: true },
      { source: '/polymer', destination: '/', permanent: true },
      { source: '/emochine3', destination: '/', permanent: true },
      { source: '/emochine', destination: '/', permanent: true },
      { source: '/posts/down_to_earth', destination: '/', permanent: true },
      { source: '/posts/down-to-earth', destination: '/', permanent: true },
      { source: '/posts/papa-james-workshop', destination: '/', permanent: true },
      { source: '/earmodular', destination: '/', permanent: true },
      { source: '/foosball', destination: '/', permanent: true },
      { source: '/superbooth-25', destination: '/', permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Polling avoids EMFILE (too many open files) on macOS where native watchers fail;
  // without it, dev can resolve every route as 404.
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: reactAbsolute,
      'react-dom': reactDomAbsolute,
      'react/jsx-runtime': reactJsxRuntime,
      'react/jsx-dev-runtime': reactJsxDevRuntime,
    }
    return config
  },
}

module.exports = nextConfig
