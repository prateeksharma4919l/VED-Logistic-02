"use client";

import { RoleLoginExperience } from "@/components/RoleLoginExperience";

export default function AdminLoginPage() {
  return (
    <RoleLoginExperience
      role="admin"
      title="Admin command center with cleaner control and stronger visual confidence."
      description="Access payroll, bike meter reading, employee management, attendance operations, and report workflows from a richer, workshop-ready login experience."
      redirectTo="/admin/dashboard"
      badge="Admin Access"
      accentClassName="from-ved-500/85 to-fuchsia-400/70"
      accentTextClassName="text-fuchsia-200/80"
      accentGlowClassName="bg-fuchsia-500/20"
      quickPoints={[
        "Review attendance flow, salary status, and advance approvals from one admin lane.",
        "Open bike meter, employee, report, and payroll modules with a cleaner entry experience.",
        "Use seeded demo access locally to test the full workshop build quickly.",
      ]}
      stats={[
        { label: "Control", value: "8+ Modules", note: "Payroll, reports, attendance, bike meter logs, employees, and more." },
        { label: "Visibility", value: "Full", note: "Access the entire system layer from a single login path." },
        { label: "Flow", value: "Premium", note: "Sharper hierarchy, better motion, and faster onboarding feel." },
      ]}
      demoAccess={{
        label: "Admin Demo",
        identifier: "admin",
        password: "admin123",
      }}
    />
  );
}
