"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserState } from "@/lib/storage";
import { CHAPTER_EMOJI } from "@/lib/content";
import { ProgressBar } from "@/components/ui/Progress";
import { RequireAuth } from "@/components/app/RequireAuth";
import type { Chapter, Question } from "@/lib/types";

type MockTest = {
  id: number;
  title: string;
  description: string | null;
  time_limit: number;
  total_marks: number;
  pass_marks: number;
  status: string;
};

export default function PracticeIndexPage() {
  return (
    <RequireAuth>
      <PracticeIndex />
    </RequireAuth>
  );
}

function PracticeIndex() {
  const [state] = useUserState();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [unlockedIds, setUnlockedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch("/api/chapters")
      .then((r) => r.json())
      .then((data) => {
        const mapped: Chapter[] = data.map((c: any) => ({
          slug: c.slug,
          title: c.title,
          pageStart: 1,
          pageEnd: 10,
        }));
        setChapters(mapped);
        Promise.all(
          data.map(async (c: any) => {
            const res = await fetch(`/api/practice-questions/by-chapter/${c.id}`);
            const pqData = await res.json().catch(() => []);
            return { slug: c.slug, count: Array.isArray(pqData) ? pqData.length : 0 };
          }),
        ).then((counts) => {
          setQuestionCounts(Object.fromEntries(counts.map((c) => [c.slug, c.count])));
        });
      });

    Promise.all([
      fetch("/api/mock-tests").then((r) => r.json()),
      fetch("/api/test-attempts").then((r) => r.json()),
    ])
      .then(([testsData, attemptsData]) => {
        const tests = Array.isArray(testsData) ? testsData : [];
        setMockTests(tests);
        const attempts = Array.isArray(attemptsData) ? attemptsData : [];
        const passedIds = new Set(attempts.filter((a: any) => a.result === "pass").map((a: any) => a.mock_test_id));
        const unlocked = new Set<number>();
        for (let i = 0; i < tests.length; i++) {
          if (i === 0 || passedIds.has(tests[i - 1].id)) {
            unlocked.add(tests[i].id);
          }
        }
        setUnlockedIds(unlocked);
      })
      .catch(() => {});
  }, []);

  const studyable = chapters.filter((c) => c.slug !== "study" && c.slug !== "applying");

  // Show weakest chapter first
  const sorted = [...studyable].sort((a, b) => {
    const ma = state.chapters[a.slug];
    const mb = state.chapters[b.slug];
    const sa = ma && ma.practiceTotal > 0 ? ma.practiceCorrect / ma.practiceTotal : 0;
    const sb = mb && mb.practiceTotal > 0 ? mb.practiceCorrect / mb.practiceTotal : 0;
    return sa - sb;
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:py-10">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Practice
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
          Pick a chapter to drill
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          Weakest first. Each session: 5–10 questions with instant explanations
          and citations.
        </p>
      </header>

      {mockTests.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-muted)] mb-3">
            Mock Tests
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockTests.map((mt) => {
              const isUnlocked = unlockedIds.has(mt.id);
              return (
                <li key={mt.id}>
                  <button
                    onClick={() => {
                      if (!isUnlocked) return;
                      sessionStorage.setItem("pc:activeMockId", String(mt.id));
                      window.location.href = "/mock-exam/take";
                    }}
                    disabled={!isUnlocked}
                    className={`ud-card p-4 text-left w-full flex items-center gap-3 transition-colors ${
                      isUnlocked
                        ? "hover:border-[var(--color-muted)]"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <span className="text-2xl" aria-hidden>{isUnlocked ? "📝" : "🔒"}</span>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-[var(--color-ink)] leading-snug">
                        {mt.title}
                      </h2>
                      <p className="text-xs text-[var(--color-muted)] mt-0.5">
                        {mt.time_limit} min · {mt.total_marks} questions · pass {mt.pass_marks}
                        {!isUnlocked && " · Locked"}
                      </p>
                    </div>
                    {isUnlocked ? (
                      <span className="ud-btn ud-btn-secondary ud-btn-sm">
                        Start
                      </span>
                    ) : (
                      <span className="ud-btn ud-btn-ghost ud-btn-sm cursor-not-allowed">
                        Locked
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-muted)] mb-3">
        Chapters
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sorted.map((c) => {
          const cp = state.chapters[c.slug];
          const qs = questionCounts[c.slug] ?? 0;
          const mastery =
            cp && cp.practiceTotal > 0
              ? Math.round((cp.practiceCorrect / cp.practiceTotal) * 100)
              : null;
          return (
            <li key={c.slug}>
              <Link
                href={`/practice/${c.slug}`}
                className="ud-card p-4 flex items-center gap-3 hover:border-[var(--color-muted)] transition-colors"
              >
                <span className="text-2xl" aria-hidden>
                  {CHAPTER_EMOJI[c.slug] ?? "📖"}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-[var(--color-ink)] leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    {qs} questions ·{" "}
                    {mastery !== null ? `${mastery}% mastery` : "Untried"}
                  </p>
                </div>
                <span className="ud-btn ud-btn-secondary ud-btn-sm">
                  Drill
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
