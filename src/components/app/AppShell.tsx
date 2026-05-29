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

function PasspilotMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <rect width="32" height="32" rx="7" fill="var(--color-brand)" />
      {/* Paper-plane: light orange body + darker orange underside */}
      <path d="M8 17.5 L23 9 L17.5 22.5 L14.5 17 Z" fill="#ffb265" />
      <path d="M14.5 17 L23 9 L17.5 22.5 Z" fill="var(--color-accent)" />
    </svg>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state] = useUserState();

  const hideNav =
    pathname?.startsWith("/onboarding") ||
    pathname?.startsWith("/mock-exam/take") ||
    pathname?.startsWith("/welcome");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && (
        <header className="sticky top-0 z-30 backdrop-blur bg-[var(--color-surface)]/85 border-b">
          <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <PasspilotMark size={26} />
              <div className="leading-none">
                <div className="font-extrabold tracking-tight text-[var(--color-ink)] text-[17px]">
                  pass<span className="text-[var(--color-accent)]">p</span>ilot
                </div>
                <div className="text-[10px] font-semibold text-[var(--color-muted)] tracking-wide mt-0.5 hidden sm:block">
                  ai-powered exam coach
                </div>
              </div>
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
