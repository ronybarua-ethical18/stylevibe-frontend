/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   'thebeardclub.com',
    //   'cdn.shopify.com',
    //   'theruggedbros.com',
    //   'm.media-amazon.com',
    //   'i.pinimg.com',
    //   'u-send.s3.eu-west-2.amazonaws.com',
    //   'stylecraze'
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  webpack(config) {
    config.resolve.alias['@ant-design/cssinjs'] = '@ant-design/cssinjs/lib'

    return config
  },
  // Add these configurations:
  transpilePackages: ['@ant-design', 'antd'],
  experimental: {
    optimizeCss: true, // This is still experimental
  },
}

module.exports = nextConfig
