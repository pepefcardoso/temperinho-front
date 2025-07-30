import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'temperinho-caseiro.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  sentry: {
    // Não envia source maps para o Sentry durante o desenvolvimento local (`next dev`)
    hideSourceMaps: process.env.NODE_ENV === 'development',

    // Podemos habilitar isso depois para evitar que ad-blockers bloqueiem o Sentry
    // tunnelRoute: "/monitoring",
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
