import type { Metadata } from "next";
import Link from "next/link";
import { getChapters } from "@/lib/backend";

export const metadata: Metadata = {
  title: "Chapters | Passpilot",
  description: "Browse all study chapters for the Canadian citizenship test.",
};

export default async function ChaptersPage() {
  const chapters = await getChapters();

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Chapters
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Study chapters
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          All chapters are now stored dynamically in the Passpilot database.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/study/${chapter.slug}`}
            className="ud-card p-5 hover:border-[var(--color-muted)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden>
                {chapter.emoji ?? "📖"}
              </span>
              <div>
                <h2 className="font-bold text-[var(--color-ink)]">{chapter.title}</h2>
                <p className="text-sm text-[var(--color-muted)] mt-1">
                  Pages {chapter.page_start}-{chapter.page_end}
                </p>
              </div>
            </div>
            {chapter.description && (
              <p className="text-sm text-[var(--color-muted)] mt-4">
                {chapter.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
