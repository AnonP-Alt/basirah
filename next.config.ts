import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["mac.me"],
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig
