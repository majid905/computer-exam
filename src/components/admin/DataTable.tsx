"use client";

import { useState } from "react";

export function DataTable({
  columns,
  rows,
  actions,
  searchPlaceholder = "Search...",
}: {
  columns: { key: string; label: string; render?: (row: any) => React.ReactNode }[];
  rows: any[];
  actions?: (row: any) => React.ReactNode;
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? rows.filter((row) =>
        columns.some((col) => {
          const val = row[col.key];
          return val != null && String(val).toLowerCase().includes(query.toLowerCase());
        })
      )
    : rows;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full max-w-sm rounded-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand)]"
        />
        <span className="text-sm text-[var(--color-muted)] ml-auto">{filtered.length} rows</span>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-2)] text-left">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold text-[var(--color-muted)]">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 py-3 font-semibold text-[var(--color-muted)] w-24">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-8 text-center text-[var(--color-muted)]"
                >
                  No data found.
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={row.id ?? i} className="border-t hover:bg-[var(--color-surface-2)]/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-[var(--color-ink)]">
                      {col.key === "id" ? i + 1 : col.render ? col.render(row) : row[col.key] ?? "—"}
                    </td>
                  ))}
                  {actions && <td className="px-4 py-3">{actions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
