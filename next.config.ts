import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // Ensure proper response codes for crawlers
  experimental: {
    // Enable edge runtime optimizations for better crawler compatibility
  },
};

export default nextConfig;
