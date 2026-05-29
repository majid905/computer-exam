"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUserState, applyDailyStudy } from "@/lib/storage";
import {
  MOCK_EXAM_DURATION_SECONDS,
  MOCK_EXAM_PASS,
  MOCK_EXAM_SIZE,
  formatTime,
  pickMockExamQuestions,
  scoreAttempt,
} from "@/lib/exam";
import { CHAPTER_EMOJI } from "@/lib/content";

const DRAFT_KEY = "pc:mock:draft:v1";

type Draft = {
  startedAt: string;
  questionIds: string[];
  selected: Record<string, number | null>;
};

function loadDraft(): Draft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Draft;
  } catch {
    return null;
  }
}

function saveDraft(d: Draft) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
}

function clearDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DRAFT_KEY);
}

export default function MockExamTakePage() {
  const router = useRouter();
  const [, update] = useUserState();

  const [examQuestions] = useState(() => {
    const draft = loadDraft();
    if (draft) {
      const all = pickMockExamQuestions(MOCK_EXAM_SIZE * 2);
      const byId = new Map(all.map((q) => [q.id, q]));
      const restored = draft.questionIds
        .map((id) => byId.get(id))
        .filter(Boolean) as ReturnType<typeof pickMockExamQuestions>;
      if (restored.length === MOCK_EXAM_SIZE) return restored;
    }
    return pickMockExamQuestions();
  });

  const [startedAt] = useState<Date>(() => {
    const draft = loadDraft();
    if (draft) return new Date(draft.startedAt);
    return new Date();
  });

  const [selected, setSelected] = useState<Record<string, number | null>>(() => {
    const draft = loadDraft();
    return draft?.selected ?? {};
  });
  const [active, setActive] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [confirmingSubmit, setConfirmingSubmit] = useState(false);
  const [confirmingExit, setConfirmingExit] = useState(false);

  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = Math.floor((now - startedAt.getTime()) / 1000);
  const remaining = Math.max(0, MOCK_EXAM_DURATION_SECONDS - elapsed);
  const timeLow = remaining <= 60;

  // persist draft on change
  useEffect(() => {
    saveDraft({
      startedAt: startedAt.toISOString(),
      questionIds: examQuestions.map((q) => q.id),
      selected,
    });
  }, [selected, startedAt, examQuestions]);

  const answeredCount = Object.values(selected).filter((v) => v !== null).length;

  const submitRef = useRef<() => void>(() => {});
  submitRef.current = function submit() {
    if (submitting) return;
    setSubmitting(true);
    const finishedAt = new Date();
    const attempt = scoreAttempt(selected, examQuestions, startedAt, finishedAt);
    update((s) => {
      const next = applyDailyStudy(s);
      const ch = { ...next.chapters };
      for (const a of attempt.answers) {
        const q = examQuestions.find((x) => x.id === a.qid);
        if (!q) continue;
        const cp = ch[q.chapter] ?? {
          read: false,
          practiceAttempts: 0,
          practiceCorrect: 0,
          practiceTotal: 0,
        };
        ch[q.chapter] = {
          ...cp,
          practiceCorrect: cp.practiceCorrect + (a.correct ? 1 : 0),
          practiceTotal: cp.practiceTotal + 1,
        };
      }
      return {
        ...next,
        chapters: ch,
        attempts: [...next.attempts, attempt],
      };
    });
    clearDraft();
    sessionStorage.setItem("pc:lastAttemptId", attempt.id);
    router.replace("/mock-exam/result");
  };

  // auto-submit on timeout
  useEffect(() => {
    if (remaining <= 0 && !submitting) {
      submitRef.current();
    }
  }, [remaining, submitting]);

  const currentQ = examQuestions[active];
  const allAnswered = answeredCount === examQuestions.length;

  const flaggedIndices = useMemo(() => {
    return examQuestions
      .map((q, i) => (selected[q.id] == null ? i : -1))
      .filter((i) => i !== -1);
  }, [examQuestions, selected]);

  return (
    <div className="min-h-screen bg-[var(--color-surface-2)] flex flex-col">
      <header className="sticky top-0 z-30 border-b bg-[var(--color-surface)]/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="font-extrabold tracking-tight text-[var(--color-ink)]">
              Mock exam
            </p>
            <span className="ud-chip">
              {answeredCount} / {examQuestions.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={[
                "tabular-nums font-extrabold text-base px-3 py-1 rounded-md",
                timeLow
                  ? "bg-[var(--color-danger-soft)] text-[var(--color-danger)]"
                  : "bg-[var(--color-surface-2)] text-[var(--color-ink)]",
              ].join(" ")}
              aria-live="polite"
            >
              ⏱ {formatTime(remaining)}
            </span>
            <button
              className="ud-btn ud-btn-ghost ud-btn-sm"
              onClick={() => setConfirmingExit(true)}
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-4xl w-full px-5 py-6 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6">
        {currentQ && (
          <div className="ud-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wide text-[var(--color-muted)]">
                QUESTION {active + 1} OF {examQuestions.length}
              </span>
              <span className="ud-chip ud-chip-brand">
                {CHAPTER_EMOJI[currentQ.chapter] ?? "📖"} {currentQ.topic}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--color-ink)] leading-snug">
              {currentQ.question}
            </h2>
            <ol className="mt-5 space-y-2.5">
              {currentQ.options.map((opt, i) => {
                const isSel = selected[currentQ.id] === i;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      className={[
                        "w-full text-left rounded-md border-2 px-4 py-3 flex items-start gap-3 transition-colors",
                        isSel
                          ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                          : "border-[var(--color-border)] hover:border-[var(--color-muted)]",
                      ].join(" ")}
                      onClick={() =>
                        setSelected((prev) => ({
                          ...prev,
                          [currentQ.id]: i,
                        }))
                      }
                    >
                      <span
                        className={[
                          "shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full text-sm font-bold",
                          isSel
                            ? "bg-[var(--color-brand)] text-white"
                            : "bg-[var(--color-surface-2)] text-[var(--color-ink)]",
                        ].join(" ")}
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

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                className="ud-btn ud-btn-ghost ud-btn-sm"
                onClick={() => setActive((i) => Math.max(0, i - 1))}
                disabled={active === 0}
              >
                ← Previous
              </button>
              <button
                className="ud-btn ud-btn-secondary ud-btn-sm"
                onClick={() =>
                  setSelected((prev) => ({ ...prev, [currentQ.id]: null }))
                }
              >
                Clear
              </button>
              {active < examQuestions.length - 1 ? (
                <button
                  className="ud-btn ud-btn-primary ud-btn-sm"
                  onClick={() =>
                    setActive((i) => Math.min(examQuestions.length - 1, i + 1))
                  }
                >
                  Next →
                </button>
              ) : (
                <button
                  className="ud-btn ud-btn-primary ud-btn-sm"
                  onClick={() => setConfirmingSubmit(true)}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        <aside className="ud-card p-4 h-fit">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-3">
            Question map
          </h3>
          <ol className="grid grid-cols-5 gap-2">
            {examQuestions.map((q, i) => {
              const answered = selected[q.id] != null;
              const isActive = i === active;
              return (
                <li key={q.id}>
                  <button
                    onClick={() => setActive(i)}
                    className={[
                      "h-9 w-full rounded-md text-sm font-bold border-2 transition-colors",
                      isActive
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                        : answered
                          ? "border-[var(--color-success)] bg-[var(--color-success-soft)] text-[var(--color-success)]"
                          : "border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-muted)]",
                    ].join(" ")}
                  >
                    {i + 1}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 text-xs text-[var(--color-muted)] space-y-1">
            <p>
              Unanswered:{" "}
              <strong className="text-[var(--color-ink)]">
                {flaggedIndices.length}
              </strong>
            </p>
            <p>Pass mark: {MOCK_EXAM_PASS} / {MOCK_EXAM_SIZE}</p>
          </div>
          <button
            className="ud-btn ud-btn-primary ud-btn-sm w-full mt-4"
            onClick={() => setConfirmingSubmit(true)}
          >
            Submit exam
          </button>
        </aside>
      </main>

      {confirmingSubmit && (
        <Modal
          title={allAnswered ? "Submit exam?" : "Submit with unanswered?"}
          body={
            allAnswered
              ? "Your score will be calculated and saved to your history."
              : `You have ${examQuestions.length - answeredCount} unanswered question${
                  examQuestions.length - answeredCount === 1 ? "" : "s"
                }. They will be marked incorrect.`
          }
          confirmLabel="Submit"
          onConfirm={() => submitRef.current()}
          onCancel={() => setConfirmingSubmit(false)}
        />
      )}
      {confirmingExit && (
        <Modal
          title="Exit the exam?"
          body="Your progress is saved as a draft and you can resume later. Time will keep counting down."
          confirmLabel="Exit"
          onConfirm={() => router.push("/mock-exam")}
          onCancel={() => setConfirmingExit(false)}
        />
      )}
    </div>
  );
}

function Modal({
  title,
  body,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="ud-card p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-extrabold text-[var(--color-ink)]">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-muted)] mt-2">{body}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button className="ud-btn ud-btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="ud-btn ud-btn-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
