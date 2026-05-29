"use client";

import Link from "next/link";
import { useUserState } from "@/lib/storage";
import { chapters, CHAPTER_EMOJI, getQuestionsForChapter } from "@/lib/content";
import { ProgressBar } from "@/components/ui/Progress";

export default function StudyIndexPage() {
  const [state] = useUserState();

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:py-10">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Study
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
          Discover Canada — 12 chapters
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          The complete official IRCC study guide. Each chapter is split into
          short, readable sections.
        </p>
      </header>

      <ul className="space-y-3">
        {chapters.map((c, i) => {
          const cp = state.chapters[c.slug];
          const qs = getQuestionsForChapter(c.slug).length;
          const mastery =
            cp && cp.practiceTotal > 0
              ? Math.round((cp.practiceCorrect / cp.practiceTotal) * 100)
              : null;
          return (
            <li key={c.slug}>
              <Link
                href={`/study/${c.slug}`}
                className="ud-card p-5 flex items-center gap-4 hover:border-[var(--color-muted)] transition-colors"
              >
                <span className="text-2xl shrink-0" aria-hidden>
                  {CHAPTER_EMOJI[c.slug] ?? "📖"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                      Chapter {i + 1}
                    </span>
                    {cp?.read && (
                      <span className="ud-chip ud-chip-success">Read</span>
                    )}
                  </div>
                  <h2 className="font-bold text-[var(--color-ink)] mt-0.5 leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    Pages {c.pageStart}–{c.pageEnd} · {qs} practice questions
                  </p>
                </div>
                <div className="hidden sm:block w-40 shrink-0">
                  <ProgressBar value={mastery ?? 0} />
                  <p className="text-xs text-[var(--color-muted)] mt-1.5 text-right">
                    {mastery !== null ? `${mastery}% mastery` : "—"}
                  </p>
                </div>
                <span className="text-[var(--color-muted)] text-xl">›</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
