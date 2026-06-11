"use client";

import { useState, useEffect } from "react";

const PAGE_SIZE = 20;

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
  const [page, setPage] = useState(1);

  const filtered = query
    ? rows.filter((row) =>
        columns.some((col) => {
          const val = row[col.key];
          return val != null && String(val).toLowerCase().includes(query.toLowerCase());
        })
      )
    : rows;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Reset to page 1 when search query changes
  useEffect(() => { setPage(1); }, [query]);
  // Reset to page 1 when rows data changes (e.g. after delete/add)
  useEffect(() => { setPage(1); }, [rows]);

  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

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
        <span className="text-sm text-(--color-muted) ml-auto">
          {filtered.length} rows
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-2)] text-left">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold text-(--color-muted)">
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 font-semibold text-(--color-muted) w-24">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-8 text-center text-(--color-muted)"
                >
                  No data found.
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr key={row.id ?? i} className="border-t hover:bg-[var(--color-surface-2)]/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-[var(--color-ink)]">
                      {col.key === "id"
                        ? start + i + 1
                        : col.render
                        ? col.render(row)
                        : row[col.key] ?? "—"}
                    </td>
                  ))}
                  {actions && <td className="px-4 py-3">{actions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-(--color-muted)">
            Showing {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-2 py-1 rounded text-xs font-medium text-(--color-muted) hover:bg-(--color-surface-2) disabled:opacity-30 disabled:cursor-not-allowed"
            >
              «
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2 py-1 rounded text-xs font-medium text-(--color-muted) hover:bg-(--color-surface-2) disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, idx) =>
                p === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2 py-1 text-xs text-(--color-muted)">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      page === p
                        ? "bg-(--color-brand) text-white"
                        : "text-(--color-muted) hover:bg-(--color-surface-2)"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-2 py-1 rounded text-xs font-medium text-(--color-muted) hover:bg-(--color-surface-2) disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ›
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-2 py-1 rounded text-xs font-medium text-(--color-muted) hover:bg-(--color-surface-2) disabled:opacity-30 disabled:cursor-not-allowed"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
