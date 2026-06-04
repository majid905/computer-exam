"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/users/");
    const data = res.ok ? await res.json() : [];
    setUsers(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: number) {
    const res = await fetch(`/api/users/${id}/`, { method: "DELETE" });
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
    setDeleteId(null);
  }

  async function handleToggleRole(id: number, currentRole: string) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const res = await fetch(`/api/users/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    }
  }

  async function handleToggleStatus(id: number, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const res = await fetch(`/api/users/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Users</h1>
        <span className="text-sm text-[var(--color-muted)]">{users.length} total</span>
      </div>

      {loading ? (
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "full_name", label: "Name", render: (r) => r.full_name || r.user_name || "—" },
            { key: "email", label: "Email" },
            {
              key: "role",
              label: "Role",
              render: (r) => (
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${r.role === "admin" ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]" : "bg-[var(--color-surface-2)] text-[var(--color-muted)]"}`}>
                  {r.role}
                </span>
              ),
            },
            { key: "status", label: "Status" },
          ]}
          rows={users}
          actions={(row) => (
            <div className="flex gap-2">
              <button onClick={() => handleToggleRole(row.id, row.role)} className="text-[var(--color-brand)] hover:underline text-xs font-semibold">
                {row.role === "admin" ? "Demote" : "Make Admin"}
              </button>
              <button onClick={() => handleToggleStatus(row.id, row.status)} className="text-[var(--color-accent)] hover:underline text-xs font-semibold">
                {row.status === "active" ? "Deactivate" : "Activate"}
              </button>
              <button onClick={() => setDeleteId(row.id)} className="text-[var(--color-danger)] hover:underline text-xs font-semibold">
                Delete
              </button>
            </div>
          )}
        />
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete User"
        message="Are you sure you want to delete this user? This cannot be undone."
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
