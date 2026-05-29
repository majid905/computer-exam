"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserState } from "@/lib/storage";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/study", label: "Study" },
  { href: "/practice", label: "Practice" },
  { href: "/mock-exam", label: "Mock exam" },
  { href: "/progress", label: "Progress" },
];

function MapleMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 2l1.6 4.2 4.4-.8-2.3 3.8 3.3 2.9-4.2 1.4 1 4.4-3.8-2.4L12 20l-.0-4.5-3.8 2.4 1-4.4L5 12.1l3.3-2.9L6 5.4l4.4.8L12 2z"
        fill="var(--color-brand)"
      />
    </svg>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state] = useUserState();

  const hideNav = pathname?.startsWith("/onboarding") || pathname?.startsWith("/mock-exam/take");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && (
        <header className="sticky top-0 z-30 backdrop-blur bg-[var(--color-surface)]/85 border-b">
          <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <MapleMark />
              <span className="font-extrabold tracking-tight text-[var(--color-ink)]">
                PassCanada
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "px-3 py-1.5 rounded-md text-sm font-semibold transition-colors",
                      active
                        ? "text-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-2">
              {state.streak.current > 0 && (
                <span className="ud-chip ud-chip-warning hidden sm:inline-flex">
                  🔥 {state.streak.current}-day
                </span>
              )}
              <Link href="/settings" className="ud-btn ud-btn-ghost ud-btn-sm">
                Settings
              </Link>
            </div>
          </div>
          {/* Mobile bottom-ish nav */}
          <nav className="md:hidden flex items-center gap-1 px-3 pb-2 overflow-x-auto">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap",
                    active
                      ? "text-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                      : "text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
      )}
      <main className="flex-1 w-full">{children}</main>
      {!hideNav && (
        <footer className="border-t mt-12 py-6 text-sm text-[var(--color-muted)]">
          <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p>
              Independent study aid. Read the official guide:{" "}
              <a
                href="https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/pub/discover-large.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ud-link"
              >
                Discover Canada (large print PDF on canada.ca)
              </a>
              .
            </p>
            <p>Not affiliated with the Government of Canada.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
