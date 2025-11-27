import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: '/PW',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/**',
      },
    ],
    // necessario por conta do uso do dicebear
    // caso contrario o next tenta otimizar como uma imagem local
    unoptimized: true,
  },
};

export default nextConfig;
