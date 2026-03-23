export type ShowcaseMetric = {
  label: string;
  value: string;
  note: string;
};

export type ShowcasePanel = {
  title: string;
  copy: string;
  bullets: string[];
};

export type ShowcaseModule = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  accent: string;
  shadow: string;
  badge: string;
  ctaHref: string;
  ctaLabel: string;
  highlights: string[];
  metrics: ShowcaseMetric[];
  panels: ShowcasePanel[];
};

export const workshopStats: ShowcaseMetric[] = [
  { label: "Project Feel", value: "Premium", note: "Sharpened motion, cleaner spacing, and stronger visual hierarchy." },
  { label: "Main Access", value: "2 Roles", note: "Admin and employee flows stay clear instead of feeling mixed together." },
  { label: "Operations", value: "8+ Modules", note: "Attendance, salary, approvals, bike meter logs, reports, and more." },
];

export const workDetailCards = [
  {
    title: "What This Build Covers",
    copy: "A proper workshop-style logistics product with premium landing, role-based entry, and separate admin workflows.",
  },
  {
    title: "What We Fixed",
    copy: "Mixed pages, unclear entry flow, and scattered option visibility are replaced with a cleaner public-to-dashboard journey.",
  },
  {
    title: "What Stays Consistent",
    copy: "The login experience keeps its stronger premium design, so the new public site feels connected to the workspace.",
  },
  {
    title: "Why It Feels Better",
    copy: "Each major option now has a dedicated detail page, so the first impression reads like a polished product instead of a rough demo.",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Preview the workspace",
    copy: "Start from a proper first page that explains the system, visual direction, and key delivery modules.",
  },
  {
    step: "02",
    title: "Open any module page",
    copy: "Each major option gets its own premium page so users can understand the feature before jumping inside.",
  },
  {
    step: "03",
    title: "Enter the live system",
    copy: "Use the same premium login designs to move into the working admin and employee experience.",
  },
];

export const accessPortals = [
  {
    title: "Admin Access",
    href: "/admin/login",
    badge: "Control",
    accent: "from-ved-500/80 to-fuchsia-400/70",
    shadow: "shadow-fuchsia-500/20",
    description: "Open the command layer for payroll, staff control, bike meter reading, approvals, and reports.",
    points: ["Operations command center", "Approvals and payment control", "Bike meter and records management"],
  },
  {
    title: "Employee Access",
    href: "/employee/login",
    badge: "Personal",
    accent: "from-emerald-400/80 to-cyan-300/70",
    shadow: "shadow-emerald-400/20",
    description: "Move into the cleaner employee workspace for attendance, salary, payment history, and reports.",
    points: ["Attendance actions", "Salary and advances", "Personal records and history"],
  },
];

