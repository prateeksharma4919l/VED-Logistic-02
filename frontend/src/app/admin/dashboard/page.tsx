"use client";

import { useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { StatCard } from "@/components/StatCard";
import { useAdvancePayments, useAttendance, useEmployees, useRiders, useSalary, useSalaryPayments } from "@/lib/endpoints";
import { formatLocalMonth } from "@/lib/dates";
import { adminNavItems } from "@/lib/navigation";

export default function AdminDashboardPage() {
  useRequireAuth("admin", "/admin/login");

  const [month, setMonth] = useState(formatLocalMonth());
  const { data: employees } = useEmployees();
  const { data: riders } = useRiders();
  const { data: salary } = useSalary({ month });
  const { data: payments } = useSalaryPayments({ month });
  const { data: advances } = useAdvancePayments({ month });
  const { data: attendance } = useAttendance({ month });

  const pendingCount = useMemo(
    () => (salary ?? []).filter((item) => item.paymentStatus === "pending").length,
    [salary]
  );
  const paidCount = useMemo(
    () => (payments ?? []).filter((item) => item.status === "paid").length,
    [payments]
  );
  const totalMonthlySalary = useMemo(
    () => (salary ?? []).reduce((sum, item) => sum + item.monthlySalary, 0),
    [salary]
  );
  const totalAdvance = useMemo(
    () => (salary ?? []).reduce((sum, item) => sum + item.advanceDeduction, 0),
    [salary]
  );
  const totalPayable = useMemo(
    () => (salary ?? []).reduce((sum, item) => sum + item.finalSalary, 0),
    [salary]
  );
  const pendingAdvances = useMemo(
    () => (advances ?? []).filter((item) => item.status === "pending").length,
    [advances]
  );
  const openCheckouts = useMemo(
    () => (attendance ?? []).filter((item) => item.status === "present" && item.checkIn && !item.checkOut).length,
    [attendance]
  );
  const recentPayroll = useMemo(
    () =>
      [...(salary ?? [])]
        .sort((left, right) => right.finalSalary - left.finalSalary)
        .slice(0, 6),
    [salary]
  );

  return (
    <DashboardShell title="Admin Dashboard" subtitle="Attendance, salary, and payments control center" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="panel-title">Monthly Operations Snapshot</h2>
            <p className="panel-subtitle">Everything syncs live from the employee and rider modules.</p>
          </div>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="field-input w-full sm:w-52"
          />
        </div>
      </div>

      <StatCard title="Employees" value={employees ? `${employees.length}` : "..."} delta="Live synced roster" />
      <StatCard title="Riders" value={riders ? `${riders.length}` : "..."} delta="Managed separately" />
      <StatCard title="Pending Salaries" value={`${pendingCount}`} delta={`for ${month}`} />
      <StatCard title="Paid Salaries" value={`${paidCount}`} delta={`${openCheckouts} open check-outs`} />

      <div className="glass p-6">
        <h3 className="panel-title">Payroll Overview</h3>
        <p className="panel-subtitle">Simple monthly view: monthly salary, approved advances, and net payroll.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-100/55">Total Monthly Salary</p>
            <p className="mt-3 text-3xl font-semibold text-white">Rs. {totalMonthlySalary.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-100/55">Approved Advance</p>
            <p className="mt-3 text-3xl font-semibold text-white">Rs. {totalAdvance.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-100/55">Net Payroll</p>
            <p className="mt-3 text-3xl font-semibold text-white">Rs. {totalPayable.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-100/55">Pending Advances</p>
            <p className="mt-3 text-3xl font-semibold text-white">{pendingAdvances}</p>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Monthly Salary</th>
                <th className="px-4 py-3">Advance</th>
                <th className="px-4 py-3">Net Salary</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayroll.map((item) => (
                <tr key={`${item.type}-${item.userId}`} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-xs text-indigo-100/60">{item.username}</div>
                  </td>
                  <td className="px-4 py-3 capitalize">{item.type}</td>
                  <td className="px-4 py-3">Rs. {item.monthlySalary.toLocaleString()}</td>
                  <td className="px-4 py-3">Rs. {item.advanceDeduction.toLocaleString()}</td>
                  <td className="px-4 py-3 text-white">Rs. {item.finalSalary.toLocaleString()}</td>
                  <td className="px-4 py-3 capitalize">{item.paymentStatus}</td>
                </tr>
              ))}
              {!recentPayroll.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No payroll records available for this month.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Operations Watchlist</h3>
        <p className="panel-subtitle">Quick checks for approvals, open attendance sessions, and latest advances.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Open Check-outs</p>
            <p className="mt-2 text-3xl font-semibold text-white">{openCheckouts}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Pending Salary Marking</p>
            <p className="mt-2 text-3xl font-semibold text-white">{pendingCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Advance Requests</p>
            <p className="mt-2 text-3xl font-semibold text-white">{(advances ?? []).length}</p>
          </div>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Recent Advance Logs</h3>
        <p className="panel-subtitle">Latest advance activity across employees and riders.</p>
        <div className="mt-5 space-y-3">
          {(advances ?? []).slice(0, 5).map((item) => (
            <div key={item._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{item.userName ?? item.userIdentifier ?? item.userId}</p>
                  <p className="text-xs text-indigo-100/60">{item.type.toUpperCase()} • {new Date(item.date).toLocaleDateString()}</p>
                </div>
                <p className="text-lg font-semibold text-cyan-200">Rs. {item.amount.toLocaleString()}</p>
              </div>
              <p className="mt-2 text-sm text-indigo-100/70">{item.note || "No note provided"}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-indigo-100/50">Status: {item.status}</p>
            </div>
          ))}
          {!advances?.length && <p className="text-sm text-indigo-100/70">No advance logs for this month yet.</p>}
        </div>
      </div>
    </DashboardShell>
  );
}
