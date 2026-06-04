"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blogs/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-12">
        <p className="text-[var(--color-muted)]">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-12 text-center">
        <p className="text-[var(--color-muted)]">Blog post not found.</p>
        <Link href="/" className="ud-btn ud-btn-primary mt-4 inline-flex">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="text-sm text-[var(--color-muted)] mb-4">
        <Link href="/" className="ud-link">
          Home
        </Link>{" "}
        / Blog
      </div>
      <article>
        {blog.image && (
          <div className="rounded-md overflow-hidden mb-6">
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
      <div className="mt-10">
        <Link href="/" className="ud-btn ud-btn-ghost">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
