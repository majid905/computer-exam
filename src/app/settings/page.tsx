"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserState, resetState } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import { CheckoutDialog } from "@/components/billing/CheckoutDialog";

function resizeImageToBase64(file: File, maxSize = 200, quality = 0.6): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let w = img.width;
      let h = img.height;
      if (w > h) {
        if (w > maxSize) { h = Math.round(h * maxSize / w); w = maxSize; }
      } else {
        if (h > maxSize) { w = Math.round(w * maxSize / h); h = maxSize; }
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas error");
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function SettingsPage() {
  const router = useRouter();
  const [state, update] = useUserState();
  const { user, refreshUser, subscription } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [previewPic, setPreviewPic] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.documentElement;
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark =
      state.theme === "dark" || (state.theme === "system" && prefers);
    html.classList.toggle("dark", dark);
    localStorage.setItem("pc:theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscription") === "success") {
      setSaveMsg("Payment successful! Your subscription is now active.");
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => setSaveMsg(""), 5000);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setPhone(user.phone ?? "");
      setProfilePic(user.profile_pic ?? "");
      setPreviewPic(user.profile_pic ?? "");
    }
  }, [user]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setSaveMsg("Image must be under 5MB.");
      return;
    }
    try {
      const base64 = await resizeImageToBase64(file, 300, 0.7);
      setPreviewPic(base64);
      setProfilePic(base64);
      setSaveMsg("");
    } catch {
      setSaveMsg("Failed to process image.");
    }
  }

  const [plans, setPlans] = useState<any[]>([]);
  const [checkoutPlan, setCheckoutPlan] = useState<{ id: number; title: string } | null>(null);

  useEffect(() => {
    fetch("/api/pricing/")
      .then((r) => r.json())
      .then((data) => setPlans(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  async function saveProfile() {
    if (!user) return;
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch(`/api/users/${user.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone || null, profile_pic: profilePic || null }),
      });
      if (res.ok) {
        setSaveMsg("Profile updated!");
        await refreshUser();
        setTimeout(() => setSaveMsg(""), 3000);
      } else {
        const err = await res.text();
        setSaveMsg(`Failed: ${err}`);
      }
    } catch (e: any) {
      setSaveMsg(`Network error: ${e.message}`);
    }
    setSaving(false);
  }

  async function saveTheme(theme: string) {
    update((s) => ({ ...s, theme: theme as any }));
    if (user) {
      try {
        await fetch("/api/user-settings/", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme }),
        });
      } catch {
        // ignore
      }
    }
  }

  function reset() {
    if (typeof window === "undefined") return;
    if (
      confirm("Reset all progress, attempts, and onboarding? This can't be undone.")
    ) {
      resetState();
      router.replace("/onboarding");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Settings
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
          Preferences
        </h1>
      </header>

      {/* User Profile */}
      <section className="ud-card p-6 mb-4">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-1">Your Profile</h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Click photo to change. Max 5MB.
        </p>

        {saveMsg && (
          <div className={`rounded-md px-4 py-3 text-sm font-semibold mb-4 ${saveMsg.includes("updated") ? "bg-[var(--color-success-soft)] text-[var(--color-success)]" : "bg-[var(--color-danger-soft)] text-[var(--color-danger)]"}`}>
            {saveMsg}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center overflow-hidden border-2 border-[var(--color-border)] cursor-pointer hover:border-[var(--color-brand)] transition-colors group"
              onClick={() => fileInputRef.current?.click()}
              title="Click to change photo"
            >
              {previewPic ? (
                <img src={previewPic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">Change</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div>
              <p className="font-bold text-[var(--color-ink)]">{user?.full_name || user?.user_name || "User"}</p>
              <p className="text-sm text-[var(--color-muted)]">{user?.email}</p>
              {user?.role === "admin" && (
                <span className="inline-flex mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                  Admin
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
            />
          </div>

          <div className="flex justify-end">
            <button onClick={saveProfile} disabled={saving} className="ud-btn ud-btn-primary ud-btn-sm">
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </section>

      <section className="ud-card p-6 mb-4">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-3">Theme</h2>
        <div className="grid grid-cols-3 gap-2">
          {(["light", "dark", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => saveTheme(t)}
              className={[
                "ud-card px-4 py-3 text-sm font-bold capitalize transition-colors",
                state.theme === t
                  ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  : "text-[var(--color-ink)] hover:border-[var(--color-muted)]",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="ud-card p-6 mb-4">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-1">Subscription</h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Manage your plan and billing.
        </p>

        {subscription ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[var(--color-ink)]">{subscription.plan_title}</p>
                <p className="text-sm text-[var(--color-muted)]">
                  Expires on {new Date(subscription.end_date).toLocaleDateString()}
                </p>
              </div>
              <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-[var(--color-success-soft)] text-[var(--color-success)]">
                Active
              </span>
            </div>
            {new Date(subscription.end_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
              <p className="text-sm text-[var(--color-warning)]">
                Your subscription is expiring soon. Renew to keep full access.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[var(--color-ink)]">Free Plan</p>
                <p className="text-sm text-[var(--color-muted)]">
                  Limited to 2 mock tests. Upgrade for unlimited access.
                </p>
              </div>
              <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-[var(--color-muted)]/10 text-[var(--color-muted)]">
                Free
              </span>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-2">
          {plans.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between rounded-md border-2 border-[var(--color-border)] px-3 py-2">
              <div>
                <p className="text-sm font-bold text-[var(--color-ink)]">{plan.title}</p>
                <p className="text-xs text-[var(--color-muted)]">
                  CAD {(plan.price_cents / 100).toFixed(2)} / {plan.interval}
                </p>
              </div>
              <button
                onClick={() => setCheckoutPlan({ id: plan.id, title: plan.title })}
                className="ud-btn ud-btn-primary ud-btn-sm"
              >
                {subscription ? "Renew" : "Upgrade"}
              </button>
            </div>
          ))}
          {plans.length === 0 && (
            <p className="text-sm text-[var(--color-muted)]">No pricing plans available.</p>
          )}
        </div>
      </section>

      <OnboardingSettings state={state} update={update} />

      <section className="ud-card p-6 mb-4">
        <h2 className="font-extrabold text-[var(--color-ink)] mb-1">
          Export progress
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Download a JSON snapshot of your study state.
        </p>
        <button
          className="ud-btn ud-btn-ghost"
          onClick={() => {
            const blob = new Blob([JSON.stringify(state, null, 2)], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "passcanada-progress.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download JSON
        </button>
      </section>

      <section className="ud-card p-6 border-[var(--color-danger)]/40">
        <h2 className="font-extrabold text-[var(--color-danger)] mb-1">
          Reset
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Clear all progress and start onboarding again.
        </p>
        <button
          className="ud-btn ud-btn-ghost"
          onClick={reset}
          style={{
            borderColor: "var(--color-danger)",
            color: "var(--color-danger)",
          }}
        >
          Reset all progress
        </button>
      </section>

      {checkoutPlan && (
        <CheckoutDialog
          planId={checkoutPlan.id}
          planTitle={checkoutPlan.title}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </div>
  );
}

function OnboardingSettings({ state, update }: { state: any; update: (fn: (s: any) => any) => void }) {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [languages, setLanguages] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);

  const [language, setLanguage] = useState(state.onboarding.language);
  const [province, setProvince] = useState(state.onboarding.province);
  const [testDate, setTestDate] = useState(state.onboarding.testDate ?? "");
  const [baselineScore, setBaselineScore] = useState(state.onboarding.baselineScore ?? 50);

  useEffect(() => {
    async function load() {
      const [langRes, provRes, settingsRes] = await Promise.all([
        fetch("/api/languages/"),
        fetch("/api/provinces/"),
        fetch("/api/user-settings/"),
      ]);
      if (langRes.ok) setLanguages(await langRes.json());
      if (provRes.ok) setProvinces(await provRes.json());
      if (settingsRes.ok) {
        const settings = await settingsRes.json();
        // Sync localStorage with server settings
        update((s) => ({
          ...s,
          onboarding: {
            ...s.onboarding,
            language: settings.language ?? s.onboarding.language,
            province: settings.province ?? s.onboarding.province,
            testDate: settings.test_date ?? s.onboarding.testDate,
            baselineScore: settings.baseline_score ?? s.onboarding.baselineScore,
          },
        }));
        // Update local form state
        setLanguage(settings.language ?? state.onboarding.language);
        setProvince(settings.province ?? state.onboarding.province);
        setTestDate(settings.test_date ?? state.onboarding.testDate ?? "");
        setBaselineScore(settings.baseline_score ?? state.onboarding.baselineScore ?? 50);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save() {
    setSaving(true);
    setMsg("");

    // Save to localStorage
    update((s) => ({
      ...s,
      onboarding: {
        ...s.onboarding,
        language: language as any,
        province: province as any,
        testDate: testDate || null,
        baselineScore: Number(baselineScore) || null,
      },
    }));

    // Save to database
    if (user) {
      try {
        const res = await fetch("/api/user-settings/", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language,
            province,
            test_date: testDate || null,
            baseline_score: Number(baselineScore) || null,
          }),
        });
        if (res.ok) {
          setMsg("Onboarding info updated!");
          setTimeout(() => setMsg(""), 3000);
        } else {
          setMsg("Failed to save to database.");
        }
      } catch {
        setMsg("Network error.");
      }
    }
    setSaving(false);
  }

  return (
    <section className="ud-card p-6 mb-4">
      <h2 className="font-extrabold text-[var(--color-ink)] mb-1">Onboarding Info</h2>
      <p className="text-sm text-[var(--color-muted)] mb-4">
        Update your study preferences.
      </p>

      {msg && (
        <div className={`rounded-md px-4 py-3 text-sm font-semibold mb-4 ${msg.includes("updated") ? "bg-[var(--color-success-soft)] text-[var(--color-success)]" : "bg-[var(--color-danger-soft)] text-[var(--color-danger)]"}`}>
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Province</label>
          <select
            value={province ?? ""}
            onChange={(e) => setProvince((e.target.value || null) as any)}
            className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
          >
            <option value="">— Select —</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Test Date</label>
          <input
            type="date"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
            className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Baseline Score (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={baselineScore}
            onChange={(e) => setBaselineScore(Number(e.target.value))}
            className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={save} disabled={saving} className="ud-btn ud-btn-primary ud-btn-sm">
          {saving ? "Saving..." : "Save Onboarding Info"}
        </button>
      </div>
    </section>
  );
}

function DT({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </dt>
      <dd className="text-[var(--color-ink)] font-bold mt-1">{value}</dd>
    </div>
  );
}
