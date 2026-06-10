import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, listBlogsMeta } from "@/lib/backend";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, SITE_URL, OG_IMAGE } from "@/lib/seo";

// Words too common across these posts to signal topical relatedness.
const STOP = new Set([
  "the", "a", "an", "to", "for", "on", "of", "in", "is", "are", "your", "you",
  "what", "how", "and", "with", "canadian", "citizenship", "test", "canada",
]);

// Pick up to `limit` other posts, ranked by shared meaningful title words so the
// most topically related ones surface first (everything here is on-topic, so
// the rest just fill in). This builds an internal-link mesh between posts.
function relatedPosts(
  current: { slug: string; title: string },
  all: { slug: string; title: string }[],
  limit = 6
) {
  const words = (t: string) =>
    new Set(
      t.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w))
    );
  const cur = words(current.title);
  return all
    .filter((b) => b.slug !== current.slug)
    .map((b) => {
      const w = words(b.title);
      let score = 0;
      for (const x of w) if (cur.has(x)) score++;
      return { b, score };
    })
    .sort((a, z) => z.score - a.score)
    .slice(0, limit)
    .map((x) => x.b);
}

// DB is only available at request time on the Worker, not at build time.
export const dynamic = "force-dynamic";

// Per-post <title> and description + Open Graph article card. Runs on the server
// so the right tags are in the HTML the crawler receives.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Blog post not found" };

  const description = blog.short_description ?? undefined;
  return {
    title: blog.title,
    description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: blog.title,
      description,
      url: `${SITE_URL}/blog/${slug}/`,
      // SVG isn't reliably rendered by social platforms — use the post's own
      // image only if it's a raster, otherwise fall back to the site default.
      images: [
        blog.image && !blog.image.endsWith(".svg") ? blog.image : OG_IMAGE,
      ],
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at || blog.created_at,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  // Renders Next's 404 page if the slug doesn't exist.
  if (!blog) notFound();

  // Other posts to cross-link to (internal linking for SEO).
  const allBlogs = await listBlogsMeta();
  const related = relatedPosts(blog, allBlogs);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      {/* Structured data: tells search/AI this is an Article. */}
      <JsonLd data={articleSchema(blog)} />

      <div className="text-sm text-[var(--color-muted)] mb-4">
        <Link href="/" className="ud-link">
          Home
        </Link>{" "}
        / Blog
      </div>
      <article>
        {blog.image && (
          <div className="rounded-md overflow-hidden mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          {blog.title}
        </h1>
        {blog.created_at && (
          <p className="text-sm text-[var(--color-muted)] mt-2">
            {new Date(blog.created_at).toLocaleDateString()}
          </p>
        )}
        {blog.short_description && (
          <p className="mt-4 text-lg text-[var(--color-ink-2)] leading-relaxed">
            {blog.short_description}
          </p>
        )}
        {blog.content && (
          <div
            className="mt-8 prose prose-lg max-w-none text-[var(--color-ink-2)] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        )}
      </article>

      {related.length > 0 && (
        <aside className="mt-12 border-t border-[var(--color-border)] pt-8">
          <h2 className="text-xl font-bold text-[var(--color-ink)] mb-4">
            Related articles
          </h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}/`} className="ud-link font-semibold">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mt-10">
        <Link href="/blog/" className="ud-btn ud-btn-ghost">
          ← Back to all articles
        </Link>
      </div>
    </div>
  );
}
