import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Discover Canada Important Questions 2025 — Must-Know Facts | PassPilot",
  description:
    "The most important questions from the Discover Canada guide: Canada Day, Senate seats, the Oath of Citizenship, official languages, and Canada's head of government.",
  alternates: { canonical: "https://www.passpilot.ca/discover-canada-important-questions" },
  openGraph: {
    title: "Discover Canada Important Questions 2025",
    description: "Must-know questions from the Discover Canada guide for the Canadian citizenship test.",
    url: "https://www.passpilot.ca/discover-canada-important-questions",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["discover-canada-important-questions"];

export default function DiscoverCanadaImportantQuestionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Important Questions
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Discover Canada: The Most Important Questions
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          Not all facts in Discover Canada are equally likely to appear on the citizenship test. Based on
          the guide's content weighting and commonly reported test experiences, these are the most
          important questions and facts you absolutely must know before test day.
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
          <h2 className="text-xl font-bold text-[var(--color-ink)]">The Top 20 Facts Every Applicant Must Know</h2>
          <p>
            These 20 facts are the foundation of citizenship test preparation. Know each one cold before
            you walk into the test room:
          </p>
          <ol>
            <li>Canada became a country on <strong>July 1, 1867</strong> (Canada Day)</li>
            <li>Canada's first Prime Minister was <strong>Sir John A. Macdonald</strong></li>
            <li>Canada has <strong>10 provinces</strong> and <strong>3 territories</strong></li>
            <li>The two official languages are <strong>English and French</strong></li>
            <li>Canada's head of state is the <strong>Monarch (King Charles III)</strong></li>
            <li>Canada's head of government is the <strong>Prime Minister</strong></li>
            <li>The Governor General represents the <strong>Monarch</strong> in Canada</li>
            <li>Parliament has three parts: <strong>Crown, Senate, House of Commons</strong></li>
            <li>The Senate has <strong>105 appointed seats</strong></li>
            <li>The House of Commons has <strong>338 elected seats</strong></li>
            <li>The Charter of Rights and Freedoms was added to the Constitution in <strong>1982</strong></li>
            <li>The citizenship test has <strong>20 questions</strong> and requires <strong>15/20 (75%)</strong> to pass</li>
            <li>The official study guide is <strong>Discover Canada</strong></li>
            <li>Canada's national anthem is <strong>O Canada</strong> (proclaimed 1980)</li>
            <li>Canada's national animal is the <strong>beaver</strong></li>
            <li>National sports: <strong>hockey</strong> (winter), <strong>lacrosse</strong> (summer)</li>
            <li>Remembrance Day is <strong>November 11</strong></li>
            <li>The three groups of Aboriginal peoples: <strong>First Nations, Métis, Inuit</strong></li>
            <li>Applicants must have <strong>1,095 days</strong> of physical presence in 5 years</li>
            <li>The Oath of Citizenship is taken at the <strong>citizenship ceremony</strong></li>
          </ol>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Most Confused Concepts on the Citizenship Test</h2>
          <p>
            These are the areas where applicants most commonly make mistakes:
          </p>
          <ul>
            <li>
              <strong>Head of State vs. Head of Government</strong>: The Monarch is the head of STATE.
              The Prime Minister is the head of GOVERNMENT. The Governor General represents the Monarch
              in Canada but is not the head of state.
            </li>
            <li>
              <strong>Senate vs. House of Commons</strong>: Senators are APPOINTED (105 seats);
              Members of Parliament (MPs) are ELECTED (338 seats).
            </li>
            <li>
              <strong>Multiculturalism Act date</strong>: The policy was announced in 1971, but the
              Canadian Multiculturalism Act was passed in 1988.
            </li>
            <li>
              <strong>1,095 vs. 730 days</strong>: Citizens need 1,095 days in 5 years; permanent
              residents only need 730 days in 5 years to maintain PR status.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Important Dates and Numbers</h2>
          <p>
            The citizenship test frequently includes questions about specific dates and numbers.
            Here are the ones that appear most often:
          </p>
          <ul>
            <li><strong>1534</strong> — Jacques Cartier explores Canada for France</li>
            <li><strong>1608</strong> — Samuel de Champlain founds Quebec City</li>
            <li><strong>1867</strong> — Confederation (July 1)</li>
            <li><strong>1917</strong> — Battle of Vimy Ridge (April 9–12)</li>
            <li><strong>1965</strong> — The maple leaf flag adopted</li>
            <li><strong>1969</strong> — Official Languages Act</li>
            <li><strong>1980</strong> — O Canada becomes official anthem</li>
            <li><strong>1982</strong> — Charter of Rights and Freedoms; Constitution patriated</li>
            <li><strong>1988</strong> — Canadian Multiculturalism Act</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">Are there any topics I can skip?</h3>
          <p>
            No — any fact in Discover Canada can appear on the test. However, some topics carry more
            weight. If you are short on time, prioritize: Rights and Responsibilities, Government
            structure, and key History milestones. These three areas typically account for the majority
            of test questions.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What are the easiest questions on the test?</h3>
          <p>
            Questions about national symbols (the beaver, the maple leaf flag, O Canada) and basic
            geography (capital city, number of provinces) tend to be among the easiest. Most well-prepared
            applicants get these correct.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What are the hardest questions?</h3>
          <p>
            Questions about specific Charter sections (e.g., which section guarantees equality rights),
            the notwithstanding clause, and the exact physical presence requirements tend to be the most
            challenging. Study these carefully.
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
            Try 5 Important Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            These five questions cover Canada Day, the Senate, the Oath of Citizenship, official languages, and the head of government.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Master every important topic</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot's chapter-by-chapter study system makes sure you know every key fact before test day.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Start Studying Free
        </Link>
      </div>
    </div>
  );
}
