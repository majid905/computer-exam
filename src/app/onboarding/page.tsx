"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserState } from "@/lib/storage";
import { QuizCard } from "@/components/app/QuizCard";
import { shuffle } from "@/lib/exam";
import { questions } from "@/lib/content";
import type { Language, Province } from "@/lib/types";
import { ProgressBar } from "@/components/ui/Progress";

const LANGS: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "fr", label: "French", native: "Français" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "zh", label: "Mandarin", native: "中文" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "tl", label: "Tagalog", native: "Tagalog" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "es", label: "Spanish", native: "Español" },
];

const PROVINCES: { code: Province; name: string }[] = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
];

const STEPS = ["language", "province", "date", "diagnostic", "summary"] as const;
type Step = (typeof STEPS)[number];

export default function OnboardingPage() {
  const router = useRouter();
  const [, update] = useUserState();
  const [step, setStep] = useState<Step>("language");
  const [language, setLanguage] = useState<Language>("en");
  const [province, setProvince] = useState<Province | null>(null);
  const [testDate, setTestDate] = useState<string>("");
  const [diagAnswers, setDiagAnswers] = useState<Record<string, number>>({});

  const diagQuestions = useMemo(
    () => shuffle(questions).slice(0, 5),
    [],
  );

  const stepIndex = STEPS.indexOf(step);

  function advance() {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  }
  function back() {
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev);
  }

  const diagScore = useMemo(() => {
    let c = 0;
    for (const q of diagQuestions) {
      if (diagAnswers[q.id] === q.answer) c++;
    }
    return c;
  }, [diagAnswers, diagQuestions]);

  function finish() {
    const pct = Math.round((diagScore / diagQuestions.length) * 100);
    update((s) => {
      const ch = { ...s.chapters };
      for (const q of diagQuestions) {
        const selected = diagAnswers[q.id];
        const correct = selected === q.answer;
        const cp = ch[q.chapter] ?? {
          read: false,
          practiceAttempts: 0,
          practiceCorrect: 0,
          practiceTotal: 0,
        };
        ch[q.chapter] = {
          ...cp,
          practiceCorrect: cp.practiceCorrect + (correct ? 1 : 0),
          practiceTotal: cp.practiceTotal + 1,
        };
      }
      return {
        ...s,
        theme: s.theme,
        chapters: ch,
        onboarding: {
          language,
          province,
          testDate: testDate || null,
          baselineScore: pct,
          baselineCompletedAt: new Date().toISOString(),
          completed: true,
        },
      };
    });
    router.replace("/app");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="mx-auto max-w-3xl px-5 h-14 flex items-center justify-between">
          <p className="font-extrabold tracking-tight text-[var(--color-ink)]">
            pass<span className="text-[var(--color-accent)]">p</span>ilot
            <span className="text-[var(--color-muted)] font-bold"> — Setup</span>
          </p>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Step {stepIndex + 1} of {STEPS.length}
          </span>
        </div>
        <div className="h-1 bg-[var(--color-border-2)]">
          <div
            className="h-full bg-[var(--color-brand)] transition-[width]"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-3xl px-5 py-8 w-full">
        {step === "language" && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome — what language do you study in?
            </h1>
            <p className="text-[var(--color-muted)] mt-2 max-w-xl">
              The test itself is in English or French. Pick the language you'd
              like explanations and guidance in.
            </p>
            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LANGS.map((l) => (
                <li key={l.code}>
                  <button
                    onClick={() => setLanguage(l.code)}
                    className={[
                      "w-full text-left ud-card p-4 transition-colors",
                      language === l.code
                        ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "hover:border-[var(--color-muted)]",
                    ].join(" ")}
                  >
                    <div className="text-base font-bold text-[var(--color-ink)]">
                      {l.native}
                    </div>
                    <div className="text-xs text-[var(--color-muted)] mt-0.5">
                      {l.label}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-end">
              <button className="ud-btn ud-btn-primary" onClick={advance}>
                Continue
              </button>
            </div>
          </div>
        )}

        {step === "province" && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Where will you take the test?
            </h1>
            <p className="text-[var(--color-muted)] mt-2 max-w-xl">
              Your province changes some test content (e.g. provincial capital,
              regional history).
            </p>
            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PROVINCES.map((p) => (
                <li key={p.code}>
                  <button
                    onClick={() => setProvince(p.code)}
                    className={[
                      "w-full text-left ud-card px-4 py-3 transition-colors",
                      province === p.code
                        ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "hover:border-[var(--color-muted)]",
                    ].join(" ")}
                  >
                    <span className="font-bold text-[var(--color-ink)] text-sm">
                      {p.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-between">
              <button className="ud-btn ud-btn-ghost" onClick={back}>
                Back
              </button>
              <button
                className="ud-btn ud-btn-primary"
                onClick={advance}
                disabled={!province}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === "date" && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              When is your test?
            </h1>
            <p className="text-[var(--color-muted)] mt-2 max-w-xl">
              We'll pace your study plan to it. If you don't have a date yet,
              that's fine — skip ahead.
            </p>
            <div className="mt-6 ud-card p-5 max-w-md">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                Test date (optional)
              </label>
              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="mt-2 w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
              />
            </div>
            <div className="mt-8 flex justify-between">
              <button className="ud-btn ud-btn-ghost" onClick={back}>
                Back
              </button>
              <button className="ud-btn ud-btn-primary" onClick={advance}>
                {testDate ? "Continue" : "Skip"}
              </button>
            </div>
          </div>
        )}

        {step === "diagnostic" && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Quick check: 5 questions
            </h1>
            <p className="text-[var(--color-muted)] mt-2 max-w-xl">
              No score shown until the end — just answer your best guess so we
              can seed your study plan.
            </p>
            <div className="mt-6 space-y-4">
              {diagQuestions.map((q, i) => (
                <QuizCard
                  key={q.id}
                  q={q}
                  index={i}
                  total={diagQuestions.length}
                  showImmediateFeedback={false}
                  onAnswered={(selected) =>
                    setDiagAnswers((prev) => ({ ...prev, [q.id]: selected }))
                  }
                  initialSelected={diagAnswers[q.id] ?? null}
                />
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button className="ud-btn ud-btn-ghost" onClick={back}>
                Back
              </button>
              <button
                className="ud-btn ud-btn-primary"
                onClick={advance}
                disabled={
                  Object.keys(diagAnswers).length < diagQuestions.length
                }
              >
                See results
              </button>
            </div>
          </div>
        )}

        {step === "summary" && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              You're at {Math.round((diagScore / diagQuestions.length) * 100)}%
              baseline.
            </h1>
            <p className="text-[var(--color-muted)] mt-2 max-w-xl">
              That's a starting point, not a verdict. We'll surface your weakest
              chapters first.
            </p>
            <div className="mt-6 ud-card p-6 max-w-md">
              <div className="flex items-center justify-between text-sm font-bold mb-2">
                <span className="text-[var(--color-muted)]">Diagnostic</span>
                <span>
                  {diagScore} / {diagQuestions.length}
                </span>
              </div>
              <ProgressBar
                value={diagScore}
                max={diagQuestions.length}
              />
              <ul className="mt-4 space-y-1.5 text-sm text-[var(--color-muted)]">
                <li>
                  Language: <strong>{language.toUpperCase()}</strong>
                </li>
                <li>
                  Province: <strong>{province ?? "—"}</strong>
                </li>
                <li>
                  Test date: <strong>{testDate || "Not set"}</strong>
                </li>
              </ul>
            </div>
            <div className="mt-8 flex justify-end gap-2">
              <button className="ud-btn ud-btn-ghost" onClick={back}>
                Back
              </button>
              <button className="ud-btn ud-btn-primary" onClick={finish}>
                Start studying
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
