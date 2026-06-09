import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Test Questions — Rights & Freedoms Quiz | PassPilot",
  description:
    "Practice Canadian citizenship test questions on rights, freedoms, and responsibilities. Free 5-question quiz with instant feedback based on the Discover Canada guide.",
  alternates: { canonical: "https://www.passpilot.ca/citizenship-test-questions" },
  openGraph: {
    title: "Canadian Citizenship Test Questions — Rights & Freedoms",
    description: "Practice citizenship test questions on the Charter of Rights, voting rights, and responsibilities.",
    url: "https://www.passpilot.ca/citizenship-test-questions",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["citizenship-test-questions"];

export default function CitizenshipTestQuestionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Rights &amp; Freedoms
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Canadian Citizenship Test Questions
        </h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-2xl">
          Test your knowledge of the Canadian Charter of Rights and Freedoms, voting rights, and
          the responsibilities of Canadian citizenship. All questions are based on the official
          Discover Canada study guide.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          <span>✓ 5 questions</span>
          <span>✓ Instant feedback</span>
          <span>✓ Rights &amp; responsibilities focus</span>
        </div>
      </div>

      <SeoQuizClient questions={questions} />

      <section className="mt-16 prose prose-sm max-w-none text-[var(--color-ink-2)]">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">Rights and Responsibilities in the Citizenship Test</h2>
        <p>
          A significant portion of the Canadian citizenship test covers the rights and
          responsibilities of Canadian citizens. This includes understanding the Canadian Charter
          of Rights and Freedoms, which is part of Canada's Constitution.
        </p>
        <p>
          The Charter guarantees fundamental freedoms (such as freedom of expression and religion),
          democratic rights (such as the right to vote), legal rights, equality rights, and
          language rights. Citizens also have important responsibilities, including obeying the law,
          serving on jury duty, and participating in Canada's democratic process.
        </p>
        <p>
          <Link href="/register" className="ud-link font-semibold">Sign up for free</Link>{" "}
          to access PassPilot's complete question bank covering all citizenship test topics.
        </p>
      </section>
    </div>
  );
}
