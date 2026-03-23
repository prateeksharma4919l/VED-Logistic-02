"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { StatCard } from "@/components/StatCard";
import { useAdvancePayments, useAttendance, useEmployees, useRiders, useSalary, useSalaryPayments } from "@/lib/endpoints";
import { formatLocalMonth } from "@/lib/dates";
import { adminDashboardModules, adminNavItems } from "@/lib/navigation";

export default function AdminDashboardPage() {
  useRequireAuth("admin", "/admin/login");

  const [month, setMonth] = useState(formatLocalMonth());
  const { data: employees } = useEmployees();
  const { data: bikeMeters } = useRiders();
  const { data: salary } = useSalary({ month, type: "employee" });
  const { data: payments } = useSalaryPayments({ month, type: "employee" });
  const { data: advances } = useAdvancePayments({ month, type: "employee" });
  const { data: attendance } = useAttendance({ month, type: "employee" });

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
  const payrollCards = [
    {
      label: "Total Monthly Salary",
      prefix: "Rs.",
      value: totalMonthlySalary.toLocaleString(),
      helper: "Combined salary commitment for active employees.",
    },
    {
      label: "Approved Advance",
      prefix: "Rs.",
      value: totalAdvance.toLocaleString(),
      helper: "Approved salary advances already adjusted in payroll.",
    },
    {
      label: "Net Payroll",
      prefix: "Rs.",
      value: totalPayable.toLocaleString(),
      helper: "Final payable amount after advance deductions.",
    },
    {
      label: "Pending Advances",
      value: `${pendingAdvances}`,
      helper: "Advance requests waiting for admin approval.",
    },
  ];

  return (
    <DashboardShell title="Admin Dashboard" subtitle="Attendance, salary, and payments control center" items={adminNavItems}>
      <div className="glass col-span-full p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="panel-title">Monthly Operations Snapshot</h2>
            <p className="panel-subtitle">Everything syncs live from employee records and bike meter logs.</p>
          </div>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="field-input w-full sm:w-52"
          />
        </div>
      </div>

      <StatCard title="Employees" value={employees ? `${employees.length}` : "..."} delta="Live synced roster" href="/admin/employees" />
      <StatCard title="Bike Meter Entries" value={bikeMeters ? `${bikeMeters.length}` : "..."} delta="Morning and evening tracking" href="/admin/riders" />
      <StatCard title="Pending Salaries" value={`${pendingCount}`} delta={`for ${month}`} href="/admin/salary" />
      <StatCard title="Paid Salaries" value={`${paidCount}`} delta={`${openCheckouts} open check-outs`} href="/admin/payment-history" />

      <div className="glass col-span-full p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="panel-title">Admin Modules</h3>
            <p className="panel-subtitle">Dashboard se har admin option ka direct separate page open hota hai, taaki koi module mix na lage.</p>
          </div>
          <Link
            href="/admin/user-registration"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-ved-500/70 to-cyan-300/70 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
          >
            Create new account
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {adminDashboardModules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.07]"
            >
              <div className={`inline-flex rounded-full bg-gradient-to-r ${module.accent} px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white`}>
                {module.eyebrow}
              </div>
              <h4 className="mt-4 text-xl font-semibold text-white">{module.label}</h4>
              <p className="mt-3 text-sm leading-7 text-indigo-100/74">{module.summary}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70">Open separate page</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="glass p-6 lg:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="panel-title">Payroll Overview</h3>
            <p className="panel-subtitle">Monthly salary, approved deductions, and final payable amount in a cleaner summary view.</p>
          </div>
          <Link href="/admin/salary" className="ghost-button whitespace-nowrap">
            Open salary page
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {payrollCards.map((card) => (
            <div key={card.label} className="min-w-0 rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5">
              <p className="text-[11px] font-semibold uppercase leading-5 tracking-[0.18em] text-indigo-100/55">
                {card.label}
              </p>
              <div className="mt-4 min-w-0">
                {card.prefix ? (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
                    {card.prefix}
                  </span>
                ) : null}
                <p className="mt-2 break-words text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-none tracking-tight text-white tabular-nums">
                  {card.value}
                </p>
              </div>
              <p className="mt-3 text-xs leading-6 text-indigo-100/60">{card.helper}</p>
            </div>
          ))}
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="panel-title">Operations Watchlist</h3>
            <p className="panel-subtitle">Quick checks for approvals, open attendance sessions, and latest advances.</p>
          </div>
          <Link href="/admin/attendance" className="ghost-button whitespace-nowrap">
            Open attendance
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Link href="/admin/attendance" className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <p className="text-sm text-indigo-100/60">Open Check-outs</p>
            <p className="mt-2 text-3xl font-semibold text-white">{openCheckouts}</p>
          </Link>
          <Link href="/admin/salary" className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <p className="text-sm text-indigo-100/60">Pending Salary Marking</p>
            <p className="mt-2 text-3xl font-semibold text-white">{pendingCount}</p>
          </Link>
          <Link href="/admin/advance-payments" className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <p className="text-sm text-indigo-100/60">Advance Requests</p>
            <p className="mt-2 text-3xl font-semibold text-white">{(advances ?? []).length}</p>
          </Link>
        </div>
        <div className="mt-5 grid gap-3">
          <Link href="/admin/reports" className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 px-4 py-4 text-sm text-cyan-100 transition hover:bg-cyan-400/15">
            Review reports and export latest admin summary
          </Link>
          <Link href="/admin/payment-history" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-indigo-100/80 transition hover:bg-white/10">
            Open payment history for final payout records
          </Link>
        </div>
      </div>

      <div className="glass p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="panel-title">Recent Advance Logs</h3>
            <p className="panel-subtitle">Latest advance activity across employee payroll records.</p>
          </div>
          <Link href="/admin/advance-payments" className="ghost-button whitespace-nowrap">
            Open advance page
          </Link>
        </div>
        <div className="mt-5 space-y-3">
          {(advances ?? []).slice(0, 5).map((item) => (
            <div key={item._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{item.userName ?? item.userIdentifier ?? item.userId}</p>
                  <p className="text-xs text-indigo-100/60">{item.type.toUpperCase()} | {new Date(item.date).toLocaleDateString()}</p>
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
