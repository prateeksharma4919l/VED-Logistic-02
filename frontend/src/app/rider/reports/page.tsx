"use client";

import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { riderNavItems } from "@/lib/navigation";

export default function RiderReportsPage() {
  useRequireAuth("rider", "/rider/login");

  return (
    <DashboardShell title="Reports" subtitle="Export rider attendance and salary references" items={riderNavItems}>
      <div className="glass col-span-full p-6">
        <h2 className="panel-title">Export logs</h2>
        <p className="panel-subtitle">Download your rider attendance and payment history for record keeping.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="action-button bg-gradient-to-r from-cyan-500/70 to-sky-300/70">
            Export as PDF
          </button>
          <button className="ghost-button">
            Email report
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
