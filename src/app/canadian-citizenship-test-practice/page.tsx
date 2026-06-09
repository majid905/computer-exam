import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Test Practice 2025 — Free Sample Questions | PassPilot",
  description:
    "Practice for the Canadian citizenship test with free sample questions on the anthem, courts, Parliament, Remembrance Day, and Medicare. Based on Discover Canada.",
  alternates: { canonical: "https://www.passpilot.ca/canadian-citizenship-test-practice" },
  openGraph: {
    title: "Canadian Citizenship Test Practice — Free Sample Questions",
    description: "Free practice questions for the Canadian citizenship test based on the official Discover Canada guide.",
    url: "https://www.passpilot.ca/canadian-citizenship-test-practice",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["canadian-citizenship-test-practice"];

export default function CanadianCitizenshipTestPracticePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Practice Questions
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Canadian Citizenship Test Practice: Free 2025 Quiz
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          Regular practice is the single most effective way to prepare for the Canadian citizenship test.
          This page gives you five representative questions on commonly tested topics, complete with
          explanations so you understand why each answer is correct.
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
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Why Practice Tests Matter</h2>
          <p>
            Simply reading Discover Canada once is not enough for most applicants. Research on learning
            consistently shows that testing yourself — rather than just re-reading material — dramatically
            improves long-term retention. This technique is called the "testing effect" or retrieval practice.
            Every time you answer a practice question and check the explanation, you reinforce the correct
            information in your memory.
          </p>
          <p>
            Aim to complete at least 60–80 practice questions before your test date. Focus especially on
            areas where you get questions wrong — those are the topics that need the most review.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">What Topics Appear Most on the Real Test?</h2>
          <p>
            Based on the content weighting in Discover Canada, the citizenship test focuses most heavily on:
          </p>
          <ul>
            <li><strong>Government</strong>: Parliament's structure, the role of the Prime Minister, the Senate, elections</li>
            <li><strong>Rights and Responsibilities</strong>: the Charter, voting, jury duty, freedom of expression</li>
            <li><strong>History</strong>: Confederation, World Wars, key figures, Indigenous history</li>
            <li><strong>National Identity</strong>: symbols, holidays, official languages, multiculturalism</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">How to Use Practice Questions Effectively</h2>
          <p>
            Don't just try to guess the right answer — commit to your chosen answer before revealing the
            explanation. If you get a question wrong, read the explanation carefully and note what the
            correct fact is. Then, 24 hours later, try the question again from memory. This spaced review
            dramatically improves retention compared to reviewing everything right before the test.
          </p>
          <p>
            For the best results, mix topic areas when you practice. Don't do all government questions
            together, then all history questions — interleaving different topics forces your brain to work
            harder and builds stronger recall under test conditions.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">The Official Study Source: Discover Canada</h2>
          <p>
            All citizenship test questions are drawn from <em>Discover Canada: The Rights and Responsibilities
            of Citizenship</em>, published by IRCC. The guide is approximately 68 pages and is available
            free in both English and French on the IRCC website, as well as in print from Service Canada offices.
          </p>
          <p>
            PassPilot's practice questions — including the five below — are based on this official guide.
            Every question on our platform is mapped directly to a chapter and topic in Discover Canada,
            so you always know exactly where to review if you get something wrong.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">How many practice tests should I do before the real test?</h3>
          <p>
            Most successful test-takers complete 3 to 5 full 20-question mock exams before their actual
            citizenship test, in addition to topic-specific practice. If you are consistently scoring 80%
            or higher on practice tests, you are well-prepared.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Are the questions on the real test the same as practice questions?</h3>
          <p>
            No, but they test the same facts. The real test will use different phrasing and different wrong
            answers, so it is important to understand <em>why</em> an answer is correct, not just memorize
            which letter to pick.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Can I take the citizenship test in French?</h3>
          <p>
            Yes. The citizenship test is available in both English and French. When you are invited to
            take the test, you can indicate your preferred language.
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
            Answer each question, then read the explanation to reinforce your understanding.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Want more practice?</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Create a free PassPilot account to access full mock exams, chapter-by-chapter quizzes, and a personalized study plan.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Get Full Access Free
        </Link>
      </div>
    </div>
  );
}
