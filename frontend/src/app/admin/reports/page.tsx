"use client";

import { useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { useReports, generateReport } from "@/lib/endpoints";
import { adminNavItems } from "@/lib/navigation";
import jsPDF from "jspdf";

export default function AdminReportsPage() {
  useRequireAuth("admin", "/admin/login");

  const { data: reports, mutate } = useReports();
  const [generating, setGenerating] = useState(false);

  const summaryText = useMemo(() => {
    if (!reports) return "Loading...";
    return `${reports.length} reports generated to date.`;
  }, [reports]);

  async function onGenerate() {
    setGenerating(true);
    try {
      await generateReport({
        title: "Daily summary",
        description: "Automated daily report generated from the admin dashboard.",
        meta: { timestamp: new Date().toISOString() },
      });
      await mutate();
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  }

  async function onExportPdf() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Ved Logistics - Daily Summary", 14, 22);
    doc.setFontSize(12);
    doc.text(summaryText, 14, 36);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 46);

    doc.save("ved-logistics-summary.pdf");
  }

  return (
    <DashboardShell title="Reports" subtitle="Daily summaries and exports" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Daily summary</h2>
            <p className="text-sm text-indigo-100/70">Reports are generated automatically and emailed to the operations inbox.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onGenerate}
              disabled={generating}
              className="rounded-xl bg-gradient-to-r from-ved-500/70 to-ved-300/70 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-ved-500/20 disabled:opacity-50"
            >
              {generating ? "Generating..." : "Create report"}
            </button>
            <button
              onClick={onExportPdf}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Export as PDF
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="glass p-6">
            <h3 className="text-sm font-semibold text-white">Summary</h3>
            <p className="mt-2 text-sm text-indigo-100/70">{summaryText}</p>
          </div>
          <div className="glass p-6">
            <h3 className="text-sm font-semibold text-white">Recent reports</h3>
            <p className="mt-2 text-sm text-indigo-100/70">
              {reports?.length ? `${reports.length} reports stored.` : "No reports generated yet."}
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
