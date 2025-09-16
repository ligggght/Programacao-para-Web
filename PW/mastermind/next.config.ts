import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/AA/aa7', // o caminho do seu projeto no servidor
  assetPrefix: '/AA/aa7/', // prefixo para assets (_next/*)
};

export default nextConfig;
