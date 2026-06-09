"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [full_name, setFullName] = useState("");
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await register({
      email,
      password,
      full_name,
      user_name: user_name || undefined,
    });
    setLoading(false);

    if (result.success) {
      router.replace("/login?registered=1");
    } else {
      setError(result.error || "Registration failed");
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
            Create your free account
          </p>
        </div>

        <a
          href="/api/auth/google"
          className="ud-btn ud-btn-ghost w-full flex items-center justify-center gap-2 mb-4"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
            <path fill="#4285F4" d="M46.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2v6h7.7c4.5-4.1 7-10.2 7-17.2z"/>
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.3 0-11.6-4.2-13.5-9.9H2.5v6.2C6.5 42.8 14.7 48 24 48z"/>
            <path fill="#FBBC05" d="M10.5 28.6A14.8 14.8 0 0 1 9.8 24c0-1.6.3-3.2.7-4.6v-6.2H2.5A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8-6.2z"/>
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.9-6.9C36 2.4 30.5 0 24 0 14.7 0 6.5 5.2 2.5 13.2l8 6.2C12.4 13.7 17.7 9.5 24 9.5z"/>
          </svg>
          Sign up with Google
        </a>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 border-t border-[var(--color-border)]" />
          <span className="text-xs text-[var(--color-muted)] font-semibold">OR</span>
          <div className="flex-1 border-t border-[var(--color-border)]" />
        </div>

        <form onSubmit={handleSubmit} className="ud-card p-6 space-y-4">
          {error && (
            <div className="rounded-md bg-[var(--color-danger-soft)] text-[var(--color-danger)] px-4 py-3 text-sm font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Username
            </label>
            <input
              type="text"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Email *
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
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
              placeholder="Min 6 characters"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ud-btn ud-btn-primary w-full"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-[var(--color-muted)]">
            Already have an account?{" "}
            <Link href="/login" className="ud-link font-semibold">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
