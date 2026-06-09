"use client";

import { useState } from "react";
import Link from "next/link";

type RelatedTerm = { title: string; slug: string };

type Term = {
  id: number;
  title: string;
  slug: string;
  short_definition: string;
  full_description: string | null;
  ai_explanation: string | null;
  related_terms: string | null;
  quiz_question: string | null;
  quiz_options: string | null;
  quiz_answer: number | null;
  access_level: "free" | "login" | "pro";
  _gated: boolean;
};

const ACCESS_COPY: Record<string, { title: string; cta: string; href: string; ctaColor: string }> = {
  login: {
    title: "Create a free account to read the full definition",
    cta: "Sign Up Free",
    href: "/register",
    ctaColor: "bg-blue-600 hover:bg-blue-700",
  },
  pro: {
    title: "Upgrade to Pro to access the full explanation, AI insights, and quiz",
    cta: "See Pro Plans",
    href: "/pricing",
    ctaColor: "bg-purple-600 hover:bg-purple-700",
  },
};

function PronounceButton({ word }: { word: string }) {
  const [speaking, setSpeaking] = useState(false);

  function speak() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-CA";
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      onClick={speak}
      aria-label={`Pronounce ${word}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm transition hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-blue-400"
    >
      {speaking ? (
        <span className="h-4 w-4 animate-pulse">🔊</span>
      ) : (
        <span className="h-4 w-4">🔉</span>
      )}
      Pronounce
    </button>
  );
}

function QuickQuiz({
  question,
  options,
  correctIndex,
}: {
  question: string;
  options: string[];
  correctIndex: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-700/40 dark:bg-amber-900/20">
      <h3 className="mb-3 font-semibold text-amber-900 dark:text-amber-200">Quick Quiz</h3>
      <p className="mb-4 text-sm text-gray-800 dark:text-gray-200">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          let cls =
            "rounded-lg border px-4 py-2 text-left text-sm transition cursor-pointer ";
          if (selected === null) {
            cls += "border-gray-300 bg-white hover:border-blue-400 dark:border-gray-600 dark:bg-gray-800";
          } else if (i === correctIndex) {
            cls += "border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300";
          } else if (i === selected) {
            cls += "border-red-400 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300";
          } else {
            cls += "border-gray-200 bg-white opacity-60 dark:border-gray-700 dark:bg-gray-800";
          }
          return (
            <button key={i} className={cls} onClick={() => setSelected(i)} disabled={selected !== null}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <p className={`mt-3 text-sm font-medium ${selected === correctIndex ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
          {selected === correctIndex ? "✓ Correct!" : `✗ The correct answer is: ${options[correctIndex]}`}
        </p>
      )}
    </div>
  );
}

export function DictionaryTermContent({ term, isLoggedIn = false }: { term: Term; isLoggedIn?: boolean }) {
  let relatedTerms: RelatedTerm[] = [];
  try {
    if (term.related_terms) relatedTerms = JSON.parse(term.related_terms);
  } catch {}

  let quizOptions: string[] = [];
  try {
    if (term.quiz_options) quizOptions = JSON.parse(term.quiz_options);
  } catch {}

  const accessBadge =
    term.access_level === "free"
      ? { label: "Free", cls: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" }
      : term.access_level === "login"
      ? { label: "Login Required", cls: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" }
      : { label: "Pro", cls: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300" };

  const gatedCopy = term._gated ? ACCESS_COPY[term.access_level] : null;

  return (
    <article>
      {/* Title row */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {term.title}
        </h1>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${accessBadge.cls}`}>
          {accessBadge.label}
        </span>
        <PronounceButton word={term.title} />
      </div>

      {/* Short definition */}
      <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {term.short_definition}
      </p>

      {/* Gate banner */}
      {gatedCopy && (
        <div className="mb-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-600 dark:bg-gray-800/50">
          <p className="mb-3 font-medium text-gray-800 dark:text-gray-200">{gatedCopy.title}</p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <Link
              href={gatedCopy.href}
              className={`rounded-lg px-5 py-2 text-sm font-semibold text-white transition ${gatedCopy.ctaColor}`}
            >
              {gatedCopy.cta}
            </Link>
            {!isLoggedIn && (
              <Link href="/login" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                Already have an account? Sign in
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Full description */}
      {term.full_description && (
        <section className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Definition</h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">{term.full_description}</p>
        </section>
      )}

      {/* AI explanation */}
      {term.ai_explanation && (
        <section className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-700/40 dark:bg-blue-900/20">
          <h2 className="mb-2 flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-200">
            <span>✨</span> Plain-English Explanation
          </h2>
          <p className="text-sm leading-relaxed text-blue-900/80 dark:text-blue-100/80">
            {term.ai_explanation}
          </p>
        </section>
      )}

      {/* Related terms */}
      {relatedTerms.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Related Terms</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map((rt) => (
              <Link
                key={rt.slug}
                href={`/dictionary/${rt.slug}`}
                className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-blue-400"
              >
                {rt.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Quiz */}
      {term.quiz_question && quizOptions.length > 0 && term.quiz_answer != null && !term._gated && (
        <QuickQuiz
          question={term.quiz_question}
          options={quizOptions}
          correctIndex={term.quiz_answer}
        />
      )}
    </article>
  );
}
