"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

const DIFFICULTIES = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const STATUSES = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function AdminPracticeQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [chapters, setChapters] = useState<{value: string; label: string}[]>([]);
  const [filterChapterId, setFilterChapterId] = useState<string>("");

  const [form, setForm] = useState({
    chapter_id: "",
    question: "",
    difficulty: "easy",
    status: "active",
    explanation: "",
    options: [
      { text: "", is_correct: false },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
    ],
  });

  async function load() {
    setLoading(true);
    try {
      const [qRes, chRes] = await Promise.all([
        fetch("/api/practice-questions/"),
        fetch("/api/chapters/"),
      ]);
      const data = qRes.ok ? await qRes.json() : [];
      setQuestions(Array.isArray(data) ? data : []);
      const chData = chRes.ok ? await chRes.json() : [];
      setChapters(chData.map((c: any) => ({ value: String(c.id), label: c.title })));
    } catch (e) {
      console.error("Failed to load practice questions", e);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (editItem) {
      const opts = Array.isArray(editItem.options) ? editItem.options : [];
      const mapped = opts.map((o: any) => ({
        text: o.option_text ?? "",
        is_correct: o.is_correct === 1,
      }));
      while (mapped.length < 4) mapped.push({ text: "", is_correct: false });
      setForm({
        chapter_id: String(editItem.chapter_id ?? ""),
        question: editItem.question ?? "",
        difficulty: editItem.difficulty ?? "easy",
        status: editItem.status ?? "active",
        explanation: editItem.explanation ?? "",
        options: mapped.slice(0, 4),
      });
    } else if (showAdd) {
      setForm({
        chapter_id: "",
        question: "",
        difficulty: "easy",
        status: "active",
        explanation: "",
        options: [
          { text: "", is_correct: false },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ],
      });
    }
  }, [editItem, showAdd]);

  async function handleDelete(id: number) {
    const res = await fetch(`/api/practice-questions/${id}/`, { method: "DELETE" });
    if (res.ok) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Failed to delete practice question");
    }
    setDeleteId(null);
  }

  function updateOption(index: number, text: string) {
    setForm((prev) => {
      const next = [...prev.options];
      next[index] = { ...next[index], text };
      return { ...prev, options: next };
    });
  }

  function toggleCorrect(index: number) {
    setForm((prev) => {
      const next = prev.options.map((o, i) => ({ ...o, is_correct: i === index }));
      return { ...prev, options: next };
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const chapterId = form.chapter_id ? Number(form.chapter_id) : undefined;
    if (!chapterId) {
      alert("Chapter is required");
      return;
    }
    if (!form.question.trim()) {
      alert("Question text is required");
      return;
    }
    const validOptions = form.options.filter((o) => o.text.trim());
    if (validOptions.length < 2) {
      alert("At least 2 options are required");
      return;
    }
    if (!validOptions.some((o) => o.is_correct)) {
      alert("Please mark one option as correct");
      return;
    }

    const payload = {
      chapter_id: chapterId,
      question: form.question.trim(),
      difficulty: form.difficulty,
      status: form.status,
      explanation: form.explanation.trim(),
      options: validOptions,
    };

    if (editItem) {
      const res = await fetch(`/api/practice-questions/${editItem.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await load();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to update practice question");
      }
      setEditItem(null);
    } else {
      const res = await fetch("/api/practice-questions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await load();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to create practice question");
      }
      setShowAdd(false);
    }
  }

  const modalOpen = showAdd || editItem !== null;
  const filtered = filterChapterId
    ? questions.filter((q) => String(q.chapter_id) === filterChapterId)
    : questions;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Practice Questions</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-muted)]">{filtered.length} total</span>
          <button onClick={() => setShowAdd(true)} className="ud-btn ud-btn-primary ud-btn-sm">
            + Add Practice Question
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 ud-card p-4">
        <span className="text-sm font-bold text-[var(--color-ink)]">Filter by chapter:</span>
        <select
          value={filterChapterId}
          onChange={(e) => setFilterChapterId(e.target.value)}
          className="rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
        >
          <option value="">All chapters</option>
          {chapters.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "question", label: "Question", render: (r) => <span className="line-clamp-2 max-w-xs">{r.question}</span> },
            { key: "difficulty", label: "Difficulty" },
            { key: "status", label: "Status" },
            { key: "options", label: "Options", render: (r) => <span>{Array.isArray(r.options) ? r.options.length : 0}</span> },
            { key: "source_question_id", label: "Source", render: (r) => <span>{r.source_question_id ? `Q#${r.source_question_id}` : "Direct"}</span> },
          ]}
          rows={filtered}
          actions={(row) => (
            <div className="flex gap-2">
              <button onClick={() => setEditItem(row)} className="text-[var(--color-brand)] hover:underline text-xs font-semibold">
                Edit
              </button>
              <button onClick={() => setDeleteId(row.id)} className="text-[var(--color-danger)] hover:underline text-xs font-semibold">
                Delete
              </button>
            </div>
          )}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl ud-card p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[var(--color-ink)]">
              {editItem ? "Edit Practice Question" : "Add Practice Question"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                  Chapter <span className="text-[var(--color-danger)]">*</span>
                </label>
                <select
                  value={form.chapter_id}
                  onChange={(e) => setForm((f) => ({ ...f, chapter_id: e.target.value }))}
                  required
                  className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                >
                  <option value="">Select...</option>
                  {chapters.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                  Question <span className="text-[var(--color-danger)]">*</span>
                </label>
                <RichTextEditor
                  value={form.question}
                  onChange={(html) => setForm((f) => ({ ...f, question: html }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                    Difficulty
                  </label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
                    className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                  Explanation
                </label>
                <RichTextEditor
                  value={form.explanation}
                  onChange={(html) => setForm((f) => ({ ...f, explanation: html }))}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
                  Options <span className="text-[var(--color-danger)]">*</span> (mark one correct)
                </label>
                <div className="space-y-2">
                  {form.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correct_option"
                        checked={opt.is_correct}
                        onChange={() => toggleCorrect(i)}
                        className="shrink-0"
                        title="Mark as correct"
                      />
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => updateOption(i, e.target.value)}
                        placeholder={`Option ${i + 1}`}
                        className="flex-1 rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAdd(false); setEditItem(null); }}
                  className="ud-btn ud-btn-ghost ud-btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="ud-btn ud-btn-primary ud-btn-sm">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Practice Question"
        message="Are you sure you want to delete this practice question?"
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
