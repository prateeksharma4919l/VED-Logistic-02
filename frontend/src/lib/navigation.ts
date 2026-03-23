export const adminNavItems = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/user-registration", label: "User Registration" },
  { href: "/admin/employees", label: "Employees" },
  { href: "/admin/riders", label: "Bike Meter Reading" },
  { href: "/admin/attendance", label: "Attendance" },
  { href: "/admin/salary", label: "Salary" },
  { href: "/admin/advance-payments", label: "Advance Payments" },
  { href: "/admin/payment-history", label: "Payment History" },
  { href: "/admin/reports", label: "Reports" },
];

export const adminDashboardModules = [
  {
    href: "/admin/user-registration",
    label: "User Registration",
    eyebrow: "Account Setup",
    summary: "Create new employee accounts with login access, salary setup, and basic onboarding details.",
    accent: "from-ved-500/70 to-fuchsia-400/70",
  },
  {
    href: "/admin/employees",
    label: "Employees",
    eyebrow: "Team Records",
    summary: "Manage employee profiles, search records, edit salary details, and control roster data.",
    accent: "from-cyan-500/70 to-sky-300/70",
  },
  {
    href: "/admin/riders",
    label: "Bike Meter Reading",
    eyebrow: "Field Movement",
    summary: "Track bike numbers, morning and evening meter readings, and daily distance logs.",
    accent: "from-emerald-500/70 to-cyan-300/70",
  },
  {
    href: "/admin/attendance",
    label: "Attendance",
    eyebrow: "Shift Control",
    summary: "Review present and absent status, edit time logs, and monitor attendance month by month.",
    accent: "from-amber-500/70 to-orange-300/70",
  },
  {
    href: "/admin/salary",
    label: "Salary",
    eyebrow: "Payroll",
    summary: "See salary totals, approved deductions, payable amounts, and mark payouts as paid.",
    accent: "from-indigo-500/70 to-cyan-300/70",
  },
  {
    href: "/admin/advance-payments",
    label: "Advance Payments",
    eyebrow: "Approvals",
    summary: "Approve, reject, edit, and track employee advance requests with salary deduction visibility.",
    accent: "from-rose-500/70 to-orange-300/70",
  },
  {
    href: "/admin/payment-history",
    label: "Payment History",
    eyebrow: "Records",
    summary: "Review stored payout records, toggle payment status, and keep final disbursement history clean.",
    accent: "from-slate-500/70 to-indigo-300/70",
  },
  {
    href: "/admin/reports",
    label: "Reports",
    eyebrow: "Exports",
    summary: "Generate daily summaries, export PDF reports, and keep operations reporting in one place.",
    accent: "from-violet-500/70 to-fuchsia-300/70",
  },
] as const;

export const employeeNavItems = [
  { href: "/employee/dashboard", label: "Dashboard" },
  { href: "/employee/attendance", label: "Attendance" },
  { href: "/employee/salary", label: "Salary" },
  { href: "/employee/advance-payments", label: "Advance Payments" },
  { href: "/employee/payment-history", label: "Payment History" },
  { href: "/employee/reports", label: "Reports" },
];

export const riderNavItems = [
  { href: "/rider/dashboard", label: "Dashboard" },
  { href: "/rider/attendance", label: "Attendance" },
  { href: "/rider/salary", label: "Salary" },
  { href: "/rider/advance-payments", label: "Advance Payments" },
  { href: "/rider/payment-history", label: "Payment History" },
  { href: "/rider/reports", label: "Reports" },
];
