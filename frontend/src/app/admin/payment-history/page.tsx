"use client";

import { useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { deleteSalaryPayment, updateSalaryPayment, useSalaryPayments } from "@/lib/endpoints";
import { formatLocalMonth } from "@/lib/dates";
import { adminNavItems } from "@/lib/navigation";

export default function AdminPaymentHistoryPage() {
  useRequireAuth("admin", "/admin/login");

  const [month, setMonth] = useState(formatLocalMonth());
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const { data: items, mutate } = useSalaryPayments({ month });
  const summary = useMemo(() => {
    const rows = items ?? [];
    return {
      paid: rows.filter((item) => item.status === "paid").length,
      pending: rows.filter((item) => item.status === "pending").length,
      amount: rows.reduce((sum, item) => sum + item.finalPaidAmount, 0),
    };
  }, [items]);

  return (
    <DashboardShell title="Payment History" subtitle="Stored salary payout records" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input w-full lg:w-56" />
      </div>
      <div className="glass p-6">
        <h3 className="panel-title">Payment Snapshot</h3>
        <p className="panel-subtitle">Stored payout records for {month}.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Paid Records</p>
            <p className="mt-2 text-3xl font-semibold text-white">{summary.paid}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Pending Records</p>
            <p className="mt-2 text-3xl font-semibold text-white">{summary.pending}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Final Paid Amount</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {summary.amount.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="glass col-span-full p-6">
        {actionFeedback ? <div className="mb-4 rounded-xl bg-emerald-500/15 p-4 text-sm text-emerald-100">{actionFeedback}</div> : null}
        {actionError ? <div className="mb-4 rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">{actionError}</div> : null}
        <div className="admin-table-scroll overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-[1120px] w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Total Payment</th>
                <th className="px-4 py-3">Advance Payment</th>
                <th className="px-4 py-3">Final Paid</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(items ?? []).map((item) => (
                <tr key={item._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{item.userIdentifier ?? item.userId}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{item.userName ?? "-"}</div>
                    <div className="text-xs text-indigo-100/60">{item.userEmail ?? ""}</div>
                  </td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.month}</td>
                  <td className="px-4 py-3">Rs. {item.totalSalary.toLocaleString()}</td>
                  <td className="px-4 py-3">Rs. {item.advanceDeduction.toLocaleString()}</td>
                  <td className="px-4 py-3">Rs. {item.finalPaidAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 capitalize">{item.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={async () => {
                          setProcessingId(item._id);
                          setActionError(null);
                          setActionFeedback(null);
                          try {
                            await updateSalaryPayment(item._id, { status: item.status === "paid" ? "pending" : "paid" });
                            await mutate();
                            setActionFeedback("Payment status updated successfully.");
                          } catch (err: any) {
                            setActionError(err?.message ?? "Unable to update payment status.");
                          } finally {
                            setProcessingId(null);
                          }
                        }}
                        disabled={processingId === item._id}
                        className="ghost-button disabled:opacity-60"
                      >
                        {processingId === item._id ? "Saving..." : "Toggle status"}
                      </button>
                      <button
                        onClick={async () => {
                          setProcessingId(item._id);
                          setActionError(null);
                          setActionFeedback(null);
                          try {
                            await deleteSalaryPayment(item._id);
                            await mutate();
                            setActionFeedback("Payment record deleted successfully.");
                          } catch (err: any) {
                            setActionError(err?.message ?? "Unable to delete payment record.");
                          } finally {
                            setProcessingId(null);
                          }
                        }}
                        disabled={processingId === item._id}
                        className="ghost-button border-rose-400/30 text-rose-100 disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!items?.length && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No payment history stored for this month.
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
