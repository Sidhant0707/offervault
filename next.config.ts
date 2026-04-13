import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    // This allows the build to succeed even if there are lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows the build to succeed even if there are type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;