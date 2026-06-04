"use client";

import { useEffect, useState } from "react";

export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select";
  options?: { value: string; label: string }[];
  required?: boolean;
};

export function AddEditModal({
  open,
  title,
  fields,
  data,
  onSave,
  onClose,
}: {
  open: boolean;
  title: string;
  fields: FieldDef[];
  data?: Record<string, any>;
  onSave: (values: Record<string, any>) => void;
  onClose: () => void;
}) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      const initial: Record<string, any> = {};
      fields.forEach((f) => {
        initial[f.key] = data?.[f.key] ?? "";
      });
      setValues(initial);
      setSaving(false);
    }
  }, [open, data, fields]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    onSave(values);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg ud-card p-6 space-y-4 max-h-[85vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-[var(--color-ink)]">{title}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                {field.label}
                {field.required && <span className="text-[var(--color-danger)]"> *</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  rows={4}
                  required={field.required}
                  className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                />
              ) : field.type === "select" ? (
                <select
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  required={field.required}
                  className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  required={field.required}
                  className="w-full rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="ud-btn ud-btn-ghost ud-btn-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="ud-btn ud-btn-primary ud-btn-sm">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
