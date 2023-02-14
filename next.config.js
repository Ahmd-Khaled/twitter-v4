/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com","assets.stickpng.com", "image.cnbcfm.com", "lh3.googleusercontent.com", "https://lh3.googleusercontent.com/a/"]
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
