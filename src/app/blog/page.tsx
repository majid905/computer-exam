import type { Metadata } from "next";
import Link from "next/link";
import { listBlogsMeta } from "@/lib/backend";

// DB is only available at request time on the Worker.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Canadian Citizenship Test Tips & Guides",
  description:
    "Study tips, practice strategies, and guides for the Canadian citizenship test. Learn how to prepare, what to study, and how to pass.",
  alternates: { canonical: "/blog/" },
};

export default async function BlogIndexPage() {
  const blogs = await listBlogsMeta();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Blog
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Canadian citizenship test tips & guides
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          Practical advice to help you study, practice, and pass the Canadian
          citizenship knowledge test.
        </p>
      </header>

      {blogs.length === 0 ? (
        <p className="text-[var(--color-muted)]">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {blogs.map((b) => (
            <Link
              key={b.id}
              href={`/blog/${b.slug}`}
              className="ud-card p-6 block hover:shadow-md transition-shadow"
            >
              {b.image && (
                <div className="rounded-md overflow-hidden mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt={b.title} className="w-full h-40 object-cover" />
                </div>
              )}
              <h2 className="text-xl font-bold text-[var(--color-ink)]">{b.title}</h2>
              {b.short_description && (
                <p className="mt-2 text-[var(--color-muted)]">{b.short_description}</p>
              )}
              <span className="ud-link mt-3 inline-block text-sm font-semibold">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
