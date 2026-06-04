import type { Metadata } from "next";
import { getLanguages } from "@/lib/backend";

export const metadata: Metadata = {
  title: "Language | Passpilot",
  description: "View the available language options for Passpilot.",
};

export const dynamic = "force-dynamic";

export default async function LanguagePage() {
  const languages = await getLanguages();

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Language
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Supported languages
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          Languages are managed dynamically from the backend.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {languages.map((language) => (
          <div key={language.code} className="ud-card p-5">
            <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
              {language.code.toUpperCase()}
            </p>
            <h2 className="text-xl font-bold text-[var(--color-ink)] mt-2">{language.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
