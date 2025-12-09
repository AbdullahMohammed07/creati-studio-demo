import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove standalone output for Vercel compatibility
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Optimize for Vercel
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;