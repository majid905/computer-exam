"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.replace("/app");
    } else {
      setError(result.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-2)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
            pass<span className="text-[var(--color-accent)]">p</span>ilot
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-2">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ud-card p-6 space-y-4">
          {error && (
            <div className="rounded-md bg-[var(--color-danger-soft)] text-[var(--color-danger)] px-4 py-3 text-sm font-semibold">
              {error}
            </div>
          )}

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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Password
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

          <div className="text-right -mt-1">
            <Link href="/forgot-password" className="ud-link text-sm font-semibold">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ud-btn ud-btn-primary w-full"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-[var(--color-muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="ud-link font-semibold">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
