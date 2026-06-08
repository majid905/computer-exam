import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { listBlogs } from "@/lib/backend";

// Runs at request time on the Worker (where the D1 binding exists) rather than
// at build time (where it doesn't) — otherwise the DB calls below would throw
// during `next build`.
export const dynamic = "force-dynamic";

// Next.js serves this at /sitemap.xml. It lists every public URL so search
// engines and AI crawlers can find them. Static marketing/content pages are
// listed by hand; blog posts are pulled from the database so new posts appear
// in the sitemap automatically.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Trailing slashes match the site's canonical URLs (next.config trailingSlash:
  // true), so crawlers don't hit a redirect for every sitemap entry.
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pricing/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog/`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/chapters/`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/language/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/provincial/`, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Pull published blog posts. If the DB is briefly unavailable, still return
  // the static pages rather than failing the whole sitemap.
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await listBlogs();
    blogPages = blogs.map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}/`,
      lastModified: new Date(b.updated_at || b.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // ignore — return static pages only
  }

  return [...staticPages, ...blogPages];
}
