import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "How Hard Is the Canadian Citizenship Test? — Easy, Medium & Hard Questions | PassPilot",
  description:
    "Is the Canadian citizenship test hard? We break down easy, medium, and hard questions with real examples. Find out where most people struggle and how to prepare.",
  alternates: { canonical: "https://www.passpilot.ca/how-hard-is-the-canadian-citizenship-test" },
  openGraph: {
    title: "How Hard Is the Canadian Citizenship Test?",
    description: "Easy, medium, and hard citizenship test questions explained — with tips on where most people struggle.",
    url: "https://www.passpilot.ca/how-hard-is-the-canadian-citizenship-test",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["how-hard-is-the-canadian-citizenship-test"];

export default function HowHardIsCanadianCitizenshipTestPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Test Difficulty
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          How Hard Is the Canadian Citizenship Test?
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          The short answer: for well-prepared applicants, the citizenship test is straightforward.
          For unprepared applicants, it can be surprisingly challenging. This page breaks down the
          test by difficulty level — easy, medium, and hard — so you know exactly where to focus your energy.
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
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Overall Difficulty: Moderate with Good Preparation</h2>
          <p>
            According to IRCC, the vast majority of applicants who study the Discover Canada guide pass
            the citizenship test on their first attempt. The test is not designed to be a trick —
            it tests whether you understand the material in the official study guide, not whether you
            can solve complex problems or write essays.
          </p>
          <p>
            However, applicants who arrive without studying, or who only skimmed the guide quickly,
            do struggle. The test covers 68 pages of material spanning history, government, rights,
            geography, and national identity — and some questions ask about quite specific facts.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Easy Questions (Most People Get These Right)</h2>
          <p>
            Approximately 8–10 of the 20 questions on a typical citizenship test would be considered
            easy. These include:
          </p>
          <ul>
            <li>What is Canada's capital city? (Ottawa)</li>
            <li>What is Canada's national anthem? (O Canada)</li>
            <li>How many provinces does Canada have? (10)</li>
            <li>What are Canada's two official languages? (English and French)</li>
            <li>What does Canada Day celebrate? (Confederation in 1867, July 1)</li>
          </ul>
          <p>
            These are the "giveaway" questions that you should never miss. Reviewing national symbols,
            holidays, and basic geography takes only a few hours but can secure 8–10 correct answers.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Medium Questions (Most Prepared Applicants Get These Right)</h2>
          <p>
            The medium-difficulty questions test specific facts that require actual study. These account
            for roughly 6–8 of the 20 questions:
          </p>
          <ul>
            <li>How many seats are in the House of Commons? (338)</li>
            <li>How many seats are in the Senate? (105)</li>
            <li>How does a person become Prime Minister?</li>
            <li>What year did the Charter of Rights and Freedoms become law? (1982)</li>
            <li>What is the passing score on the citizenship test? (75%, 15/20)</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Hard Questions (Where Applicants Struggle)</h2>
          <p>
            About 2–4 questions on each test would be considered harder — testing specific Charter
            sections, legal principles, or less obvious historical facts:
          </p>
          <ul>
            <li>Which section of the Charter guarantees equality rights? (Section 15)</li>
            <li>What does the notwithstanding clause (Section 33) allow?</li>
            <li>What is habeas corpus?</li>
            <li>What does the Canadian Multiculturalism Act of 1988 do?</li>
            <li>Who were the Fathers of Confederation?</li>
          </ul>
          <p>
            These harder questions are where the difference between "studied once" and "studied
            thoroughly" becomes apparent. Make sure you can answer all of them confidently.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">The Most Common Reason People Fail</h2>
          <p>
            Based on reported test experiences, the most common reasons applicants fail are:
          </p>
          <ul>
            <li>Not reading all of Discover Canada (skipping chapters on history or geography)</li>
            <li>Confusing similar-sounding terms (e.g., head of state vs. head of government)</li>
            <li>Misremembering key numbers (1,095 days vs. 730 days; 105 senators vs. 338 MPs)</li>
            <li>Not practicing with realistic multiple-choice questions before the test</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">Is the citizenship test harder than the driving test?</h3>
          <p>
            Most applicants find them comparable in difficulty. The citizenship test covers more
            material (an entire 68-page guide), but the questions are straightforward if you've
            studied. The driving test involves both a written knowledge component and a practical
            driving component that many find more challenging.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What percentage of people fail the citizenship test?</h3>
          <p>
            IRCC does not publish official pass/fail statistics. Anecdotal reports from immigration
            lawyers and community organizations suggest that 10–15% of applicants do not pass on their
            first attempt — most of whom had not thoroughly studied Discover Canada.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Is the oral interview harder than the written test?</h3>
          <p>
            The oral interview (given when an applicant fails the written test) is generally considered
            more challenging, as it also assesses language proficiency and allows the citizenship judge
            to ask follow-up questions. Avoid it by preparing fully for the written test.
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
            Try Easy, Medium &amp; Hard Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            These 5 questions are labelled by difficulty — see how you do across all three levels.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Make the hard questions easy</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot's adaptive practice system identifies your weak areas and focuses your study time where it matters most.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Identify My Weak Areas
        </Link>
      </div>
    </div>
  );
}
