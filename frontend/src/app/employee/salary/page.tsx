"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useSalary, useSalaryPayments } from "@/lib/endpoints";
import { useRequireAuth } from "@/lib/auth";
import { formatLocalMonth } from "@/lib/dates";
import { employeeNavItems } from "@/lib/navigation";

export default function EmployeeSalaryPage() {
  useRequireAuth("employee", "/employee/login");

  const [month, setMonth] = useState(formatLocalMonth());
  const { data: salary } = useSalary({ type: "employee", month });
  const { data: payments } = useSalaryPayments({ type: "employee", month });

  const salaryCard = salary?.[0];
  const payment = payments?.[0];

  return (
    <DashboardShell title="Salary" subtitle="Monthly salary, approved advance, and final payable amount" items={employeeNavItems}>
      <div className="glass col-span-full p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="panel-title">Monthly Salary Summary</h2>
            <p className="panel-subtitle">Approved advances are deducted automatically as soon as admin approves them.</p>
          </div>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input w-full lg:w-56" />
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Salary Overview</h3>
        <p className="panel-subtitle">Simple monthly payroll view for the selected month.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Monthly Salary</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {salaryCard?.monthlySalary?.toLocaleString() ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Approved Advance</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {salaryCard?.advanceDeduction?.toLocaleString() ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Final Payable</p>
            <p className="mt-2 text-3xl font-semibold text-white">Rs. {salaryCard?.finalSalary?.toLocaleString() ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Breakdown</h3>
        <div className="mt-5 space-y-3 text-sm text-indigo-100/75">
          <div className="flex items-center justify-between"><span>Monthly Salary</span><span>Rs. {salaryCard?.monthlySalary?.toLocaleString() ?? 0}</span></div>
          <div className="flex items-center justify-between"><span>Advance Deduction</span><span>Rs. {salaryCard?.advanceDeduction?.toLocaleString() ?? 0}</span></div>
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-white"><span>Final Payable</span><span>Rs. {salaryCard?.finalSalary?.toLocaleString() ?? 0}</span></div>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Payment Status</h3>
        <p className="panel-subtitle">Latest salary payment record for the selected month.</p>
        <div className="mt-5 space-y-4 text-sm text-indigo-100/75">
          <div className="flex items-center justify-between">
            <span>Status</span>
            <StatusBadge status={payment?.status ?? salaryCard?.paymentStatus ?? "pending"} />
          </div>
          <div className="flex items-center justify-between"><span>Payment Date</span><span>{payment?.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "-"}</span></div>
          <div className="flex items-center justify-between"><span>Final Paid Amount</span><span>Rs. {payment?.finalPaidAmount?.toLocaleString() ?? salaryCard?.finalSalary?.toLocaleString() ?? 0}</span></div>
        </div>
      </div>
    </DashboardShell>
  );
}
