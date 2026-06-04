"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AddEditModal } from "@/components/admin/AddEditModal";
import type { FieldDef } from "@/components/admin/AddEditModal";

const FIELDS: FieldDef[] = [
  { key: "user_id", label: "User ID", type: "number", required: true },
  { key: "title", label: "Title", type: "text", required: true },
  { key: "message", label: "Message", type: "textarea", required: true },
];

export default function AdminNotificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  async function load() {
    setLoading(true);
    const [notifRes, usersRes] = await Promise.all([
      fetch("/api/notifications/?all=1"),
      fetch("/api/users/"),
    ]);
    const notifData = notifRes.ok ? await notifRes.json() : [];
    const usersData = usersRes.ok ? await usersRes.json() : [];
    setItems(Array.isArray(notifData) ? notifData : []);
    setUsers(Array.isArray(usersData) ? usersData : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: number) {
    const res = await fetch(`/api/notifications/${id}/`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
    setDeleteId(null);
  }

  async function handleSave(values: Record<string, any>) {
    if (editItem) {
      const res = await fetch(`/api/notifications/${editItem.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setItems((prev) => prev.map((i) => (i.id === editItem.id ? { ...i, ...values } : i)));
      }
      setEditItem(null);
    } else {
      const res = await fetch("/api/notifications/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, is_read: 0 }),
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
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Notifications</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-muted)]">{items.length} total</span>
          <button onClick={() => setShowAdd(true)} className="ud-btn ud-btn-primary ud-btn-sm">
            + Send Notification
          </button>
        </div>
      </div>

      {!loading && users.length > 0 && (
        <div className="ud-card p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">Users (ID → Name)</p>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--color-ink)]">
            {users.slice(0, 20).map((u) => (
              <span key={u.id} className="ud-chip ud-chip-muted">{u.id}: {u.full_name || u.email}</span>
            ))}
            {users.length > 20 && <span className="ud-chip ud-chip-muted">+{users.length - 20} more</span>}
          </div>
        </div>
      )}

      {loading ? (
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "user_name", label: "User", render: (r) => (
              <span className="text-xs">{r.user_name || r.user_email || `ID: ${r.user_id}`}</span>
            )},
            { key: "title", label: "Title", render: (r) => <span className="line-clamp-1 max-w-xs font-semibold">{r.title}</span> },
            { key: "message", label: "Message", render: (r) => <span className="line-clamp-1 max-w-xs text-[var(--color-muted)]">{r.message}</span> },
            { key: "is_read", label: "Read", render: (r) => (
              <span className={`ud-chip ${r.is_read ? "ud-chip-muted" : "ud-chip-warning"} text-xs`}>
                {r.is_read ? "Read" : "Unread"}
              </span>
            )},
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
        title={editItem ? "Edit Notification" : "Send Notification"}
        fields={FIELDS}
        data={editItem ?? undefined}
        onSave={handleSave}
        onClose={() => { setShowAdd(false); setEditItem(null); }}
      />

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Notification"
        message="Are you sure you want to delete this notification? This cannot be undone."
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
