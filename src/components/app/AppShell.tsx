"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useUserState } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import { NAV_TOPICS, NAV_SECONDARY } from "@/lib/nav";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";

const PUBLIC_NAV = [
  { href: "/dictionary", label: "Glossary" },
];

function PasspilotMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="7" fill="var(--color-brand)" />
      <path d="M8 17.5 L23 9 L17.5 22.5 L14.5 17 Z" fill="#ffb265" />
      <path d="M14.5 17 L23 9 L17.5 22.5 Z" fill="var(--color-accent)" />
    </svg>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state] = useUserState();
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  // 30-minute inactivity timeout
  useSessionTimeout(!!user, logout);

  // Listen for the warning event fired 2 min before logout
  useEffect(() => {
    function onWarning() { setShowTimeoutWarning(true); }
    window.addEventListener("session:warning", onWarning);
    return () => window.removeEventListener("session:warning", onWarning);
  }, []);

  // Hide warning when user acts (any activity resets the timer)
  useEffect(() => {
    if (!showTimeoutWarning) return;
    function onActivity() { setShowTimeoutWarning(false); }
    window.addEventListener("mousemove", onActivity, { once: true });
    window.addEventListener("keydown", onActivity, { once: true });
    window.addEventListener("click", onActivity, { once: true });
    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("click", onActivity);
    };
  }, [showTimeoutWarning]);

  const hideNav =
    pathname === "/" ||
    pathname === "" ||
    pathname?.startsWith("/onboarding") ||
    pathname?.startsWith("/mock-exam/take") ||
    pathname?.startsWith("/welcome") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/admin");

  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Session timeout warning toast */}
      {showTimeoutWarning && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-5 py-3 shadow-lg dark:border-amber-600 dark:bg-amber-900/80">
          <span className="text-xl">⏱️</span>
          <div>
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              Session expiring soon
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              You will be logged out in 2 minutes due to inactivity.
            </p>
          </div>
          <button
            onClick={() => setShowTimeoutWarning(false)}
            className="ml-2 text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-100"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {!hideNav && (
        <header className="sticky top-0 z-30 backdrop-blur bg-[var(--color-surface)]/85 border-b">
          <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
            <Link href={user ? "/app" : "/"} className="flex items-center gap-2">
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

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {(user ? NAV_TOPICS : PUBLIC_NAV).map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                      active
                        ? "text-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {user && NAV_SECONDARY.map((item) => {
                const active = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                      active
                        ? "text-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    pathname?.startsWith("/admin")
                      ? "text-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                      : "text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-2">
              {state.streak.current > 0 && (
                <span className="ud-chip ud-chip-warning hidden sm:inline-flex">
                  🔥 {state.streak.current}-day
                </span>
              )}
              {!loading && user && <NotificationBell />}
              {!loading && user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--color-ink)] hidden sm:block">
                    {user.full_name || user.user_name || user.email}
                  </span>
                  {user.role === "admin" && (
                    <span className="ud-chip ud-chip-brand text-[10px]">Admin</span>
                  )}
                  <button onClick={() => logout()} className="ud-btn ud-btn-ghost ud-btn-sm">
                    Logout
                  </button>
                </div>
              ) : !loading && !isAuthPage ? (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="ud-btn ud-btn-ghost ud-btn-sm">
                    Sign in
                  </Link>
                  <Link href="/register" className="ud-btn ud-btn-primary ud-btn-sm">
                    Sign up
                  </Link>
                </div>
              ) : null}

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-[var(--color-surface-2)]"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="md:hidden border-t bg-[var(--color-surface)] px-5 py-3 space-y-1">
              {(user ? NAV_TOPICS : PUBLIC_NAV).map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-semibold ${
                      active
                        ? "text-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {user && NAV_SECONDARY.map((item) => {
                const active = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-semibold ${
                      active
                        ? "text-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-semibold text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                >
                  Admin
                </Link>
              )}
            </div>
          )}
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
