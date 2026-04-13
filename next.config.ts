import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js to treat Prisma as external package (very important)
  serverExternalPackages: ["@prisma/client", "pg"],
};

export default nextConfig;