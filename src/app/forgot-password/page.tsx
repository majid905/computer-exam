"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
      } else {
        setError(data?.error || "Something went wrong");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-2)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
            pass<span className="text-[var(--color-accent)]">p</span>ilot
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-2">Reset your password</p>
        </div>

        {sent ? (
          <div className="ud-card p-6 text-center">
            <div className="text-3xl mb-2">📧</div>
            <h2 className="font-bold text-[var(--color-ink)]">Check your email</h2>
            <p className="text-sm text-[var(--color-muted)] mt-2">
              If an account exists for <span className="font-semibold">{email}</span>, we&apos;ve sent a
              link to reset your password. It expires in 1 hour.
            </p>
            <Link href="/login" className="ud-btn ud-btn-ghost mt-5 inline-block">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ud-card p-6 space-y-4">
            {error && (
              <div className="rounded-md bg-[var(--color-danger-soft)] text-[var(--color-danger)] px-4 py-3 text-sm font-semibold">
                {error}
              </div>
            )}
            <p className="text-sm text-[var(--color-muted)]">
              Enter your account email and we&apos;ll send you a link to reset your password.
            </p>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                placeholder="you@example.com"
              />
            </div>
            <button type="submit" disabled={loading} className="ud-btn ud-btn-primary w-full">
              {loading ? "Sending..." : "Send reset link"}
            </button>
            <p className="text-center text-sm text-[var(--color-muted)]">
              Remembered it?{" "}
              <Link href="/login" className="ud-link font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
