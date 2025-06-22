import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure static export works
  experimental: {
    // Disable server components for static export
  },
};

export default nextConfig;
