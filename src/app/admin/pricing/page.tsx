"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { AddEditModal } from "@/components/admin/AddEditModal";
import type { FieldDef } from "@/components/admin/AddEditModal";

const FIELDS: FieldDef[] = [
  { key: "title", label: "Title", required: true },
  { key: "description", label: "Description", type: "textarea" },
  { key: "regular_price_monthly", label: "Regular Monthly Price", type: "number" },
  { key: "discount_price_monthly", label: "Discount Monthly Price", type: "number" },
  { key: "regular_price_yearly", label: "Regular Yearly Price", type: "number" },
  { key: "discount_price_yearly", label: "Discount Yearly Price", type: "number" },
  { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function AdminPricingPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/pricing/");
    const data = res.ok ? await res.json() : [];
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(values: Record<string, any>) {
    const payload = {
      ...values,
      regular_price_monthly: Number(values.regular_price_monthly) || 0,
      discount_price_monthly: Number(values.discount_price_monthly) || 0,
      regular_price_yearly: Number(values.regular_price_yearly) || 0,
      discount_price_yearly: Number(values.discount_price_yearly) || 0,
    };
    if (editItem) {
      const res = await fetch(`/api/pricing/${editItem.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setItems((prev) => prev.map((i) => (i.id === editItem.id ? { ...i, ...payload } : i)));
      }
      setEditItem(null);
    } else {
      const res = await fetch("/api/pricing/", {
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
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Pricing Plans</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-muted)]">{items.length} total</span>
          <button onClick={() => setShowAdd(true)} className="ud-btn ud-btn-primary ud-btn-sm">
            + Add Plan
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
            { key: "regular_price_monthly", label: "Monthly", render: (r) => `$${r.regular_price_monthly}` },
            { key: "discount_price_monthly", label: "Discount", render: (r) => `$${r.discount_price_monthly}` },
            { key: "features", label: "Features", render: (r) => <span>{Array.isArray(r.features) ? r.features.length : 0} items</span> },
            { key: "status", label: "Status" },
          ]}
          rows={items}
          actions={(row) => (
            <div className="flex gap-2">
              <button onClick={() => setEditItem(row)} className="text-[var(--color-brand)] hover:underline text-xs font-semibold">Edit</button>
            </div>
          )}
        />
      )}

      <AddEditModal open={showAdd || editItem !== null} title={editItem ? "Edit Pricing Plan" : "Add Pricing Plan"} fields={FIELDS} data={editItem ?? undefined} onSave={handleSave} onClose={() => { setShowAdd(false); setEditItem(null); }} />
    </div>
  );
}
