"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AddEditModal } from "@/components/admin/AddEditModal";
import type { FieldDef } from "@/components/admin/AddEditModal";

const FIELDS: FieldDef[] = [
  { key: "question", label: "Question", type: "textarea", required: true },
  { key: "answer", label: "Answer", type: "textarea", required: true },
  { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function AdminFaqsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/faqs/");
    const data = res.ok ? await res.json() : [];
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: number) {
    const res = await fetch(`/api/faqs/${id}/`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
    setDeleteId(null);
  }

  async function handleSave(values: Record<string, any>) {
    if (editItem) {
      const res = await fetch(`/api/faqs/${editItem.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setItems((prev) => prev.map((i) => (i.id === editItem.id ? { ...i, ...values } : i)));
      }
      setEditItem(null);
    } else {
      const res = await fetch("/api/faqs/", {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">FAQs</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-muted)]">{items.length} total</span>
          <button onClick={() => setShowAdd(true)} className="ud-btn ud-btn-primary ud-btn-sm">
            + Add FAQ
          </button>
        </div>
      </div>

      {loading ? (
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "question", label: "Question", render: (r) => <span className="line-clamp-2 max-w-sm">{r.question}</span> },
            { key: "status", label: "Status" },
          ]}
          rows={items}
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

      <AddEditModal
        open={showAdd || editItem !== null}
        title={editItem ? "Edit FAQ" : "Add FAQ"}
        fields={FIELDS}
        data={editItem ?? undefined}
        onSave={handleSave}
        onClose={() => { setShowAdd(false); setEditItem(null); }}
      />

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ? This cannot be undone."
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
