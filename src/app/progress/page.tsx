"use client";

import Link from "next/link";
import { useUserState } from "@/lib/storage";
import { chapters, CHAPTER_EMOJI } from "@/lib/content";
import { ProgressBar } from "@/components/ui/Progress";

export default function ProgressPage() {
  const [state] = useUserState();
  const attempts = state.attempts.slice(-10);
  const studyableChapters = chapters.filter(
    (c) => c.slug !== "study" && c.slug !== "applying",
  );

  const overall = (() => {
    let correct = 0;
    let total = 0;
    for (const cp of Object.values(state.chapters)) {
      correct += cp.practiceCorrect;
      total += cp.practiceTotal;
    }
    return total ? Math.round((correct / total) * 100) : 0;
  })();

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:py-10">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Progress
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
          How you're tracking
        </h1>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <BigStat label="Overall mastery" value={`${overall}%`} />
        <BigStat label="Mock exams" value={`${state.attempts.length}`} />
        <BigStat label="Current streak" value={`${state.streak.current}d`} />
        <BigStat label="Longest streak" value={`${state.streak.longest}d`} />
      </section>

      <section className="ud-card p-6 mb-8">
        <h2 className="font-extrabold text-[var(--color-ink)]">
          Recent mock exam scores
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Pass mark: 15 / 20. Last 10 attempts.
        </p>
        {attempts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-[var(--color-muted)] mb-4">
              No mock exams yet.
            </p>
            <Link href="/mock-exam" className="ud-btn ud-btn-primary">
              Take your first mock
            </Link>
          </div>
        ) : (
          <ScoreChart attempts={attempts} />
        )}
      </section>

      <section className="ud-card p-6">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-1">
          Mastery by chapter
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Higher = more correct over more questions answered.
        </p>
        <ul className="space-y-3">
          {studyableChapters.map((c) => {
            const cp = state.chapters[c.slug];
            const total = cp?.practiceTotal ?? 0;
            const correct = cp?.practiceCorrect ?? 0;
            const pct = total ? Math.round((correct / total) * 100) : 0;
            return (
              <li key={c.slug} className="flex items-center gap-3">
                <span className="text-lg" aria-hidden>
                  {CHAPTER_EMOJI[c.slug] ?? "📖"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-[var(--color-ink)] truncate">
                      {c.title}
                    </span>
                    <span className="text-[var(--color-muted)] shrink-0">
                      {total ? `${correct}/${total} · ${pct}%` : "—"}
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
    </div>
  );
}

function BigStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="ud-card p-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </div>
      <div className="text-2xl font-extrabold text-[var(--color-ink)] mt-1">
        {value}
      </div>
    </div>
  );
}

function ScoreChart({
  attempts,
}: {
  attempts: { score: number; total: number; finishedAt: string; passed: boolean }[];
}) {
  const max = 20;
  return (
    <div className="flex items-end gap-2 h-40 mt-2">
      {attempts.map((a, i) => {
        const h = Math.max(6, (a.score / max) * 100);
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={[
                "w-full rounded-t-md",
                a.passed ? "bg-[var(--color-success)]" : "bg-[var(--color-danger)]",
              ].join(" ")}
              style={{ height: `${h}%` }}
              title={`${a.score}/${a.total} on ${new Date(a.finishedAt).toLocaleDateString()}`}
            />
            <span className="text-[10px] font-bold tabular-nums text-[var(--color-muted)]">
              {a.score}
            </span>
          </div>
        );
      })}
    </div>
  );
}
