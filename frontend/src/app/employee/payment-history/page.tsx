"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useRequireAuth } from "@/lib/auth";
import { useSalaryPayments } from "@/lib/endpoints";
import { employeeNavItems } from "@/lib/navigation";

export default function EmployeePaymentHistoryPage() {
  useRequireAuth("employee", "/employee/login");

  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [status, setStatus] = useState<"" | "paid" | "pending">("");
  const { data: items } = useSalaryPayments({ type: "employee", month, status: status || undefined });

  const totals = useMemo(() => {
    return (items ?? []).reduce(
      (acc, item) => {
        acc.total += item.finalPaidAmount;
        if (item.status === "paid") acc.paid += item.finalPaidAmount;
        return acc;
      },
      { total: 0, paid: 0 }
    );
  }, [items]);

  return (
    <DashboardShell title="Payment History" subtitle="Review your monthly salary payment records" items={employeeNavItems}>
      <div className="glass col-span-full p-6">
        <div className="grid gap-3 md:grid-cols-2">
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input" />
          <select value={status} onChange={(e) => setStatus(e.target.value as "" | "paid" | "pending")} className="field-select">
            <option className="bg-slate-900" value="">All statuses</option>
            <option className="bg-slate-900" value="paid">Paid</option>
            <option className="bg-slate-900" value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Monthly Snapshot</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Recorded Amount</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {totals.total.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Paid Amount</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {totals.paid.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="glass col-span-full p-6">
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Total Salary</th>
                <th className="px-4 py-3">Advance Deduction</th>
                <th className="px-4 py-3">Final Paid</th>
                <th className="px-4 py-3">Payment Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {(items ?? []).map((item) => (
                <tr key={item._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{item.month}</td>
                  <td className="px-4 py-3">Rs. {item.totalSalary.toLocaleString()}</td>
                  <td className="px-4 py-3">Rs. {item.advanceDeduction.toLocaleString()}</td>
                  <td className="px-4 py-3 text-white">Rs. {item.finalPaidAmount.toLocaleString()}</td>
                  <td className="px-4 py-3">{item.paymentDate ? new Date(item.paymentDate).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                </tr>
              ))}
              {!items?.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No payment history found for this month.
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
