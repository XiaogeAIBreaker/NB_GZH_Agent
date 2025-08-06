/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.feishu.cn',
      },
      {
        protocol: 'https',
        hostname: '*.larksuite.com',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig