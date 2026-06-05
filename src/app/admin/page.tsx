"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatCard } from "@/components/admin/StatCard";
import { DataTable } from "@/components/admin/DataTable";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, questions: 0, chapters: 0, mockTests: 0, contacts: 0 });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [subStats, setSubStats] = useState({ today: 0, thisMonth: 0, allTime: 0 });
  const [subscribedUsers, setSubscribedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [uRes, qRes, cRes, mRes, coRes, subRes] = await Promise.all([
          fetch("/api/users/"),
          fetch("/api/questions/"),
          fetch("/api/chapters/"),
          fetch("/api/mock-tests/"),
          fetch("/api/contact-messages/"),
          fetch("/api/admin/subscription-stats/"),
        ]);
        const users = uRes.ok ? await uRes.json() : [];
        const questions = qRes.ok ? await qRes.json() : [];
        const chapters = cRes.ok ? await cRes.json() : [];
        const mockTests = mRes.ok ? await mRes.json() : [];
        const contacts = coRes.ok ? await coRes.json() : [];

        setStats({
          users: Array.isArray(users) ? users.length : 0,
          questions: Array.isArray(questions) ? questions.length : 0,
          chapters: Array.isArray(chapters) ? chapters.length : 0,
          mockTests: Array.isArray(mockTests) ? mockTests.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
        });
        setRecentUsers(Array.isArray(users) ? users.slice(0, 5) : []);
        setRecentContacts(Array.isArray(contacts) ? contacts.slice(0, 5) : []);

        if (subRes.ok) {
          const subData = await subRes.json();
          setSubStats(subData.stats ?? { today: 0, thisMonth: 0, allTime: 0 });
          setSubscribedUsers(Array.isArray(subData.users) ? subData.users : []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="ud-card p-5 h-24 animate-pulse bg-[var(--color-surface-2)]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[var(--color-ink)]">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.users}
          color="brand"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatCard
          title="Questions"
          value={stats.questions}
          color="accent"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="Chapters"
          value={stats.chapters}
          color="success"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
        <StatCard
          title="Mock Tests"
          value={stats.mockTests}
          color="danger"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Today's Revenue"
          value={`CAD ${subStats.today.toFixed(2)}`}
          color="success"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="This Month's Revenue"
          value={`CAD ${subStats.thisMonth.toFixed(2)}`}
          color="brand"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="All-Time Revenue"
          value={`CAD ${subStats.allTime.toFixed(2)}`}
          color="accent"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
      </div>

      <div className="ud-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--color-ink)]">
            Subscribed Users ({subscribedUsers.length})
          </h2>
        </div>
        <DataTable
          columns={[
            { key: "user_id", label: "User ID" },
            { key: "full_name", label: "Name", render: (r) => r.full_name || "—" },
            { key: "email", label: "Email" },
            { key: "plan_title", label: "Plan" },
            { key: "amount", label: "Amount", render: (r) => `CAD ${Number(r.amount || 0).toFixed(2)}` },
            { key: "end_date", label: "Expires", render: (r) => r.end_date ? new Date(r.end_date).toLocaleDateString() : "—" },
            { key: "created_at", label: "Subscribed", render: (r) => new Date(r.created_at).toLocaleDateString() },
          ]}
          rows={subscribedUsers}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="ud-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--color-ink)]">Recent Users</h2>
            <Link href="/admin/users" className="text-sm ud-link font-semibold">
              View all
            </Link>
          </div>
          <DataTable
            columns={[
              { key: "id", label: "ID" },
              { key: "full_name", label: "Name", render: (r) => r.full_name || r.user_name || "—" },
              { key: "email", label: "Email" },
              { key: "role", label: "Role" },
            ]}
            rows={recentUsers}
          />
        </div>

        <div className="ud-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--color-ink)]">Recent Contact Messages</h2>
            <Link href="/admin/contact-messages" className="text-sm ud-link font-semibold">
              View all
            </Link>
          </div>
          <DataTable
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "subject", label: "Subject" },
              { key: "created_at", label: "Date", render: (r) => new Date(r.created_at).toLocaleDateString() },
            ]}
            rows={recentContacts}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Questions", href: "/admin/questions", color: "bg-[var(--color-brand-soft)] text-[var(--color-brand)]" },
          { label: "Users", href: "/admin/users", color: "bg-[var(--color-accent-soft)] text-[var(--color-accent)]" },
          { label: "Chapters", href: "/admin/chapters", color: "bg-[var(--color-success-soft)] text-[var(--color-success)]" },
          { label: "FAQs", href: "/admin/faqs", color: "bg-[var(--color-info-soft)] text-[var(--color-info)]" },
          { label: "Blogs", href: "/admin/blogs", color: "bg-[var(--color-warning-soft)] text-[var(--color-warning)]" },
          { label: "Settings", href: "/admin/settings", color: "bg-[var(--color-danger-soft)] text-[var(--color-danger)]" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`ud-card p-4 text-center font-semibold text-sm ${item.color} hover:opacity-80 transition-opacity`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
