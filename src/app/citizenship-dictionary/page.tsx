import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Canadian Citizenship Dictionary — Key Terms for the Citizenship Test | PassPilot",
  description:
    "Definitions of key Canadian citizenship terms: voting rights, the Oath of Citizenship, the Citizenship Certificate, the Charter, and the Governor General appointment.",
  alternates: { canonical: "https://www.passpilot.ca/citizenship-dictionary" },
  openGraph: {
    title: "Canadian Citizenship Dictionary — Key Terms Explained",
    description: "Clear definitions of essential citizenship terms to help you pass the Canadian citizenship test.",
    url: "https://www.passpilot.ca/citizenship-dictionary",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["citizenship-dictionary"];

export default function CitizenshipDictionaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Citizenship Glossary
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          Canadian Citizenship Dictionary: Key Terms You Must Know
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          Understanding the precise meaning of citizenship-related terms is essential for both the
          citizenship test and your life as a Canadian citizen. This guide defines the most important
          terms from Discover Canada and the citizenship process — each explained clearly and connected
          to how it may appear on the test.
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
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Citizenship and Immigration Terms</h2>

          <h3 className="font-semibold text-[var(--color-ink)]">Canadian Citizen</h3>
          <p>
            A full legal member of Canada, with all rights including the right to vote, hold a Canadian
            passport, and run for elected office. Citizenship can be acquired by birth in Canada,
            descent from a Canadian parent, or naturalization after meeting residency, language, and
            knowledge requirements.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Permanent Resident (PR)</h3>
          <p>
            A non-Canadian who has been granted permanent residency and may live and work anywhere in
            Canada. A PR has most rights of a citizen, but cannot vote in federal elections, hold a
            Canadian passport, or run for political office. PRs must maintain 730 days of physical
            presence in every 5-year period to keep their status.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Oath of Citizenship</h3>
          <p>
            The solemn promise taken at a citizenship ceremony in which new citizens swear or affirm
            loyalty to the Monarch of Canada and commit to observing Canadian laws and fulfilling
            the duties of citizenship. Taking the Oath is the final step in becoming a citizen.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Citizenship Certificate</h3>
          <p>
            The official document issued by IRCC at the citizenship ceremony, confirming that the
            holder is a Canadian citizen. It is the legal proof of citizenship and is required to
            apply for a Canadian passport.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">IRCC (Immigration, Refugees and Citizenship Canada)</h3>
          <p>
            The federal government department responsible for processing immigration applications,
            granting permanent residency, administering the citizenship process, and issuing travel
            documents including passports.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Government and Constitutional Terms</h2>

          <h3 className="font-semibold text-[var(--color-ink)]">Constitutional Monarchy</h3>
          <p>
            A system of government in which a monarch (king or queen) serves as head of state, but
            their powers are limited by a constitution and are largely ceremonial. Canada is a
            constitutional monarchy — the Monarch is the head of state, but elected officials
            govern the country.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Parliamentary Democracy</h3>
          <p>
            A system where citizens elect representatives to a legislature (Parliament), and the
            government is formed by the party holding the most legislative seats. The government
            must maintain the confidence of the elected legislature to remain in power.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Charter of Rights and Freedoms</h3>
          <p>
            Added to the Canadian Constitution in 1982, the Charter guarantees specific rights
            and freedoms to everyone in Canada. These include fundamental freedoms (Section 2),
            democratic rights (Section 3), equality rights (Section 15), and language rights.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Notwithstanding Clause (Section 33)</h3>
          <p>
            A constitutional provision allowing Parliament or a provincial legislature to temporarily
            override certain Charter rights for a renewable 5-year period. It applies to Sections 2
            and 7–15 of the Charter but not to democratic rights or language rights.
          </p>

          <h3 className="font-semibold text-[var(--color-ink)]">Royal Assent</h3>
          <p>
            The formal approval of a bill by the Governor General (on behalf of the Monarch), which
            transforms the bill into law. All bills passed by both the Senate and the House of Commons
            require Royal Assent before they become law.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">What is the difference between a citizen and a permanent resident?</h3>
          <p>
            The key difference is the right to vote and to hold a Canadian passport. Citizens can vote
            in federal elections and receive a Canadian passport. Permanent residents cannot do either,
            and they can also lose their status if they don't maintain the 730-day residency obligation.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Are citizenship dictionary terms tested on the exam?</h3>
          <p>
            Yes. Many citizenship test questions are essentially vocabulary questions — testing whether
            you understand what a term means (e.g., "What is habeas corpus?", "What does IRCC stand
            for?"). Knowing the glossary strengthens your ability to answer these definitional questions.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Where can I find more citizenship terms?</h3>
          <p>
            PassPilot has a full <Link href="/dictionary" className="ud-link font-medium">Canadian Citizenship Glossary</Link> with
            250+ terms, each with a detailed explanation, AI-powered summary, and a practice quiz question.
            Free and pro terms available.
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
            Try 5 Glossary Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            These questions test key terms: voting rights, the Oath of Citizenship, the Citizenship Certificate, the Charter, and the Governor General.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Explore the full citizenship glossary</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot's 250+ term glossary covers every key concept from Discover Canada with AI explanations and practice questions.
        </p>
        <Link
          href="/dictionary"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Browse Full Glossary
        </Link>
      </div>
    </div>
  );
}
