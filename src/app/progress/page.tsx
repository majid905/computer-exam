"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useUserState } from "@/lib/storage";
import { CHAPTER_EMOJI } from "@/lib/content";
import { ProgressBar } from "@/components/ui/Progress";
import { RequireAuth } from "@/components/app/RequireAuth";
import { formatTime } from "@/lib/exam";
import type { Chapter, Question } from "@/lib/types";

export default function ProgressPage() {
  return (
    <RequireAuth>
      <ProgressPageInner />
    </RequireAuth>
  );
}

function ProgressPageInner() {
  const [state] = useUserState();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [reviewAttempt, setReviewAttempt] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/chapters")
      .then((r) => r.json())
      .then((data) => {
        setChapters(
          data.map((c: any) => ({ slug: c.slug, title: c.title, pageStart: 1, pageEnd: 10 })),
        );
      });
    fetch("/api/questions")
      .then((r) => r.json())
      .then((data) => {
        const mapped: Question[] = data.map((q: any) => ({
          id: String(q.id),
          chapter: q.chapter_slug ?? "general",
          topic: q.topic ?? "General",
          difficulty: q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3,
          source: q.source ?? "Discover Canada",
          question: q.question,
          options: (q.options ?? []).map((o: any) => o.option_text),
          answer: (q.options ?? []).findIndex((o: any) => o.is_correct === 1),
          explanation: q.explanation,
        }));
        setAllQuestions(mapped);
      });
  }, []);

  const attempts = state.attempts.slice().reverse(); // newest first

  const studyableChapters = chapters.filter(
    (c) => c.slug !== "study" && c.slug !== "applying",
  );

  const overall = (() => {
    let correct = 0;
    let total = 0;
    for (const cp of Object.values(state.chapters)) {
      correct += cp.practiceCorrect;
      total += cp.practiceTotal;
    }
    return total ? Math.round((correct / total) * 100) : 0;
  })();

  const getQuestionById = (id: string) => allQuestions.find((q) => q.id === id);

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:py-10">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Progress
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
          How you&apos;re tracking
        </h1>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <BigStat label="Overall mastery" value={`${overall}%`} />
        <BigStat label="Mock exams" value={`${state.attempts.length}`} />
        <BigStat label="Current streak" value={`${state.streak.current}d`} />
        <BigStat label="Longest streak" value={`${state.streak.longest}d`} />
      </section>

      <section className="ud-card p-6 mb-8">
        <h2 className="font-extrabold text-[var(--color-ink)]">
          Mock exam history
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Review your past attempts.
        </p>
        {attempts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-[var(--color-muted)] mb-4">
              No mock exams yet.
            </p>
            <Link href="/mock-exam" className="ud-btn ud-btn-primary">
              Take your first mock
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {attempts.map((a, idx) => (
              <li key={a.id} className="flex items-center gap-3 ud-card p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`ud-chip ${a.passed ? "ud-chip-success" : "ud-chip-danger"}`}
                    >
                      {a.passed ? "Passed" : "Did not pass"}
                    </span>
                    <span className="text-sm text-[var(--color-muted)]">
                      {a.score} / {a.total} · {formatTime(a.durationSeconds)} ·{" "}
                      {new Date(a.finishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  className="ud-btn ud-btn-secondary ud-btn-sm"
                  onClick={() => setReviewAttempt(reviewAttempt?.id === a.id ? null : a)}
                >
                  {reviewAttempt?.id === a.id ? "Hide" : "Review"}
                </button>
              </li>
            ))}
          </ul>
        )}

        {reviewAttempt && (
          <div className="mt-6 space-y-4">
            <h3 className="font-bold text-[var(--color-ink)]">
              Review — {new Date(reviewAttempt.finishedAt).toLocaleDateString()}
            </h3>
            {reviewAttempt.answers.map((ans: any, i: number) => {
              const q = getQuestionById(ans.qid);
              if (!q) return null;
              return (
                <div key={ans.qid} className="ud-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wide text-[var(--color-muted)]">
                      Q{i + 1}
                    </span>
                    <span
                      className={`ud-chip ${ans.correct ? "ud-chip-success" : "ud-chip-danger"}`}
                    >
                      {ans.correct ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                  <p className="font-bold text-[var(--color-ink)]">{q.question}</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {q.options.map((opt, idx) => {
                      const isAnswer = idx === q.answer;
                      const isUserPick = idx === ans.selected;
                      return (
                        <li
                          key={idx}
                          className={[
                            "flex items-start gap-2 p-2 rounded-md",
                            isAnswer
                              ? "bg-[var(--color-success-soft)] text-[var(--color-success)]"
                              : isUserPick
                                ? "bg-[var(--color-danger-soft)] text-[var(--color-danger)]"
                                : "text-[var(--color-ink-2)]",
                          ].join(" ")}
                        >
                          <span aria-hidden>
                            {isAnswer ? "✓" : isUserPick ? "✗" : "·"}
                          </span>
                          <span>{opt}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="text-sm text-[var(--color-muted)] mt-2 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="ud-card p-6">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-1">
          Mastery by chapter
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Higher = more correct over more questions answered.
        </p>
        <ul className="space-y-3">
          {studyableChapters.map((c) => {
            const cp = state.chapters[c.slug];
            const total = cp?.practiceTotal ?? 0;
            const correct = cp?.practiceCorrect ?? 0;
            const pct = total ? Math.round((correct / total) * 100) : 0;
            return (
              <li key={c.slug} className="flex items-center gap-3">
                <span className="text-lg" aria-hidden>
                  {CHAPTER_EMOJI[c.slug] ?? "📖"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-[var(--color-ink)] truncate">
                      {c.title}
                    </span>
                    <span className="text-[var(--color-muted)] shrink-0">
                      {total ? `${correct}/${total} · ${pct}%` : "—"}
                    </span>
                  </div>
                  <ProgressBar value={pct} />
                </div>
                <Link
                  href={`/practice/${c.slug}`}
                  className="ud-btn ud-btn-ghost ud-btn-sm"
                >
                  Drill
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function BigStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="ud-card p-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </div>
      <div className="text-2xl font-extrabold text-[var(--color-ink)] mt-1">
        {value}
      </div>
    </div>
  );
}
