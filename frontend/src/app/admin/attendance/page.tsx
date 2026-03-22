"use client";

import { useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { Modal } from "@/components/Modal";
import { SearchInput } from "@/components/SearchInput";
import {
  AttendanceRecord,
  createAttendance,
  deleteAttendance,
  updateAttendance,
  useAttendance,
  useEmployees,
  useRiders,
} from "@/lib/endpoints";
import { formatLocalDate, formatLocalMonth } from "@/lib/dates";
import { adminNavItems } from "@/lib/navigation";

const emptyForm = {
  userId: "",
  type: "employee",
  date: formatLocalDate(),
  checkIn: "",
  checkOut: "",
  status: "present",
  notes: "",
};

export default function AdminAttendancePage() {
  useRequireAuth("admin", "/admin/login");

  const [type, setType] = useState<undefined | "employee" | "rider">(undefined);
  const [month, setMonth] = useState(formatLocalMonth());
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AttendanceRecord | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const { data: records, error, mutate } = useAttendance({ type, month });
  const { data: employees } = useEmployees();
  const { data: riders } = useRiders();

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return (records ?? []).filter((item) => {
      if (!q) return true;
      return (
        item.userId.toLowerCase().includes(q) ||
        (item.userIdentifier ?? "").toLowerCase().includes(q) ||
        (item.userName ?? "").toLowerCase().includes(q) ||
        (item.notes ?? "").toLowerCase().includes(q)
      );
    });
  }, [filter, records]);

  const selectedUsers = useMemo(() => {
    const source = form.type === "employee" ? employees ?? [] : riders ?? [];
    return source.map((item) => ({
      id: item._id,
      label: `${item.name} (${item.username})`,
      helper: item.email,
    }));
  }, [employees, form.type, riders]);

  function openEdit(record: AttendanceRecord) {
    setActionError(null);
    setActionFeedback(null);
    setEditing(record);
    setForm({
      userId: record.userId,
      type: record.type,
      date: record.date.slice(0, 10),
      checkIn: record.checkIn ? record.checkIn.slice(0, 16) : "",
      checkOut: record.checkOut ? record.checkOut.slice(0, 16) : "",
      status: record.status,
      notes: record.notes ?? "",
    });
    setModalOpen(true);
  }

  function openCreate() {
    setEditing(null);
    setActionError(null);
    setActionFeedback(null);
    setForm({
      ...emptyForm,
      type: type ?? "employee",
      date: formatLocalDate(),
    });
    setModalOpen(true);
  }

  async function onSave() {
    setSaving(true);
    setActionError(null);
    setActionFeedback(null);
    try {
      const payload = {
        userId: form.userId,
        type: form.type as "employee" | "rider",
        date: form.date,
        checkIn: form.checkIn || undefined,
        checkOut: form.checkOut || undefined,
        status: form.status as "present" | "absent",
        notes: form.notes,
      };
      if (editing) {
        await updateAttendance(editing._id, payload);
      } else {
        await createAttendance(payload);
      }
      await mutate();
      setActionFeedback(editing ? "Attendance updated successfully." : "Attendance created successfully.");
      setModalOpen(false);
      setEditing(null);
      setForm({ ...emptyForm, date: formatLocalDate() });
    } catch (err: any) {
      setActionError(err?.message ?? "Unable to save attendance.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(record: AttendanceRecord) {
    if (!window.confirm("Delete this attendance record?")) return;
    setActionError(null);
    setActionFeedback(null);
    try {
      await deleteAttendance(record._id);
      await mutate();
      setActionFeedback("Attendance deleted successfully.");
    } catch (err: any) {
      setActionError(err?.message ?? "Unable to delete attendance.");
    }
  }

  return (
    <DashboardShell title="Attendance" subtitle="Present / absent tracking with monthly control" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="panel-title">Attendance Records</h2>
              <p className="panel-subtitle">Admin can review and edit employee and rider attendance.</p>
            </div>
            <button type="button" onClick={openCreate} className="action-button bg-gradient-to-r from-ved-500/70 to-ved-300/70">
              Add attendance
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            <select value={type ?? ""} onChange={(e) => setType(e.target.value ? (e.target.value as "employee" | "rider") : undefined)} className="field-select">
              <option className="bg-slate-900" value="">All roles</option>
              <option className="bg-slate-900" value="employee">Employees</option>
              <option className="bg-slate-900" value="rider">Riders</option>
            </select>
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input" />
            <div className="md:col-span-2">
              <SearchInput value={filter} onChange={setFilter} placeholder="Filter by user ID, name, or notes" />
            </div>
          </div>
        </div>

        {error ? <div className="rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">Failed to load attendance.</div> : null}
        {actionFeedback ? <div className="mt-4 rounded-xl bg-emerald-500/15 p-4 text-sm text-emerald-100">{actionFeedback}</div> : null}
        {actionError ? <div className="mt-4 rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">{actionError}</div> : null}

        <div className="admin-table-scroll overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-[980px] w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Check-in</th>
                <th className="px-4 py-3">Check-out</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{row.userIdentifier ?? row.userId}</td>
                  <td className="px-4 py-3">{row.userName ?? "-"}</td>
                  <td className="px-4 py-3">{row.type}</td>
                  <td className="px-4 py-3">{new Date(row.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{row.status}</td>
                  <td className="px-4 py-3">{row.checkIn ? new Date(row.checkIn).toLocaleTimeString() : "-"}</td>
                  <td className="px-4 py-3">{row.checkOut ? new Date(row.checkOut).toLocaleTimeString() : "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(row)} className="ghost-button">Edit</button>
                      <button onClick={() => onDelete(row)} className="ghost-button border-rose-400/30 text-rose-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        title={editing ? "Edit attendance" : "Add attendance"}
        onClose={() => setModalOpen(false)}
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="ghost-button">Cancel</button>
            <button type="button" onClick={onSave} disabled={saving} className="action-button bg-gradient-to-r from-ved-500/70 to-ved-300/70 disabled:opacity-60">
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        }
      >
        <div className="grid gap-4">
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            User
            <select
              value={form.userId}
              onChange={(e) => setForm((prev) => ({ ...prev, userId: e.target.value }))}
              className="field-select"
            >
              <option className="bg-slate-900" value="">Select user</option>
              {selectedUsers.map((item) => (
                <option key={item.id} className="bg-slate-900" value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          {form.userId ? (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-indigo-100/65">
              Selected user: {selectedUsers.find((item) => item.id === form.userId)?.helper ?? form.userId}
            </div>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-indigo-100">
              Role
              <select value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value, userId: "" }))} className="field-select">
                <option className="bg-slate-900" value="employee">employee</option>
                <option className="bg-slate-900" value="rider">rider</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-indigo-100">
              Date
              <input type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} className="field-input" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-indigo-100">
              Check-in
              <input type="datetime-local" value={form.checkIn} onChange={(e) => setForm((prev) => ({ ...prev, checkIn: e.target.value }))} className="field-input" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-indigo-100">
              Check-out
              <input type="datetime-local" value={form.checkOut} onChange={(e) => setForm((prev) => ({ ...prev, checkOut: e.target.value }))} className="field-input" />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            Status
            <select value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))} className="field-select">
              <option className="bg-slate-900" value="present">Present</option>
              <option className="bg-slate-900" value="absent">Absent</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            Note
            <textarea value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} className="field-textarea min-h-24" />
          </label>
        </div>
      </Modal>
    </DashboardShell>
  );
}
