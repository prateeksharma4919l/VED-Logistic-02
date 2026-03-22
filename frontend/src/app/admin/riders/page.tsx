"use client";

import { useEffect, useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { Modal } from "@/components/Modal";
import { SearchInput } from "@/components/SearchInput";
import { createRider, deleteRider, Rider, updateRider, useRiders } from "@/lib/endpoints";
import { adminNavItems } from "@/lib/navigation";

const emptyForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  bikeNumber: "",
  monthlySalary: "",
  morningReading: "",
  eveningReading: "",
  status: "pending",
};

export default function AdminRidersPage() {
  useRequireAuth("admin", "/admin/login");

  const { data: riders, error, mutate } = useRiders();
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Rider | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!modalOpen) {
      setEditing(null);
      setForm(emptyForm);
    }
  }, [modalOpen]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return (riders ?? []).filter((rider) => {
      if (!q) return true;
      return (
        rider.name.toLowerCase().includes(q) ||
        rider.username.toLowerCase().includes(q) ||
        rider.email.toLowerCase().includes(q) ||
        rider.bikeNumber.toLowerCase().includes(q)
      );
    });
  }, [filter, riders]);

  function openEdit(rider: Rider) {
    setEditing(rider);
    setForm({
      name: rider.name,
      username: rider.username,
      email: rider.email,
      password: "",
      bikeNumber: rider.bikeNumber,
      monthlySalary: String(rider.monthlySalary ?? 0),
      morningReading: String(rider.morningReading ?? 0),
      eveningReading: String(rider.eveningReading ?? 0),
      status: rider.status,
    });
    setModalOpen(true);
  }

  async function onSave() {
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password || undefined,
        bikeNumber: form.bikeNumber,
        monthlySalary: Number(form.monthlySalary) || 0,
        morningReading: Number(form.morningReading) || 0,
        eveningReading: Number(form.eveningReading) || 0,
        status: form.status,
      };
      if (editing) {
        await updateRider(editing._id, payload);
      } else {
        await createRider(payload);
      }
      await mutate();
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(rider: Rider) {
    if (!window.confirm(`Delete ${rider.name}?`)) return;
    await deleteRider(rider._id);
    await mutate();
  }

  return (
    <DashboardShell title="Riders Management" subtitle="Separate rider records with attendance and salary support" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="panel-title">Riders</h2>
            <p className="panel-subtitle">Manage rider profiles, salaries, and bike allocations independently.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput value={filter} onChange={setFilter} placeholder="Search riders..." />
            <button type="button" onClick={() => setModalOpen(true)} className="action-button bg-gradient-to-r from-cyan-500/70 to-sky-300/70">
              Add rider
            </button>
          </div>
        </div>

        {error ? <div className="rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">Failed to load riders.</div> : null}

        <div className="admin-table-scroll overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-[980px] w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Bike</th>
                <th className="px-4 py-3">Monthly Salary</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rider) => (
                <tr key={rider._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{rider.name}</td>
                  <td className="px-4 py-3">{rider.username}</td>
                  <td className="px-4 py-3">{rider.email}</td>
                  <td className="px-4 py-3">{rider.bikeNumber}</td>
                  <td className="px-4 py-3">Rs. {rider.monthlySalary.toLocaleString()}</td>
                  <td className="px-4 py-3">{rider.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(rider)} className="ghost-button">Edit</button>
                      <button onClick={() => onDelete(rider)} className="ghost-button border-rose-400/30 text-rose-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No riders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        title={editing ? "Edit rider" : "Add rider"}
        onClose={() => setModalOpen(false)}
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="ghost-button">
              Cancel
            </button>
            <button type="button" onClick={onSave} disabled={saving} className="action-button bg-gradient-to-r from-cyan-500/70 to-sky-300/70 disabled:opacity-50">
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        }
      >
        <div className="grid gap-4">
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            Rider name
            <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="field-input" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            User ID
            <input value={form.username} onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))} className="field-input" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            Email
            <input value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="field-input" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            Password {editing ? <span className="text-xs text-indigo-100/50">(leave blank to keep current)</span> : null}
            <input type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} className="field-input" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            Bike number
            <input value={form.bikeNumber} onChange={(e) => setForm((prev) => ({ ...prev, bikeNumber: e.target.value }))} className="field-input" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-indigo-100">
              Monthly salary
              <input type="number" value={form.monthlySalary} onChange={(e) => setForm((prev) => ({ ...prev, monthlySalary: e.target.value }))} className="field-input" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-indigo-100">
              Status
              <select value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))} className="field-select">
                <option className="bg-slate-900" value="pending">pending</option>
                <option className="bg-slate-900" value="on-route">on-route</option>
                <option className="bg-slate-900" value="completed">completed</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-indigo-100">
              Morning reading
              <input type="number" value={form.morningReading} onChange={(e) => setForm((prev) => ({ ...prev, morningReading: e.target.value }))} className="field-input" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-indigo-100">
              Evening reading
              <input type="number" value={form.eveningReading} onChange={(e) => setForm((prev) => ({ ...prev, eveningReading: e.target.value }))} className="field-input" />
            </label>
          </div>
        </div>
      </Modal>
    </DashboardShell>
  );
}
