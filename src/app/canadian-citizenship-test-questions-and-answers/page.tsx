import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Test Questions and Answers 2025 | PassPilot",
  description:
    "Official-style Canadian citizenship test questions and answers covering Confederation, the notwithstanding clause, IRCC, Fathers of Confederation, and the Senate.",
  alternates: { canonical: "https://www.passpilot.ca/canadian-citizenship-test-questions-and-answers" },
  openGraph: {
    title: "Canadian Citizenship Test Questions and Answers 2025",
    description: "Practice citizenship test questions with detailed answers covering key topics from Discover Canada.",
    url: "https://www.passpilot.ca/canadian-citizenship-test-questions-and-answers",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["canadian-citizenship-test-questions-and-answers"];

export default function CanadianCitizenshipTestQuestionsAnswersPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Questions and Answers
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Canadian Citizenship Test Questions and Answers
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          Studying with realistic questions and detailed answers is the most efficient way to prepare
          for the Canadian citizenship test. This page provides official-style questions on the most
          important topics, each with a full explanation of why the answer is correct.
        </p>

        {/* Key facts strip */}
        <div className="grid grid-cols-3 gap-3 mb-8 text-center">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">20</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Questions</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">75%</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Pass Score</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">45 min</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Time Limit</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-[var(--color-ink-2)]">
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Key Facts Every Citizenship Applicant Must Know</h2>
          <p>
            The Canadian citizenship test covers a wide range of material, but some facts appear far more
            frequently than others. Here are the foundational facts that every applicant should have
            memorized before test day:
          </p>
          <ul>
            <li>Canada became a country on <strong>July 1, 1867</strong>, through the British North America Act.</li>
            <li>Canada's first Prime Minister was <strong>Sir John A. Macdonald</strong>.</li>
            <li>Canada has <strong>10 provinces and 3 territories</strong>.</li>
            <li>The two official languages are <strong>English and French</strong>.</li>
            <li>The <strong>Charter of Rights and Freedoms</strong> was added to the Constitution in <strong>1982</strong>.</li>
            <li>The citizenship test has <strong>20 questions</strong> and requires <strong>15 correct (75%)</strong> to pass.</li>
            <li>Applicants must be physically present in Canada for <strong>1,095 days</strong> in the 5 years before applying.</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">History Questions Explained</h2>
          <p>
            Canadian history questions on the citizenship test tend to focus on Confederation (1867),
            the two World Wars, Indigenous peoples and residential schools, and the arrival of major
            immigrant groups. Key dates to remember:
          </p>
          <ul>
            <li><strong>1534</strong> — Jacques Cartier explores Canada for France</li>
            <li><strong>1608</strong> — Samuel de Champlain founds Quebec City</li>
            <li><strong>1759</strong> — Battle of the Plains of Abraham; British defeat the French</li>
            <li><strong>1867</strong> — Confederation; Canada becomes a country</li>
            <li><strong>1917</strong> — Vimy Ridge; defining moment for Canadian identity in WWI</li>
            <li><strong>1982</strong> — Charter of Rights and Freedoms; Constitution patriated from UK</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Government Questions Explained</h2>
          <p>
            Government questions are among the most commonly tested on the citizenship exam. The key
            structure to understand is:
          </p>
          <ul>
            <li><strong>Head of State</strong>: The Monarch (King Charles III), represented by the Governor General</li>
            <li><strong>Head of Government</strong>: The Prime Minister</li>
            <li><strong>Parliament</strong>: Three parts — the Crown, the Senate (105 appointed seats), and the House of Commons (338 elected seats)</li>
            <li><strong>Federal system</strong>: Powers divided between federal (national) and provincial governments</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Rights and Responsibilities Questions Explained</h2>
          <p>
            The Charter of Rights and Freedoms is tested extensively. Important sections include:
          </p>
          <ul>
            <li><strong>Section 2</strong>: Fundamental freedoms (expression, religion, assembly, association)</li>
            <li><strong>Section 3</strong>: Democratic rights (the right to vote)</li>
            <li><strong>Section 6</strong>: Mobility rights (freedom to move between provinces)</li>
            <li><strong>Section 15</strong>: Equality rights (no discrimination)</li>
            <li><strong>Section 33</strong>: The notwithstanding clause (legislatures can temporarily override certain rights)</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">Are there trick questions on the citizenship test?</h3>
          <p>
            The citizenship test is not designed to trick you. However, some questions use similar-sounding
            terms — for example, distinguishing between the head of state (the Monarch) and the head of
            government (the Prime Minister). Reading carefully and understanding the definitions is the
            best defense.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Which chapter of Discover Canada has the most questions?</h3>
          <p>
            Based on the guide's structure, the chapters on Rights and Responsibilities and How Canadians
            Govern Themselves tend to produce the most questions on the actual test. Study these chapters
            most thoroughly.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">How current are the questions?</h3>
          <p>
            The citizenship test is based on the Discover Canada guide, which is updated periodically
            by IRCC. Always check the IRCC website for the latest version. PassPilot's questions are
            based on the most recent published edition of the guide.
          </p>
        </div>
      </article>

      {/* MIDDLE SECTION */}
      <section className="mb-12">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
            Free Practice Test
          </p>
          <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">
            Try 5 Sample Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            These questions cover Confederation, the Charter, IRCC, and Parliament — read every explanation carefully.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Access 500+ practice questions</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot covers every chapter of Discover Canada with detailed explanations and full mock exams.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Start Free Today
        </Link>
      </div>
    </div>
  );
}
