"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { createEmployee } from "@/lib/endpoints";
import { adminNavItems } from "@/lib/navigation";

const initialForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  monthlySalary: "",
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
      await createEmployee({
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        monthlySalary: Number(form.monthlySalary) || 0,
      });

      setMessage("Employee account created successfully.");
      setForm(initialForm);
    } catch (error: any) {
      setMessage(error?.message ?? "Unable to create account.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardShell title="User Registration" subtitle="Admin-controlled employee account creation" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <h2 className="panel-title">Create Employee Account</h2>
        <p className="panel-subtitle">
          Set a custom user ID and password. Passwords are stored securely with hashing.
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4 lg:grid-cols-2">
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
