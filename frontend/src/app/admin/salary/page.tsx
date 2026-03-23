"use client";

import { useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { createSalaryPayment, useSalary, useSalaryPayments } from "@/lib/endpoints";
import { formatLocalMonth } from "@/lib/dates";
import { adminNavItems } from "@/lib/navigation";

export default function AdminSalaryPage() {
  useRequireAuth("admin", "/admin/login");

  const [month, setMonth] = useState(formatLocalMonth());
  const [processingKey, setProcessingKey] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const { data: salary, mutate } = useSalary({ month, type: "employee" });
  const { mutate: mutatePayments } = useSalaryPayments({ month, type: "employee" });
  const totals = useMemo(() => {
    const items = salary ?? [];
    return {
      monthlySalary: items.reduce((sum, item) => sum + item.monthlySalary, 0),
      approvedAdvance: items.reduce((sum, item) => sum + item.advanceDeduction, 0),
      finalSalary: items.reduce((sum, item) => sum + item.finalSalary, 0),
      pending: items.filter((item) => item.paymentStatus === "pending").length,
    };
  }, [salary]);
  const summaryCards = [
    {
      label: "Total Monthly Salary",
      prefix: "Rs.",
      value: totals.monthlySalary.toLocaleString(),
      helper: "Overall salary commitment for the selected month.",
    },
    {
      label: "Approved Advance",
      prefix: "Rs.",
      value: totals.approvedAdvance.toLocaleString(),
      helper: "Advance amount already approved and adjusted.",
    },
    {
      label: "Net Payroll",
      prefix: "Rs.",
      value: totals.finalSalary.toLocaleString(),
      helper: "Final payable salary after deductions.",
    },
    {
      label: "Pending Payments",
      value: `${totals.pending}`,
      helper: "Salary entries still waiting to be marked paid.",
    },
  ];

  async function markPaid(userId: string) {
    const key = `employee-${userId}`;
    setProcessingKey(key);
    setActionError(null);
    setActionFeedback(null);
    try {
      await createSalaryPayment({ userId, type: "employee", month, status: "paid" });
      await Promise.all([mutate(), mutatePayments()]);
      setActionFeedback("Salary payment marked as paid successfully.");
    } catch (err: any) {
      setActionError(err?.message ?? "Unable to update salary payment.");
    } finally {
      setProcessingKey(null);
    }
  }

  return (
    <DashboardShell title="Salary" subtitle="Monthly salary summaries with live advance deductions" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input" />
      </div>

      <div className="glass p-6 lg:col-span-2">
        <h3 className="panel-title">Salary Snapshot</h3>
        <p className="panel-subtitle">Monthly salary minus approved advances for {month}.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div key={card.label} className="min-w-0 rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5">
              <p className="text-[11px] font-semibold uppercase leading-5 tracking-[0.18em] text-indigo-100/55">
                {card.label}
              </p>
              <div className="mt-4 min-w-0">
                {card.prefix ? (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
                    {card.prefix}
                  </span>
                ) : null}
                <p className="mt-2 break-words text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-none tracking-tight text-white tabular-nums">
                  {card.value}
                </p>
              </div>
              <p className="mt-3 text-xs leading-6 text-indigo-100/60">{card.helper}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass col-span-full p-6">
        {actionFeedback ? <div className="mb-4 rounded-xl bg-emerald-500/15 p-4 text-sm text-emerald-100">{actionFeedback}</div> : null}
        {actionError ? <div className="mb-4 rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">{actionError}</div> : null}
        <div className="admin-table-scroll overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-[1100px] w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Monthly Salary</th>
                <th className="px-4 py-3">Approved Advance</th>
                <th className="px-4 py-3">Final Payable</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Attendance</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {(salary ?? []).map((item) => (
                <tr key={item.userId} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-xs text-indigo-100/60">{item.username} | {item.email}</div>
                  </td>
                  <td className="px-4 py-3">Rs. {item.monthlySalary.toLocaleString()}</td>
                  <td className="px-4 py-3">Rs. {item.advanceDeduction.toLocaleString()}</td>
                  <td className="px-4 py-3 text-white">Rs. {item.finalSalary.toLocaleString()}</td>
                  <td className="px-4 py-3 capitalize">{item.paymentStatus}</td>
                  <td className="px-4 py-3">{item.presentDays} P / {item.absentDays} A</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => markPaid(item.userId)}
                        disabled={item.paymentStatus === "paid" || processingKey === `employee-${item.userId}`}
                        className="action-button bg-gradient-to-r from-emerald-500/70 to-emerald-300/70 disabled:opacity-50"
                      >
                        {item.paymentStatus === "paid"
                          ? "Paid"
                          : processingKey === `employee-${item.userId}`
                            ? "Saving..."
                            : "Mark paid"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!salary?.length && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No salary records for this month.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
