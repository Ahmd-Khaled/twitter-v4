/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.stickpng.com", "image.cnbcfm.com"]
  }
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'image.cnbcfm.com',
  //       port: '',
  //       pathname: '/api/v1/image/**',
  //     },
  //   ],
  // },
}

module.exports = nextConfig
