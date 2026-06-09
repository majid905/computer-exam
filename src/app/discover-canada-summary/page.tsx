import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Discover Canada Summary — Key Facts for the Citizenship Test | PassPilot",
  description:
    "A concise summary of the Discover Canada guide for citizenship test prep. Covers Aboriginal peoples, Confederation, Vimy Ridge, national symbols, and more.",
  alternates: { canonical: "https://www.passpilot.ca/discover-canada-summary" },
  openGraph: {
    title: "Discover Canada Summary — Key Facts for the Citizenship Test",
    description: "Concise summary of every chapter of Discover Canada — the official Canadian citizenship study guide.",
    url: "https://www.passpilot.ca/discover-canada-summary",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["discover-canada-summary"];

export default function DiscoverCanadaSummaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Study Guide Summary
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Discover Canada Summary: Key Facts for the Citizenship Test
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          <em>Discover Canada: The Rights and Responsibilities of Citizenship</em> is the official IRCC
          study guide for the Canadian citizenship test. Every single test question comes from this
          booklet. This page summarizes the most important facts from each chapter, giving you a
          quick-reference study tool to complement your full reading of the guide.
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
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Chapter 1: Rights and Responsibilities of Citizenship</h2>
          <p>
            This is the most heavily tested chapter. Key facts: Canadian citizens have the right to vote,
            run for public office, enter and leave Canada freely, and apply for a Canadian passport.
            Citizens also have responsibilities: obeying the law, serving on jury duty when called,
            paying taxes, and helping defend Canada if needed.
          </p>
          <p>
            The <strong>Canadian Charter of Rights and Freedoms</strong> (1982) guarantees fundamental
            freedoms (Section 2), democratic rights (Section 3), mobility rights (Section 6), legal
            rights (Sections 7–14), equality rights (Section 15), and official language rights (Sections 16–20).
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Chapter 2: Who We Are</h2>
          <p>
            Canada's Aboriginal peoples — <strong>First Nations, Métis, and Inuit</strong> — are the
            original inhabitants of Canada. They have distinct cultures, languages, and traditions.
            Canada is a diverse country that officially adopted multiculturalism in 1971 and enshrined
            it in the Canadian Multiculturalism Act (1988).
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Chapter 3: Canada's History</h2>
          <p>
            Important events: Jacques Cartier explored Canada in 1534. Samuel de Champlain founded Quebec
            City in 1608. The British defeated the French at the Battle of the Plains of Abraham in 1759.
            <strong>Confederation occurred on July 1, 1867</strong>, creating the Dominion of Canada.
            Sir John A. Macdonald became Canada's first Prime Minister.
          </p>
          <p>
            In World War I (1914–1918), Canadians distinguished themselves at <strong>Vimy Ridge (1917)</strong>.
            More than 60,000 Canadians died in WWI. In WWII, Canada participated in the D-Day landings
            at Normandy (1944). About 45,000 Canadians gave their lives in WWII.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Chapter 4: Modern Canada</h2>
          <p>
            The <strong>Constitution Act, 1982</strong> patriated Canada's Constitution from Britain and
            added the Charter. In 1982, Canada Day replaced Dominion Day. The Clarity Act (2000) set
            conditions for any province to legally separate from Canada.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Chapter 5: How Canadians Govern Themselves</h2>
          <p>
            Canada is a constitutional monarchy and a parliamentary democracy. Parliament has three parts:
            the Crown (represented by the Governor General), the Senate (105 appointed members), and the
            House of Commons (338 elected members). The Prime Minister leads the party with the most
            seats in the House of Commons.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Chapter 6: Federal Elections</h2>
          <p>
            Every Canadian citizen aged 18 and older has the right to vote. Each of Canada's 338 electoral
            districts (ridings) elects one Member of Parliament (MP). The candidate with the most votes
            wins the riding under Canada's first-past-the-post system. Elections must be held at least
            every 5 years; fixed election dates are set for every 4 years.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Key Symbols to Remember</h2>
          <ul>
            <li><strong>National flag</strong>: Red and white with a maple leaf (adopted 1965)</li>
            <li><strong>National animal</strong>: Beaver</li>
            <li><strong>National anthem</strong>: O Canada (proclaimed 1980)</li>
            <li><strong>National sports</strong>: Hockey (winter) and Lacrosse (summer)</li>
            <li><strong>Canada Day</strong>: July 1 (Confederation, 1867)</li>
            <li><strong>Remembrance Day</strong>: November 11</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">Is reading Discover Canada enough to pass?</h3>
          <p>
            Reading it thoroughly is essential, but active practice — answering questions and reviewing
            wrong answers — dramatically increases your retention. Use this summary as a reference while
            you practice with official-style questions.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">How long is the Discover Canada guide?</h3>
          <p>
            The guide is approximately 68 pages. Most people can read it carefully in 3–4 hours.
            Plan to read it at least twice — once to understand it, and once to review before the test.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Where can I get a copy of Discover Canada?</h3>
          <p>
            Discover Canada is available free on the IRCC website in English and French. You can also
            request a free print copy from your nearest Service Canada Centre.
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
            Test your knowledge of key Discover Canada topics — Aboriginal peoples, Confederation, Vimy Ridge, and more.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Study every chapter of Discover Canada</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot breaks down the entire guide into chapter-by-chapter study modules with quizzes and progress tracking.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Study All Chapters Free
        </Link>
      </div>
    </div>
  );
}
