"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/app-settings/");
    const data = res.ok ? await res.json() : {};
    setSettings(data ?? {});
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

  function update(key: string, value: string) {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
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
    </div>
  );
}
