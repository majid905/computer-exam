"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserState } from "@/lib/storage";
import { CHAPTER_EMOJI } from "@/lib/content";
import { ProgressBar } from "@/components/ui/Progress";
import { RequireAuth } from "@/components/app/RequireAuth";
import type { Chapter } from "@/lib/types";

function daysUntil(dateISO: string): number {
  const t = new Date(dateISO).getTime();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.round((t - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function Dashboard() {
  return (
    <RequireAuth>
      <DashboardInner />
    </RequireAuth>
  );
}

function DashboardInner() {
  const router = useRouter();
  const [state, , hydrated] = useUserState();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});

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
          mapped.map(async (ch) => {
            const res = await fetch(`/api/chapters/${ch.slug}`);
            const d = await res.json();
            return { slug: ch.slug, count: d.questions?.length ?? 0 };
          }),
        ).then((counts) => {
          setQuestionCounts(Object.fromEntries(counts.map((c) => [c.slug, c.count])));
        });
      });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!state.onboarding.completed) {
      router.replace("/onboarding");
    }
  }, [hydrated, state.onboarding.completed, router]);

  const studyChapters = useMemo(
    () => chapters.filter((c) => c.slug !== "study" && c.slug !== "applying"),
    [chapters],
  );

  const continueChapter = useMemo(() => {
    let bestSlug: string | null = null;
    let bestTime = 0;
    for (const [slug, cp] of Object.entries(state.chapters)) {
      if (!cp.lastRead) continue;
      const t = new Date(cp.lastRead).getTime();
      if (t > bestTime) {
        bestTime = t;
        bestSlug = slug;
      }
    }
    return bestSlug ? chapters.find((c) => c.slug === bestSlug) : null;
  }, [state.chapters, chapters]);

  const weakestChapter = useMemo(() => {
    const tried = studyChapters
      .map((c) => {
        const cp = state.chapters[c.slug];
        const acc =
          cp && cp.practiceTotal > 0
            ? cp.practiceCorrect / cp.practiceTotal
            : null;
        return { chapter: c, acc };
      })
      .filter((x) => x.acc !== null) as {
      chapter: (typeof studyChapters)[number];
      acc: number;
    }[];
    if (tried.length) {
      tried.sort((a, b) => a.acc - b.acc);
      return tried[0].chapter;
    }
    return studyChapters[0];
  }, [state.chapters, studyChapters]);

  const lastAttempt = state.attempts[state.attempts.length - 1];
  const masteryPct = useMemo(() => {
    const slugs = studyChapters.map((c) => c.slug);
    if (!slugs.length) return 0;
    let total = 0;
    let counted = 0;
    for (const slug of slugs) {
      const p = state.chapters[slug];
      if (!p || !p.practiceTotal) continue;
      total += (p.practiceCorrect / p.practiceTotal) * 100;
      counted++;
    }
    return counted ? Math.round(total / counted) : 0;
  }, [state.chapters, studyChapters]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-12 text-sm text-[var(--color-muted)]">
        Loading…
      </div>
    );
  }
  if (!state.onboarding.completed) return null;

  const daysLeft = state.onboarding.testDate
    ? daysUntil(state.onboarding.testDate)
    : null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
      <section className="ud-card p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
            Your study dashboard
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
            {daysLeft !== null
              ? daysLeft > 0
                ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} until your test`
                : daysLeft === 0
                  ? "Your test is today — you've got this."
                  : "Test date passed — keep practicing for retests."
              : "Let's get you ready to pass."}
          </h1>
          <p className="text-[var(--color-muted)] mt-2 max-w-xl">
            Focus on what matters: practice weak chapters, take a mock exam in
            the new 45-minute online format, and track mastery over time.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <Link href="/mock-exam" className="ud-btn ud-btn-primary">
              Take a mock exam
            </Link>
            <Link href="/study" className="ud-btn ud-btn-ghost">
              Browse study chapters
            </Link>
          </div>
        </div>
        <div className="sm:w-72 grid grid-cols-2 gap-3">
          <Stat label="Streak" value={`${state.streak.current}d`} emoji="🔥" />
          <Stat label="Mastery" value={`${masteryPct}%`} emoji="🎯" />
          <Stat
            label="Mock exams"
            value={`${state.attempts.length}`}
            emoji="📝"
          />
          <Stat
            label="Last score"
            value={
              lastAttempt ? `${lastAttempt.score}/${lastAttempt.total}` : "—"
            }
            emoji={lastAttempt?.passed ? "✅" : "📊"}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
        <ActionCard
          href={continueChapter ? `/study/${continueChapter.slug}` : "/study"}
          title={continueChapter ? "Continue reading" : "Start reading"}
          subtitle={
            continueChapter
              ? `Pick up: ${continueChapter.title}`
              : "Open the first chapter"
          }
          color="brand"
        />
        <ActionCard
          href={weakestChapter ? `/practice/${weakestChapter.slug}` : "/practice"}
          title="Drill your weakest"
          subtitle={weakestChapter ? `${weakestChapter.title} — explanations & citations` : "Pick a chapter to practice"}
          color="info"
        />
        <ActionCard
          href="/mock-exam"
          title="Simulate the test"
          subtitle="Full mock exam with timer and balanced questions"
          color="warning"
        />
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Chapters</h2>
            <p className="text-sm text-[var(--color-muted)]">
              Based on Discover Canada — IRCC official study guide
            </p>
          </div>
          <Link
            href="/study"
            className="hidden sm:inline-flex ud-btn ud-btn-ghost ud-btn-sm"
          >
            See all
          </Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyChapters.map((c) => {
            const cp = state.chapters[c.slug];
            const qs = questionCounts[c.slug] ?? 0;
            const mastery =
              cp && cp.practiceTotal > 0
                ? Math.round((cp.practiceCorrect / cp.practiceTotal) * 100)
                : null;
            return (
              <li key={c.slug}>
                <Link
                  href={`/study/${c.slug}`}
                  className="ud-card p-5 block hover:border-[var(--color-muted)] transition-colors h-full"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden>
                      {CHAPTER_EMOJI[c.slug] ?? "📖"}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-[var(--color-ink)] leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-xs text-[var(--color-muted)] mt-1">
                        {qs} practice question{qs === 1 ? "" : "s"} ·{" "}
                        {cp?.read ? "Read" : "Not started"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={mastery ?? 0} />
                    <p className="text-xs text-[var(--color-muted)] mt-1.5">
                      {mastery !== null
                        ? `${mastery}% mastery`
                        : "Start studying"}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  emoji,
}: {
  label: string;
  value: string;
  emoji: string;
}) {
  return (
    <div className="rounded-md bg-[var(--color-surface-2)] p-3">
      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
        {emoji} {label}
      </div>
      <div className="text-lg font-extrabold text-[var(--color-ink)] mt-1">
        {value}
      </div>
    </div>
  );
}

function ActionCard({
  href,
  title,
  subtitle,
  color,
}: {
  href: string;
  title: string;
  subtitle: string;
  color: "brand" | "info" | "warning";
}) {
  const bg = {
    brand: "bg-[var(--color-brand-soft)]",
    info: "bg-[var(--color-info-soft)]",
    warning: "bg-[var(--color-warning-soft)]",
  }[color];
  const fg = {
    brand: "text-[var(--color-brand)]",
    info: "text-[var(--color-info)]",
    warning: "text-[var(--color-warning)]",
  }[color];
  return (
    <Link
      href={href}
      className={`ud-card p-5 hover:border-[var(--color-muted)] transition-colors flex items-start gap-4 ${bg}`}
    >
      <div className={`text-2xl font-extrabold ${fg}`}>→</div>
      <div>
        <h3 className="font-bold text-[var(--color-ink)]">{title}</h3>
        <p className="text-sm text-[var(--color-muted)] mt-1">{subtitle}</p>
      </div>
    </Link>
  );
}
