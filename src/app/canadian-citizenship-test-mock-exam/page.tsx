import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Test Mock Exam 2025 — Free Practice | PassPilot",
  description:
    "Take a free Canadian citizenship test mock exam. Learn the format: 20 questions, 75% pass score, 45-minute limit. Practice with 5 sample questions now.",
  alternates: { canonical: "https://www.passpilot.ca/canadian-citizenship-test-mock-exam" },
  openGraph: {
    title: "Canadian Citizenship Test Mock Exam 2025 — Free Practice",
    description: "Simulate the real citizenship test with a mock exam. 20 questions, 75% pass score, 45 minutes.",
    url: "https://www.passpilot.ca/canadian-citizenship-test-mock-exam",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["canadian-citizenship-test-mock-exam"];

export default function CanadianCitizenshipTestMockExamPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Mock Exam
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Canadian Citizenship Test Mock Exam: What to Expect
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          A mock exam simulates the real Canadian citizenship test experience — same format, same topic areas,
          same time pressure. Practicing under realistic conditions is one of the most powerful ways to
          build confidence and reduce test-day anxiety. Here's everything you need to know about the
          mock exam format and how to use it to pass on your first attempt.
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
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Real Test Format vs. Mock Exam Format</h2>
          <p>
            The real Canadian citizenship test has exactly 20 multiple-choice questions. Each question
            presents four answer choices (A, B, C, D), and you must select the single best answer.
            You have 45 minutes to complete the test, though most applicants finish well within that time.
          </p>
          <p>
            A good mock exam replicates this format precisely: 20 questions, four options each, drawn from
            the same topic areas as the real test, and ideally completed under a 45-minute timer.
            PassPilot's full mock exams follow this exact structure.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">The Passing Score: 15 out of 20</h2>
          <p>
            To pass the citizenship test, you must answer at least <strong>15 of the 20 questions correctly</strong>,
            which is a score of 75%. This means you can get up to 5 questions wrong and still pass.
            While this sounds manageable, applicants who haven't studied thoroughly often underestimate
            how specific some questions can be.
          </p>
          <p>
            On mock exams, aim for 85%+ (17/20 or better) as your target. Scoring consistently above
            the passing mark on practice tests provides a comfortable buffer for the real test, where
            exam nerves can sometimes cause you to misread a question.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Who Must Take the Test?</h2>
          <p>
            The written citizenship test is mandatory for applicants <strong>aged 18 to 54</strong>.
            Applicants younger than 18 or older than 54 are exempt from the written test but must still
            attend the citizenship ceremony and take the Oath of Citizenship.
          </p>
          <p>
            If you are in the 18–54 age range and have a documented disability that prevents you from
            taking the written test, IRCC may provide accommodations or conduct an oral assessment instead.
            Contact IRCC in advance to arrange this.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">How Many Mock Exams Should You Take?</h2>
          <p>
            Most citizenship experts recommend completing at least three to five full 20-question mock
            exams before your test date, in addition to studying Discover Canada chapter by chapter.
            Here is a suggested preparation schedule:
          </p>
          <ul>
            <li><strong>Weeks 1–2</strong>: Read Discover Canada from cover to cover, taking notes</li>
            <li><strong>Week 3</strong>: Complete chapter-by-chapter practice questions to identify weak areas</li>
            <li><strong>Week 4</strong>: Take two full mock exams; review all wrong answers carefully</li>
            <li><strong>Days before test</strong>: Take one final mock exam to confirm readiness; review key facts</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">What Happens on Test Day?</h2>
          <p>
            When you arrive at the test location, you will check in and be directed to a testing room.
            You must bring your Notice to Appear, government-issued photo ID, and your PR card or other
            travel documents. The test is paper-based and consists of a printed question booklet with
            an answer sheet you fill in.
          </p>
          <p>
            No electronic devices, dictionaries, or reference materials are permitted in the room.
            Once finished, hand in your answer sheet. Results are typically communicated within a few weeks.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">Is the mock exam online or in person?</h3>
          <p>
            PassPilot's mock exams are online. The real citizenship test is written on paper at a
            designated IRCC test centre. The questions and format are the same; only the medium differs.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What if I fail the mock exam?</h3>
          <p>
            A low mock exam score is a valuable signal — it tells you which topics need more study,
            before it matters. Review the explanations for every wrong answer, then go back to the
            corresponding chapter in Discover Canada to strengthen your understanding.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What score should I aim for on mock exams?</h3>
          <p>
            Aim for 85% (17/20) or higher consistently before test day. If you are regularly scoring
            at 75–80% on mock exams, continue studying — you are close to the passing line, and
            test-day nerves may push you below it.
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
            Try 5 Sample Mock Exam Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            These questions cover the test format, passing score, and what to expect on exam day.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Take a full 20-question mock exam</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot offers timed full-length mock exams that mirror the real citizenship test experience.
        </p>
        <Link
          href="/mock-exam"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Start Full Mock Exam
        </Link>
      </div>
    </div>
  );
}
