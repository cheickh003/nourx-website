import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/payment/success',
        destination: '/payment/confirmation',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
