import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Ontario Canadian Citizenship Test Practice — Free Quiz | PassPilot",
  description:
    "Practice Canadian citizenship test questions with an Ontario focus. 5 free questions on Ontario geography, history, and Canadian government. Instant results and explanations.",
  alternates: { canonical: "https://www.passpilot.ca/citizenship-test-ontario" },
  openGraph: {
    title: "Ontario Citizenship Test Practice — Free Quiz",
    description: "Free citizenship test quiz with Ontario-focused questions on geography, history, and government.",
    url: "https://www.passpilot.ca/citizenship-test-ontario",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["citizenship-test-ontario"];

export default function CitizenshipTestOntarioPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Ontario Practice
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Canadian Citizenship Test — Ontario
        </h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-2xl">
          If you live in Ontario and are preparing for the Canadian citizenship test, this quiz
          covers Ontario-specific knowledge alongside national topics that appear on the exam.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          <span>✓ 5 questions</span>
          <span>✓ Instant feedback</span>
          <span>✓ Ontario geography &amp; history</span>
        </div>
      </div>

      <SeoQuizClient questions={questions} />

      <section className="mt-16 prose prose-sm max-w-none text-[var(--color-ink-2)]">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">Taking the Citizenship Test in Ontario</h2>
        <p>
          If you are applying for Canadian citizenship while living in Ontario, you will take the
          same standardized test as applicants across Canada. The citizenship test covers all of
          Canada — not just your province — but knowing Ontario's geography, history, and
          government can help you answer questions that reference provinces and regions.
        </p>
        <p>
          Ontario is Canada's most populous province and home to the nation's capital, Ottawa, as
          well as Toronto, Canada's largest city. Many citizenship interview appointments and test
          sittings are held at IRCC offices in Toronto, Mississauga, and other Ontario cities.
        </p>
        <p>
          <Link href="/register" className="ud-link font-semibold">Create a free PassPilot account</Link>{" "}
          to study all chapters of the Discover Canada guide with chapter quizzes and full mock exams.
        </p>
      </section>
    </div>
  );
}
