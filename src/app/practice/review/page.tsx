"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QuizCard } from "@/components/app/QuizCard";
import { getQuestionById } from "@/lib/content";
import { useUserState, applyDailyStudy } from "@/lib/storage";
import { ProgressBar } from "@/components/ui/Progress";
import type { Question } from "@/lib/types";

const REVIEW_KEY = "pc:review:ids";

export default function PracticeReviewPage() {
  const [, update] = useUserState();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, { selected: number; correct: boolean }>>({});

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(REVIEW_KEY);
      const ids = raw ? (JSON.parse(raw) as string[]) : [];
      const qs = ids
        .map((id) => getQuestionById(id))
        .filter((q): q is Question => Boolean(q));
      setQuestions(qs);
    } catch {
      setQuestions([]);
    }
  }, []);

  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(
    () => Object.values(answers).filter((a) => a.correct).length,
    [answers],
  );
  const done = questions.length > 0 && answeredCount >= questions.length;

  function recordAnswer(qid: string, selected: number, correct: boolean) {
    setAnswers((prev) => {
      if (prev[qid]) return prev;
      const q = questions.find((x) => x.id === qid);
      if (!q) return prev;
      const next = { ...prev, [qid]: { selected, correct } };
      update((s) => {
        const updated = applyDailyStudy(s);
        const cp = updated.chapters[q.chapter] ?? {
          read: false,
          practiceAttempts: 0,
          practiceCorrect: 0,
          practiceTotal: 0,
        };
        return {
          ...updated,
          chapters: {
            ...updated.chapters,
            [q.chapter]: {
              ...cp,
              practiceCorrect: cp.practiceCorrect + (correct ? 1 : 0),
              practiceTotal: cp.practiceTotal + 1,
            },
          },
        };
      });
      return next;
    });
  }

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-12 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight mb-2">
          Nothing to review
        </h1>
        <p className="text-[var(--color-muted)] mb-6">
          Open a mock exam result and tap "Drill missed questions" to fill this
          review session.
        </p>
        <div className="flex justify-center gap-2">
          <Link href="/mock-exam" className="ud-btn ud-btn-primary">
            Take a mock exam
          </Link>
          <Link href="/practice" className="ud-btn ud-btn-ghost">
            Pick a chapter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <div className="text-sm text-[var(--color-muted)] mb-2">
        <Link href="/mock-exam/result" className="ud-link">
          Result
        </Link>{" "}
        / Review missed
      </div>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Review missed
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {questions.length} question{questions.length === 1 ? "" : "s"} to nail
        </h1>
      </header>

      <div className="ud-card p-4 mb-5 flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar value={answeredCount} max={questions.length} />
          <p className="text-xs text-[var(--color-muted)] mt-1.5">
            {answeredCount} of {questions.length} answered ·{" "}
            <strong className="text-[var(--color-ink)]">
              {correctCount} correct
            </strong>
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((q, i) => (
          <QuizCard
            key={q.id}
            q={q}
            index={i}
            total={questions.length}
            onAnswered={(sel, correct) => recordAnswer(q.id, sel, correct)}
          />
        ))}
      </div>

      {done && (
        <div className="mt-8 ud-card p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-1">
            Review complete
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {correctCount} / {questions.length}
          </h2>
          <p className="text-sm text-[var(--color-muted)] mt-2 mb-5">
            {correctCount === questions.length
              ? "Cleaned up. Ready for another mock?"
              : "Re-read those chapters and come back."}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Link href="/mock-exam" className="ud-btn ud-btn-primary">
              Take a mock exam
            </Link>
            <Link href="/practice" className="ud-btn ud-btn-ghost">
              Drill a chapter
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
