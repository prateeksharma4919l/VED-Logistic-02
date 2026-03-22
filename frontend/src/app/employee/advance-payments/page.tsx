"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { StatusBadge } from "@/components/StatusBadge";
import { createAdvancePayment, useAdvancePayments, useSalary } from "@/lib/endpoints";
import { useRequireAuth } from "@/lib/auth";
import { formatLocalDate, formatLocalMonth } from "@/lib/dates";
import { employeeNavItems } from "@/lib/navigation";

const initialForm = {
  amount: "",
  date: formatLocalDate(),
  note: "",
};

export default function EmployeeAdvancePaymentsPage() {
  useRequireAuth("employee", "/employee/login");

  const [month, setMonth] = useState(formatLocalMonth());
  const [status, setStatus] = useState<"" | "pending" | "approved" | "rejected">("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: items, mutate } = useAdvancePayments({ type: "employee", month, status: status || undefined });
  const { data: salary, mutate: mutateSalary } = useSalary({ type: "employee", month });

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (items ?? []).filter((item) => {
      if (!query) return true;
      return (
        item.status.toLowerCase().includes(query) ||
        item.amount.toString().includes(query) ||
        (item.note ?? "").toLowerCase().includes(query)
      );
    });
  }, [items, search]);

  const totalRequested = filtered.reduce((sum, item) => sum + item.amount, 0);
  const pendingCount = filtered.filter((item) => item.status === "pending").length;
  const approvedDeduction = salary?.[0]?.advanceDeduction ?? 0;

  async function handleSubmit() {
    if (!form.amount || !form.date) return;
    setSubmitting(true);
    setFeedback(null);
    setError(null);
    try {
      const amount = Number(form.amount);
      if (!amount || amount <= 0) {
        throw new Error("Enter a valid advance amount.");
      }
      await createAdvancePayment({
        type: "employee",
        amount,
        date: form.date,
        note: form.note,
      });
      setForm(initialForm);
      await Promise.all([mutate(), mutateSalary()]);
      setFeedback("Advance request submitted successfully. It will be deducted after admin approval.");
    } catch (err: any) {
      setError(err?.message ?? "Unable to submit advance request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DashboardShell title="Advance Payments" subtitle="Request an advance and track approval in real time" items={employeeNavItems}>
      <div className="glass p-6">
        <h3 className="panel-title">New Request</h3>
        <p className="panel-subtitle">Requests submitted here stay pending until an admin approves them.</p>
        {feedback ? <div className="mt-4 rounded-xl bg-emerald-500/15 p-4 text-sm text-emerald-100">{feedback}</div> : null}
        {error ? <div className="mt-4 rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">{error}</div> : null}
        <div className="mt-5 grid gap-4">
          <input
            type="number"
            min="0"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            className="field-input"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            className="field-input"
          />
          <textarea
            placeholder="Optional note"
            value={form.note}
            onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
            className="field-textarea min-h-28"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="action-button bg-gradient-to-r from-cyan-500/70 to-sky-300/70 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit advance request"}
          </button>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Monthly Snapshot</h3>
        <p className="panel-subtitle">Only approved advances are deducted from salary.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Requested This Month</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {totalRequested.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Pending Requests</p>
            <p className="mt-2 text-3xl font-semibold text-white">{pendingCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Approved Deduction</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {approvedDeduction.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="glass col-span-full p-6">
        <div className="grid gap-3 lg:grid-cols-3">
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input" />
          <select value={status} onChange={(e) => setStatus(e.target.value as "" | "pending" | "approved" | "rejected")} className="field-select">
            <option className="bg-slate-900" value="">All statuses</option>
            <option className="bg-slate-900" value="pending">Pending</option>
            <option className="bg-slate-900" value="approved">Approved</option>
            <option className="bg-slate-900" value="rejected">Rejected</option>
          </select>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by amount, status, or note"
            className="field-input"
          />
        </div>
      </div>

      <div className="glass col-span-full p-6">
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3">Approved At</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-white">Rs. {item.amount.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3">{item.note || "-"}</td>
                  <td className="px-4 py-3">{item.approvedAt ? new Date(item.approvedAt).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No advance requests found for this view.
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
