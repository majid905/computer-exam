"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AddEditModal } from "@/components/admin/AddEditModal";
import type { FieldDef } from "@/components/admin/AddEditModal";

const FIELDS: FieldDef[] = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug", required: true },
  { key: "category_id", label: "Category", type: "select", options: [], required: true },
  { key: "short_description", label: "Short Description", type: "textarea" },
  { key: "body", label: "Body (JSON summary)", type: "textarea" },
  { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function AdminChaptersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [categories, setCategories] = useState<{value: string; label: string}[]>([]);
  const [importingSlug, setImportingSlug] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const [chRes, catRes] = await Promise.all([
        fetch("/api/chapters/"),
        fetch("/api/categories/"),
      ]);
      const data = chRes.ok ? await chRes.json() : [];
      setItems(Array.isArray(data) ? data : []);
      const catData = catRes.ok ? await catRes.json() : [];
      setCategories(catData.map((c: any) => ({ value: String(c.id), label: c.name })));
    } catch (e) {
      console.error("Failed to load chapters", e);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: number) {
    const row = items.find((i) => i.id === id);
    if (!row) return;
    const res = await fetch(`/api/chapters/${row.slug}/`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Failed to delete chapter");
    }
    setDeleteId(null);
  }

  async function handleImport(slug: string) {
    if (!slug) return;
    setImportingSlug(slug);
    try {
      const res = await fetch("/api/admin/import-chapter/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        alert(`Import completed: ${data.questionsImported ?? 0} questions imported. ${data.bodyUpdated ? "Summary updated." : ""}`);
        await load();
      } else {
        alert(data.error || "Import failed");
      }
    } catch (e) {
      alert("Import request failed");
    }
    setImportingSlug(null);
  }

  async function handleSave(values: Record<string, any>) {
    const categoryId = values.category_id ? Number(values.category_id) : undefined;
    if (!categoryId) {
      alert("Category is required");
      return;
    }
    const payload: Record<string, any> = { ...values, category_id: categoryId };
    if (editItem) {
      const res = await fetch(`/api/chapters/${editItem.slug}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await load();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to update chapter");
      }
      setEditItem(null);
    } else {
      const res = await fetch("/api/chapters/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await load();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to create chapter");
      }
      setShowAdd(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Chapters</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-muted)]">{items.length} total</span>
          <button onClick={() => setShowAdd(true)} className="ud-btn ud-btn-primary ud-btn-sm">
            + Add Chapter
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
            { key: "slug", label: "Slug" },
            { key: "status", label: "Status" },
          ]}
          rows={items}
          actions={(row) => (
            <div className="flex gap-2">
              <button onClick={() => setEditItem(row)} className="text-[var(--color-brand)] hover:underline text-xs font-semibold">
                Edit
              </button>
              <button
                onClick={() => handleImport(row.slug)}
                className="text-[var(--color-ink-2)] hover:underline text-xs font-semibold"
                title="Import static summary & questions"
              >
                Import
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
        title={editItem ? "Edit Chapter" : "Add Chapter"}
        fields={FIELDS.map((f) => f.key === "category_id" ? { ...f, options: categories } : f)}
        data={editItem ?? undefined}
        onSave={handleSave}
        onClose={() => { setShowAdd(false); setEditItem(null); }}
      />

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Chapter"
        message="Are you sure you want to delete this chapter? This cannot be undone."
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
