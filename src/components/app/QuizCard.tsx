"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";

export function QuizCard({
  q,
  index,
  total,
  showImmediateFeedback = true,
  onAnswered,
  initialSelected,
}: {
  q: Question;
  index: number;
  total: number;
  showImmediateFeedback?: boolean;
  onAnswered?: (selected: number, correct: boolean) => void;
  initialSelected?: number | null;
}) {
  const [selected, setSelected] = useState<number | null>(
    initialSelected ?? null,
  );
  const [revealed, setRevealed] = useState<boolean>(
    showImmediateFeedback && initialSelected != null,
  );

  function handleSelect(i: number) {
    if (revealed && showImmediateFeedback) return;
    setSelected(i);
    if (showImmediateFeedback) {
      setRevealed(true);
      onAnswered?.(i, i === q.answer);
    } else {
      onAnswered?.(i, i === q.answer);
    }
  }

  return (
    <div className="ud-card p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold tracking-wide text-[var(--color-muted)]">
          QUESTION {index + 1} OF {total}
        </span>
        <span className="ud-chip">{q.topic}</span>
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-[var(--color-ink)] leading-snug">
        {q.question}
      </h2>
      <ol className="mt-5 space-y-2.5">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrectChoice = i === q.answer;
          let cls =
            "w-full text-left rounded-md border-2 px-4 py-3 flex items-start gap-3 transition-colors";
          if (!revealed) {
            cls += isSelected
              ? " border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
              : " border-[var(--color-border)] hover:border-[var(--color-muted)]";
          } else {
            if (isCorrectChoice) {
              cls +=
                " border-[var(--color-success)] bg-[var(--color-success-soft)]";
            } else if (isSelected) {
              cls +=
                " border-[var(--color-danger)] bg-[var(--color-danger-soft)]";
            } else {
              cls += " border-[var(--color-border)]";
            }
          }
          return (
            <li key={i}>
              <button
                type="button"
                className={cls}
                onClick={() => handleSelect(i)}
                disabled={revealed && showImmediateFeedback}
              >
                <span
                  className={[
                    "shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full text-sm font-bold",
                    revealed && isCorrectChoice
                      ? "bg-[var(--color-success)] text-white"
                      : revealed && isSelected
                        ? "bg-[var(--color-danger)] text-white"
                        : isSelected
                          ? "bg-[var(--color-brand)] text-white"
                          : "bg-[var(--color-surface-2)] text-[var(--color-ink)]",
                  ].join(" ")}
                  aria-hidden
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-[15px] leading-snug text-[var(--color-ink)]">
                  {opt}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {revealed && showImmediateFeedback && (
        <div
          className={[
            "mt-5 rounded-md p-4 text-sm leading-relaxed",
            selected === q.answer
              ? "bg-[var(--color-success-soft)] text-[var(--color-success)]"
              : "bg-[var(--color-danger-soft)] text-[var(--color-danger)]",
          ].join(" ")}
        >
          <p className="font-bold mb-1">
            {selected === q.answer ? "Correct" : "Not quite"}
          </p>
          <p className="text-[var(--color-ink-2)]">{q.explanation}</p>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            Source: {q.source}
          </p>
        </div>
      )}
    </div>
  );
}
