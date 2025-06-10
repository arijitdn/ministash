import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/typescript-config"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
