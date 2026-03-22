"use client";

import { useEffect, useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { Modal } from "@/components/Modal";
import { SearchInput } from "@/components/SearchInput";
import {
  createEmployee,
  deleteEmployee,
  Employee,
  updateEmployee,
  useEmployees,
} from "@/lib/endpoints";
import { adminNavItems } from "@/lib/navigation";

const emptyForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  monthlySalary: "",
};

export default function AdminEmployeesPage() {
  useRequireAuth("admin", "/admin/login");

  const { data: employees, mutate, error } = useEmployees();
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!modalOpen) {
      setEditing(null);
      setForm(emptyForm);
    }
  }, [modalOpen]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return (employees ?? []).filter((emp) => {
      if (!q) return true;
      return (
        emp.name.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.username.toLowerCase().includes(q)
      );
    });
  }, [employees, filter]);

  function openEdit(employee: Employee) {
    setEditing(employee);
    setForm({
      name: employee.name,
      username: employee.username,
      email: employee.email,
      password: "",
      monthlySalary: String(employee.monthlySalary ?? 0),
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
        monthlySalary: Number(form.monthlySalary) || 0,
      };

      if (editing) {
        await updateEmployee(editing._id, payload);
      } else {
        await createEmployee({
          name: payload.name,
          username: payload.username,
          email: payload.email,
          password: form.password,
          monthlySalary: payload.monthlySalary,
        });
      }

      await mutate();
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(employee: Employee) {
    if (!window.confirm(`Delete ${employee.name}?`)) return;
    await deleteEmployee(employee._id);
    await mutate();
  }

  return (
    <DashboardShell title="Employees Management" subtitle="Separate employee records with salary control" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="panel-title">Employees</h2>
            <p className="panel-subtitle">Add, edit, and manage employees without affecting riders.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput value={filter} onChange={setFilter} placeholder="Search employees..." />
            <button type="button" onClick={() => setModalOpen(true)} className="action-button bg-gradient-to-r from-ved-500/70 to-ved-300/70">
              Add employee
            </button>
          </div>
        </div>

        {error ? <div className="rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">Failed to load employees.</div> : null}

        <div className="admin-table-scroll overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-[920px] w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Monthly Salary</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{emp.name}</td>
                  <td className="px-4 py-3">{emp.username}</td>
                  <td className="px-4 py-3">{emp.email}</td>
                  <td className="px-4 py-3">Rs. {emp.monthlySalary?.toLocaleString?.() ?? emp.monthlySalary}</td>
                  <td className="px-4 py-3">{new Date(emp.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(emp)} className="ghost-button">Edit</button>
                      <button onClick={() => onDelete(emp)} className="ghost-button border-rose-400/30 text-rose-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        title={editing ? "Edit employee" : "Add employee"}
        onClose={() => setModalOpen(false)}
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="ghost-button">
              Cancel
            </button>
            <button type="button" onClick={onSave} disabled={saving} className="action-button bg-gradient-to-r from-ved-500/70 to-ved-300/70 disabled:opacity-50">
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        }
      >
        <div className="grid gap-4">
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            Full name
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
            Monthly salary
            <input type="number" value={form.monthlySalary} onChange={(e) => setForm((prev) => ({ ...prev, monthlySalary: e.target.value }))} className="field-input" />
          </label>
        </div>
      </Modal>
    </DashboardShell>
  );
}
