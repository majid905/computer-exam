"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ContactPage() {
  const { user } = useAuth();
  const [contact, setContact] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: f.name || user.full_name || "",
        email: f.email || user.email || "",
        phone: f.phone || user.phone || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    fetch("/api/site-contacts")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setContact(data); })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact-messages/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "new" }),
      });
      if (res.ok) {
        setStatus("success");
        setForm((f) => ({ ...f, subject: "", message: "" }));
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const hasContact = contact && (contact.email || contact.phone || contact.address || contact.whatsapp);
  const hasSocial = contact && (contact.facebook || contact.twitter || contact.instagram || contact.linkedin || contact.youtube);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Contact
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Get in touch
        </h1>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed max-w-xl mx-auto">
          Have a question, feedback, or need support? Reach out to us.
        </p>
      </div>

      {/* Contact Info Cards — centered */}
      {hasContact && (
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {contact?.email && (
            <div className="ud-card p-5 text-center w-56">
              <div className="text-2xl mb-2">&#9993;&#65039;</div>
              <h3 className="font-bold text-[var(--color-ink)] text-sm">Email</h3>
              <a href={`mailto:${contact.email}`} className="text-sm text-[var(--color-brand)] hover:underline mt-1 block truncate">
                {contact.email}
              </a>
            </div>
          )}
          {contact?.phone && (
            <div className="ud-card p-5 text-center w-56">
              <div className="text-2xl mb-2">&#128222;</div>
              <h3 className="font-bold text-[var(--color-ink)] text-sm">Phone</h3>
              <a href={`tel:${contact.phone}`} className="text-sm text-[var(--color-brand)] hover:underline mt-1 block">
                {contact.phone}
              </a>
            </div>
          )}
          {contact?.address && (
            <div className="ud-card p-5 text-center w-56">
              <div className="text-2xl mb-2">&#128205;</div>
              <h3 className="font-bold text-[var(--color-ink)] text-sm">Address</h3>
              <p className="text-sm text-[var(--color-muted)] mt-1">{contact.address}</p>
            </div>
          )}
          {contact?.whatsapp && (
            <div className="ud-card p-5 text-center w-56">
              <div className="text-2xl mb-2">&#128172;</div>
              <h3 className="font-bold text-[var(--color-ink)] text-sm">WhatsApp</h3>
              <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-brand)] hover:underline mt-1 block">
                {contact.whatsapp}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Social Links */}
      {hasSocial && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {contact.facebook && (
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">Facebook</a>
          )}
          {contact.twitter && (
            <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">Twitter</a>
          )}
          {contact.instagram && (
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">Instagram</a>
          )}
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">LinkedIn</a>
          )}
          {contact.youtube && (
            <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">YouTube</a>
          )}
        </div>
      )}

      {/* Contact Form */}
      <div className="ud-card p-6 max-w-xl mx-auto">
        <h2 className="font-bold text-[var(--color-ink)] mb-4">Send us a message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                placeholder="+1 234 567 8900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                placeholder="How can we help?"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Message *</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
              placeholder="Tell us what's on your mind..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="ud-btn ud-btn-primary w-full"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
          {status === "success" && (
            <p className="text-sm text-[var(--color-success)] font-semibold">Message sent successfully! We&apos;ll be in touch soon.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-[var(--color-danger)] font-semibold">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
