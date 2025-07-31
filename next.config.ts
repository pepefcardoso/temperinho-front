import { withSentryConfig } from '@sentry/nextjs';

const securityHeaders = [
  {
    // Força o uso de HTTPS (HSTS)
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // Impede que o navegador "adivinhe" o tipo de conteúdo, protegendo contra ataques de "MIME sniffing"
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // Controla o que é enviado no cabeçalho Referer, melhorando a privacidade
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    // Impede que sua página seja exibida em um <iframe> em outros sites, protegendo contra "clickjacking"
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

const sentryWebpackPluginOptions = {
  hideSourceMaps: process.env.NODE_ENV === 'development',
  silent: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
