"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";

export default function AdminContactMessagesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [saving, setSaving] = useState(false);

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

  async function sendReply(id: number) {
    if (!replyText.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/contact-messages/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: replyText.trim() }),
    });
    if (res.ok) {
      setReplyingId(null);
      setReplyText("");
      await load();
    }
    setSaving(false);
  }

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
              key: "status",
              label: "Status",
              render: (r) => (
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${
                  r.status === "replied"
                    ? "bg-[var(--color-success-soft)] text-[var(--color-success)]"
                    : "bg-[var(--color-warning-soft)] text-[var(--color-warning)]"
                }`}>
                  {r.status}
                </span>
              ),
            },
            {
              key: "created_at",
              label: "Date",
              render: (r) => new Date(r.created_at).toLocaleDateString(),
            },
          ]}
          rows={items}
          actions={(row) => (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setReplyingId(row.id);
                  setReplyText(row.reply || "");
                }}
                className="text-[var(--color-brand)] hover:underline text-xs font-semibold"
              >
                {row.status === "replied" ? "View / Edit Reply" : "Reply"}
              </button>
            </div>
          )}
        />
      )}

      {replyingId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg ud-card p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[var(--color-ink)]">
              Reply to Message
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>From:</strong> {items.find((i) => i.id === replyingId)?.name} ({items.find((i) => i.id === replyingId)?.email})
              </p>
              <p className="text-sm text-[var(--color-ink)] bg-[var(--color-surface-2)] p-3 rounded-md">
                {items.find((i) => i.id === replyingId)?.message}
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Your Reply
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={5}
                className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                placeholder="Type your reply here..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => { setReplyingId(null); setReplyText(""); }}
                className="ud-btn ud-btn-ghost ud-btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => sendReply(replyingId)}
                disabled={saving || !replyText.trim()}
                className="ud-btn ud-btn-primary ud-btn-sm"
              >
                {saving ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
