/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  experimental: {
    optimizePackageImports: ['react-icons'],
    optimizeCss: true, // Merged experimental configurations
  },
  images: {
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
    config.resolve.alias['@ant-design/cssinjs'] = '@ant-design/cssinjs/lib';
    return config;
  },
  transpilePackages: ['@ant-design', 'antd'],
};

module.exports = withBundleAnalyzer(nextConfig);
