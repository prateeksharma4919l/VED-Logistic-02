"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { createEmployee, createRider } from "@/lib/endpoints";
import { adminNavItems } from "@/lib/navigation";

const initialForm = {
  role: "employee",
  name: "",
  username: "",
  email: "",
  password: "",
  monthlySalary: "",
  bikeNumber: "",
};

export default function AdminUserRegistrationPage() {
  useRequireAuth("admin", "/admin/login");

  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      if (form.role === "employee") {
        await createEmployee({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
          monthlySalary: Number(form.monthlySalary) || 0,
        });
      } else {
        await createRider({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
          bikeNumber: form.bikeNumber,
          monthlySalary: Number(form.monthlySalary) || 0,
          morningReading: 0,
          eveningReading: 0,
          status: "pending",
        });
      }

      setMessage(`${form.role === "employee" ? "Employee" : "Rider"} account created successfully.`);
      setForm(initialForm);
    } catch (error: any) {
      setMessage(error?.message ?? "Unable to create account.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardShell title="User Registration" subtitle="Admin-controlled employee and rider account creation" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <h2 className="panel-title">Create New User</h2>
        <p className="panel-subtitle">
          Set a custom user ID and password. Passwords are stored securely with hashing.
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4 lg:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            Role
            <select value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))} className="field-select">
              <option className="bg-slate-900" value="employee">Employee</option>
              <option className="bg-slate-900" value="rider">Rider</option>
            </select>
          </label>
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
            Password
            <input type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} className="field-input" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-indigo-100">
            Monthly salary
            <input type="number" value={form.monthlySalary} onChange={(e) => setForm((prev) => ({ ...prev, monthlySalary: e.target.value }))} className="field-input" />
          </label>

          {form.role === "rider" ? (
            <label className="flex flex-col gap-2 text-sm text-indigo-100 lg:col-span-2">
              Bike number
              <input value={form.bikeNumber} onChange={(e) => setForm((prev) => ({ ...prev, bikeNumber: e.target.value }))} className="field-input" />
            </label>
          ) : null}

          {message ? (
            <div className="lg:col-span-2 rounded-xl bg-white/5 px-4 py-3 text-sm text-indigo-100/80">{message}</div>
          ) : null}

          <div className="lg:col-span-2 flex justify-end">
            <button type="submit" disabled={saving} className="action-button bg-gradient-to-r from-ved-500/70 to-cyan-300/70 disabled:opacity-50">
              {saving ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
