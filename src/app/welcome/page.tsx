"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="7" fill="var(--color-brand)" />
      <path d="M8 17.5 L23 9 L17.5 22.5 L14.5 17 Z" fill="#ffb265" />
      <path d="M14.5 17 L23 9 L17.5 22.5 Z" fill="var(--color-accent)" />
    </svg>
  );
}

function useSiteStats() {
  const [stats, setStats] = useState({ questions: 0, chapters: 0, languages: 0, testimonials: 0, mock_test_duration: 45 });
  useEffect(() => {
    fetch("/api/site-stats")
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);
  return stats;
}

export default function WelcomePage() {
  const stats = useSiteStats();
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <MarketingNav />
      <Hero />
      <TrustStrip stats={stats} />
      <Features stats={stats} />
      <HowItWorks stats={stats} />
      <SocialProof stats={stats} />
      <Pricing />
      <BlogSection />
      <FAQ />
      <ContactSection />
      <FinalCTA />
      <MarketingFooter />
    </div>
  );
}

/* ---------------- Nav ---------------- */

function MarketingNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-[var(--color-surface)]/90 border-b">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link href="/welcome" className="flex items-center gap-2">
          <Logo size={30} />
          <div className="leading-none">
            <div className="font-extrabold tracking-tight text-[var(--color-ink)] text-[18px]">
              pass<span className="text-[var(--color-accent)]">p</span>ilot
            </div>
            <div className="text-[10px] font-semibold text-[var(--color-muted)] tracking-wide mt-0.5 hidden sm:block">
              ai-powered exam coach
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[var(--color-ink)]">
          <a href="#features" className="hover:text-[var(--color-brand)]">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-[var(--color-brand)]">
            How it works
          </a>
          <a href="#pricing" className="hover:text-[var(--color-brand)]">
            Pricing
          </a>
          <a href="#faq" className="hover:text-[var(--color-brand)]">
            FAQ
          </a>
          <a href="#contact" className="hover:text-[var(--color-brand)]">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/app"
            className="hidden sm:inline-flex ud-btn ud-btn-ghost ud-btn-sm"
          >
            Sign in
          </Link>
          <Link href="/onboarding" className="ud-btn ud-btn-primary ud-btn-sm">
            Try free
          </Link>
          <button
            className="md:hidden ud-btn ud-btn-ghost ud-btn-sm"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-[var(--color-surface)]">
          <nav className="flex flex-col gap-1 px-5 py-3 text-sm font-semibold">
            <a href="#features" onClick={() => setOpen(false)} className="py-2">
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              How it works
            </a>
            <a href="#pricing" onClick={() => setOpen(false)} className="py-2">
              Pricing
            </a>
            <a href="#faq" onClick={() => setOpen(false)} className="py-2">
              FAQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 0%, rgba(245,138,31,0.10), transparent 60%), radial-gradient(60% 60% at 0% 100%, rgba(46,42,138,0.10), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <span className="ud-chip ud-chip-accent">
            ✨ Built for the new 2026 IRCC online test
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.05]">
            Pass the Canadian citizenship test on your{" "}
            <span className="text-[var(--color-brand)]">first try</span>.
          </h1>
          <p className="mt-5 text-lg text-[var(--color-muted)] max-w-xl leading-relaxed">
            Study less. Pass with confidence. An AI-powered coach that tells you
            when you&apos;re ready, simulates the new 45-minute online format,
            and explains every wrong answer in your language.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/onboarding" className="ud-btn ud-btn-primary">
              Start studying — it&apos;s free
            </Link>
            <a href="#how-it-works" className="ud-btn ud-btn-ghost">
              See how it works
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs text-[var(--color-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="text-[var(--color-success)]">✓</span> No credit
              card
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[var(--color-success)]">✓</span> Works
              offline
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[var(--color-success)]">✓</span> Cancel any
              time
            </span>
          </div>
        </div>
        <div>
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      <div
        className="ud-card p-5"
        style={{ boxShadow: "0 18px 60px -20px rgba(46,42,138,0.25)" }}
      >
        <div className="flex items-center justify-between text-xs text-[var(--color-muted)] font-bold mb-3">
          <span>QUESTION 7 OF 20</span>
          <span className="bg-[var(--color-danger-soft)] text-[var(--color-danger)] px-2 py-0.5 rounded-md tabular-nums">
            ⏱ 18:42
          </span>
        </div>
        <h3 className="text-[var(--color-ink)] font-bold leading-snug">
          Who was Canada&apos;s first Prime Minister?
        </h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="rounded-md border-2 border-[var(--color-border)] px-3 py-2.5 flex items-start gap-2">
            <span className="h-6 w-6 rounded-full bg-[var(--color-surface-2)] inline-flex items-center justify-center font-bold text-xs">
              A
            </span>
            Sir Wilfrid Laurier
          </li>
          <li className="rounded-md border-2 border-[var(--color-success)] bg-[var(--color-success-soft)] px-3 py-2.5 flex items-start gap-2">
            <span className="h-6 w-6 rounded-full bg-[var(--color-success)] text-white inline-flex items-center justify-center font-bold text-xs">
              B
            </span>
            <span className="text-[var(--color-ink)]">Sir John A. Macdonald</span>
          </li>
          <li className="rounded-md border-2 border-[var(--color-border)] px-3 py-2.5 flex items-start gap-2">
            <span className="h-6 w-6 rounded-full bg-[var(--color-surface-2)] inline-flex items-center justify-center font-bold text-xs">
              C
            </span>
            Sir George-Étienne Cartier
          </li>
        </ul>
        <div className="mt-4 rounded-md bg-[var(--color-brand-soft)] text-[var(--color-brand)] p-3 text-xs leading-relaxed">
          <strong>AI Coach:</strong> Sir John A. Macdonald (born in Scotland)
          became Canada&apos;s first PM in 1867. He&apos;s on the $10 bill.
        </div>
      </div>
      <div
        className="absolute -bottom-6 -left-6 ud-card p-4 hidden sm:block"
        style={{
          width: 220,
          boxShadow: "0 18px 60px -20px rgba(245,138,31,0.30)",
        }}
      >
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
          🎯 Ready to test
        </div>
        <div className="mt-1.5 text-2xl font-extrabold text-[var(--color-success)]">
          92%
        </div>
        <div className="text-[11px] text-[var(--color-muted)]">
          pass probability — 5 mocks
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-[var(--color-border-2)] overflow-hidden">
          <div
            className="h-full bg-[var(--color-success)]"
            style={{ width: "92%" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Trust strip ---------------- */

function TrustStrip({ stats }: { stats: any }) {
  const items = [
    "🇨🇦 IRCC 2026 online format",
    `🌐 ${stats.languages || 8} languages`,
    "📵 Works offline",
    "🚫 No dark patterns",
    "🔒 Privacy-first",
  ];
  return (
    <section className="border-y bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-6xl px-5 py-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs sm:text-sm font-bold text-[var(--color-muted)]">
        {items.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */

function Features({ stats }: { stats: any }) {
  const features = [
    {
      title: "AI coach that knows when you're ready",
      body: "Adaptive engine ranks your weak areas, schedules reviews, and predicts pass probability with a confidence interval. A green light appears only when you're truly ready.",
      icon: "🎯",
    },
    {
      title: "Faithful 2026 test simulation",
      body: `${stats.mock_test_duration || 45}-minute timer. 20 questions balanced by topic and province. Question map, draft autosave, auto-submit. The closest thing to the real online test you'll find.`,
      icon: "⏱",
    },
    {
      title: `Explanations in ${stats.languages || 8} languages`,
      body: "English, French, Punjabi, Tagalog, Mandarin, Hindi, Arabic, Spanish. Questions stay in EN/FR (because the real test is), but every explanation and glossary term is native.",
      icon: "🌐",
    },
    {
      title: "Modern study guide, not a PDF dump",
      body: "Every chapter has a concise Key Points view authored for the exam — plus a one-tap link to the official IRCC PDF for the relevant pages.",
      icon: "📚",
    },
    {
      title: "Drill exactly what you missed",
      body: "Fail a mock? One tap turns your wrong answers into a focused review session. Per-chapter mastery so you always know what to study next.",
      icon: "🔁",
    },
    {
      title: "No dark patterns — ever",
      body: "Free tier is genuinely useful. Paid tier is a clean $9.99 one-time unlock or $4.99/month. No weekly subscriptions, no surprises, no trial-to-charge tricks.",
      icon: "✨",
    },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Why passpilot
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Built for the way real people study.
        </h2>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          The category is crowded but underwhelming. We picked five things that
          matter — and we&apos;re best in class on each.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <div key={f.title} className="ud-card p-6 h-full">
            <div
              aria-hidden
              className="h-11 w-11 rounded-md flex items-center justify-center text-xl"
              style={{ background: "var(--color-brand-soft)" }}
            >
              {f.icon}
            </div>
            <h3 className="mt-4 font-extrabold tracking-tight text-[var(--color-ink)]">
              {f.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

function HowItWorks({ stats }: { stats: any }) {
  const steps = [
    {
      n: "01",
      title: "Diagnostic",
      body: "Five quick questions to map your weak spots and seed your study plan.",
    },
    {
      n: "02",
      title: "Study",
      body: `${stats.chapters || 12} chapters of Key Points authored for the test. Read in your language. Skim or go deep.`,
    },
    {
      n: "03",
      title: "Practice",
      body: "Drill chapter by chapter with instant feedback and cited explanations.",
    },
    {
      n: "04",
      title: "Mock exam",
      body: "45-minute timer, 20 balanced questions. Pass at 15/20 — same as the real test.",
    },
  ];
  return (
    <section
      id="how-it-works"
      className="bg-[var(--color-surface-2)] border-y"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
            How it works
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
            From day one to test day — in four steps.
          </h2>
        </div>
        <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <li key={s.n} className="ud-card p-6 relative">
              <div className="text-[40px] font-extrabold leading-none text-[var(--color-brand-soft)] tabular-nums">
                {s.n}
              </div>
              <h3 className="mt-3 font-extrabold tracking-tight text-[var(--color-ink)]">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                {s.body}
              </p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden lg:block absolute right-[-14px] top-1/2 -translate-y-1/2 text-[var(--color-brand)] text-2xl"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/onboarding" className="ud-btn ud-btn-primary">
            Take the diagnostic
          </Link>
          <Link href="/mock-exam" className="ud-btn ud-btn-ghost">
            Try a mock exam
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Social proof ---------------- */

function SocialProof({ stats }: { stats: any }) {
  const statItems = [
    { v: stats.questions || 145, l: "Reviewed questions" },
    { v: stats.chapters || 12, l: "Study chapters" },
    { v: stats.languages || 8, l: "Coach languages" },
    { v: stats.mock_test_duration || 45, l: "Minutes — real test format" },
  ];
  const [testimonials, setTestimonials] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
      <div className="ud-card p-8 sm:p-10 bg-[var(--color-brand)] text-white">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {statItems.map((s) => (
            <div key={s.l}>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {s.v}
              </div>
              <div className="text-xs sm:text-sm opacity-80 mt-1 font-semibold">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
      {testimonials.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.id} className="ud-card p-6">
              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed italic">
                "{t.review}"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--color-brand-soft)] flex items-center justify-center text-[var(--color-brand)] font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--color-ink)]">{t.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">{t.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------------- Pricing ---------------- */

function Pricing() {
  const [plans, setPlans] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((data) => setPlans(data));
  }, []);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Pricing
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Honest pricing. Free tier that actually helps.
        </h2>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          The category is full of weekly-subscription dark patterns. We chose
          the opposite: a real free tier and a one-time unlock.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
        {plans.map((plan, i) => (
          <div
            key={plan.id}
            className={`ud-card p-6 sm:p-8 ${i === plans.length - 1 ? "border-[var(--color-brand)] relative" : ""}`}
            style={i === plans.length - 1 ? { borderWidth: 2 } : {}}
          >
            {i === plans.length - 1 && (
              <span className="absolute -top-3 left-6 ud-chip ud-chip-accent">
                Recommended
              </span>
            )}
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-extrabold tracking-tight">{plan.title}</h3>
              <div className="text-right">
                <div className="text-3xl font-extrabold tabular-nums">
                  ${(plan.price_cents / 100).toFixed(2)}
                </div>
                <div className="text-[11px] text-[var(--color-muted)] font-semibold">
                  {plan.interval}
                </div>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              {plan.description}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {plan.features.map((b: string) => (
                <li key={b} className="flex gap-2">
                  <span className="text-[var(--color-success)]">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/onboarding"
              className={`ud-btn mt-7 w-full ${i === plans.length - 1 ? "ud-btn-primary" : "ud-btn-ghost"}`}
            >
              {i === plans.length - 1 ? "Start free, upgrade any time" : "Start free"}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const [items, setItems] = useState<{q: string; a: string}[]>([]);
  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => setItems(data.map((f: any) => ({ q: f.question, a: f.answer }))));
  }, []);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section
      id="faq"
      className="bg-[var(--color-surface-2)] border-y"
    >
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
            Questions, answered.
          </h2>
        </div>
        <ul className="mt-10 space-y-3">
          {items.map((it, i) => {
            const open = openIdx === i;
            return (
              <li key={it.q} className="ud-card overflow-hidden">
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-[var(--color-ink)]"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                >
                  <span>{it.q}</span>
                  <span
                    className="text-[var(--color-brand)] text-xl"
                    aria-hidden
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-5 text-sm text-[var(--color-muted)] leading-relaxed">
                    {it.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function ContactSection() {
  const [contact, setContact] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    fetch("/api/site-contacts")
      .then((r) => r.json())
      .then((data) => setContact(data))
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
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const hasContact = contact && (contact.email || contact.phone || contact.address);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-10 sm:py-16 border-t">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Contact
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Get in touch
        </h2>
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
          Have a question, feedback, or need support? Reach out to us.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-5">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
          {contact?.email && (
            <div className="ud-card p-5 text-center">
              <div className="text-2xl mb-2">✉️</div>
              <h3 className="font-bold text-[var(--color-ink)] text-sm">Email</h3>
              <a href={`mailto:${contact.email}`} className="text-sm text-[var(--color-brand)] hover:underline mt-1 block truncate">
                {contact.email}
              </a>
            </div>
          )}
          {contact?.phone && (
            <div className="ud-card p-5 text-center">
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-bold text-[var(--color-ink)] text-sm">Phone</h3>
              <a href={`tel:${contact.phone}`} className="text-sm text-[var(--color-brand)] hover:underline mt-1 block">
                {contact.phone}
              </a>
            </div>
          )}
          {contact?.address && (
            <div className="ud-card p-5 text-center">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-bold text-[var(--color-ink)] text-sm">Address</h3>
              <p className="text-sm text-[var(--color-muted)] mt-1">{contact.address}</p>
            </div>
          )}
          {contact?.whatsapp && (
            <div className="ud-card p-5 text-center">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-bold text-[var(--color-ink)] text-sm">WhatsApp</h3>
              <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-brand)] hover:underline mt-1 block">
                {contact.whatsapp}
              </a>
            </div>
          )}
        </div>

        {/* Social Links */}
        {hasContact && (
          <div className="flex flex-wrap gap-2 justify-center">
            {contact?.facebook && (
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">Facebook</a>
            )}
            {contact?.twitter && (
              <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">Twitter</a>
            )}
            {contact?.instagram && (
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">Instagram</a>
            )}
            {contact?.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">LinkedIn</a>
            )}
            {contact?.youtube && (
              <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="ud-btn ud-btn-ghost ud-btn-sm">YouTube</a>
            )}
          </div>
        )}

        {/* Contact Form */}
        <div className="ud-card p-6 w-full max-w-xl">
          <h3 className="font-bold text-[var(--color-ink)] mb-4">Send us a message</h3>
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
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function BlogSection() {
  const [blogs, setBlogs] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => setBlogs(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => {});
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24 border-y bg-[var(--color-surface-2)]">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          From the blog
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Tips, updates, and study guides.
        </h2>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs.map((b) => (
          <Link
            key={b.id}
            href={`/blog/${b.slug}`}
            className="ud-card p-5 hover:border-[var(--color-muted)] transition-colors block"
          >
            {b.image && (
              <div className="h-40 rounded-md bg-[var(--color-surface-2)] overflow-hidden mb-4">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="font-extrabold tracking-tight text-[var(--color-ink)] leading-snug">
              {b.title}
            </h3>
            {b.short_description && (
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3">
                {b.short_description}
              </p>
            )}
            <span className="mt-4 inline-block text-xs font-bold text-[var(--color-brand)]">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div
        className="ud-card p-8 sm:p-12 text-center"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand) 0%, #1a1660 100%)",
          color: "#ffffff",
        }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready to become Canadian?
        </h2>
        <p className="mt-3 text-white/85 max-w-xl mx-auto">
          Join the studiers who walk into the test calm, prepared, and
          confident. It&apos;s free to start. No card. No catch.
        </p>
        <div className="mt-7 flex justify-center gap-3 flex-wrap">
          <Link href="/onboarding" className="ud-btn ud-btn-accent">
            Start studying — it&apos;s free
          </Link>
          <Link
            href="/app"
            className="ud-btn ud-btn-ghost"
            style={{ background: "rgba(255,255,255,0.10)", color: "#fff", borderColor: "rgba(255,255,255,0.30)" }}
          >
            I already have an account
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function MarketingFooter() {
  return (
    <footer className="border-t bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/welcome" className="flex items-center gap-2">
              <Logo size={28} />
              <div className="font-extrabold tracking-tight text-[var(--color-ink)] text-[18px]">
                pass<span className="text-[var(--color-accent)]">p</span>ilot
              </div>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-muted)] max-w-xs leading-relaxed">
              The AI-powered way to prepare for the Canadian citizenship test.
              Independent. Honest pricing. No dark patterns.
            </p>
          </div>
          <FooterCol
            title="Product"
            links={[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Pricing", href: "#pricing" },
              { label: "Open the app", href: "/app" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              {
                label: "Official Discover Canada (canada.ca)",
                href: "https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/pub/discover-large.pdf",
                external: true,
              },
              {
                label: "IRCC citizenship info",
                href: "https://www.canada.ca/en/services/immigration-citizenship/citizenship.html",
                external: true,
              },
              { label: "FAQ", href: "#faq" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              {
                label: "TechPlato, Inc.",
                href: "https://techplato.com",
                external: true,
              },
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--color-muted)]">
          <p>
            © {new Date().getFullYear()} passpilot — a product by{" "}
            <a
              href="https://techplato.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ud-link"
            >
              TechPlato, Inc.
            </a>
          </p>
          <p>
            Independent study aid. Not affiliated with the Government of Canada
            or IRCC.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-brand)]"
              >
                {l.label} ↗
              </a>
            ) : l.href.startsWith("#") || l.href.startsWith("mailto:") ? (
              <a
                href={l.href}
                className="text-[var(--color-muted)] hover:text-[var(--color-brand)]"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="text-[var(--color-muted)] hover:text-[var(--color-brand)]"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
