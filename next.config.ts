import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
      },
    ],
  },
};

export default nextConfig;
