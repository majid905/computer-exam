"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserState, resetState } from "@/lib/storage";

export default function SettingsPage() {
  const router = useRouter();
  const [state, update] = useUserState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.documentElement;
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark =
      state.theme === "dark" || (state.theme === "system" && prefers);
    html.classList.toggle("dark", dark);
    localStorage.setItem("pc:theme", state.theme);
  }, [state.theme]);

  function reset() {
    if (typeof window === "undefined") return;
    if (
      confirm("Reset all progress, attempts, and onboarding? This can't be undone.")
    ) {
      resetState();
      router.replace("/onboarding");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Settings
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
          Preferences
        </h1>
      </header>

      <section className="ud-card p-6 mb-4">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-3">Theme</h2>
        <div className="grid grid-cols-3 gap-2">
          {(["light", "dark", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => update((s) => ({ ...s, theme: t }))}
              className={[
                "ud-card px-4 py-3 text-sm font-bold capitalize transition-colors",
                state.theme === t
                  ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  : "text-[var(--color-ink)] hover:border-[var(--color-muted)]",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="ud-card p-6 mb-4">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-1">
          Your profile
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Set during onboarding. Reset progress to change.
        </p>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <DT label="Language" value={state.onboarding.language.toUpperCase()} />
          <DT label="Province" value={state.onboarding.province ?? "—"} />
          <DT label="Test date" value={state.onboarding.testDate ?? "Not set"} />
          <DT
            label="Baseline"
            value={
              state.onboarding.baselineScore != null
                ? `${state.onboarding.baselineScore}%`
                : "—"
            }
          />
        </dl>
      </section>

      <section className="ud-card p-6 mb-4">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-1">
          Export progress
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Download a JSON snapshot of your study state.
        </p>
        <button
          className="ud-btn ud-btn-ghost"
          onClick={() => {
            const blob = new Blob([JSON.stringify(state, null, 2)], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "passcanada-progress.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download JSON
        </button>
      </section>

      <section className="ud-card p-6 border-[var(--color-danger)]/40">
        <h2 className="font-extrabold text-[var(--color-danger)] mb-1">
          Reset
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Clear all progress and start onboarding again.
        </p>
        <button
          className="ud-btn ud-btn-ghost"
          onClick={reset}
          style={{
            borderColor: "var(--color-danger)",
            color: "var(--color-danger)",
          }}
        >
          Reset all progress
        </button>
      </section>
    </div>
  );
}

function DT({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </dt>
      <dd className="text-[var(--color-ink)] font-bold mt-1">{value}</dd>
    </div>
  );
}
