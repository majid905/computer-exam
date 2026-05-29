"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useUserState } from "@/lib/storage";
import { chapters, CHAPTER_EMOJI, getQuestionById } from "@/lib/content";
import { ProgressBar } from "@/components/ui/Progress";
import { formatTime, MOCK_EXAM_PASS, MOCK_EXAM_SIZE } from "@/lib/exam";

const REVIEW_KEY = "pc:review:ids";

export default function MockExamResultPage() {
  const router = useRouter();
  const [state] = useUserState();
  const [reviewing, setReviewing] = useState(false);

  const attempt = useMemo(() => {
    if (typeof window === "undefined") return null;
    const id = sessionStorage.getItem("pc:lastAttemptId");
    if (id) {
      const found = state.attempts.find((a) => a.id === id);
      if (found) return found;
    }
    return state.attempts[state.attempts.length - 1] ?? null;
  }, [state.attempts]);

  useEffect(() => {
    if (!attempt && typeof window !== "undefined") {
      // No attempt to show — go back
    }
  }, [attempt]);

  if (!attempt) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-12 text-center">
        <p className="text-[var(--color-muted)]">No recent attempt found.</p>
        <Link href="/mock-exam" className="ud-btn ud-btn-primary mt-4 inline-flex">
          Take a mock exam
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-12">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Mock exam result
        </p>
        <h1
          className={[
            "text-3xl sm:text-4xl font-extrabold tracking-tight mt-2",
            attempt.passed
              ? "text-[var(--color-success)]"
              : "text-[var(--color-danger)]",
          ].join(" ")}
        >
          {attempt.passed ? "Provisional pass" : "Provisional fail"}
        </h1>
        <p className="text-[var(--color-muted)] mt-2">
          {attempt.score} of {attempt.total} correct · {formatTime(attempt.durationSeconds)} taken · finished{" "}
          {new Date(attempt.finishedAt).toLocaleString()}
        </p>
      </header>

      <section className="ud-card p-6 mb-6">
        <div className="flex items-end justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Score
          </span>
          <span className="text-2xl font-extrabold text-[var(--color-ink)]">
            {attempt.score} / {attempt.total}
          </span>
        </div>
        <ProgressBar value={attempt.score} max={attempt.total} />
        <p className="text-xs text-[var(--color-muted)] mt-2">
          Pass mark: {MOCK_EXAM_PASS} / {MOCK_EXAM_SIZE} (75%)
        </p>
      </section>

      <section className="ud-card p-6 mb-6">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-3">
          By chapter
        </h2>
        <ul className="space-y-3">
          {chapters
            .filter((c) => attempt.byChapter[c.slug])
            .map((c) => {
              const r = attempt.byChapter[c.slug];
              const pct = r.total ? Math.round((r.correct / r.total) * 100) : 0;
              return (
                <li key={c.slug} className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden>
                    {CHAPTER_EMOJI[c.slug] ?? "📖"}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="text-[var(--color-ink)]">{c.title}</span>
                      <span className="text-[var(--color-muted)]">
                        {r.correct}/{r.total}
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

      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/mock-exam" className="ud-btn ud-btn-primary">
          Take another mock
        </Link>
        {attempt.answers.some((a) => !a.correct) && (
          <button
            className="ud-btn ud-btn-secondary"
            onClick={() => {
              const missed = attempt.answers
                .filter((a) => !a.correct)
                .map((a) => a.qid);
              if (missed.length === 0) return;
              sessionStorage.setItem(REVIEW_KEY, JSON.stringify(missed));
              router.push("/practice/review");
            }}
          >
            Drill missed questions
          </button>
        )}
        <button
          className="ud-btn ud-btn-ghost"
          onClick={() => setReviewing((r) => !r)}
        >
          {reviewing ? "Hide review" : "Review answers"}
        </button>
        <Link href="/progress" className="ud-btn ud-btn-ghost">
          See progress
        </Link>
      </div>

      {reviewing && (
        <section className="space-y-4">
          {attempt.answers.map((a, i) => {
            const q = getQuestionById(a.qid);
            if (!q) return null;
            return (
              <div key={a.qid} className="ud-card p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold tracking-wide text-[var(--color-muted)]">
                    Q{i + 1}
                  </span>
                  <span
                    className={`ud-chip ${a.correct ? "ud-chip-success" : "ud-chip-danger"}`}
                  >
                    {a.correct ? "Correct" : "Incorrect"}
                  </span>
                </div>
                <p className="font-bold text-[var(--color-ink)]">{q.question}</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {q.options.map((opt, idx) => {
                    const isAnswer = idx === q.answer;
                    const isUserPick = idx === a.selected;
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
                <p className="text-sm text-[var(--color-muted)] mt-3 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
