import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['bcalabs.org'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
