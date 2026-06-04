import { getCloudflareContext } from "@opennextjs/cloudflare";

// Cloudflare D1 (SQLite) database access.
// The DB binding is declared in wrangler.jsonc as `DB`. We keep the original
// query()/execute() interface so existing call sites don't need to change.
//
// Minimal local D1 types so this file doesn't depend on the global workerd
// runtime types (worker-configuration.d.ts), which are excluded from the app
// type-check because they override the DOM lib's Response/fetch typings.
interface D1Meta {
  last_row_id?: number;
  changes?: number;
}
interface D1Result<T> {
  results: T[];
  success: boolean;
  meta: D1Meta;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result<unknown>>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

function db(): D1Database {
  const { env } = getCloudflareContext();
  const binding = (env as { DB?: D1Database }).DB;
  if (!binding) {
    throw new Error("D1 binding `DB` is not configured (check wrangler.jsonc).");
  }
  return binding;
}

export async function query<T = any>(sql: string, params: any[] = []) {
  const { results } = await db().prepare(sql).bind(...params).all<T>();
  return (results ?? []) as T[];
}

// Mirrors the subset of mysql2's ResultSetHeader that the app actually uses.
export interface ExecuteResult {
  insertId: number;
  affectedRows: number;
}

export async function execute(sql: string, params: any[] = []): Promise<ExecuteResult> {
  const { meta } = await db().prepare(sql).bind(...params).run();
  return {
    insertId: Number(meta?.last_row_id ?? 0),
    affectedRows: Number(meta?.changes ?? 0),
  };
}
