"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { UserState } from "@/lib/types";

const STORAGE_KEY = "pc:state:v1";

function loadState(): UserState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeState(state: UserState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("pc:state:updated"));
}

const defaultState: UserState = {
  onboarding: {
    language: "en",
    province: null,
    testDate: null,
    baselineScore: null,
    baselineCompletedAt: null,
    completed: false,
  },
  theme: "system",
  chapters: {},
  flagged: [],
  attempts: [],
  streak: { current: 0, longest: 0, lastStudyDate: null },
  createdAt: new Date().toISOString(),
};

type User = {
  id: number;
  full_name: string | null;
  user_name: string | null;
  email: string;
  phone: string | null;
  profile_pic: string | null;
  role: string;
  status: string;
  created_at: string;
};

type Subscription = {
  id: number;
  user_id: number;
  pricing_plan_id: number;
  plan_title: string;
  start_date: string;
  end_date: string;
  payment_status: string;
  status: string;
};

type AuthContextType = {
  user: User | null;
  subscription: Subscription | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; password: string; full_name: string; user_name?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
  syncSettings: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const res = await fetch("/api/auth/me/");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return data.user;
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }

  async function refreshSubscription() {
    try {
      const res = await fetch("/api/subscriptions/current/");
      if (res.ok) {
        const data = await res.json();
        setSubscription(data.subscription);
      } else {
        setSubscription(null);
      }
    } catch {
      setSubscription(null);
    }
  }

  async function syncSettings() {
    try {
      const res = await fetch("/api/user-settings/");
      if (!res.ok) return;
      const settings = await res.json();
      const existing = loadState() ?? defaultState;
      writeState({
        ...existing,
        theme: settings.theme ?? existing.theme,
        onboarding: {
          ...existing.onboarding,
          language: settings.language ?? existing.onboarding.language,
          province: settings.province ?? existing.onboarding.province,
          testDate: settings.test_date ?? existing.onboarding.testDate,
          baselineScore: settings.baseline_score ?? existing.onboarding.baselineScore,
          completed: !!(settings.language && settings.province),
        },
      });
    } catch {
      // ignore
    }
  }

  async function syncProgress(userId: number) {
    try {
      const res = await fetch("/api/user-data/");
      if (!res.ok) return;
      const data = await res.json();
      const existing = loadState() ?? defaultState;

      writeState({
        ...existing,
        onboarding: {
          ...existing.onboarding,
          ...data.onboarding,
        },
        theme: data.theme ?? existing.theme,
        chapters: data.chapters ?? existing.chapters,
        attempts: data.attempts ?? existing.attempts,
        streak: data.streak ?? existing.streak,
        flagged: existing.flagged,
      });
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    async function init() {
      const u = await refreshUser();
      if (u) {
        await refreshSubscription();
        await syncSettings();
        await syncProgress(u.id);
      }
      setLoading(false);
    }
    init();
  }, []);

  async function login(email: string, password: string) {
    try {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data.user);
      await refreshSubscription();
      await syncSettings();
      await syncProgress(data.user.id);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  }

  async function register(data: { email: string; password: string; full_name: string; user_name?: string }) {
    try {
      const res = await fetch("/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        return { success: false, error: result.error || "Registration failed" };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  }

  async function logout() {
    await fetch("/api/auth/logout/", { method: "POST" });
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ user, subscription, loading, login, register, logout, refreshUser, refreshSubscription, syncSettings }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
