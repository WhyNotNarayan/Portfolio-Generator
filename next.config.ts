import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js to treat Prisma as external package (very important)
  serverExternalPackages: ["@prisma/client", "pg"],

  // Best configuration for Turbopack + Prisma in Next.js 16
  experimental: {
    turbo: {
      resolveAlias: {
        ".prisma/client/default": "./node_modules/.prisma/client/default.js",
        "@prisma/client": "./node_modules/@prisma/client",
      },
    },
  },
};

export default nextConfig;