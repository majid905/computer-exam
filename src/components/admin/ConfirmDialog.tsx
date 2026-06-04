"use client";

import { useEffect } from "react";

export function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  confirmColor = "danger",
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  confirmColor?: "danger" | "brand";
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm ud-card p-6 space-y-4">
        <h3 className="text-lg font-bold text-[var(--color-ink)]">{title}</h3>
        <p className="text-sm text-[var(--color-muted)]">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="ud-btn ud-btn-ghost ud-btn-sm">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`ud-btn ud-btn-sm ${confirmColor === "danger" ? "bg-[var(--color-danger)] text-white hover:opacity-90" : "ud-btn-primary"}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