export const showcaseModules: ShowcaseModule[] = [
  {
    slug: "workspace-preview",
    eyebrow: "Project Overview",
    title: "Premium logistics showcase with a cleaner first impression.",
    summary: "A proper first page that presents the work, system quality, and flow before the user reaches dashboards.",
    detail:
      "This page is the public face of Ved Logistics. It is designed to explain the product, show the premium feel, and guide visitors into focused module pages instead of dumping everything together at once.",
    accent: "from-ved-500/80 via-fuchsia-400/70 to-cyan-300/70",
    shadow: "shadow-fuchsia-500/20",
    badge: "Launch View",
    ctaHref: "/admin/login",
    ctaLabel: "Enter Admin Login",
    highlights: ["Premium first impression", "Clear module discovery", "Stronger CTA flow"],
    metrics: [
      { label: "Entry Flow", value: "Structured", note: "Preview first, then module detail, then system access." },
      { label: "Sections", value: "Multi-Layer", note: "Hero, work details, modules, workflow, and access points." },
      { label: "Feel", value: "Showcase", note: "Closer to a polished delivery site than a temporary mockup." },
    ],
    panels: [
      {
        title: "Hero layer",
        copy: "Bold opening content explains what the product is and why it matters.",
        bullets: ["Clear headline hierarchy", "Premium CTA grouping", "Balanced motion and surfaces"],
      },
      {
        title: "Work details",
        copy: "The build explains what was delivered instead of leaving the user to guess.",
        bullets: ["System scope", "Visual upgrade summary", "Flow improvements"],
      },
      {
        title: "Module access",
        copy: "The first page now points into dedicated module pages, so the public site no longer feels mixed.",
        bullets: ["Option cards", "Detail pages", "Login continuity"],
      },
    ],
  },
  {
    slug: "admin-command",
    eyebrow: "Admin Control",
    title: "Admin command center built around clarity, approvals, and live oversight.",
    summary: "A stronger admin layer for employee records, salary control, attendance review, and operational actions.",
    detail:
      "The admin experience is framed as the central operations command for the business. It keeps the system readable while still surfacing payroll, approvals, records, and bike meter workflows in one place.",
    accent: "from-rose-400/80 via-fuchsia-400/70 to-ved-500/75",
    shadow: "shadow-rose-500/20",
    badge: "Admin Layer",
    ctaHref: "/admin/login",
    ctaLabel: "Open Admin Access",
    highlights: ["Control-first layout", "Approval visibility", "Separate operational pages"],
    metrics: [
      { label: "Coverage", value: "Full", note: "Registration, attendance, salary, reports, and approvals." },
      { label: "Readability", value: "High", note: "Important numbers stay visible without making the screen feel crowded." },
      { label: "Action Flow", value: "Direct", note: "Admin work stays one or two clicks away." },
    ],
    panels: [
      {
        title: "Snapshot layer",
        copy: "Critical monthly stats stay in view so the operator can decide quickly.",
        bullets: ["Employee count", "Pending salaries", "Advance activity"],
      },
      {
        title: "Dedicated modules",
        copy: "Each key admin function lives on its own page to reduce clutter and confusion.",
        bullets: ["Attendance page", "Salary page", "Bike meter page"],
      },
      {
        title: "Command motion",
        copy: "The visual system keeps the admin workspace feeling premium without reducing usability.",
        bullets: ["Sticky top bar", "Focused cards", "Consistent gradients"],
      },
    ],
  },
  {
    slug: "employee-workspace",
    eyebrow: "Employee Flow",
    title: "Employee workspace designed for quick actions and personal clarity.",
    summary: "A cleaner employee side for daily attendance, monthly pay status, advances, and records.",
    detail:
      "The employee flow is meant to be calmer and more direct than the admin side. It focuses on daily actions, personal summaries, and low-friction access to what matters most.",
    accent: "from-emerald-400/80 via-cyan-300/70 to-sky-300/70",
    shadow: "shadow-emerald-400/20",
    badge: "Employee Lane",
    ctaHref: "/employee/login",
    ctaLabel: "Open Employee Access",
    highlights: ["Simple action flow", "Personal summaries", "Cleaner record view"],
    metrics: [
      { label: "Daily Actions", value: "Fast", note: "Check-in, check-out, and absent status are front and center." },
      { label: "Payroll View", value: "Readable", note: "Salary, advance deduction, and payment state stay easy to follow." },
      { label: "Records", value: "Personal", note: "History stays focused on the signed-in employee only." },
    ],
    panels: [
      {
        title: "Action-first start",
        copy: "The first employee screen supports immediate attendance actions before deeper reading.",
        bullets: ["Quick buttons", "Current day status", "Live feedback messages"],
      },
      {
        title: "Monthly context",
        copy: "Users can understand their numbers without opening multiple unrelated screens.",
        bullets: ["Salary card", "Advance history", "Payment status"],
      },
      {
        title: "Consistency",
        copy: "The employee flow uses the same premium language as the public and login layers.",
        bullets: ["Shared styling", "Cleaner cards", "Better continuity"],
      },
    ],
  },
  {
    slug: "attendance-flow",
    eyebrow: "Attendance Module",
    title: "Attendance flow organized into separate review, action, and history pages.",
    summary: "A more structured attendance system for admin review and employee daily use.",
    detail:
      "Attendance no longer feels buried under mixed content. It has a clearer identity, stronger monthly control, and easier editing for admins while employees still get fast daily actions.",
    accent: "from-amber-400/80 via-orange-300/70 to-rose-300/70",
    shadow: "shadow-amber-400/20",
    badge: "Attendance",
    ctaHref: "/admin/attendance",
    ctaLabel: "Open Attendance Module",
    highlights: ["Monthly controls", "Edit-friendly admin view", "Fast employee actions"],
    metrics: [
      { label: "Admin Review", value: "Focused", note: "Only the necessary filters and fields stay visible." },
      { label: "Employee Use", value: "Quick", note: "Daily attendance actions remain easy and direct." },
      { label: "History", value: "Readable", note: "Recent records are easier to scan and trust." },
    ],
    panels: [
      {
        title: "Monthly filtering",
        copy: "The system keeps attendance anchored to a clear month instead of spreading it everywhere.",
        bullets: ["Month picker", "Clean record tables", "Action feedback"],
      },
      {
        title: "Manual control",
        copy: "Admins can create, edit, and remove attendance entries from a dedicated page.",
        bullets: ["Modal editing", "Status control", "Timeline fields"],
      },
      {
        title: "Operational clarity",
        copy: "Attendance works as a system module, not as an afterthought mixed into unrelated areas.",
        bullets: ["Clear role split", "Single-purpose page", "Less visual noise"],
      },
    ],
  },
  {
    slug: "payroll-system",
    eyebrow: "Payroll Control",
    title: "Payroll pages separated cleanly for salary, advances, and payment history.",
    summary: "A stronger payroll system with cleaner monthly summaries and distinct financial pages.",
    detail:
      "Salary, advances, and payment history now read like parts of one polished payroll system rather than disconnected cards. The admin side gets more control, and the employee side gets clearer visibility.",
    accent: "from-cyan-400/80 via-sky-300/70 to-indigo-300/70",
    shadow: "shadow-cyan-400/20",
    badge: "Payroll",
    ctaHref: "/admin/salary",
    ctaLabel: "Open Payroll Pages",
    highlights: ["Cleaner monthly payroll", "Dedicated financial pages", "Approval-ready structure"],
    metrics: [
      { label: "Salary View", value: "Monthly", note: "Net payable and deductions are easier to read at a glance." },
      { label: "Advance Flow", value: "Managed", note: "Requests, approvals, and edits stay in their own lane." },
      { label: "Payment History", value: "Stored", note: "Final paid records remain easy to review and verify." },
    ],
    panels: [
      {
        title: "Salary snapshot",
        copy: "Core payroll numbers stay visible without overwhelming the user.",
        bullets: ["Monthly total", "Advance deduction", "Payment state"],
      },
      {
        title: "Advance approvals",
        copy: "Approvals stay deliberate and easier to manage because the page is dedicated to them.",
        bullets: ["Search and filters", "Edit path", "Approve or reject"],
      },
      {
        title: "History retention",
        copy: "Final payout records remain on their own page for cleaner auditing and follow-up.",
        bullets: ["Stored records", "Status toggles", "Deletion control"],
      },
    ],
  },
  {
    slug: "bike-meter-reading",
    eyebrow: "Bike Meter Module",
    title: "Bike meter reading turned into a proper standalone admin experience.",
    summary: "A dedicated module for bike number, morning meter, evening meter, distance, and status tracking.",
    detail:
      "Instead of showing a rider flow, the system now promotes a clearer bike meter reading module. It works like a proper admin tool with totals, tables, and entry management.",
    accent: "from-lime-300/80 via-emerald-300/70 to-cyan-300/70",
    shadow: "shadow-emerald-400/20",
    badge: "Bike Meter",
    ctaHref: "/admin/riders",
    ctaLabel: "Open Bike Meter Reading",
    highlights: ["Dedicated bike log page", "Distance tracking", "Cleaner admin language"],
    metrics: [
      { label: "Entries", value: "Separate", note: "Bike meter logs no longer hide behind unrelated rider wording." },
      { label: "Tracking", value: "Morning to Night", note: "Start and end meter values calculate a clearer running distance." },
      { label: "Visibility", value: "Operational", note: "Open, pending, and completed status remain easy to monitor." },
    ],
    panels: [
      {
        title: "Log overview",
        copy: "The admin can see counts and distance at the top before touching the table.",
        bullets: ["Total bikes", "Running distance", "Open vs pending"],
      },
      {
        title: "Entry management",
        copy: "The module supports dedicated creation and editing instead of being hidden in mixed forms.",
        bullets: ["Operator name", "Bike number", "Meter readings"],
      },
      {
        title: "Cleaner positioning",
        copy: "The system language now matches what the page actually does.",
        bullets: ["Bike meter wording", "Operational focus", "Improved first impression"],
      },
    ],
  },
  {
    slug: "reporting-center",
    eyebrow: "Reporting",
    title: "Reporting pages framed as polished exports, summaries, and admin references.",
    summary: "A reporting center that feels connected to the rest of the product instead of tacked on.",
    detail:
      "Reports matter more when the surrounding product gives them context. This module shows how exports, daily summaries, and records can live inside a better visual system.",
    accent: "from-indigo-400/80 via-violet-300/70 to-cyan-300/70",
    shadow: "shadow-indigo-500/20",
    badge: "Reports",
    ctaHref: "/admin/reports",
    ctaLabel: "Open Reporting Center",
    highlights: ["Summary generation", "Export language", "Connected admin context"],
    metrics: [
      { label: "Use Case", value: "Operational", note: "Daily and monthly reporting flows stay product-oriented." },
      { label: "Exports", value: "Ready", note: "PDF or summary actions stay visible and understandable." },
      { label: "Placement", value: "Integrated", note: "Reports feel like part of the workspace instead of an extra screen." },
    ],
    panels: [
      {
        title: "Summary layer",
        copy: "The reporting module makes daily summary generation feel like a finished feature.",
        bullets: ["Generated reports", "Operational summary", "Clear admin copy"],
      },
      {
        title: "Export flow",
        copy: "Export actions belong inside a premium system instead of on a plain utility screen.",
        bullets: ["PDF action", "Recent report awareness", "Simple controls"],
      },
      {
        title: "System fit",
        copy: "Reports now connect properly with the rest of the dashboard family and the public site.",
        bullets: ["Consistent cards", "Shared visual language", "Cleaner narrative"],
      },
    ],
  },
];

export function getShowcaseModule(slug: string) {
  return showcaseModules.find((item) => item.slug === slug);
}
