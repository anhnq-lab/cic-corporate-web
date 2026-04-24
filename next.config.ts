import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable X-Powered-By header
  poweredByHeader: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jyohocjsnsyfgfsmjfqx.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "cic.com.vn",
      },
      {
        protocol: "https",
        hostname: "*.cic.com.vn",
      },
      {
        protocol: "http",
        hostname: "www.cic.com.vn",
      },
      {
        protocol: "https",
        hostname: "www.cic.com.vn",
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
// restart trigger
