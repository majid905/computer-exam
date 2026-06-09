import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship FAQ 2025 — Common Questions Answered | PassPilot",
  description:
    "Answers to the most common Canadian citizenship questions: physical presence exceptions, dual citizenship, children's test exemption, fees, and processing times.",
  alternates: { canonical: "https://www.passpilot.ca/citizenship-faq" },
  openGraph: {
    title: "Canadian Citizenship FAQ 2025 — Common Questions Answered",
    description: "Answers to the most common questions about applying for Canadian citizenship.",
    url: "https://www.passpilot.ca/citizenship-faq",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["citizenship-faq"];

export default function CitizenshipFaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Citizenship FAQ
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Canadian Citizenship FAQ: The Most Common Questions Answered
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          The Canadian citizenship process raises many questions, from eligibility requirements to what
          happens at the ceremony. This FAQ addresses the questions that applicants ask most frequently —
          and that also appear most often on the citizenship test itself.
        </p>

        {/* Key facts strip */}
        <div className="grid grid-cols-3 gap-3 mb-8 text-center">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">$630</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Application Fee</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">12–24</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Months Processing</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">Dual</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Citizenship Allowed</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-[var(--color-ink-2)]">
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Eligibility Questions</h2>

          <h3 className="font-semibold text-[var(--color-ink)]">Can I apply before completing 1,095 days of physical presence?</h3>
          <p>
            No. There are no exceptions to the physical presence requirement for standard citizenship
            applications. You must have been physically present in Canada for at least 1,095 days within
            the 5-year period before your application date. You should use the IRCC physical presence
            calculator to confirm you meet this requirement before applying.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Does Canada allow dual citizenship?</h3>
          <p>
            Yes. Canada fully permits dual and multiple citizenship. When you become a Canadian citizen,
            you are not required to give up any other citizenship you hold. However, some other countries
            may not permit their citizens to hold Canadian citizenship — check with your home country
            before applying.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Do children need to take the citizenship test?</h3>
          <p>
            No. Children under 18 are exempt from both the written citizenship test and the language
            requirement. They can be included in a parent's or guardian's citizenship application.
            Minor children do not need to separately meet the physical presence requirement; they
            are covered by their parent's application.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">What if I am over 54? Do I still need to take the test?</h3>
          <p>
            No. Applicants aged 55 and older are exempt from the written citizenship test and the
            language requirement. They must still meet the physical presence and tax filing requirements,
            and must attend the citizenship ceremony and take the Oath.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Application Process Questions</h2>

          <h3 className="font-semibold text-[var(--color-ink)]">How much does it cost to apply for citizenship?</h3>
          <p>
            The government fee for an adult citizenship application is <strong>$630 CAD</strong>, which
            includes a $530 processing fee and a $100 right of citizenship fee. The right of citizenship
            fee is refunded if the application is not approved. Children under 18 have a reduced fee
            of $100. Fees can change — always confirm the current amount on the IRCC website before applying.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">How long does IRCC take to process a citizenship application?</h3>
          <p>
            Processing times vary significantly based on application volumes and the completeness of
            your file. As of 2025, typical processing times are <strong>12 to 24 months</strong> from
            the date IRCC receives your complete application. Check the IRCC website for the most
            current processing time estimates.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">What documents do I need to submit with my application?</h3>
          <p>
            The main citizenship application (CIT 0002) requires: proof of permanent residency,
            travel history documentation (for physical presence calculation), language proficiency
            evidence (for applicants aged 18–54), tax filing records (3 of 5 years), identity
            documents (passport, PR card), and photographs. Always check the current document
            checklist on the IRCC website, as requirements can change.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Test and Ceremony Questions</h2>

          <h3 className="font-semibold text-[var(--color-ink)]">What happens at the citizenship ceremony?</h3>
          <p>
            The citizenship ceremony is the final step. You attend with family or guests, participate
            in the ceremony presided over by a citizenship judge or commissioner, take the Oath of
            Citizenship (swearing or affirming loyalty to the Monarch and commitment to Canadian laws),
            and receive your Citizenship Certificate. You may also sing O Canada.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Can I apply for a Canadian passport immediately after the ceremony?</h3>
          <p>
            Yes. As soon as you receive your Citizenship Certificate at the ceremony, you are a
            Canadian citizen and can apply for a Canadian passport. The passport application
            requires your Citizenship Certificate as proof of citizenship.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">What if I cannot attend the scheduled ceremony?</h3>
          <p>
            If you cannot attend your scheduled ceremony for a valid reason, contact IRCC to request
            a rescheduled date. You must attend a citizenship ceremony and take the Oath to become
            a citizen — it cannot be skipped or done remotely in most cases.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Additional Resources</h2>
          <p>
            For more detailed information, visit the official IRCC website at ircc.canada.ca.
            PassPilot's <Link href="/dictionary" className="ud-link font-medium">citizenship glossary</Link> explains
            key terms, and our <Link href="/canadian-citizenship-test" className="ud-link font-medium">complete test guide</Link> covers
            everything you need to know about the knowledge test.
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
            Try 5 FAQ-Based Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            These questions cover the FAQ topics most commonly tested: physical presence, children's exemption, dual citizenship, fees, and processing times.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Have more questions? PassPilot has answers.</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Create a free account to access our full study system, complete mock exams, and detailed explanations for every citizenship test topic.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Get Started Free
        </Link>
      </div>
    </div>
  );
}
