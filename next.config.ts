import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["mac.me", process.env.VERCEL_URL!],
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig
