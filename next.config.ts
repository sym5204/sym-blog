import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'standalone',
  images: {
    domains: ['sym5204.cn'],
    unoptimized: true
  }
};

export default nextConfig;
