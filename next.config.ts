import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  allowedDevOrigins: ["192.168.128.1"],
};

export default nextConfig;

// Injects Cloudflare bindings into `next dev` (no-op for production builds).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
