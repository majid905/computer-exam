import type { Metadata } from "next";
import { getProvinces } from "@/lib/backend";

export const metadata: Metadata = {
  title: "Provincial | Passpilot",
  description: "View the provincial options supported by Passpilot.",
};

export default async function ProvincialPage() {
  const provinces = await getProvinces();

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Provincial
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Provincial options
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          All provinces and territories are stored in the backend database.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {provinces.map((province) => (
          <div key={province.code} className="ud-card p-5">
            <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
              {province.code}
            </p>
            <h2 className="text-xl font-bold text-[var(--color-ink)] mt-2">{province.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
