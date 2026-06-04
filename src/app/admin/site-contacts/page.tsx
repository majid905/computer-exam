"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export default function AdminSiteContactsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    email: "",
    phone: "",
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    whatsapp: "",
    status: "active",
  });

  async function load() {
    setLoading(true);
    const res = await fetch("/api/site-contacts/list/");
    const data = res.ok ? await res.json() : [];
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (editItem) {
      setForm({
        email: editItem.email ?? "",
        phone: editItem.phone ?? "",
        address: editItem.address ?? "",
        facebook: editItem.facebook ?? "",
        twitter: editItem.twitter ?? "",
        instagram: editItem.instagram ?? "",
        linkedin: editItem.linkedin ?? "",
        youtube: editItem.youtube ?? "",
        whatsapp: editItem.whatsapp ?? "",
        status: editItem.status ?? "active",
      });
    } else if (showAdd) {
      setForm({
        email: "",
        phone: "",
        address: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: "",
        whatsapp: "",
        status: "active",
      });
    }
  }, [editItem, showAdd]);

  async function handleDelete(id: number) {
    const res = await fetch(`/api/site-contacts/${id}/`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
    setDeleteId(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form };
    if (editItem) {
      const res = await fetch(`/api/site-contacts/${editItem.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await load();
      }
      setEditItem(null);
    } else {
      const res = await fetch("/api/site-contacts/", {
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

  const modalOpen = showAdd || editItem !== null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Site Contacts</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-muted)]">{items.length} total</span>
          <button onClick={() => setShowAdd(true)} className="ud-btn ud-btn-primary ud-btn-sm">
            + Add Contact
          </button>
        </div>
      </div>

      {loading ? (
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "address", label: "Address", render: (r) => <span className="line-clamp-1 max-w-xs">{r.address}</span> },
            { key: "status", label: "Status" },
          ]}
          rows={items}
          actions={(row) => (
            <div className="flex gap-2">
              <button onClick={() => setEditItem(row)} className="text-[var(--color-brand)] hover:underline text-xs font-semibold">Edit</button>
              <button onClick={() => setDeleteId(row.id)} className="text-[var(--color-danger)] hover:underline text-xs font-semibold">Delete</button>
            </div>
          )}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg ud-card p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[var(--color-ink)]">{editItem ? "Edit Contact" : "Add Contact"}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              {[
                { key: "email", label: "Email", type: "email" },
                { key: "phone", label: "Phone" },
                { key: "address", label: "Address" },
                { key: "facebook", label: "Facebook URL" },
                { key: "twitter", label: "Twitter URL" },
                { key: "instagram", label: "Instagram URL" },
                { key: "linkedin", label: "LinkedIn URL" },
                { key: "youtube", label: "YouTube URL" },
                { key: "whatsapp", label: "WhatsApp Number" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    value={(form as any)[field.key]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => { setShowAdd(false); setEditItem(null); }} className="ud-btn ud-btn-ghost ud-btn-sm">Cancel</button>
                <button type="submit" className="ud-btn ud-btn-primary ud-btn-sm">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Contact"
        message="Are you sure you want to delete this contact entry?"
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
