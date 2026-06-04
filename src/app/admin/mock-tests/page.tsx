"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AddEditModal } from "@/components/admin/AddEditModal";
import type { FieldDef } from "@/components/admin/AddEditModal";

const FIELDS: FieldDef[] = [
  { key: "title", label: "Title", required: true },
  { key: "description", label: "Description", type: "textarea" },
  { key: "time_limit", label: "Time Limit (minutes)", type: "number" },
  { key: "total_marks", label: "Total Marks", type: "number" },
  { key: "pass_marks", label: "Pass Marks", type: "number" },
  { key: "total_questions", label: "Total Questions", type: "number" },
  { key: "question_selection_mode", label: "Question Selection", type: "select", options: [{ value: "random", label: "Random" }, { value: "manual", label: "Manual" }] },
  { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function AdminMockTestsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // Question assignment modal state
  const [assignMockId, setAssignMockId] = useState<number | null>(null);
  const [assignTotalQuestions, setAssignTotalQuestions] = useState<number>(20);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [assignedQuestionIds, setAssignedQuestionIds] = useState<Set<number>>(new Set());
  const [savingAssign, setSavingAssign] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/mock-tests/");
    const data = res.ok ? await res.json() : [];
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function openAssign(mockId: number, totalQuestions: number) {
    setAssignMockId(mockId);
    setAssignTotalQuestions(totalQuestions || 20);
    const [qRes, assignedRes] = await Promise.all([
      fetch("/api/questions/"),
      fetch(`/api/mock-tests/${mockId}/questions`),
    ]);
    const qData = qRes.ok ? await qRes.json() : [];
    const aData = assignedRes.ok ? await assignedRes.json() : [];
    setAllQuestions(Array.isArray(qData) ? qData : []);
    setAssignedQuestionIds(new Set(aData.map((a: any) => a.question_id)));
  }

  async function saveAssign() {
    if (!assignMockId) return;
    setSavingAssign(true);
    const res = await fetch(`/api/mock-tests/${assignMockId}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question_ids: Array.from(assignedQuestionIds) }),
    });
    if (res.ok) {
      setAssignMockId(null);
    }
    setSavingAssign(false);
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/mock-tests/${id}/`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
    setDeleteId(null);
  }

  async function handleSave(values: Record<string, any>) {
    const payload = { ...values, time_limit: Number(values.time_limit) || 0, total_marks: Number(values.total_marks) || 0, pass_marks: Number(values.pass_marks) || 0, total_questions: Number(values.total_questions) || 20 };
    if (editItem) {
      const res = await fetch(`/api/mock-tests/${editItem.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setItems((prev) => prev.map((i) => (i.id === editItem.id ? { ...i, ...payload } : i)));
      }
      setEditItem(null);
    } else {
      const res = await fetch("/api/mock-tests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await load();
      }
      setShowAdd(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Mock Tests</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-muted)]">{items.length} total</span>
          <button onClick={() => setShowAdd(true)} className="ud-btn ud-btn-primary ud-btn-sm">
            + Add Mock Test
          </button>
        </div>
      </div>

      {loading ? (
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "title", label: "Title" },
            { key: "time_limit", label: "Time (min)" },
            { key: "total_marks", label: "Marks" },
            { key: "pass_marks", label: "Pass" },
            { key: "total_questions", label: "Questions" },
            { key: "question_selection_mode", label: "Mode" },
            { key: "status", label: "Status" },
          ]}
          rows={items}
          actions={(row) => (
            <div className="flex gap-2">
              <button onClick={() => openAssign(row.id, row.total_questions)} className="text-[var(--color-success)] hover:underline text-xs font-semibold">
                Questions
              </button>
              <button onClick={() => setEditItem(row)} className="text-[var(--color-brand)] hover:underline text-xs font-semibold">Edit</button>
              <button onClick={() => setDeleteId(row.id)} className="text-[var(--color-danger)] hover:underline text-xs font-semibold">Delete</button>
            </div>
          )}
        />
      )}

      <AddEditModal open={showAdd || editItem !== null} title={editItem ? "Edit Mock Test" : "Add Mock Test"} fields={FIELDS} data={editItem ?? undefined} onSave={handleSave} onClose={() => { setShowAdd(false); setEditItem(null); }} />
      <ConfirmDialog open={deleteId !== null} title="Delete Mock Test" message="Are you sure?" onConfirm={() => deleteId && handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />

      {/* Question Assignment Modal */}
      {assignMockId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl ud-card p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--color-ink)]">Assign Questions</h3>
              <button onClick={() => setAssignMockId(null)} className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">✕</button>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              Select questions for this mock test. Selected: {assignedQuestionIds.size} / {assignTotalQuestions}
              {assignedQuestionIds.size > assignTotalQuestions && (
                <span className="text-[var(--color-danger)] ml-2 font-bold">Limit exceeded!</span>
              )}
            </p>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto border rounded-md p-2">
              {allQuestions.length === 0 ? (
                <p className="text-sm text-[var(--color-muted)] p-2">No questions found.</p>
              ) : (
                allQuestions.map((q) => (
                  <label key={q.id} className="flex items-start gap-2 p-2 rounded-md hover:bg-[var(--color-surface-2)] cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={assignedQuestionIds.has(q.id)}
                      disabled={!assignedQuestionIds.has(q.id) && assignedQuestionIds.size >= assignTotalQuestions}
                      onChange={(e) => {
                        setAssignedQuestionIds((prev) => {
                          const next = new Set(prev);
                          if (e.target.checked) {
                            if (next.size >= assignTotalQuestions) return prev;
                            next.add(q.id);
                          } else {
                            next.delete(q.id);
                          }
                          return next;
                        });
                      }}
                    />
                    <div className="text-sm">
                      <p className="text-[var(--color-ink)] font-medium line-clamp-2">{q.question}</p>
                      <p className="text-[var(--color-muted)] text-xs">{q.difficulty} · {Array.isArray(q.options) ? q.options.length : 0} options</p>
                    </div>
                  </label>
                ))
              )}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setAssignMockId(null)} className="ud-btn ud-btn-ghost ud-btn-sm">Cancel</button>
              <button onClick={saveAssign} disabled={savingAssign || assignedQuestionIds.size === 0 || assignedQuestionIds.size > assignTotalQuestions} className="ud-btn ud-btn-primary ud-btn-sm">
                {savingAssign ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
