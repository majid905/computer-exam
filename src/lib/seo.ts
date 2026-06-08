// Single source of truth for SEO-related constants.
// Everything that needs the public site URL (robots, sitemap, metadata,
// structured data) imports from here, so we never hardcode the domain twice.
//
// Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. a preview deploy);
// falls back to the production domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://passpilot.ca";

export const SITE_NAME = "PassPilot";

export const SITE_DESCRIPTION =
  "Study, practice, and simulate the Canadian citizenship knowledge test with AI-powered coaching.";

// The default raster social-share image (served by the opengraph-image file
// convention). Used as a fallback for pages whose own image is an SVG, which
// social platforms don't render reliably.
export const OG_IMAGE = `${SITE_URL}/opengraph-image.png`;

// Paths that should never be indexed (private app, auth, admin, API).
export const DISALLOWED_PATHS = [
  "/app",
  "/onboarding",
  "/settings",
  "/progress",
  "/mock-exam",
  "/practice",
  "/study",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/users",
  "/admin",
  "/api",
];

// ===================== Structured data (JSON-LD) builders =====================
// Each function returns a schema.org object. They're rendered into pages via the
// <JsonLd> component. See https://schema.org for the vocabulary.

// Describes the company/brand. Belongs on the home page.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description: SITE_DESCRIPTION,
  };
}

// Describes the website itself. Enables the "sitelinks search box" in Google.
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

// Describes a single blog post. Belongs on /blog/[slug].
export function articleSchema(blog: {
  title: string;
  slug: string;
  short_description: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.short_description ?? undefined,
    image: blog.image ? [blog.image] : undefined,
    datePublished: blog.created_at,
    dateModified: blog.updated_at || blog.created_at,
    url: `${SITE_URL}/blog/${blog.slug}/`,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
    },
  };
}

// Describes a list of Q&A pairs. Belongs on /faq. Eligible for Google's
// expandable FAQ rich result and heavily used by AI answer engines.
export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
