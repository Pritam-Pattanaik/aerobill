import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    // Optimize stale times for better caching performance
    staleTimes: {
      dynamic: 30,    // Cache dynamic pages for 30 seconds
      static: 180,    // Cache static pages for 3 minutes
    },
  },
};

export default nextConfig;
