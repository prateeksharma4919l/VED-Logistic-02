"use client";

type StatusBadgeProps = {
  status: string;
};

const statusClasses: Record<string, string> = {
  approved: "bg-emerald-500/20 text-emerald-100 border border-emerald-300/20",
  paid: "bg-emerald-500/20 text-emerald-100 border border-emerald-300/20",
  pending: "bg-amber-500/20 text-amber-100 border border-amber-300/20",
  rejected: "bg-rose-500/20 text-rose-100 border border-rose-300/20",
  absent: "bg-rose-500/20 text-rose-100 border border-rose-300/20",
  present: "bg-cyan-500/20 text-cyan-100 border border-cyan-300/20",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        statusClasses[status] ?? "bg-white/10 text-white border border-white/10"
      }`}
    >
      {status}
    </span>
  );
}
