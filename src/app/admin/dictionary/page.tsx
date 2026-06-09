"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

const ACCESS_COLORS: Record<string, string> = {
  free:  "bg-green-100 text-green-800",
  login: "bg-blue-100 text-blue-800",
  pro:   "bg-purple-100 text-purple-800",
};

type Term = {
  id: number;
  title: string;
  slug: string;
  short_definition: string;
  full_description: string | null;
  ai_explanation: string | null;
  related_terms: string | null;
  quiz_question: string | null;
  quiz_options: string | null;
  quiz_answer: number | null;
  seo_title: string | null;
  seo_description: string | null;
  access_level: "free" | "login" | "pro";
  status: string;
};

const BLANK: Partial<Term> = {
  title: "",
  slug: "",
  short_definition: "",
  full_description: "",
  ai_explanation: "",
  related_terms: "",
  quiz_question: "",
  quiz_options: "",
  quiz_answer: 0,
  seo_title: "",
  seo_description: "",
  access_level: "pro",
  status: "active",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function TermModal({
  open,
  term,
  onSave,
  onClose,
}: {
  open: boolean;
  term: Partial<Term> | null;
  onSave: (values: Partial<Term>) => Promise<void>;
  onClose: () => void;
}) {
  const isEdit = !!term?.id;
  const [form, setForm] = useState<Partial<Term>>(BLANK);
  const [quizOpts, setQuizOpts] = useState<string[]>(["", "", "", ""]);
  const [quizCorrect, setQuizCorrect] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      const base = term ? { ...BLANK, ...term } : { ...BLANK };
      setForm(base);
      setError("");
      setSaving(false);
      // Parse quiz_options JSON into individual fields
      try {
        const parsed = JSON.parse(base.quiz_options ?? "[]");
        const opts = Array.isArray(parsed) ? parsed.map(String) : [];
        while (opts.length < 4) opts.push("");
        setQuizOpts(opts.slice(0, 4));
      } catch {
        setQuizOpts(["", "", "", ""]);
      }
      setQuizCorrect(typeof base.quiz_answer === "number" ? base.quiz_answer : 0);
    }
  }, [open, term]);

  function set(key: keyof Term, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.slug || !form.short_definition) {
      setError("Title, slug, and short definition are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const filledOpts = quizOpts.filter((o) => o.trim());
      const payload: Partial<Term> = {
        ...form,
        quiz_options: filledOpts.length > 0 ? JSON.stringify(quizOpts) : null,
        quiz_answer: filledOpts.length > 0 ? quizCorrect : null,
      };
      await onSave(payload);
    } catch {
      setError("Failed to save. Please try again.");
    }
    setSaving(false);
  }

  if (!open) return null;

  const inputCls =
    "w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]";
  const labelCls =
    "block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl ud-card p-6 max-h-[90vh] overflow-y-auto space-y-4">
        <h3 className="text-lg font-bold text-[var(--color-ink)]">
          {isEdit ? `Edit: ${term?.title}` : "Add Dictionary Term"}
        </h3>

        {error && (
          <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row: Title + Slug */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Title <span className="text-red-500">*</span></label>
              <input
                className={inputCls}
                value={form.title ?? ""}
                onChange={(e) => {
                  set("title", e.target.value);
                  if (!isEdit) set("slug", slugify(e.target.value));
                }}
                required
              />
            </div>
            <div>
              <label className={labelCls}>Slug <span className="text-red-500">*</span></label>
              <input
                className={inputCls}
                value={form.slug ?? ""}
                onChange={(e) => set("slug", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Short Definition */}
          <div>
            <label className={labelCls}>Short Definition <span className="text-red-500">*</span></label>
            <textarea
              className={inputCls}
              rows={2}
              value={form.short_definition ?? ""}
              onChange={(e) => set("short_definition", e.target.value)}
              required
            />
          </div>

          {/* Full Description */}
          <div>
            <label className={labelCls}>Full Description</label>
            <textarea
              className={inputCls}
              rows={4}
              value={form.full_description ?? ""}
              onChange={(e) => set("full_description", e.target.value)}
            />
          </div>

          {/* AI Explanation */}
          <div>
            <label className={labelCls}>Plain-English / AI Explanation</label>
            <textarea
              className={inputCls}
              rows={3}
              value={form.ai_explanation ?? ""}
              onChange={(e) => set("ai_explanation", e.target.value)}
            />
          </div>

          {/* Related Terms (JSON) */}
          <div>
            <label className={labelCls}>
              Related Terms{" "}
              <span className="text-xs normal-case font-normal">
                (JSON: [{`{"title":"...","slug":"..."}`}, ...])
              </span>
            </label>
            <textarea
              className={inputCls}
              rows={2}
              value={form.related_terms ?? ""}
              onChange={(e) => set("related_terms", e.target.value)}
              placeholder='[{"title":"Example","slug":"example"}]'
            />
          </div>

          {/* Quiz */}
          <div className="rounded-lg border border-[var(--color-border)] p-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Quiz (optional)</p>
            <div>
              <label className={labelCls}>Question</label>
              <textarea
                className={inputCls}
                rows={2}
                value={form.quiz_question ?? ""}
                onChange={(e) => set("quiz_question", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>
                Options <span className="text-xs normal-case font-normal text-[var(--color-muted)]">— select the correct answer</span>
              </label>
              <div className="space-y-2 mt-1">
                {quizOpts.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="quiz_correct"
                      checked={quizCorrect === i}
                      onChange={() => setQuizCorrect(i)}
                      className="shrink-0"
                      title="Mark as correct answer"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const next = [...quizOpts];
                        next[i] = e.target.value;
                        setQuizOpts(next);
                      }}
                      placeholder={`Option ${i + 1}`}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-[var(--color-muted)]">
                Click the radio button on the left to mark the correct answer.
              </p>
            </div>
          </div>

          {/* SEO */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>SEO Title</label>
              <input
                className={inputCls}
                value={form.seo_title ?? ""}
                onChange={(e) => set("seo_title", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>SEO Description</label>
              <input
                className={inputCls}
                value={form.seo_description ?? ""}
                onChange={(e) => set("seo_description", e.target.value)}
              />
            </div>
          </div>

          {/* Access Level + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Access Level</label>
              <select
                className={inputCls}
                value={form.access_level ?? "pro"}
                onChange={(e) => set("access_level", e.target.value)}
              >
                <option value="free">Free (anyone)</option>
                <option value="login">Login (free account)</option>
                <option value="pro">Pro (paid subscription)</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select
                className={inputCls}
                value={form.status ?? "active"}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="ud-btn ud-btn-ghost ud-btn-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="ud-btn ud-btn-primary ud-btn-sm">
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Term"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDictionaryPage() {
  const [items, setItems] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterAccess, setFilterAccess] = useState("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editTerm, setEditTerm] = useState<Term | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/dictionary/");
    const data = res.ok ? await res.json() : [];
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(values: Partial<Term>) {
    if (editTerm) {
      const res = await fetch(`/api/admin/dictionary/${editTerm.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === editTerm.id ? { ...i, ...values } : i)),
        );
      }
      setEditTerm(null);
    } else {
      const res = await fetch("/api/admin/dictionary/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        await load();
      }
      setShowAdd(false);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/admin/dictionary/${id}/`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteId(null);
  }

  async function handleEditClick(id: number) {
    const res = await fetch(`/api/admin/dictionary/${id}/`);
    if (res.ok) {
      const data = await res.json();
      setEditTerm(data);
    }
  }

  const filtered = items.filter((t) => {
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase());
    const matchAccess = filterAccess === "all" || t.access_level === filterAccess;
    return matchSearch && matchAccess;
  });

  const counts = {
    free:  items.filter((t) => t.access_level === "free").length,
    login: items.filter((t) => t.access_level === "login").length,
    pro:   items.filter((t) => t.access_level === "pro").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Dictionary Terms</h1>
          <div className="flex gap-3 mt-1 text-sm text-[var(--color-muted)]">
            <span>
              <span className="font-semibold text-green-700">{counts.free}</span> free
            </span>
            <span>
              <span className="font-semibold text-blue-700">{counts.login}</span> login
            </span>
            <span>
              <span className="font-semibold text-purple-700">{counts.pro}</span> pro
            </span>
            <span>
              <span className="font-semibold text-[var(--color-ink)]">{items.length}</span> total
            </span>
          </div>
        </div>
        <button onClick={() => setShowAdd(true)} className="ud-btn ud-btn-primary ud-btn-sm">
          + Add Term
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search title or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)] w-64"
        />
        <select
          value={filterAccess}
          onChange={(e) => setFilterAccess(e.target.value)}
          className="rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
        >
          <option value="all">All access levels</option>
          <option value="free">Free</option>
          <option value="login">Login</option>
          <option value="pro">Pro</option>
        </select>
      </div>

      {loading ? (
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: "id", label: "ID" },
            {
              key: "title",
              label: "Term",
              render: (row) => (
                <div>
                  <p className="font-medium text-[var(--color-ink)]">{row.title}</p>
                  <p className="text-xs text-[var(--color-muted)]">{row.slug}</p>
                </div>
              ),
            },
            {
              key: "short_definition",
              label: "Definition",
              render: (row) => (
                <span className="line-clamp-2 max-w-xs text-sm">{row.short_definition}</span>
              ),
            },
            {
              key: "access_level",
              label: "Access",
              render: (row) => (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${ACCESS_COLORS[row.access_level] ?? ""}`}
                >
                  {row.access_level}
                </span>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <span
                  className={`text-xs font-semibold ${row.status === "active" ? "text-green-700" : "text-[var(--color-muted)]"}`}
                >
                  {row.status}
                </span>
              ),
            },
          ]}
          rows={filtered}
          actions={(row) => (
            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(row.id)}
                className="text-[var(--color-brand)] hover:underline text-xs font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteId(row.id)}
                className="text-[var(--color-danger)] hover:underline text-xs font-semibold"
              >
                Delete
              </button>
            </div>
          )}
        />
      )}

      <TermModal
        open={showAdd || editTerm !== null}
        term={editTerm}
        onSave={handleSave}
        onClose={() => {
          setShowAdd(false);
          setEditTerm(null);
        }}
      />

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Term"
        message="Are you sure you want to delete this dictionary term? This cannot be undone."
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
