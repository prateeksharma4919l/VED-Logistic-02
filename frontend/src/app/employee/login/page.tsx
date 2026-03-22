"use client";

import { RoleLoginExperience } from "@/components/RoleLoginExperience";

export default function EmployeeLoginPage() {
  return (
    <RoleLoginExperience
      role="employee"
      title="Employee login rebuilt for smoother attendance and salary access."
      description="Mark attendance, track salary and advance deductions, and review payment history inside a cleaner, faster personal workspace."
      redirectTo="/employee/dashboard"
      badge="Employee Access"
      accentClassName="from-emerald-400/85 to-lime-300/75"
      accentTextClassName="text-emerald-200/80"
      accentGlowClassName="bg-emerald-400/20"
      quickPoints={[
        "Fast check-in and check-out flow with more focused input styling.",
        "Clear path to salary, advances, reports, and payment history modules.",
        "Mobile-friendly login layout with richer transitions and cleaner hierarchy.",
      ]}
      stats={[
        { label: "Attendance", value: "Quick", note: "Daily mark-in flow is easier to reach and easier to read." },
        { label: "Salary", value: "Live View", note: "Jump into your breakdown, deductions, and payment records." },
        { label: "Access", value: "Personal", note: "Built around employee-specific actions and summaries." },
      ]}
      demoAccess={{
        label: "Employee Demo",
        identifier: "employee01",
        password: "admin123",
      }}
    />
  );
}
