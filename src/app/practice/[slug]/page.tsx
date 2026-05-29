"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState, use } from "react";
import { QuizCard } from "@/components/app/QuizCard";
import { getChapter, getQuestionsForChapter, CHAPTER_EMOJI, CHAPTER_ORDER, chapters } from "@/lib/content";
import { shuffle } from "@/lib/exam";
import { useUserState, applyDailyStudy } from "@/lib/storage";
import { ProgressBar } from "@/components/ui/Progress";

const SESSION_SIZE = 10;

export default function PracticeChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const chapter = getChapter(slug);
  const [, update] = useUserState();
  const [seed, setSeed] = useState(0);

  const sessionQuestions = useMemo(() => {
    if (!chapter) return [];
    const all = getQuestionsForChapter(chapter.slug);
    return shuffle(all).slice(0, Math.min(SESSION_SIZE, all.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter?.slug, seed]);

  const [answers, setAnswers] = useState<Record<string, { selected: number; correct: boolean }>>({});

  useEffect(() => {
    setAnswers({});
  }, [seed, slug]);

  if (!chapter) {
    notFound();
  }
  const ch = chapter;

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const done = answeredCount >= sessionQuestions.length;

  function recordAnswer(qid: string, selected: number, correct: boolean) {
    setAnswers((prev) => {
      if (prev[qid]) return prev;
      const next = { ...prev, [qid]: { selected, correct } };
      // commit to state on each new answer
      update((s) => {
        const updated = applyDailyStudy(s);
        const cp = updated.chapters[ch.slug] ?? {
          read: false,
          practiceAttempts: 0,
          practiceCorrect: 0,
          practiceTotal: 0,
        };
        return {
          ...updated,
          chapters: {
            ...updated.chapters,
            [ch.slug]: {
              ...cp,
              practiceCorrect: cp.practiceCorrect + (correct ? 1 : 0),
              practiceTotal: cp.practiceTotal + 1,
              practiceAttempts:
                Object.keys(next).length === sessionQuestions.length
                  ? cp.practiceAttempts + 1
                  : cp.practiceAttempts,
            },
          },
        };
      });
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <div className="text-sm text-[var(--color-muted)] mb-2">
        <Link href="/practice" className="ud-link">
          Practice
        </Link>{" "}
        / {ch.title}
      </div>
      <header className="mb-6 flex items-center gap-3">
        <span className="text-3xl" aria-hidden>
          {CHAPTER_EMOJI[ch.slug] ?? "📖"}
        </span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Practice
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {ch.title}
          </h1>
        </div>
      </header>

      <div className="ud-card p-4 mb-5 flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar value={answeredCount} max={sessionQuestions.length} />
          <p className="text-xs text-[var(--color-muted)] mt-1.5">
            {answeredCount} of {sessionQuestions.length} answered ·{" "}
            <strong className="text-[var(--color-ink)]">
              {correctCount} correct
            </strong>
          </p>
        </div>
        <button
          className="ud-btn ud-btn-ghost ud-btn-sm"
          onClick={() => setSeed((s) => s + 1)}
        >
          Reshuffle
        </button>
      </div>

      <div className="space-y-5">
        {sessionQuestions.map((q, i) => (
          <QuizCard
            key={`${seed}-${q.id}`}
            q={q}
            index={i}
            total={sessionQuestions.length}
            onAnswered={(sel, correct) => recordAnswer(q.id, sel, correct)}
          />
        ))}
      </div>

      {done && (() => {
        const idx = CHAPTER_ORDER.indexOf(ch.slug);
        const nextSlug = CHAPTER_ORDER
          .slice(idx + 1)
          .find((s) => s !== "study" && s !== "applying");
        const nextChapter = nextSlug ? chapters.find((c) => c.slug === nextSlug) : null;
        return (
          <div className="mt-8 ud-card p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-1">
              Session complete
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight">
              {correctCount} / {sessionQuestions.length}
            </h2>
            <p className="text-sm text-[var(--color-muted)] mt-2 mb-5">
              {correctCount === sessionQuestions.length
                ? "Perfect — you've mastered this set."
                : correctCount >= Math.ceil(sessionQuestions.length * 0.75)
                  ? "Strong. Try the mock exam next."
                  : "Re-read the chapter and try again."}
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <button
                className="ud-btn ud-btn-secondary"
                onClick={() => setSeed((s) => s + 1)}
              >
                New questions
              </button>
              <Link href={`/study/${ch.slug}`} className="ud-btn ud-btn-ghost">
                Re-read chapter
              </Link>
              {nextChapter ? (
                <Link
                  href={`/practice/${nextChapter.slug}`}
                  className="ud-btn ud-btn-primary"
                >
                  Practice next: {nextChapter.title} →
                </Link>
              ) : (
                <Link href="/mock-exam" className="ud-btn ud-btn-primary">
                  Take mock exam
                </Link>
              )}
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-4">
              Or{" "}
              <Link href="/mock-exam" className="ud-link">
                jump to a full mock exam
              </Link>
              .
            </p>
          </div>
        );
      })()}
    </div>
  );
}
