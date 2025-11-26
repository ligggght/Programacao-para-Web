import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/PW', // o caminho do seu projeto no servidor
  assetPrefix: '/PW', // prefixo para assets (_next/*)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/**',
      },
    ],
  },
};

export default nextConfig;
