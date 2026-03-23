"use client";

import { useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { Modal } from "@/components/Modal";
import { SearchInput } from "@/components/SearchInput";
import { StatusBadge } from "@/components/StatusBadge";
import {
  approveAdvancePayment,
  createAdvancePayment,
  deleteAdvancePayment,
  rejectAdvancePayment,
  updateAdvancePayment,
  useAdvancePayments,
  useEmployees,
} from "@/lib/endpoints";
import { formatLocalDate, formatLocalMonth } from "@/lib/dates";
import { adminNavItems } from "@/lib/navigation";

const emptyForm = { userId: "", amount: "", date: formatLocalDate(), note: "", status: "approved" };

export default function AdminAdvancePaymentsPage() {
  useRequireAuth("admin", "/admin/login");

  const [month, setMonth] = useState(formatLocalMonth());
  const [status, setStatus] = useState<"" | "pending" | "approved" | "rejected">("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const { data: items, mutate } = useAdvancePayments({ month, status: status || undefined, type: "employee" });
  const { data: employees } = useEmployees();

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (items ?? []).filter((item) => {
      if (!query) return true;
      return (
        item.userId.toLowerCase().includes(query) ||
        (item.userIdentifier ?? "").toLowerCase().includes(query) ||
        (item.userName ?? "").toLowerCase().includes(query) ||
        (item.note ?? "").toLowerCase().includes(query)
      );
    });
  }, [items, search]);

  const selectedUsers = useMemo(
    () =>
      (employees ?? []).map((item) => ({
        id: item._id,
        label: `${item.name} (${item.username})`,
        helper: item.email,
      })),
    [employees]
  );

  const pendingAmount = (items ?? [])
    .filter((item) => item.status === "pending")
    .reduce((sum, item) => sum + item.amount, 0);
  const approvedAmount = (items ?? [])
    .filter((item) => item.status === "approved")
    .reduce((sum, item) => sum + item.amount, 0);
  const rejectedCount = (items ?? []).filter((item) => item.status === "rejected").length;

  async function onSave() {
    setSaving(true);
    setActionError(null);
    setActionFeedback(null);
    try {
      const payload = {
        userId: form.userId,
        type: "employee" as const,
        amount: Number(form.amount) || 0,
        date: form.date,
        note: form.note,
        status: form.status as "pending" | "approved" | "rejected",
      };
      if (editingId) {
        await updateAdvancePayment(editingId, payload);
      } else {
        await createAdvancePayment(payload);
      }
      await mutate();
      setModalOpen(false);
      setEditingId(null);
      setForm({ ...emptyForm, date: formatLocalDate() });
      setActionFeedback(editingId ? "Advance payment updated successfully." : "Advance payment created successfully.");
    } catch (err: any) {
      setActionError(err?.message ?? "Unable to save advance payment.");
    } finally {
      setSaving(false);
    }
  }

  async function review(id: string, action: "approve" | "reject") {
    setActionError(null);
    setActionFeedback(null);
    try {
      if (action === "approve") {
        await approveAdvancePayment(id);
        setActionFeedback("Advance approved and linked to salary deduction.");
      } else {
        await rejectAdvancePayment(id);
        setActionFeedback("Advance request rejected.");
      }
      await mutate();
    } catch (err: any) {
      setActionError(err?.message ?? `Unable to ${action} advance payment.`);
    }
  }

  async function removeAdvance(id: string) {
    setActionError(null);
    setActionFeedback(null);
    try {
      await deleteAdvancePayment(id);
      await mutate();
      setActionFeedback("Advance payment deleted successfully.");
    } catch (err: any) {
      setActionError(err?.message ?? "Unable to delete advance payment.");
    }
  }

  function openCreate() {
    setEditingId(null);
    setActionError(null);
    setActionFeedback(null);
    setForm({
      ...emptyForm,
      date: formatLocalDate(),
    });
    setModalOpen(true);
  }

  return (
    <DashboardShell title="Advance Payments" subtitle="Review employee requests and deduct approved advances from salary automatically" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <div className="grid gap-3 lg:grid-cols-4">
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input" />
          <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="field-select">
            <option className="bg-slate-900" value="">All statuses</option>
            <option className="bg-slate-900" value="pending">Pending</option>
            <option className="bg-slate-900" value="approved">Approved</option>
            <option className="bg-slate-900" value="rejected">Rejected</option>
          </select>
          <div className="lg:col-span-2">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by user id, name, or note" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={openCreate} className="action-button bg-gradient-to-r from-cyan-500/70 to-sky-300/70">
            Add admin advance
          </button>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Advance Summary</h3>
        <p className="panel-subtitle">Approved employee advances are deducted from salary as soon as approval is saved.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Pending Approval</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {pendingAmount.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Approved Deduction</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {approvedAmount.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Rejected Requests</p>
            <p className="mt-2 text-3xl font-semibold text-white">{rejectedCount}</p>
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
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{item.userIdentifier ?? item.userId}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{item.userName ?? "-"}</div>
                    <div className="text-xs text-indigo-100/60">{item.userEmail ?? ""}</div>
                  </td>
                  <td className="px-4 py-3">Rs. {item.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3">{item.note || "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setActionError(null);
                          setActionFeedback(null);
                          setEditingId(item._id);
                          setForm({
                            userId: item.userId,
                            amount: String(item.amount),
                            date: item.date.slice(0, 10),
                            note: item.note || "",
                            status: item.status,
                          });
                          setModalOpen(true);
                        }}
                        className="ghost-button"
                      >
                        Edit
                      </button>
                      {item.status !== "approved" ? (
                        <button onClick={() => review(item._id, "approve")} className="ghost-button border-emerald-400/30 text-emerald-100">
                          Approve
                        </button>
                      ) : null}
                      {item.status !== "rejected" ? (
                        <button onClick={() => review(item._id, "reject")} className="ghost-button border-amber-400/30 text-amber-100">
                          Reject
                        </button>
                      ) : null}
                      <button onClick={() => removeAdvance(item._id)} className="ghost-button border-rose-400/30 text-rose-100">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No advance payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        title={editingId ? "Edit advance payment" : "Add admin advance"}
        onClose={() => setModalOpen(false)}
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="ghost-button">Cancel</button>
            <button type="button" onClick={onSave} disabled={saving} className="action-button bg-gradient-to-r from-cyan-500/70 to-sky-300/70 disabled:opacity-60">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        }
      >
        <div className="grid gap-4">
          <select value={form.userId} onChange={(e) => setForm((prev) => ({ ...prev, userId: e.target.value }))} className="field-select">
            <option className="bg-slate-900" value="">Select user</option>
            {selectedUsers.map((item) => (
              <option key={item.id} className="bg-slate-900" value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          {form.userId ? (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-indigo-100/65">
              Selected user: {selectedUsers.find((item) => item.id === form.userId)?.helper ?? form.userId}
            </div>
          ) : null}
          <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))} className="field-input" />
          <input type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} className="field-input" />
          <select value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))} className="field-select">
            <option className="bg-slate-900" value="approved">approved</option>
            <option className="bg-slate-900" value="pending">pending</option>
            <option className="bg-slate-900" value="rejected">rejected</option>
          </select>
          <textarea placeholder="Note" value={form.note} onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))} className="field-textarea min-h-24" />
        </div>
      </Modal>
    </DashboardShell>
  );
}
