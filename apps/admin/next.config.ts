import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'shared-types', 'shared-api', 'shared-store'],
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
      {
        protocol: 'https',
        hostname: '*.digitaloceanspaces.com',
      },
    ],
  },
};

export default nextConfig;
