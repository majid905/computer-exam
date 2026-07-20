"use client";

export function StatCard({
  title,
  value,
  icon,
  color = "brand",
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: "brand" | "accent" | "success" | "danger" | "info";
}) {
  const colorMap = {
    brand: "bg-[var(--color-brand-soft)] text-[var(--color-brand)]",
    accent: "bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
    success: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
    danger: "bg-[var(--color-danger-soft)] text-[var(--color-danger)]",
    info: "bg-[var(--color-info-soft)] text-[var(--color-info)]",
  };

  return (
    <div className="ud-card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-extrabold text-[var(--color-ink)]">{value}</div>
        <div className="text-sm font-medium text-[var(--color-muted)]">{title}</div>
      </div>
    </div>
  );
}
