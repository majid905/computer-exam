import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Interview Questions 2025 — What to Expect | PassPilot",
  description:
    "What happens at a Canadian citizenship interview? Documents to bring, travel history questions, language assessment, and how to prepare for the CIT 0002 process.",
  alternates: { canonical: "https://www.passpilot.ca/canadian-citizenship-interview-questions" },
  openGraph: {
    title: "Canadian Citizenship Interview Questions 2025",
    description: "What IRCC asks at a citizenship interview — documents, travel history, language, and physical presence questions.",
    url: "https://www.passpilot.ca/canadian-citizenship-interview-questions",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["canadian-citizenship-interview-questions"];

export default function CanadianCitizenshipInterviewQuestionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Interview Preparation
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Canadian Citizenship Interview Questions: What to Expect
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          The citizenship "interview" can mean two different things: the written test appointment
          (where most applicants take the 20-question written exam) or a hearing before a citizenship
          judge (for applicants who failed the written test or have complex cases). This guide covers
          both scenarios and what to expect at each.
        </p>

        {/* Key facts strip */}
        <div className="grid grid-cols-3 gap-3 mb-8 text-center">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">1,095</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Days Verified</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">CLB 4</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Language Level</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">CIT 0002</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Main Form</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-[var(--color-ink-2)]">
          <h2 className="text-xl font-bold text-[var(--color-ink)]">The Written Test Appointment: What Happens</h2>
          <p>
            Most applicants attend a written test appointment — not a formal interview. You will receive
            a <strong>Notice to Appear</strong> from IRCC specifying the date, time, and location.
            On the day, you:
          </p>
          <ol>
            <li>Arrive at the test centre with required documents</li>
            <li>Check in and verify your identity</li>
            <li>Complete the 20-question written test (45 minutes)</li>
            <li>Submit your answer sheet to the officer</li>
          </ol>
          <p>
            In most cases, the officer will also verify your identity documents and may ask a few
            brief questions about your application — particularly about your physical presence
            calculation and travel history.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Documents to Bring to Your Appointment</h2>
          <p>
            Bring the following documents to your citizenship test appointment:
          </p>
          <ul>
            <li>Your <strong>Notice to Appear</strong> (the letter IRCC sent you)</li>
            <li>Valid <strong>passport</strong> (current and any passports used during your 5-year period)</li>
            <li>Your <strong>Permanent Resident card</strong> (PR card)</li>
            <li><strong>Travel history documentation</strong>: boarding passes, stamps, records of any time outside Canada</li>
            <li>Any documents IRCC specifically requested with your Notice to Appear</li>
            <li>Your completed <strong>physical presence calculation</strong> notes</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Common Questions Officers Ask About Physical Presence</h2>
          <p>
            Officers frequently ask questions to verify your physical presence calculation. Be prepared for:
          </p>
          <ul>
            <li>"Have you been outside Canada at any point in the last 5 years?"</li>
            <li>"When did you leave Canada and when did you return on [specific trip]?"</li>
            <li>"Do you have any documentation of your travel, such as boarding passes or passport stamps?"</li>
            <li>"Were there any trips you forgot to include in your application?"</li>
          </ul>
          <p>
            Answer these questions honestly. Any discrepancy between your stated travel history and
            IRCC's records (which include border crossing data) can flag your application for review.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">The Citizenship Judge Hearing: When It Happens</h2>
          <p>
            A hearing before a citizenship judge occurs in more complex situations:
          </p>
          <ul>
            <li>You failed the written test</li>
            <li>There are questions about your physical presence or language proficiency</li>
            <li>Your application has complexities that the officer cannot resolve</li>
          </ul>
          <p>
            At the hearing, the citizenship judge will ask you questions about Canadian history,
            government, and values (from Discover Canada) as well as about your application.
            The judge will also assess your ability to communicate in English or French. This
            hearing is more intensive than the written test and it is strongly preferable to
            pass the written test to avoid it.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">How to Prepare for Your Appointment</h2>
          <p>
            To arrive fully prepared for your citizenship test appointment:
          </p>
          <ul>
            <li>Study Discover Canada thoroughly and complete practice tests</li>
            <li>Review your physical presence calculation and have documentation ready</li>
            <li>Organize all your travel records (boarding passes, passport stamps, hotel receipts)</li>
            <li>Confirm the test location and plan your route in advance</li>
            <li>Arrive 15–20 minutes early to allow for check-in</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">What is the CIT 0002 form?</h3>
          <p>
            CIT 0002 is the Application for Canadian Citizenship — Adults. It is the primary form
            submitted by adults (18+) applying for citizenship. Within it, you declare your physical
            presence history, language ability, and other eligibility information.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Can I bring someone with me to the test appointment?</h3>
          <p>
            Generally, test appointments are individual. You should not bring guests into the testing
            room. If you need a medical interpreter or other accommodation, contact IRCC in advance
            to make arrangements.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What happens after the test appointment?</h3>
          <p>
            If you pass the written test, IRCC will send you a notice for your citizenship ceremony,
            typically within a few months. At the ceremony, you take the Oath of Citizenship and
            receive your citizenship certificate.
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
            Try 5 Interview Preparation Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            These questions cover documents, travel history, language requirements, and the CIT 0002 form.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Avoid the hearing — pass the written test</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot's full study system ensures you arrive at your test appointment fully prepared.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Prepare for My Test
        </Link>
      </div>
    </div>
  );
}
