import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Physical Presence Calculator Guide 2025 | PassPilot",
  description:
    "How to calculate your 1,095 days of physical presence for Canadian citizenship. Understand the 5-year window, half-credit days, and what counts toward your total.",
  alternates: { canonical: "https://www.passpilot.ca/canadian-citizenship-calculator" },
  openGraph: {
    title: "Canadian Citizenship Physical Presence Calculator Guide 2025",
    description: "How to count your 1,095 days of physical presence for the Canadian citizenship application.",
    url: "https://www.passpilot.ca/canadian-citizenship-calculator",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["canadian-citizenship-calculator"];

export default function CanadianCitizenshipCalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Physical Presence Guide
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Canadian Citizenship Physical Presence Calculator: Complete Guide
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          Meeting the 1,095-day physical presence requirement is the first major hurdle in the
          citizenship application process. Understanding exactly how to count your days — and what
          counts and what doesn't — is critical before you submit your application.
        </p>

        {/* Key facts strip */}
        <div className="grid grid-cols-3 gap-3 mb-8 text-center">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">1,095</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Days Required</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">5 yrs</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Look-back Window</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">365</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Max Half-Credit Days</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-[var(--color-ink-2)]">
          <h2 className="text-xl font-bold text-[var(--color-ink)]">The Basic Rule: 1,095 Days in 5 Years</h2>
          <p>
            To apply for Canadian citizenship, you must have been physically present in Canada for at
            least <strong>1,095 days</strong> (exactly 3 years, counting days) within the <strong>5 years
            immediately before the date you sign your application</strong>. This is not 3 calendar years —
            it is 1,095 individual calendar days when you were physically inside Canada.
          </p>
          <p>
            For example, if you sign your application on June 1, 2025, the 5-year window runs from
            June 1, 2020, to June 1, 2025. Count every day you were physically in Canada within this
            window and the total must be 1,095 or more.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">What Days Count?</h2>
          <p>
            Only days when you were physically inside Canadian territory count. This includes:
          </p>
          <ul>
            <li>Every calendar day you slept or spent time in Canada while a permanent resident</li>
            <li>Days in Canada as a temporary resident (at half credit — see below)</li>
            <li>Days you worked, studied, were on vacation, or were hospitalized — as long as you were physically in Canada</li>
          </ul>
          <p>
            Days do NOT count when you were outside Canada for any reason — business travel, family
            visits, vacations abroad, or working abroad. The rule is strictly physical location.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Half-Credit Days: Temporary Resident Status</h2>
          <p>
            If you spent time in Canada as a <strong>temporary resident</strong> (on a work permit,
            study permit, or as a visitor) before becoming a permanent resident, those days count at
            <strong>half credit</strong> — meaning every 2 days as a temp resident counts as 1 day
            toward your 1,095-day total.
          </p>
          <p>
            Half-credit days are capped at a maximum of <strong>365 credit days</strong>
            (which requires 730 actual physical days as a temporary resident). So even if you
            spent 1,000 days in Canada as a student before becoming a PR, you can only count
            365 of those as half-credit days.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">PR vs. Citizenship Residency Requirements</h2>
          <p>
            It is important not to confuse the two residency requirements:
          </p>
          <ul>
            <li>
              <strong>Permanent Resident status</strong>: Must be physically present in Canada for
              <strong>730 days</strong> in every 5-year period to maintain PR status.
            </li>
            <li>
              <strong>Citizenship application</strong>: Must have <strong>1,095 days</strong> of
              physical presence in the 5 years before applying.
            </li>
          </ul>
          <p>
            This means you could technically maintain your PR status while spending only 730 days
            in Canada over 5 years, but you would not yet qualify for citizenship (which requires
            1,095 days). Plan your timeline accordingly.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Using the IRCC Physical Presence Calculator</h2>
          <p>
            IRCC provides a free online Physical Presence Calculator on the IRCC website. To use it,
            you need your:
          </p>
          <ul>
            <li>Date you became a permanent resident</li>
            <li>All travel history (entry and exit dates from Canada) for the past 5 years</li>
            <li>Any dates of temporary resident status in Canada before becoming a PR</li>
          </ul>
          <p>
            Keep detailed travel records — including boarding passes, passport stamps, and foreign
            bank statements — as IRCC may request documentation to verify your calculations.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">Does a day count if I left Canada and came back the same day?</h3>
          <p>
            Each calendar day you are physically in Canada at any point counts as one day. If you left
            and returned on the same calendar day, that day still counts as one day in Canada. Days
            you spent entirely outside Canada do not count.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What if I have incomplete travel records?</h3>
          <p>
            IRCC expects you to make a best-faith effort to accurately record all travel. If your
            records are incomplete, try to reconstruct your travel history using passport stamps,
            old bank statements, employment records, and accommodation receipts. Intentionally
            misrepresenting your physical presence is a serious offence that can result in citizenship
            being revoked.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">When should I start counting toward 1,095 days?</h3>
          <p>
            Start counting as soon as you receive your permanent resident status. Days before you
            became a PR count only at half credit (up to 365 credit days). The sooner you get your
            PR status and start accumulating days, the sooner you can apply for citizenship.
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
            Try 5 Physical Presence Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            These questions cover the 1,095-day rule, half-credit days, and the calculation window — all commonly tested.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Qualified? Start studying for the test.</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Once you've counted your days and confirmed eligibility, PassPilot will help you ace the knowledge test.
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
