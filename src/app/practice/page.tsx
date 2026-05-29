"use client";

import Link from "next/link";
import { useUserState } from "@/lib/storage";
import { chapters, CHAPTER_EMOJI, getQuestionsForChapter } from "@/lib/content";

export default function PracticeIndexPage() {
  const [state] = useUserState();

  // Show weakest chapter first
  const sorted = [...chapters].filter((c) => c.slug !== "study" && c.slug !== "applying").sort((a, b) => {
    const ma = state.chapters[a.slug];
    const mb = state.chapters[b.slug];
    const sa = ma && ma.practiceTotal > 0 ? ma.practiceCorrect / ma.practiceTotal : 0;
    const sb = mb && mb.practiceTotal > 0 ? mb.practiceCorrect / mb.practiceTotal : 0;
    return sa - sb;
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:py-10">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Practice
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
          Pick a chapter to drill
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          Weakest first. Each session: 5–10 questions with instant explanations
          and citations.
        </p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sorted.map((c) => {
          const cp = state.chapters[c.slug];
          const qs = getQuestionsForChapter(c.slug).length;
          const mastery =
            cp && cp.practiceTotal > 0
              ? Math.round((cp.practiceCorrect / cp.practiceTotal) * 100)
              : null;
          return (
            <li key={c.slug}>
              <Link
                href={`/practice/${c.slug}`}
                className="ud-card p-4 flex items-center gap-3 hover:border-[var(--color-muted)] transition-colors"
              >
                <span className="text-2xl" aria-hidden>
                  {CHAPTER_EMOJI[c.slug] ?? "📖"}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-[var(--color-ink)] leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    {qs} questions ·{" "}
                    {mastery !== null ? `${mastery}% mastery` : "Untried"}
                  </p>
                </div>
                <span className="ud-btn ud-btn-secondary ud-btn-sm">
                  Drill
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
