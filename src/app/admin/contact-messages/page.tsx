"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";

export default function AdminContactMessagesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/contact-messages/");
    const data = res.ok ? await res.json() : [];
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Contact Messages</h1>
        <span className="text-sm text-[var(--color-muted)]">{items.length} total</span>
      </div>

      {loading ? (
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "subject", label: "Subject" },
            {
              key: "message",
              label: "Message",
              render: (r) => <span className="line-clamp-2 max-w-xs">{r.message}</span>,
            },
            {
              key: "created_at",
              label: "Date",
              render: (r) => new Date(r.created_at).toLocaleDateString(),
            },
          ]}
          rows={items}
        />
      )}
    </div>
  );
}
