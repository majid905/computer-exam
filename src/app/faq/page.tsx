import type { Metadata } from "next";
import { getFaqs } from "@/lib/backend";

export const metadata: Metadata = {
  title: "FAQ | Passpilot",
  description: "Frequently asked questions for Passpilot study and mock exam preparation.",
};

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          FAQ
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Frequently asked questions
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          Answers are loaded from the Passpilot backend database.
        </p>
      </header>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <article key={faq.id} className="ud-card p-6">
            <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
              {faq.category}
            </p>
            <h2 className="text-lg font-bold text-[var(--color-ink)] mt-2">{faq.question}</h2>
            <p className="mt-3 text-[var(--color-muted)]">{faq.answer}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
