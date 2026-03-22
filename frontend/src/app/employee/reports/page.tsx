"use client";

import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { employeeNavItems } from "@/lib/navigation";

export default function EmployeeReportsPage() {
  useRequireAuth("employee", "/employee/login");

  return (
    <DashboardShell
      title="Reports"
      subtitle="Export your daily logs"
      items={employeeNavItems}
    >
      <div className="glass col-span-full p-6">
        <h2 className="text-lg font-semibold text-white">Export logs</h2>
        <p className="mt-1 text-sm text-indigo-100/70">
          Download daily attendance & activity reports for your records.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="rounded-xl bg-gradient-to-r from-ved-500/70 to-ved-300/70 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-ved-500/20">
            Export as PDF
          </button>
          <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Email report
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
