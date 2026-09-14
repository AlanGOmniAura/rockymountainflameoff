import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.google.com",
      },
    ],
    // Allow all local images (static) AND proxy images (dynamic)
    localPatterns: [
      {
        pathname: '/images/**',
      },
      {
        pathname: '/api/image-proxy',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/events/marblejam',
        destination: '/marblejam',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
