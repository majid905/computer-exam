"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { AddEditModal } from "@/components/admin/AddEditModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import type { FieldDef } from "@/components/admin/AddEditModal";

const FIELDS: FieldDef[] = [
  { key: "title", label: "Title", required: true },
  { key: "description", label: "Description", type: "richtext" },
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
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [featurePlanId, setFeaturePlanId] = useState<number | null>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [featuresLoading, setFeaturesLoading] = useState(false);

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

  async function handleDelete(id: number) {
    const res = await fetch(`/api/pricing/${id}/`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Failed to delete pricing plan");
    }
    setDeleteId(null);
  }

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

  async function loadFeatures(planId: number) {
    setFeaturesLoading(true);
    const res = await fetch(`/api/pricing/${planId}/features/`);
    const data = res.ok ? await res.json() : [];
    setFeatures(Array.isArray(data) ? data : []);
    setFeaturesLoading(false);
  }

  async function addFeature() {
    if (!featurePlanId || !newFeature.trim()) return;
    const res = await fetch(`/api/pricing/${featurePlanId}/features/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feature: newFeature.trim() }),
    });
    if (res.ok) {
      setNewFeature("");
      await loadFeatures(featurePlanId);
      await load();
    }
  }

  async function removeFeature(featureId: number) {
    if (!featurePlanId) return;
    const res = await fetch(`/api/pricing/${featurePlanId}/features/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feature_id: featureId }),
    });
    if (res.ok) {
      await loadFeatures(featurePlanId);
      await load();
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
              <button onClick={() => { setFeaturePlanId(row.id); loadFeatures(row.id); }} className="text-[var(--color-accent)] hover:underline text-xs font-semibold">Features</button>
              <button onClick={() => setDeleteId(row.id)} className="text-[var(--color-danger)] hover:underline text-xs font-semibold">Delete</button>
            </div>
          )}
        />
      )}

      {featurePlanId !== null && (
        <div className="ud-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--color-ink)]">
              Manage Features — {items.find((i) => i.id === featurePlanId)?.title}
            </h2>
            <button onClick={() => { setFeaturePlanId(null); setFeatures([]); }} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">
              Close
            </button>
          </div>

          {featuresLoading ? (
            <div className="text-sm text-[var(--color-muted)]">Loading features...</div>
          ) : (
            <div className="space-y-3">
              {features.length === 0 && (
                <p className="text-sm text-[var(--color-muted)]">No features yet.</p>
              )}
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f.id} className="flex items-center justify-between rounded-md border-2 border-[var(--color-border)] px-3 py-2">
                    <span className="text-sm text-[var(--color-ink)]">{f.feature}</span>
                    <button
                      onClick={() => removeFeature(f.id)}
                      className="text-xs text-[var(--color-danger)] hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature..."
                  className="flex-1 rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                  onKeyDown={(e) => { if (e.key === "Enter") addFeature(); }}
                />
                <button onClick={addFeature} disabled={!newFeature.trim()} className="ud-btn ud-btn-primary ud-btn-sm">
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <AddEditModal open={showAdd || editItem !== null} title={editItem ? "Edit Pricing Plan" : "Add Pricing Plan"} fields={FIELDS} data={editItem ?? undefined} onSave={handleSave} onClose={() => { setShowAdd(false); setEditItem(null); }} />

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Pricing Plan"
        message="Are you sure you want to delete this pricing plan? This cannot be undone."
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
