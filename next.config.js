/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false, // Temporarily disabled to check if it’s causing the issue
});

const nextConfig = {
  // Experimental configurations temporarily commented out to test for issues
  // experimental: {
  //   optimizePackageImports: ['react-icons'],
  //   optimizeCss: true,
  // },

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
    // Temporarily commenting out custom alias for testing
    // config.resolve.alias['@ant-design/cssinjs'] = '@ant-design/cssinjs/lib';
    
    // Adding logging to identify potential issues
    console.log("Running Webpack Configuration");

    return config;
  },

  // Temporarily comment out transpilePackages to test for issues
  // transpilePackages: ['@ant-design', 'antd'],
};

module.exports = withBundleAnalyzer(nextConfig);
