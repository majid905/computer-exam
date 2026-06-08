import type { MetadataRoute } from "next";
import { SITE_URL, DISALLOWED_PATHS } from "@/lib/seo";

// Next.js turns this file into /robots.txt automatically.
// It tells crawlers (Google, Bing, and AI bots like GPTBot/ClaudeBot) which
// paths they may read, and points them at our sitemap so they can discover
// every public page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOWED_PATHS,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
