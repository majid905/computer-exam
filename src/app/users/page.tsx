import type { Metadata } from "next";
import { getAllUsers } from "@/lib/backend";

export const metadata: Metadata = {
  title: "Users | Passpilot",
  description: "Manage Passpilot users and roles from the backend.",
};

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Users
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Registered users
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          Users are now stored in MySQL with support for admin, user, and client roles.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
        <table className="min-w-full divide-y divide-[var(--color-border)] bg-[var(--color-surface)] text-left text-sm">
          <thead className="bg-[var(--color-surface-2)]">
            <tr>
              <th className="px-4 py-3 font-semibold text-[var(--color-muted)]">Name</th>
              <th className="px-4 py-3 font-semibold text-[var(--color-muted)]">Email</th>
              <th className="px-4 py-3 font-semibold text-[var(--color-muted)]">Role</th>
              <th className="px-4 py-3 font-semibold text-[var(--color-muted)]">Language</th>
              <th className="px-4 py-3 font-semibold text-[var(--color-muted)]">Province</th>
              <th className="px-4 py-3 font-semibold text-[var(--color-muted)]">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-4 text-[var(--color-ink)]">{user.name}</td>
                <td className="px-4 py-4 text-[var(--color-muted)]">{user.email}</td>
                <td className="px-4 py-4 text-[var(--color-ink)]">{user.role}</td>
                <td className="px-4 py-4 text-[var(--color-muted)]">{user.language ?? "—"}</td>
                <td className="px-4 py-4 text-[var(--color-muted)]">{user.province ?? "—"}</td>
                <td className="px-4 py-4 text-[var(--color-muted)]">{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
