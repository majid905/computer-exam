import type { Metadata } from "next";
import Link from "next/link";
import { listDictionaryTerms } from "@/lib/backend";
import { getAuthUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Canadian Citizenship Glossary — 200+ Terms | PassPilot",
  description:
    "Master 200+ key terms for the Canadian citizenship test. Free glossary covering history, government, rights, and immigration vocabulary.",
  alternates: { canonical: "https://www.passpilot.ca/dictionary" },
  openGraph: {
    title: "Canadian Citizenship Glossary — 200+ Terms | PassPilot",
    description:
      "Master 200+ key terms for the Canadian citizenship test. Free glossary covering history, government, rights, and immigration vocabulary.",
    url: "https://www.passpilot.ca/dictionary",
  },
};

const ACCESS_BADGE: Record<string, { label: string; cls: string }> = {
  free:  { label: "Free",  cls: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" },
  login: { label: "Login", cls: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
  pro:   { label: "Pro",   cls: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300" },
};

export default async function DictionaryPage() {
  let terms: Awaited<ReturnType<typeof listDictionaryTerms>> = [];
  try {
    terms = await listDictionaryTerms();
  } catch {
    // table may not exist yet in dev
  }

  let isLoggedIn = false;
  try {
    const auth = await getAuthUser();
    isLoggedIn = !!auth;
  } catch {}

  const freeCount  = terms.filter((t) => t.access_level === "free").length;
  const loginCount = terms.filter((t) => t.access_level === "login").length;
  const proCount   = terms.filter((t) => t.access_level === "pro").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Canadian Citizenship Glossary
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
          {terms.length}+ key terms you need to know for the Canadian citizenship test — from
          government and history to immigration and rights.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
          <span className="rounded-full bg-green-100 px-3 py-1 text-green-800 dark:bg-green-900/40 dark:text-green-300">
            {freeCount} Free terms
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            {loginCount} more with free account
          </span>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
            {proCount} more with Pro
          </span>
        </div>
      </div>

      {/* Terms grid */}
      {terms.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white py-20 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">Glossary terms coming soon.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {terms.map((term) => {
            const badge = ACCESS_BADGE[term.access_level] ?? ACCESS_BADGE.free;
            return (
              <Link
                key={term.id}
                href={`/dictionary/${term.slug}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {term.title}
                  </h2>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${badge.cls}`}>
                    {badge.label}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {term.short_definition}
                </p>
                <span className="mt-3 text-xs font-medium text-blue-600 group-hover:underline dark:text-blue-400">
                  Learn more →
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* CTA — only for logged-out users */}
      {!isLoggedIn && (
        <div className="mt-12 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
          <h2 className="mb-2 text-2xl font-bold">Ready to pass the test?</h2>
          <p className="mb-5 text-blue-100">
            Sign up free to unlock 30 terms with full definitions, AI explanations, and practice quizzes.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-lg bg-white px-6 py-2.5 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Create Free Account
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-white/40 px-6 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              View Pro Plans
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
