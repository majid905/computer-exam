"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUserState, applyDailyStudy } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import {
  MOCK_EXAM_DURATION_SECONDS,
  MOCK_EXAM_PASS,
  MOCK_EXAM_SIZE,
  formatTime,
  pickMockExamQuestions,
  scoreAttempt,
  shuffle,
} from "@/lib/exam";
import { CHAPTER_EMOJI } from "@/lib/content";
import { RequireAuth } from "@/components/app/RequireAuth";
import type { Question } from "@/lib/types";

const DRAFT_KEY = "pc:mock:draft:v1";

type Draft = {
  startedAt: string;
  questionIds: string[];
  selected: Record<string, number | null>;
};

type MockTest = {
  id: number;
  title: string;
  time_limit: number;
  total_marks: number;
  pass_marks: number;
  total_questions: number;
  question_selection_mode: string;
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
  return (
    <RequireAuth>
      <MockExamTakeInner />
    </RequireAuth>
  );
}

function MockExamTakeInner() {
  const router = useRouter();
  const [, update] = useUserState();
  const { user } = useAuth();
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [mockTest, setMockTest] = useState<MockTest | null>(null);

  useEffect(() => {
    const activeMockId = sessionStorage.getItem("pc:activeMockId");
    setLoading(true);

    fetch("/api/mock-tests")
      .then((r) => r.json())
      .then(async (data) => {
        const tests = Array.isArray(data) ? data : [];
        const target = activeMockId
          ? tests.find((t: any) => String(t.id) === activeMockId)
          : tests[0];
        setMockTest(target ?? null);

        let mapped: Question[] = [];

        if (target) {
          // Fetch assigned questions for this mock test
          const detailRes = await fetch(`/api/mock-tests/${target.id}/`);
          const detail = await detailRes.json();
          const assigned = (detail.questions ?? []).map((q: any) => ({
            id: String(q.id),
            chapter: q.chapter_slug ?? q.chapter ?? "general",
            topic: q.topic ?? "General",
            difficulty: q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3,
            source: q.source ?? "Discover Canada",
            question: q.question,
            options: (q.options ?? []).map((o: any) => typeof o === "string" ? o : o.option_text),
            answer: (q.options ?? []).findIndex((o: any) => o.is_correct === 1),
            explanation: q.explanation,
          }));
          if (assigned.length > 0) {
            mapped = assigned;
          }
        }

        // Fallback: load all questions if no assigned questions
        if (mapped.length === 0) {
          const qRes = await fetch("/api/questions");
          const qData = await qRes.json();
          mapped = qData.map((q: any) => ({
            id: String(q.id),
            chapter: q.chapter_slug ?? "general",
            topic: q.topic ?? "General",
            difficulty: q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3,
            source: q.source ?? "Discover Canada",
            question: q.question,
            options: (q.options ?? []).map((o: any) => typeof o === "string" ? o : o.option_text),
            answer: (q.options ?? []).findIndex((o: any) => o.is_correct === 1),
            explanation: q.explanation,
          }));
        }

        setAllQuestions(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const [examQs, setExamQs] = useState<Question[]>([]);

  const config = useMemo(() => {
    const size = mockTest?.total_questions ?? mockTest?.total_marks ?? MOCK_EXAM_SIZE;
    const pass = mockTest?.pass_marks ?? MOCK_EXAM_PASS;
    const duration = (mockTest?.time_limit ?? MOCK_EXAM_DURATION_SECONDS / 60) * 60;
    return { size, pass, duration };
  }, [mockTest]);

  useEffect(() => {
    if (allQuestions.length === 0) return;
    const draft = loadDraft();

    let picked: Question[];
    const isAssignedPool = mockTest && (
      mockTest.question_selection_mode === "manual" ||
      allQuestions.length <= (mockTest.total_questions || 0)
    );

    if (isAssignedPool) {
      picked = shuffle(allQuestions).slice(0, Math.min(config.size, allQuestions.length));
    } else {
      picked = pickMockExamQuestions(allQuestions, config.size);
    }

    if (draft) {
      const byId = new Map(allQuestions.map((q) => [q.id, q]));
      const restored = draft.questionIds
        .map((id) => byId.get(id))
        .filter(Boolean) as Question[];
      if (restored.length === picked.length) {
        setExamQs(restored);
        return;
      }
    }
    setExamQs(picked);
  }, [allQuestions, config.size, mockTest]);

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
  const remaining = Math.max(0, config.duration - elapsed);
  const timeLow = remaining <= 60;

  // persist draft on change
  useEffect(() => {
    if (examQs.length === 0) return;
    saveDraft({
      startedAt: startedAt.toISOString(),
      questionIds: examQs.map((q) => q.id),
      selected,
    });
  }, [selected, startedAt, examQs]);

  const answeredCount = Object.values(selected).filter((v) => v !== null).length;

  const submitRef = useRef<() => void>(() => {});
  submitRef.current = function submit() {
    if (submitting) return;
    setSubmitting(true);
    const finishedAt = new Date();
    const attempt = scoreAttempt(selected, examQs, startedAt, finishedAt, {
      size: config.size,
      pass: config.pass,
      durationSeconds: config.duration,
    });
    const correctCount = attempt.score;
    const wrongCount = attempt.total - attempt.score;
    const timeTaken = Math.floor((finishedAt.getTime() - startedAt.getTime()) / 1000);

    update((s) => {
      const next = applyDailyStudy(s);
      const ch = { ...next.chapters };
      for (const a of attempt.answers) {
        const q = examQs.find((x) => x.id === a.qid);
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

    // Save to database
    fetch("/api/test-attempts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user?.id,
        mock_test_id: mockTest?.id ?? 1,
        score: attempt.total,
        total_marks: attempt.total,
        correct_answers: correctCount,
        wrong_answers: wrongCount,
        time_taken: timeTaken,
        result: attempt.passed ? "pass" : "fail",
        answers: examQs.map((q) => {
          const sel = selected[q.id] ?? null;
          return {
            question_id: Number(q.id),
            selected_option: sel,
            is_correct: sel !== null && sel === q.answer,
          };
        }),
      }),
    }).catch(() => {});

    clearDraft();
    sessionStorage.setItem("pc:lastAttemptId", attempt.id);
    router.replace("/mock-exam/result");
  };

  // auto-submit on timeout
  useEffect(() => {
    if (remaining <= 0 && !submitting && examQs.length > 0) {
      submitRef.current();
    }
  }, [remaining, submitting, examQs.length]);

  const currentQ = examQs[active];
  const allAnswered = answeredCount === examQs.length;

  const flaggedIndices = useMemo(() => {
    return examQs
      .map((q, i) => (selected[q.id] == null ? i : -1))
      .filter((i) => i !== -1);
  }, [examQs, selected]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface-2)] flex items-center justify-center">
        <p className="text-[var(--color-muted)]">Loading exam questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface-2)] flex flex-col">
      <header className="sticky top-0 z-30 border-b bg-[var(--color-surface)]/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="font-extrabold tracking-tight text-[var(--color-ink)]">
              Mock exam
            </p>
            <span className="ud-chip">
              {answeredCount} / {examQs.length}
            </span>
            {mockTest && (
              <span className="ud-chip ud-chip-brand text-[10px]">
                {mockTest.title}
              </span>
            )}
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
                QUESTION {active + 1} OF {examQs.length}
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
              {active < examQs.length - 1 ? (
                <button
                  className="ud-btn ud-btn-primary ud-btn-sm"
                  onClick={() =>
                    setActive((i) => Math.min(examQs.length - 1, i + 1))
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
            {examQs.map((q, i) => {
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
            <p>Pass mark: {config.pass} / {config.size}</p>
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
              : `You have ${examQs.length - answeredCount} unanswered question${
                  examQs.length - answeredCount === 1 ? "" : "s"
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
