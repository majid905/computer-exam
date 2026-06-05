"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") ?? "");
    setEmail(params.get("email") ?? "");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
        setTimeout(() => router.replace("/login"), 2000);
      } else {
        setError(data?.error || "Could not reset password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const invalidLink = !loading && (!token || !email);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-2)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
            pass<span className="text-[var(--color-accent)]">p</span>ilot
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-2">Choose a new password</p>
        </div>

        {done ? (
          <div className="ud-card p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h2 className="font-bold text-[var(--color-ink)]">Password updated</h2>
            <p className="text-sm text-[var(--color-muted)] mt-2">Redirecting you to sign in…</p>
          </div>
        ) : invalidLink ? (
          <div className="ud-card p-6 text-center">
            <h2 className="font-bold text-[var(--color-ink)]">Invalid reset link</h2>
            <p className="text-sm text-[var(--color-muted)] mt-2">
              This link is missing information or has already been used.
            </p>
            <Link href="/forgot-password" className="ud-btn ud-btn-primary mt-5 inline-block">
              Request a new link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ud-card p-6 space-y-4">
            {error && (
              <div className="rounded-md bg-[var(--color-danger-soft)] text-[var(--color-danger)] px-4 py-3 text-sm font-semibold">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                New password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Confirm password
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={loading} className="ud-btn ud-btn-primary w-full">
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
