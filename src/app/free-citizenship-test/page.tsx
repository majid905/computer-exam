import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Free Canadian Citizenship Test — Government & Democracy Quiz | PassPilot",
  description:
    "Free Canadian citizenship test practice on government and democracy. Test your knowledge of Parliament, the Prime Minister, and Canada's electoral system. Instant results.",
  alternates: { canonical: "https://www.passpilot.ca/free-citizenship-test" },
  openGraph: {
    title: "Free Canadian Citizenship Test — Government & Democracy",
    description: "Free quiz on Canadian government: Parliament, Prime Minister, elections, and the Senate.",
    url: "https://www.passpilot.ca/free-citizenship-test",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["free-citizenship-test"];

export default function FreeCitizenshipTestPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          100% Free
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Free Canadian Citizenship Test
        </h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-2xl">
          Take this free practice test on Canadian government and democracy — covering Parliament,
          the Prime Minister, Senate, and federal elections. No sign-up required to try the quiz.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          <span>✓ 5 questions</span>
          <span>✓ Completely free</span>
          <span>✓ Government &amp; democracy focus</span>
        </div>
      </div>

      <SeoQuizClient questions={questions} />

      <section className="mt-16 prose prose-sm max-w-none text-[var(--color-ink-2)]">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">Canadian Government on the Citizenship Test</h2>
        <p>
          Questions about Canada's government make up a large portion of the citizenship test.
          You'll need to understand how Parliament works, the role of the Prime Minister and
          Cabinet, the Senate, and how federal elections operate.
        </p>
        <p>
          Canada is a constitutional monarchy with a parliamentary democracy. The Parliament of
          Canada consists of three parts: the Crown (represented by the Governor General), the
          Senate (105 appointed senators), and the House of Commons (338 elected Members of
          Parliament).
        </p>
        <p>
          Want to practise more?{" "}
          <Link href="/register" className="ud-link font-semibold">Create a free PassPilot account</Link>{" "}
          for access to the full question bank, chapter-by-chapter study, and timed mock exams.
        </p>
      </section>
    </div>
  );
}
