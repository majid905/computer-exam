import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getFaqs } from "@/lib/backend";
import { toSlug } from "@/lib/slug";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const faqs = await getFaqs();
  const faq = faqs.find((f) => toSlug(f.question) === slug);
  if (!faq) return {};
  return {
    title: `${faq.question} | Passpilot FAQ`,
    description: faq.answer.slice(0, 155),
    openGraph: { title: faq.question, description: faq.answer.slice(0, 155) },
  };
}

export default async function FaqSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const faqs = await getFaqs();
  const faq = faqs.find((f) => toSlug(f.question) === slug);
  if (!faq) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <nav className="mb-6 text-sm text-[var(--color-muted)]">
        <Link href="/faq" className="hover:underline">
          FAQ
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[var(--color-ink)]">{faq.question}</span>
      </nav>

      <article>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          {faq.category}
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-ink)] mb-6">
          {faq.question}
        </h1>
        <div className="prose max-w-none text-[var(--color-muted)] leading-relaxed dark:prose-invert" dangerouslySetInnerHTML={{ __html: faq.answer }} />
      </article>

      <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
        <p className="text-sm font-semibold text-[var(--color-ink)] mb-3">Other FAQs</p>
        <ul className="space-y-2">
          {faqs
            .filter((f) => f.id !== faq.id)
            .slice(0, 5)
            .map((f) => (
              <li key={f.id}>
                <Link
                  href={`/faq/${toSlug(f.question)}`}
                  className="text-sm text-[var(--color-brand)] hover:underline"
                >
                  {f.question}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
