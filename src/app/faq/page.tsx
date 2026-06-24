import type { Metadata } from "next";
import { getFaqs } from "@/lib/backend";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ | Passpilot",
  description: "Frequently asked questions for Passpilot study and mock exam preparation.",
};

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
      {/* FAQPage structured data — eligible for Google's FAQ rich result and
          frequently quoted by AI answer engines. */}
      <JsonLd data={faqPageSchema(faqs)} />
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
            <div className="mt-3 text-[var(--color-muted)] prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </article>
        ))}
      </div>
    </div>
  );
}
