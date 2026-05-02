const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  outputFileTracingRoot: path.join(__dirname),
  // Geist ships ESM subpaths (`geist/font/sans`); transpiling fixes webpack resolution with Next 16.
  transpilePackages: ['geist'],
  async redirects() {
    return [
      { source: '/community-activist', destination: '/', permanent: true },
      { source: '/latent_electone', destination: '/latent-electone', permanent: true },
      { source: '/motion_shaper', destination: '/motion-shaper', permanent: true },
      { source: '/low_light', destination: '/low-light', permanent: true },
      { source: '/capricho_arabe', destination: '/capricho-arabe', permanent: true },
      { source: '/trigger_tutorial', destination: '/trigger-tutorial', permanent: true },
      { source: '/cv', destination: '/', permanent: true },
      { source: '/resume', destination: '/', permanent: true },
      { source: '/polymer4', destination: '/polymer', permanent: true },
      { source: '/emochine3', destination: '/emochine', permanent: true },
      { source: '/logs', destination: '/', permanent: true },
      { source: '/blogs', destination: '/', permanent: true },
      { source: '/posts/down_to_earth', destination: '/posts/down-to-earth', permanent: true },
      { source: '/track-recommendation', destination: '/', permanent: true },
      {
        source: '/resources/videos/Capricho%20Arabe.mp4',
        destination: '/resources/videos/capricho-arabe.mp4',
        permanent: true,
      },
      {
        source: '/resources/videos/Low%20Lamp.mp4',
        destination: '/resources/videos/low-light.mp4',
        permanent: true,
      },
      { source: '/modular-commune-24', destination: '/', permanent: true },
      { source: '/modular-commune-25', destination: '/', permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
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
    return config
  },
}

module.exports = nextConfig


