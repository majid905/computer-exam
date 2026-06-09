import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Test 2025 — Complete Guide & Free Practice Quiz | PassPilot",
  description:
    "Everything you need to know about the Canadian citizenship test: format, passing score, topics, eligibility, and 5 free practice questions based on Discover Canada.",
  alternates: { canonical: "https://www.passpilot.ca/canadian-citizenship-test" },
  openGraph: {
    title: "Canadian Citizenship Test 2025 — Complete Guide",
    description: "Format, passing score, topics covered, and free practice questions for the Canadian citizenship test.",
    url: "https://www.passpilot.ca/canadian-citizenship-test",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["canadian-citizenship-test"];

export default function CanadianCitizenshipTestPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Citizenship Test Guide
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Canadian Citizenship Test: Complete 2025 Guide
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          The Canadian citizenship test is the final knowledge requirement before you become a Canadian citizen.
          This guide covers everything you need to know — from eligibility and format to the topics most
          likely to appear — plus five free practice questions to get you started.
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
          <h2 className="text-xl font-bold text-[var(--color-ink)]">What Is the Canadian Citizenship Test?</h2>
          <p>
            The Canadian citizenship test is a written multiple-choice exam administered by Immigration,
            Refugees and Citizenship Canada (IRCC). It tests your knowledge of Canada's history, government,
            values, rights and responsibilities, and symbols. All questions are drawn directly from the official
            study guide, <em>Discover Canada: The Rights and Responsibilities of Citizenship</em>.
          </p>
          <p>
            Most applicants between the ages of 18 and 54 must take and pass the test as part of their
            citizenship application. Those under 18 or over 54 are exempt from the written test requirement.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Test Format and Structure</h2>
          <p>
            The test consists of 20 multiple-choice questions. You have 45 minutes to complete it.
            To pass, you must answer at least 15 of the 20 questions correctly — a score of 75%.
            The test is administered in either English or French, and you may choose which language you prefer.
          </p>
          <p>
            Questions cover six broad topic areas from Discover Canada: the Rights and Responsibilities of
            Citizenship, Canadian History, Canada's Government, the Federal Electoral District (your riding),
            Canada's Physical and Political Geography, and the Canadian Economy.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Who Must Take the Test?</h2>
          <p>
            Adults aged 18 to 54 who apply for citizenship must take the written citizenship test. The
            knowledge and language assessments for this group are both mandatory. Applicants outside this age
            range (under 18 or 55+) are exempt, though they still attend the citizenship ceremony and take
            the Oath of Citizenship.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Eligibility Requirements Before You Can Book the Test</h2>
          <p>
            To qualify for the citizenship test, you must first meet all citizenship eligibility requirements:
          </p>
          <ul>
            <li>Be a permanent resident of Canada</li>
            <li>Have been physically present in Canada for at least <strong>1,095 days</strong> in the 5 years before applying</li>
            <li>Have filed Canadian income taxes for at least 3 of the last 5 years</li>
            <li>Demonstrate adequate knowledge of English or French (CLB level 4 or higher)</li>
            <li>Not be under a removal order or charged with a serious offence</li>
          </ul>
          <p>
            IRCC will review your application before sending you a Notice to Appear for the test.
            Processing times typically range from 12 to 24 months.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">What Topics Are on the Test?</h2>
          <p>
            The citizenship test draws from all chapters of Discover Canada, but certain topics carry more
            weight. Based on past test experience, the most commonly tested areas are:
          </p>
          <ul>
            <li><strong>Rights and Responsibilities</strong> — voting rights, jury duty, freedom of expression, equality rights</li>
            <li><strong>How Government Works</strong> — Parliament's three parts, the Prime Minister's role, federal elections</li>
            <li><strong>Canadian History</strong> — Confederation, Vimy Ridge, women's suffrage, residential schools</li>
            <li><strong>National Symbols</strong> — the flag, national anthem, the beaver, provincial flowers</li>
            <li><strong>Geography</strong> — provinces, territories, capital cities, major rivers and lakes</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">What Happens If You Fail?</h2>
          <p>
            If you do not achieve 75% (15/20) on the first attempt, IRCC may allow you to rewrite the test
            or invite you to a hearing before a citizenship judge. At the hearing, the judge will assess your
            knowledge through an oral interview. In most cases, applicants who prepare thoroughly pass on
            their first attempt.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">Can I use a dictionary during the test?</h3>
          <p>
            No. The citizenship test is a closed-book exam. You may not bring any reference materials,
            electronic devices, or dictionaries into the testing room.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Is there a fee to take the test?</h3>
          <p>
            The test itself is included in the overall citizenship application fee of $630 CAD for adults.
            There is no separate fee to write the test.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">How long does it take to receive results?</h3>
          <p>
            If you pass the written test, IRCC typically sends your citizenship ceremony notice within a few
            months. If you did not pass, they will contact you with instructions for next steps.
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
            Test your knowledge on key citizenship test topics. Each question includes an explanation
            so you can learn as you go.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Ready for the full exam?</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot includes full 20-question mock exams, chapter-by-chapter study guides, and progress tracking.
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
