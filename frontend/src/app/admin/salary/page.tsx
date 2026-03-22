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
  const [type, setType] = useState<"" | "employee" | "rider">("");
  const [processingKey, setProcessingKey] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const { data: salary, mutate } = useSalary({ month, type: type || undefined });
  const { mutate: mutatePayments } = useSalaryPayments({ month, type: type || undefined });
  const totals = useMemo(() => {
    const items = salary ?? [];
    return {
      monthlySalary: items.reduce((sum, item) => sum + item.monthlySalary, 0),
      approvedAdvance: items.reduce((sum, item) => sum + item.advanceDeduction, 0),
      finalSalary: items.reduce((sum, item) => sum + item.finalSalary, 0),
      pending: items.filter((item) => item.paymentStatus === "pending").length,
    };
  }, [salary]);

  async function markPaid(userId: string, role: "employee" | "rider") {
    const key = `${role}-${userId}`;
    setProcessingKey(key);
    setActionError(null);
    setActionFeedback(null);
    try {
      await createSalaryPayment({ userId, type: role, month, status: "paid" });
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
        <div className="grid gap-3 md:grid-cols-3">
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input" />
          <select value={type} onChange={(e) => setType(e.target.value as any)} className="field-select">
            <option className="bg-slate-900" value="">All roles</option>
            <option className="bg-slate-900" value="employee">Employees</option>
            <option className="bg-slate-900" value="rider">Riders</option>
          </select>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Salary Snapshot</h3>
        <p className="panel-subtitle">Monthly salary minus approved advances for {month}.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Total Monthly Salary</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {totals.monthlySalary.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Approved Advance</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {totals.approvedAdvance.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Net Payroll</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {totals.finalSalary.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Pending Payments</p>
            <p className="mt-2 text-3xl font-semibold text-white">{totals.pending}</p>
          </div>
        </div>
      </div>

      <div className="glass col-span-full p-6">
        {actionFeedback ? <div className="mb-4 rounded-xl bg-emerald-500/15 p-4 text-sm text-emerald-100">{actionFeedback}</div> : null}
        {actionError ? <div className="mb-4 rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">{actionError}</div> : null}
        <div className="admin-table-scroll overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-[1180px] w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
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
                <tr key={`${item.type}-${item.userId}`} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-xs text-indigo-100/60">{item.username} • {item.email}</div>
                  </td>
                  <td className="px-4 py-3 capitalize">{item.type}</td>
                  <td className="px-4 py-3">Rs. {item.monthlySalary.toLocaleString()}</td>
                  <td className="px-4 py-3">Rs. {item.advanceDeduction.toLocaleString()}</td>
                  <td className="px-4 py-3 text-white">Rs. {item.finalSalary.toLocaleString()}</td>
                  <td className="px-4 py-3 capitalize">{item.paymentStatus}</td>
                  <td className="px-4 py-3">{item.presentDays} P / {item.absentDays} A</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => markPaid(item.userId, item.type)}
                        disabled={item.paymentStatus === "paid" || processingKey === `${item.type}-${item.userId}`}
                        className="action-button bg-gradient-to-r from-emerald-500/70 to-emerald-300/70 disabled:opacity-50"
                      >
                        {item.paymentStatus === "paid"
                          ? "Paid"
                          : processingKey === `${item.type}-${item.userId}`
                            ? "Saving..."
                            : "Mark paid"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!salary?.length && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-indigo-100/70">
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
