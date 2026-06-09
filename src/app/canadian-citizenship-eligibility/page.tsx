import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Eligibility Requirements 2025 | PassPilot",
  description:
    "Complete guide to Canadian citizenship eligibility: age, physical presence (1,095 days), language requirements (CLB 4), tax filings, and criminal prohibitions.",
  alternates: { canonical: "https://www.passpilot.ca/canadian-citizenship-eligibility" },
  openGraph: {
    title: "Canadian Citizenship Eligibility Requirements 2025",
    description: "Do you qualify for Canadian citizenship? Age, physical presence, language, and tax requirements explained.",
    url: "https://www.passpilot.ca/canadian-citizenship-eligibility",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["canadian-citizenship-eligibility"];

export default function CanadianCitizenshipEligibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Eligibility Requirements
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Canadian Citizenship Eligibility Requirements: Complete 2025 Guide
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          Before you can apply for Canadian citizenship, you must meet a specific set of requirements
          set by IRCC. Understanding these eligibility rules is the first step in your citizenship journey —
          and several of them are also tested directly on the citizenship exam.
        </p>

        {/* Key facts strip */}
        <div className="grid grid-cols-3 gap-3 mb-8 text-center">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">1,095</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Days Required</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">CLB 4</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Language Level</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">18+</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Minimum Age</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-[var(--color-ink-2)]">
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Requirement 1: Permanent Resident Status</h2>
          <p>
            You must be a permanent resident (PR) of Canada to apply for citizenship. Temporary residents
            (work permit holders, students, visitors) are not eligible. You must also not be under a
            removal order or subject to certain immigration proceedings.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Requirement 2: Physical Presence — 1,095 Days</h2>
          <p>
            This is the most commonly tested eligibility requirement on the citizenship exam. You must have
            been <strong>physically present in Canada for at least 1,095 days</strong> (approximately
            3 years) within the 5 years immediately before your application date.
          </p>
          <p>
            Important nuances:
          </p>
          <ul>
            <li>Days are counted as physical days inside Canada — not calendar months</li>
            <li>Days outside Canada for any reason do NOT count</li>
            <li>Days as a temporary resident (before becoming a PR) count at <strong>half credit</strong>, up to a maximum of 365 days</li>
            <li>The 5-year window is calculated back from the date you <strong>sign</strong> your application</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Requirement 3: Language Proficiency — CLB Level 4</h2>
          <p>
            Applicants aged 18 to 54 must demonstrate adequate knowledge of English or French at a
            minimum of <strong>Canadian Language Benchmarks (CLB) level 4</strong>. This means you
            can communicate in everyday situations — you can understand and be understood in simple
            conversations. You do not need to be fluent.
          </p>
          <p>
            Acceptable evidence of language proficiency includes:
          </p>
          <ul>
            <li>Results from a designated language test (IELTS, CELPIP for English; TEF Canada or TCF Canada for French)</li>
            <li>Completion of secondary or post-secondary education in English or French</li>
            <li>Evidence of working in an English or French environment</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Requirement 4: Income Tax Filing</h2>
          <p>
            You must have filed Canadian income taxes for <strong>at least 3 of the 5 tax years</strong>
            within the 5-year window before your application. This is IRCC's way of verifying your
            integration into Canadian society and compliance with Canadian obligations.
          </p>
          <p>
            If you were exempt from filing taxes in certain years (e.g., because your income was below
            the threshold), you must still have met the obligation to file, not simply chosen not to.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Requirement 5: Age</h2>
          <p>
            You must be at least <strong>18 years old</strong> to apply independently for citizenship.
            Children under 18 may be included in a parent's or guardian's citizenship application.
            Minor children included this way do not need to meet the language or knowledge test
            requirements, and they do not need to meet the physical presence requirement separately
            (they "inherit" coverage from the applying parent).
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Requirement 6: No Serious Criminal History</h2>
          <p>
            Certain criminal convictions or immigration-related issues can make you ineligible for
            citizenship. Specifically:
          </p>
          <ul>
            <li>A conviction for an indictable offence makes you ineligible for <strong>4 years</strong> from the conviction date</li>
            <li>Being under a removal order or serving a term of imprisonment makes you ineligible</li>
            <li>Charges or investigations for certain offences may also pause your application</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">Do I need to give up my other citizenship to become Canadian?</h3>
          <p>
            No. Canada permits dual and multiple citizenship. You do not need to renounce your birth
            country's citizenship to become a Canadian citizen.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Can I count time spent in Canada as a student or on a work permit?</h3>
          <p>
            Yes, at half credit. Days in Canada as a temporary resident (student, worker, or visitor)
            before you became a permanent resident count at 0.5 days each, up to a maximum of 365 days.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What if I was away from Canada for extended work trips?</h3>
          <p>
            Days outside Canada do not count toward the 1,095-day requirement, regardless of the reason.
            Use the IRCC physical presence calculator to carefully count your eligible days before applying.
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
            Try 5 Eligibility Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            These questions cover the key eligibility requirements that also appear on the citizenship test.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Prepare for your citizenship test</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Once you meet the eligibility requirements, PassPilot helps you pass the knowledge test with chapter-by-chapter study guides and full mock exams.
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
