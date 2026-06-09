import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Citizenship Test Practice for Toronto Residents — Free Quiz | PassPilot",
  description:
    "Preparing for your Canadian citizenship test in Toronto? Take this free 5-question practice quiz on Toronto, Ontario, and Canadian values. Instant results and explanations.",
  alternates: { canonical: "https://www.passpilot.ca/citizenship-test-toronto" },
  openGraph: {
    title: "Citizenship Test Practice for Toronto Residents",
    description: "Free citizenship test quiz for Toronto applicants: local knowledge, Canadian values, and government questions.",
    url: "https://www.passpilot.ca/citizenship-test-toronto",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["citizenship-test-toronto"];

export default function CitizenshipTestTorontoPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          Toronto Practice
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Canadian Citizenship Test — Toronto
        </h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-2xl">
          Preparing for your citizenship test as a Toronto resident? This free quiz covers
          Toronto history, Ontario landmarks, and core Canadian values that appear on the
          official test.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          <span>✓ 5 questions</span>
          <span>✓ Instant feedback</span>
          <span>✓ Toronto &amp; Canadian values focus</span>
        </div>
      </div>

      <SeoQuizClient questions={questions} />

      <section className="mt-16 prose prose-sm max-w-none text-[var(--color-ink-2)]">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">Citizenship Tests in Toronto</h2>
        <p>
          Toronto has one of the largest populations of citizenship applicants in Canada. IRCC
          conducts citizenship tests and ceremonies at offices across the Greater Toronto Area
          (GTA), including Toronto, Etobicoke, North York, and Scarborough.
        </p>
        <p>
          The citizenship test is the same nationwide — it covers Canadian history, government,
          values, rights, and responsibilities based on the <em>Discover Canada</em> guide.
          Toronto is one of the world's most multicultural cities, and Canada's Multiculturalism
          Act (1988) and the Canadian Charter of Rights and Freedoms protect the cultural,
          religious, and linguistic heritage of all Canadians.
        </p>
        <p>
          <Link href="/register" className="ud-link font-semibold">Start free exam prep on PassPilot</Link>{" "}
          — full chapter study, practice quizzes, and timed mock exams, all based on the official
          Discover Canada guide.
        </p>
      </section>
    </div>
  );
}
