"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserState } from "@/lib/storage";
import { CHAPTER_EMOJI } from "@/lib/content";
import { ProgressBar } from "@/components/ui/Progress";
import { RequireAuth } from "@/components/app/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import type { Chapter, Question } from "@/lib/types";

const FREE_CHAPTER_LIMIT = 2;

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
  const { subscription } = useAuth();
  const isPro = !!(subscription && subscription.status === "active");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [freeChapterSlugs, setFreeChapterSlugs] = useState<Set<string>>(new Set());
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
        // Track which slugs are free (first FREE_CHAPTER_LIMIT by original order)
        setFreeChapterSlugs(new Set(mapped.slice(0, FREE_CHAPTER_LIMIT).map((c) => c.slug)));
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
        let tests = Array.isArray(testsData) ? testsData : [];
        const attempts = Array.isArray(attemptsData) ? attemptsData : [];
        // Free users limited to first 2 tests
        if (!subscription && tests.length > 2) {
          tests = tests.slice(0, 2);
        }
        setMockTests(tests);
        // All visible tests unlocked
        const unlocked = new Set<number>(tests.map((t: any) => t.id));
        setUnlockedIds(unlocked);
      })
      .catch(() => {});
  }, [subscription]);

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

      {!isPro && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-700/50 dark:bg-amber-900/20">
          <span className="text-xl">🔒</span>
          <p className="text-sm text-amber-900 dark:text-amber-200">
            Free plan includes the first <strong>{FREE_CHAPTER_LIMIT} chapters</strong>.{" "}
            <Link href="/pricing" className="font-semibold underline hover:no-underline">
              Upgrade to Pro
            </Link>{" "}
            to practice all chapters.
          </p>
        </div>
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
          const locked = !isPro && !freeChapterSlugs.has(c.slug);
          return (
            <li key={c.slug}>
              {locked ? (
                <Link
                  href="/pricing"
                  className="ud-card p-4 flex items-center gap-3 opacity-60 hover:opacity-80 transition-opacity"
                >
                  <span className="text-2xl" aria-hidden>{CHAPTER_EMOJI[c.slug] ?? "📖"}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-[var(--color-ink)] leading-snug">{c.title}</h2>
                    <p className="text-xs text-[var(--color-muted)] mt-0.5">
                      {qs} questions · <span className="text-amber-600 dark:text-amber-400">Pro only</span>
                    </p>
                  </div>
                  <span className="text-xl">🔒</span>
                </Link>
              ) : (
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
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
