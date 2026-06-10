"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [stripeConfig, setStripeConfig] = useState<any>({});
  const [googleConfig, setGoogleConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stripeSaving, setStripeSaving] = useState(false);
  const [googleSaving, setGoogleSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [stripeMessage, setStripeMessage] = useState("");
  const [googleMessage, setGoogleMessage] = useState("");

  async function load() {
    setLoading(true);
    const [appRes, stripeRes, googleRes] = await Promise.all([
      fetch("/api/app-settings/"),
      fetch("/api/stripe-config/"),
      fetch("/api/google-config/"),
    ]);
    const appData = appRes.ok ? await appRes.json() : {};
    const stripeData = stripeRes.ok ? await stripeRes.json() : {};
    const googleData = googleRes.ok ? await googleRes.json() : {};
    setSettings(appData ?? {});
    setStripeConfig(stripeData ?? {});
    setGoogleConfig(googleData ?? {});
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/app-settings/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  }

  async function handleStripeSave(e: React.FormEvent) {
    e.preventDefault();
    setStripeSaving(true);
    const res = await fetch("/api/stripe-config/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stripeConfig),
    });
    if (res.ok) {
      setStripeMessage("Stripe config saved successfully!");
      setTimeout(() => setStripeMessage(""), 3000);
    }
    setStripeSaving(false);
  }

  function update(key: string, value: string) {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  }

  function updateStripe(key: string, value: string) {
    setStripeConfig((prev: any) => ({ ...prev, [key]: value }));
  }

  function updateGoogle(key: string, value: string) {
    setGoogleConfig((prev: any) => ({ ...prev, [key]: value }));
  }

  async function handleGoogleSave(e: React.FormEvent) {
    e.preventDefault();
    setGoogleSaving(true);
    const res = await fetch("/api/google-config/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(googleConfig),
    });
    if (res.ok) {
      setGoogleMessage("Google OAuth config saved!");
      setTimeout(() => setGoogleMessage(""), 3000);
    }
    setGoogleSaving(false);
  }

  const fields = [
    { key: "site_name", label: "Site Name" },
    { key: "site_tagline", label: "Site Tagline" },
    { key: "support_email", label: "Support Email" },
    { key: "support_phone", label: "Support Phone" },
    { key: "facebook", label: "Facebook URL" },
    { key: "instagram", label: "Instagram URL" },
    { key: "youtube", label: "YouTube URL" },
    { key: "twitter", label: "Twitter URL" },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">App Settings</h1>
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">App Settings</h1>

      {message && (
        <div className="rounded-md bg-[var(--color-success-soft)] text-[var(--color-success)] px-4 py-3 text-sm font-semibold">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="ud-card p-6 space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
              {f.label}
            </label>
            <input
              type="text"
              value={settings[f.key] ?? ""}
              onChange={(e) => update(f.key, e.target.value)}
              className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
            About Us
          </label>
          <textarea
            value={settings.about_us ?? ""}
            onChange={(e) => update("about_us", e.target.value)}
            rows={4}
            className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="ud-btn ud-btn-primary">
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>

      <h2 className="text-xl font-extrabold text-[var(--color-ink)] mt-8">Stripe Payment Gateway</h2>

      {stripeMessage && (
        <div className="rounded-md bg-[var(--color-success-soft)] text-[var(--color-success)] px-4 py-3 text-sm font-semibold">
          {stripeMessage}
        </div>
      )}

      <form onSubmit={handleStripeSave} className="ud-card p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Publishable Key
          </label>
          <input
            type="text"
            value={stripeConfig.publishable_key ?? ""}
            onChange={(e) => updateStripe("publishable_key", e.target.value)}
            placeholder="pk_test_..."
            className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Secret Key
          </label>
          <input
            type="password"
            value={stripeConfig.secret_key ?? ""}
            onChange={(e) => updateStripe("secret_key", e.target.value)}
            placeholder="sk_test_..."
            className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Status
          </label>
          <select
            value={stripeConfig.status ?? "inactive"}
            onChange={(e) => updateStripe("status", e.target.value)}
            className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={stripeSaving} className="ud-btn ud-btn-primary">
            {stripeSaving ? "Saving..." : "Save Stripe Config"}
          </button>
        </div>
      </form>

      <h2 className="text-xl font-extrabold text-(--color-ink) mt-8">Google OAuth</h2>

      {googleMessage && (
        <div className="rounded-md bg-(--color-success-soft) text-(--color-success) px-4 py-3 text-sm font-semibold">
          {googleMessage}
        </div>
      )}

      <form onSubmit={handleGoogleSave} className="ud-card p-6 space-y-4">
        <div className="rounded-md bg-(--color-surface-2) border border-(--color-border) px-4 py-3 text-xs text-(--color-muted)">
          <span className="font-semibold text-(--color-ink)">Authorized redirect URI</span> — add this in Google Cloud Console:
          <br />
          <code className="text-(--color-brand) font-mono select-all">
            https://www.passpilot.ca/api/auth/google/callback
          </code>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-(--color-muted) mb-1">
            Client ID
          </label>
          <input
            type="text"
            value={googleConfig.client_id ?? ""}
            onChange={(e) => updateGoogle("client_id", e.target.value)}
            placeholder="xxxxxxxx.apps.googleusercontent.com"
            className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-brand)"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-(--color-muted) mb-1">
            Client Secret
          </label>
          <input
            type="password"
            value={googleConfig.client_secret ?? ""}
            onChange={(e) => updateGoogle("client_secret", e.target.value)}
            placeholder="GOCSPX-..."
            className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-brand)"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-(--color-muted) mb-1">
            Status
          </label>
          <select
            value={googleConfig.status ?? "active"}
            onChange={(e) => updateGoogle("status", e.target.value)}
            className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-brand)"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={googleSaving} className="ud-btn ud-btn-primary">
            {googleSaving ? "Saving..." : "Save Google Config"}
          </button>
        </div>
      </form>
    </div>
  );
}
