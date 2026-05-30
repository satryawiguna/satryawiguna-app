import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['ui', 'shared-types', 'shared-api', 'shared-store'],
  optimizePackageImports: ['@mui/material', '@mui/icons-material'],
};

export default nextConfig;
