"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserState } from "@/lib/storage";
import {
  MOCK_EXAM_DURATION_SECONDS,
  MOCK_EXAM_PASS,
  MOCK_EXAM_SIZE,
  formatTime,
} from "@/lib/exam";
import { RequireAuth } from "@/components/app/RequireAuth";
import { useAuth } from "@/context/AuthContext";

const DRAFT_KEY = "pc:mock:draft:v1";

type Draft = { startedAt: string; questionIds: string[]; selected: Record<string, number | null> };

type MockTest = {
  id: number;
  title: string;
  description: string | null;
  time_limit: number;
  total_marks: number;
  pass_marks: number;
  status: string;
};

export default function MockExamIntro() {
  return (
    <RequireAuth>
      <MockExamIntroInner />
    </RequireAuth>
  );
}

function MockExamIntroInner() {
  const router = useRouter();
  const [state] = useUserState();
  const { subscription } = useAuth();
  const last = state.attempts[state.attempts.length - 1];
  const [draft, setDraft] = useState<Draft | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [selectedMockId, setSelectedMockId] = useState<number | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<Set<number>>(new Set());
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setDraft(JSON.parse(raw) as Draft);
    } catch {
      setDraft(null);
    }
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("/api/mock-tests").then((r) => r.json()),
      fetch("/api/test-attempts").then((r) => r.json()),
    ])
      .then(([testsData, attemptsData]) => {
        let tests = Array.isArray(testsData) ? testsData : [];
        const attempts = Array.isArray(attemptsData) ? attemptsData : [];
        // Check subscription status
        const isSubscribed = !!subscription;
        setHasSubscription(isSubscribed);
        // Free users limited to first 2 tests
        if (!isSubscribed && tests.length > 2) {
          tests = tests.slice(0, 2);
        }
        setMockTests(tests);
        // All tests unlocked for subscribed users; all visible tests unlocked for free users
        const unlocked = new Set<number>(tests.map((t: MockTest) => t.id));
        setUnlockedIds(unlocked);
        const firstUnlocked = tests.find((t: MockTest) => unlocked.has(t.id));
        if (firstUnlocked) setSelectedMockId(firstUnlocked.id);
      })
      .catch(() => {});
  }, [subscription]);

  const activeMock = mockTests.find((m) => m.id === selectedMockId) ?? mockTests.find((m) => unlockedIds.has(m.id));
  const durationSeconds = (activeMock?.time_limit ?? MOCK_EXAM_DURATION_SECONDS / 60) * 60;
  const examSize = activeMock?.total_marks ?? MOCK_EXAM_SIZE;
  const passMarks = activeMock?.pass_marks ?? MOCK_EXAM_PASS;

  const draftRemaining = draft
    ? Math.max(
        0,
        durationSeconds -
          Math.floor((now - new Date(draft.startedAt).getTime()) / 1000),
      )
    : 0;
  const draftAnswered = draft
    ? Object.values(draft.selected).filter((v) => v !== null).length
    : 0;

  function startFresh() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
    if (activeMock) {
      sessionStorage.setItem("pc:activeMockId", String(activeMock.id));
    }
    router.push("/mock-exam/take");
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-12">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Mock exam
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
          Simulate the IRCC online test
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          You'll get {examSize} questions drawn from across the guide.
          You need {passMarks} correct to pass. The timer is{" "}
          {Math.round(durationSeconds / 60)} minutes — the new 2026 format.
        </p>
      </header>

      {!hasSubscription && (
        <section className="ud-card p-6 mb-6 bg-[var(--color-brand-soft)] border-[var(--color-brand)]">
          <h2 className="font-bold text-[var(--color-brand)]">Free Plan Limit</h2>
          <p className="text-sm text-[var(--color-ink-2)] mt-1">
            You can access 2 mock tests on the free plan. Subscribe to unlock all mock tests.
          </p>
          <Link href="/pricing" className="ud-btn ud-btn-primary mt-4">
            Upgrade Now
          </Link>
        </section>
      )}

      {mockTests.length > 1 && (
        <section className="ud-card p-6 mb-6">
          <h2 className="font-bold text-[var(--color-ink)]">Choose a mock test</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockTests.map((mt) => {
              const isUnlocked = unlockedIds.has(mt.id);
              const isSelected = selectedMockId === mt.id;
              return (
                <button
                  key={mt.id}
                  onClick={() => isUnlocked && setSelectedMockId(mt.id)}
                  disabled={!isUnlocked}
                  className={`text-left ud-card p-4 border-2 transition-colors ${
                    isSelected
                      ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                      : isUnlocked
                        ? "border-[var(--color-border)] hover:border-[var(--color-muted)]"
                        : "border-[var(--color-border)] opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[var(--color-ink)]">{mt.title}</h3>
                    {!isUnlocked && <span className="text-xs">🔒</span>}
                  </div>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    {mt.time_limit} min · {mt.total_marks} questions · pass {mt.pass_marks}
                    {!isUnlocked && " · Pass previous to unlock"}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="ud-card p-6 mb-6">
        <h2 className="font-bold text-[var(--color-ink)]">What to expect</h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-2)]">
          <li className="flex gap-2">
            <span aria-hidden>⏱️</span> {Math.round(durationSeconds / 60)}-minute timer in the corner. Mock exam
            auto-submits when time is up.
          </li>
          <li className="flex gap-2">
            <span aria-hidden>📋</span> {examSize} multiple-choice questions, balanced
            across chapters.
          </li>
          <li className="flex gap-2">
            <span aria-hidden>🎯</span> Pass mark: {passMarks} out of {examSize} ({Math.round((passMarks / examSize) * 100)}%) — same as
            the real test.
          </li>
          <li className="flex gap-2">
            <span aria-hidden>🔁</span> Results break down by chapter so you
            know what to re-study.
          </li>
        </ul>
      </section>

      {draft && draftRemaining > 0 && (
        <section className="ud-card p-6 mb-6 bg-[var(--color-warning-soft)] border-[var(--color-warning)]">
          <h2 className="font-bold text-[var(--color-warning)]">
            You have an exam in progress
          </h2>
          <p className="text-sm text-[var(--color-ink-2)] mt-1">
            {draftAnswered}/{draft.questionIds.length} answered ·{" "}
            <strong>{formatTime(draftRemaining)} left</strong> on the timer.
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <Link href="/mock-exam/take" className="ud-btn ud-btn-primary">
              Resume exam
            </Link>
            <button className="ud-btn ud-btn-ghost" onClick={startFresh}>
              Discard & start new
            </button>
          </div>
        </section>
      )}

      {last && (
        <section className="ud-card p-6 mb-6">
          <h2 className="font-bold text-[var(--color-ink)]">Your last attempt</h2>
          <div className="mt-2 flex items-center gap-3">
            <span
              className={`ud-chip ${last.passed ? "ud-chip-success" : "ud-chip-danger"}`}
            >
              {last.passed ? "Passed" : "Did not pass"}
            </span>
            <span className="text-sm text-[var(--color-muted)]">
              {last.score} / {last.total} on{" "}
              {new Date(last.finishedAt).toLocaleDateString()}
            </span>
          </div>
        </section>
      )}

      <div className="flex gap-2 flex-wrap">
        <button className="ud-btn ud-btn-primary" onClick={startFresh}>
          {draft && draftRemaining > 0 ? "Start a new exam" : "Start mock exam"}
        </button>
        <Link href="/practice" className="ud-btn ud-btn-ghost">
          Practice first
        </Link>
      </div>
    </div>
  );
}
