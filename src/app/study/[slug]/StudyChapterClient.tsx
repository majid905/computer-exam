"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserState, applyDailyStudy } from "@/lib/storage";
import {
  chapters,
  CHAPTER_EMOJI,
  CHAPTER_ORDER,
  getChapter,
  getQuestionsForChapter,
  getSummary,
  officialPdfPageUrl,
} from "@/lib/content";

export default function StudyChapterClient({ slug }: { slug: string }) {
  const router = useRouter();
  const chapter = getChapter(slug);
  const [, update] = useUserState();

  useEffect(() => {
    if (!chapter) return;
    update((s) => {
      const next = applyDailyStudy(s);
      const cp = next.chapters[chapter.slug] ?? {
        read: false,
        practiceAttempts: 0,
        practiceCorrect: 0,
        practiceTotal: 0,
      };
      return {
        ...next,
        chapters: {
          ...next.chapters,
          [chapter.slug]: {
            ...cp,
            read: true,
            lastRead: new Date().toISOString(),
          },
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter?.slug]);

  if (!chapter) {
    notFound();
  }

  const summary = getSummary(chapter.slug);
  const qs = getQuestionsForChapter(chapter.slug);

  const idx = CHAPTER_ORDER.indexOf(chapter.slug);
  const prevSlug = CHAPTER_ORDER.slice(0, idx).reverse().find(
    (s) => s !== "study",
  );
  const nextSlug = CHAPTER_ORDER.slice(idx + 1).find((s) => s !== "applying");
  const prev = prevSlug ? chapters.find((c) => c.slug === prevSlug) : null;
  const next = nextSlug ? chapters.find((c) => c.slug === nextSlug) : null;

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <div className="text-sm text-[var(--color-muted)] mb-2">
        <Link href="/study" className="ud-link">
          Study
        </Link>{" "}
        / {chapter.title}
      </div>
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>
            {CHAPTER_EMOJI[chapter.slug] ?? "📖"}
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Chapter {idx + 1} of {CHAPTER_ORDER.length}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {chapter.title}
            </h1>
          </div>
        </div>
        <div className="mt-4">
          <a
            href={officialPdfPageUrl(chapter.pageStart)}
            target="_blank"
            rel="noopener noreferrer"
            className="ud-btn ud-btn-ghost ud-btn-sm"
          >
            📄 Read the official IRCC PDF (pages {chapter.pageStart}–
            {chapter.pageEnd}) ↗
          </a>
        </div>
      </header>

      {summary ? (
        <article className="space-y-7">
          <p className="text-[17px] leading-7 text-[var(--color-ink-2)] italic">
            {summary.intro}
          </p>
          {summary.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-lg font-extrabold tracking-tight text-[var(--color-ink)] mb-3">
                {s.heading}
              </h2>
              <ul className="space-y-2.5">
                {s.points.map((pt, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[16px] leading-7 text-[var(--color-ink-2)]"
                  >
                    <span
                      aria-hidden
                      className="shrink-0 mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      ) : (
        <article className="ud-card p-6 text-[var(--color-muted)]">
          <p>Content for this chapter is being prepared.</p>
        </article>
      )}

      <section className="mt-10 ud-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">
              Ready to practice?
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              {qs.length} questions on this chapter with explanations & citations.
            </p>
          </div>
          <Link
            href={`/practice/${chapter.slug}`}
            className="ud-btn ud-btn-primary"
          >
            Start practice
          </Link>
        </div>
      </section>

      <nav className="mt-10 flex items-center justify-between gap-3">
        {prev ? (
          <button
            className="ud-btn ud-btn-ghost ud-btn-sm"
            onClick={() => router.push(`/study/${prev.slug}`)}
          >
            ← {prev.title}
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button
            className="ud-btn ud-btn-primary ud-btn-sm"
            onClick={() => router.push(`/study/${next.slug}`)}
          >
            {next.title} →
          </button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
