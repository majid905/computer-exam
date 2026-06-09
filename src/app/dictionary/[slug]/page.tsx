import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { DictionaryTerm } from "@/lib/backend";
import { getDictionaryTermBySlug, listDictionaryTerms, hasActiveSubscription } from "@/lib/backend";
import { getAuthUser } from "@/lib/auth";
import { DictionaryTermContent } from "./DictionaryTermContent";

const BASE_URL = "https://www.passpilot.ca";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let term: DictionaryTerm | null = null;
  try {
    term = await getDictionaryTermBySlug(slug);
  } catch {}
  if (!term) return { title: "Term Not Found | PassPilot" };
  return {
    title: term.seo_title || `${term.title} — Canadian Citizenship Glossary | PassPilot`,
    description:
      term.seo_description ||
      `Learn about "${term.title}" for the Canadian citizenship test. Free glossary.`,
    alternates: { canonical: `${BASE_URL}/dictionary/${slug}` },
    openGraph: {
      title: term.seo_title || term.title,
      description: term.seo_description || term.short_definition,
      url: `${BASE_URL}/dictionary/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const terms = await listDictionaryTerms();
    return terms.map((t) => ({ slug: t.slug }));
  } catch {
    return [];
  }
}

export default async function DictionaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let term: DictionaryTerm | null = null;
  try {
    term = await getDictionaryTermBySlug(slug);
  } catch {}
  if (!term) notFound();

  // Server-side access check
  const auth = await getAuthUser();
  const isPro = auth ? await hasActiveSubscription(auth.userId) : false;

  const canAccess =
    term.access_level === "free" ||
    (term.access_level === "login" && !!auth) ||
    (term.access_level === "pro" && !!auth && isPro);

  // Strip gated fields if not authorized
  const termForClient = canAccess
    ? { ...term, _gated: false }
    : {
        ...term,
        full_description: null,
        ai_explanation: null,
        quiz_question: null,
        quiz_options: null,
        quiz_answer: null,
        _gated: true,
      };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/dictionary" className="hover:text-blue-600 dark:hover:text-blue-400">
          Glossary
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 dark:text-white">{term.title}</span>
      </nav>

      <DictionaryTermContent term={termForClient} isLoggedIn={!!auth} />

      <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-700">
        <Link
          href="/dictionary"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to all glossary terms
        </Link>
      </div>

      {/* CTA — only for logged-out users */}
      {!auth && (
        <div className="mt-12 rounded-2xl p-10 text-center text-white"
          style={{ background: "linear-gradient(135deg, #7c6fcd 0%, #3730a3 100%)" }}
        >
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            Ready to become Canadian?
          </h2>
          <p className="mx-auto mb-7 max-w-md text-[15px] leading-relaxed text-white/80">
            Join the studiers who walk into the test calm, prepared, and confident.
            It&apos;s free to start. No card. No catch.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-xl bg-[#f5a623] px-7 py-3 font-bold text-white shadow-lg transition hover:bg-[#e8961a] hover:shadow-xl"
            >
              Start studying — it&apos;s free
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              I already have an account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
