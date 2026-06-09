"use client";

import Link from "next/link";
import { useState } from "react";
import { QuizCard } from "@/components/app/QuizCard";
import type { Question } from "@/lib/types";

export function SeoQuizClient({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, { selected: number; correct: boolean }>>({});

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const done = questions.length > 0 && answeredCount >= questions.length;

  function recordAnswer(qid: string, selected: number, correct: boolean) {
    setAnswers((prev) => {
      if (prev[qid]) return prev;
      return { ...prev, [qid]: { selected, correct } };
    });
  }

  const pct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div className="ud-card p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="h-2 rounded-full bg-[var(--color-surface-2)] overflow-hidden">
            <div
              className="h-2 rounded-full bg-[var(--color-brand)] transition-all"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-1.5">
            {answeredCount} of {questions.length} answered ·{" "}
            <strong className="text-[var(--color-ink)]">{correctCount} correct</strong>
          </p>
        </div>
      </div>

      {questions.map((q, i) => (
        <QuizCard
          key={q.id}
          q={q}
          index={i}
          total={questions.length}
          onAnswered={(sel, correct) => recordAnswer(q.id, sel, correct)}
        />
      ))}

      {done && (
        <div className="mt-6 ud-card p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-1">
            Quiz complete
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {correctCount} / {questions.length}
            <span className="text-xl text-[var(--color-muted)] ml-2">({pct}%)</span>
          </h2>
          <p className="text-[var(--color-muted)] mt-3 mb-6">
            {pct === 100
              ? "Perfect score! You're ready for the real exam."
              : pct >= 80
                ? "Great result! A little more practice and you'll be exam-ready."
                : pct >= 60
                  ? "Good start — keep practising to build confidence."
                  : "Keep going — the more you practise, the better you'll do."}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/register"
              className="ud-btn ud-btn-primary"
            >
              More Practice — Create Free Account
            </Link>
            <Link href="/login" className="ud-btn ud-btn-ghost">
              Already have an account? Sign in
            </Link>
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-4">
            Free account unlocks full practice tests, mock exams, and progress tracking.
          </p>
        </div>
      )}
    </div>
  );
}
