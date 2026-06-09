import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "Discover Canada Practice Test — History & Heritage Quiz | PassPilot",
  description:
    "Practice Discover Canada study guide questions on Aboriginal peoples, explorers, Confederation, and Canadian history. Free 5-question quiz with instant scoring.",
  alternates: { canonical: "https://www.passpilot.ca/discover-canada-practice-test" },
  openGraph: {
    title: "Discover Canada Practice Test — History & Heritage",
    description: "Quiz yourself on the Discover Canada guide: Aboriginal peoples, explorers, Confederation, and national symbols.",
    url: "https://www.passpilot.ca/discover-canada-practice-test",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["discover-canada-practice-test"];

export default function DiscoverCanadaPracticeTestPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          History &amp; Heritage
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Discover Canada Practice Test
        </h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-2xl">
          Practice questions from the <em>Discover Canada</em> study guide — the official resource
          for the Canadian citizenship test. This quiz focuses on Aboriginal peoples, explorers,
          Confederation, and national symbols.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          <span>✓ 5 questions</span>
          <span>✓ Instant feedback</span>
          <span>✓ History &amp; Confederation focus</span>
        </div>
      </div>

      <SeoQuizClient questions={questions} />

      <section className="mt-16 prose prose-sm max-w-none text-[var(--color-ink-2)]">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">About the Discover Canada Study Guide</h2>
        <p>
          <em>Discover Canada: The Rights and Responsibilities of Citizenship</em> is the official
          study guide published by Immigration, Refugees and Citizenship Canada (IRCC). All
          citizenship test questions are based on this guide.
        </p>
        <p>
          The guide covers Canada's history — from Aboriginal peoples through European exploration,
          Confederation in 1867, both World Wars, and modern Canada. Understanding this history
          is essential for passing the citizenship test.
        </p>
        <p>
          PassPilot breaks the Discover Canada guide into short, easy-to-study chapters with
          practice questions for each section.{" "}
          <Link href="/register" className="ud-link font-semibold">Create a free account</Link>{" "}
          to get started.
        </p>
      </section>
    </div>
  );
}
