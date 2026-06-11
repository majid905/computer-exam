import { MetadataRoute } from "next";
import { listBlogs, listChapters, listDictionaryTermSlugs, listFaqs } from "@/lib/backend";
import { toSlug } from "@/lib/slug";

const BASE_URL = "https://www.passpilot.ca";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, chapters, dictionaryTerms, faqs] = await Promise.all([
    listBlogs().catch(() => []),
    listChapters().catch(() => []),
    listDictionaryTermSlugs().catch(() => []),
    listFaqs().catch(() => []),
  ]);

  const blogSlugs = blogs.map((b) => b.slug).filter(Boolean);
  const chapterSlugs = chapters.map((c) => c.slug).filter(Boolean);
  const dictionarySlugs = dictionaryTerms.map((d) => d.slug).filter(Boolean);
  const faqSlugs = faqs.map((f) => toSlug(f.question)).filter(Boolean);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/practice`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/study`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/mock-exam`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/chapters`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/language`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/provincial`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/register`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    // Dictionary glossary
    { url: `${BASE_URL}/dictionary`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    // SEO landing pages
    { url: `${BASE_URL}/canadian-citizenship-practice-test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/citizenship-test-questions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/discover-canada-practice-test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/free-citizenship-test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/citizenship-test-ontario`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/citizenship-test-toronto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/canadian-citizenship-test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/canadian-citizenship-test-practice`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/canadian-citizenship-test-questions-and-answers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/canadian-citizenship-test-mock-exam`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/discover-canada-summary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/discover-canada-important-questions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/how-to-pass-canadian-citizenship-test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/how-hard-is-the-canadian-citizenship-test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/canadian-citizenship-eligibility`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/canadian-citizenship-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/canadian-citizenship-interview-questions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/ai-citizenship-coach`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/citizenship-dictionary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/citizenship-faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const chapterRoutes: MetadataRoute.Sitemap = chapterSlugs.map((slug) => ({
    url: `${BASE_URL}/study/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const dictionaryRoutes: MetadataRoute.Sitemap = dictionarySlugs.map((slug) => ({
    url: `${BASE_URL}/dictionary/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const faqRoutes: MetadataRoute.Sitemap = faqSlugs.map((slug) => ({
    url: `${BASE_URL}/faq/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...blogRoutes, ...chapterRoutes, ...dictionaryRoutes, ...faqRoutes];
}
