import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "How to Pass the Canadian Citizenship Test — Proven Study Tips | PassPilot",
  description:
    "Step-by-step guide to passing the Canadian citizenship test on your first attempt. Study strategy, common mistakes, key topics, and 5 free practice questions.",
  alternates: { canonical: "https://www.passpilot.ca/how-to-pass-canadian-citizenship-test" },
  openGraph: {
    title: "How to Pass the Canadian Citizenship Test — Proven Study Tips",
    description: "Proven strategies for passing the Canadian citizenship test on your first attempt.",
    url: "https://www.passpilot.ca/how-to-pass-canadian-citizenship-test",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["how-to-pass-canadian-citizenship-test"];

export default function HowToPassCanadianCitizenshipTestPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Study Strategy
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          How to Pass the Canadian Citizenship Test: A Complete Study Plan
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          The Canadian citizenship test has a pass rate of approximately 85–90% among prepared applicants.
          Those who fail almost always do so for one reason: insufficient preparation. This guide gives
          you a proven, step-by-step study plan to pass on your first attempt.
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
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Step 1: Get the Official Study Guide</h2>
          <p>
            Everything on the citizenship test comes from one source: <em>Discover Canada: The Rights
            and Responsibilities of Citizenship</em>. Download the free PDF from the IRCC website or
            request a free print copy from Service Canada. Do not rely on unofficial summaries or third-party
            guides as your primary source — use only the official booklet.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Step 2: Read Discover Canada Twice</h2>
          <p>
            Read the entire guide once at a comfortable pace to understand the content. Then read it
            a second time, this time with a pen or highlighter. Mark every specific fact: dates, names,
            numbers, and definitions. These marked facts are the foundation of your study notes.
          </p>
          <p>
            Pay special attention to chapters on Rights and Responsibilities (Chapter 1) and How
            Canadians Govern Themselves (Chapter 5). These two chapters produce the most citizenship
            test questions.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Step 3: Use Active Recall, Not Passive Re-Reading</h2>
          <p>
            The biggest mistake applicants make is reading Discover Canada over and over, hoping the
            facts will "sink in." This passive approach is ineffective. Instead, use active recall:
            close the book, and try to write down everything you remember from a chapter. Then check
            what you missed.
          </p>
          <p>
            Better yet, answer practice questions after each chapter. When you get a question wrong,
            go back and reread that section. This process — studying, testing, reviewing — is far
            more effective than reading alone.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Step 4: Focus on the Most Tested Topics First</h2>
          <p>
            If you are short on time, prioritize these high-frequency topics:
          </p>
          <ul>
            <li><strong>Rights and Responsibilities</strong> — Charter sections, voting rights, jury duty</li>
            <li><strong>Government structure</strong> — Parliament's three parts, PM, Governor General, Senate</li>
            <li><strong>Canadian history</strong> — Confederation, WWI/WWII, Indigenous peoples</li>
            <li><strong>National symbols</strong> — flag, anthem, animal, sports, holidays</li>
            <li><strong>Citizenship requirements</strong> — physical presence, language, age, fees</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Step 5: Take Full Mock Exams Under Timed Conditions</h2>
          <p>
            At least one week before your test date, start taking full 20-question mock exams under
            timed conditions (45 minutes). This serves two purposes: it tells you exactly where your
            knowledge gaps are, and it builds the mental stamina and comfort needed for the real test.
          </p>
          <p>
            Target a score of 17/20 (85%) or higher on mock exams before test day. If you are
            consistently hitting this benchmark, you are very well-prepared.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Common Mistakes to Avoid</h2>
          <ul>
            <li>Confusing the <strong>head of state</strong> (Monarch) with the <strong>head of government</strong> (Prime Minister)</li>
            <li>Confusing the Senate (105 <strong>appointed</strong>) with the House of Commons (338 <strong>elected</strong>)</li>
            <li>Mixing up the 1988 Multiculturalism <strong>Act</strong> with the 1971 multiculturalism <strong>policy</strong></li>
            <li>Forgetting that days outside Canada do <strong>not</strong> count toward the physical presence requirement</li>
            <li>Leaving any questions unanswered — always guess if unsure, there is no penalty for wrong answers</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">How long should I study for the citizenship test?</h3>
          <p>
            Most applicants need 2–4 weeks of consistent studying to feel confident. If you read
            Discover Canada carefully and complete 60–80 practice questions with review, you are
            likely ready. Do not try to cram the night before.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Should I study in English even if French is my language?</h3>
          <p>
            Study in whichever official language you are most comfortable with. The test is available
            in both English and French, and the content is identical. Choose the language where you
            can read and understand questions most accurately.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What should I do the day before my test?</h3>
          <p>
            Take one final light review of your study notes — not a full cramming session. Confirm
            the test location and what documents to bring. Get a good night's sleep. Arriving rested
            and prepared is more valuable than last-minute reading.
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
            These questions test commonly confused topics — including head of state vs. government, the official study guide, and elimination strategy.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Ready to build your study plan?</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot guides you through Discover Canada chapter by chapter with questions, explanations, and progress tracking.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Build My Study Plan
        </Link>
      </div>
    </div>
  );
}
