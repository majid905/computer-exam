import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Practice Test 2024 — Free 5-Question Quiz | PassPilot",
  description:
    "Take a free Canadian citizenship practice test. Answer 5 official-style questions on history, government, and rights — then create a free account for full exam prep.",
  alternates: { canonical: "https://www.passpilot.ca/canadian-citizenship-practice-test" },
  openGraph: {
    title: "Canadian Citizenship Practice Test — Free Quiz",
    description: "Practice Canadian citizenship exam questions for free. See your score instantly.",
    url: "https://www.passpilot.ca/canadian-citizenship-practice-test",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["canadian-citizenship-practice-test"];

export default function CanadianCitizenshipPracticeTestPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Free Practice Test
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Canadian Citizenship Practice Test
        </h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-2xl">
          Answer these 5 official-style questions to test your knowledge of Canadian history, government,
          and rights. You will see the correct answer and explanation after each question.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          <span>✓ 5 questions</span>
          <span>✓ Instant feedback</span>
          <span>✓ Based on official Discover Canada guide</span>
        </div>
      </div>

      <SeoQuizClient questions={questions} />

      <section className="mt-16 prose prose-sm max-w-none text-[var(--color-ink-2)]">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">About the Canadian Citizenship Test</h2>
        <p>
          The Canadian citizenship test is a written exam taken by most adults applying for Canadian
          citizenship. It covers Canadian history, values, institutions, and symbols, all based on the
          official <em>Discover Canada</em> study guide published by Immigration, Refugees and
          Citizenship Canada (IRCC).
        </p>
        <p>
          The test has 20 multiple-choice questions. You need to answer at least 15 correctly (75%)
          to pass. PassPilot helps you prepare with full-length practice exams, chapter-by-chapter
          study material, and progress tracking.
        </p>
        <p>
          <Link href="/register" className="ud-link font-semibold">Create a free account</Link>{" "}
          to unlock all practice tests and mock exams.
        </p>
      </section>
    </div>
  );
}
