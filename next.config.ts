import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  allowedDevOrigins: ["192.168.128.1"],
  experimental: {
    // Inline the small (~8.5KB gz) CSS into the HTML <head> so the browser
    // skips a separate render-blocking stylesheet request. Improves FCP/LCP.
    inlineCss: true,
  },
};

export default nextConfig;

// Injects Cloudflare bindings into `next dev` (no-op for production builds).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
