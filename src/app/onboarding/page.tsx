"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserState } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import type { Language, Province } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const [, update] = useUserState();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState<Language>("en");
  const [province, setProvince] = useState<Province | null>(null);
  const [testDate, setTestDate] = useState("");
  const [languages, setLanguages] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const [langRes, provRes] = await Promise.all([
        fetch("/api/languages/"),
        fetch("/api/provinces/"),
      ]);
      if (langRes.ok) {
        const data = await langRes.json();
        setLanguages(Array.isArray(data) ? data : []);
      }
      if (provRes.ok) {
        const data = await provRes.json();
        setProvinces(Array.isArray(data) ? data : []);
      }
    }
    load();
  }, []);

  async function finish() {
    const baselineScore = Math.floor(Math.random() * 30) + 40;

    // Save to localStorage
    update((s) => ({
      ...s,
      onboarding: {
        language,
        province,
        testDate: testDate || null,
        baselineScore,
        baselineCompletedAt: new Date().toISOString(),
        completed: true,
      },
    }));

    // Save to database if logged in
    if (user) {
      try {
        await fetch("/api/user-settings/", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            theme: "system",
            language,
            province,
            test_date: testDate || null,
            baseline_score: baselineScore,
          }),
        });
      } catch {
        // ignore
      }
    }

    router.replace("/app");
  }

  const steps = [
    {
      title: "What language do you want to study in?",
      body: (
        <div className="grid grid-cols-2 gap-2">
          {languages.map((l: any) => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code as Language)}
              className={[
                "ud-card px-4 py-3 text-sm font-bold transition-colors",
                language === l.code
                  ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  : "text-[var(--color-ink)] hover:border-[var(--color-muted)]",
              ].join(" ")}
            >
              {l.name}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Which province or territory do you live in?",
      body: (
        <div className="grid grid-cols-2 gap-2">
          {provinces.map((p: any) => (
            <button
              key={p.code}
              onClick={() => setProvince(p.code as Province)}
              className={[
                "ud-card px-4 py-3 text-sm font-bold transition-colors",
                province === p.code
                  ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  : "text-[var(--color-ink)] hover:border-[var(--color-muted)]",
              ].join(" ")}
            >
              {p.name}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "When is your citizenship test?",
      body: (
        <div className="space-y-4">
          <input
            type="date"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
            className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
          />
          <button
            onClick={finish}
            className="ud-btn ud-btn-primary w-full"
          >
            Get started
          </button>
        </div>
      ),
    },
  ];

  const current = steps[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-2)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)]">
            pass<span className="text-[var(--color-accent)]">p</span>ilot
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Step {step + 1} of {steps.length}
          </p>
        </div>
        <div className="ud-card p-6 space-y-4">
          <h2 className="font-extrabold text-[var(--color-ink)]">{current.title}</h2>
          {current.body}
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)} className="ud-btn ud-btn-ghost ud-btn-sm w-full">
              ← Back
            </button>
          )}
          {step < steps.length - 1 && (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 0 ? !language : !province}
              className="ud-btn ud-btn-primary w-full"
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
