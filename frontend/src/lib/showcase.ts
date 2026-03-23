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
  { label: "Location", value: "Kota, Rajasthan", note: "Ved Logistics operates as an authorized DTDC partner desk for courier bookings and pickup coordination." },
  { label: "Global Reach", value: "220+ Destinations", note: "Domestic parcel movement plus international courier support through the DTDC-connected network." },
  { label: "Contact", value: "7300187325", note: "Call for parcel booking, doorstep pickup, tracking help, and e-commerce shipment support." },
];

export const workDetailCards = [
  {
    title: "DTDC Partner Services",
    copy: "Ved Logistics first page now clearly presents DTDC courier booking, domestic shipping, international support, pickup requests, and delivery guidance.",
  },
  {
    title: "E-Commerce Shipment Support",
    copy: "COD orders, return packets, inventory-linked dispatch flow, and repeat business shipments all have a proper place in the service structure.",
  },
  {
    title: "Office and Team Control",
    copy: "Admin and employee portals stay connected for attendance, salary, advance approvals, bike meter readings, and daily operational records.",
  },
  {
    title: "Tracking, PUDO, and Reporting",
    copy: "Shipment follow-up, real-time tracking, PUDO convenience, payout status, field movement, and reporting visibility are shown in a cleaner way.",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Check courier services first",
    copy: "First page ab Ved Logistics aur DTDC partner services ke bare me clear detail deta hai: booking, pickup, domestic shipping, international support, aur tracking.",
  },
  {
    step: "02",
    title: "Open service and operations pages",
    copy: "Har important option ka alag page hai, taaki services, payroll, attendance, route logs, aur shipment workflow sab properly samajh aaye.",
  },
  {
    step: "03",
    title: "Team login and manage work",
    copy: "Admin aur employee login se daily operations, salary, attendance, approvals, aur reports directly manage kiye ja sakte hain.",
  },
];

export const accessPortals = [
  {
    title: "Admin Access",
    href: "/admin/login",
    badge: "Control",
    accent: "from-ved-500/80 to-fuchsia-400/70",
    shadow: "shadow-fuchsia-500/20",
    description: "Admin desk se courier operations, staff attendance, payroll, approvals, bike meter reading, and daily reporting manage hota hai.",
    points: ["Dispatch and payroll control", "Staff records and approvals", "Bike meter and movement logs"],
  },
  {
    title: "Employee Access",
    href: "/employee/login",
    badge: "Personal",
    accent: "from-emerald-400/80 to-cyan-300/70",
    shadow: "shadow-emerald-400/20",
    description: "Employee side se attendance, salary details, advance history, and daily operational records easily dekhe ja sakte hain.",
    points: ["Attendance and shift actions", "Salary and advance records", "Daily work visibility"],
  },
];

export const showcaseModules: ShowcaseModule[] = [
  {
    slug: "workspace-preview",
    eyebrow: "Service Profile",
    title: "Ved Logistics now opens with DTDC courier details, Kota office information, and business-first service clarity.",
    summary: "The first page explains domestic shipping, international courier support, pickup requests, tracking, e-commerce services, and internal logistics flow.",
    detail:
      "This page works as the public service profile of Ved Logistics. It introduces the Kota, Rajasthan branch as an authorized DTDC partner, explains what kind of shipments are handled, and then routes visitors into clear service and team operation pages.",
    accent: "from-ved-500/80 via-fuchsia-400/70 to-cyan-300/70",
    shadow: "shadow-fuchsia-500/20",
    badge: "Service View",
    ctaHref: "/preview/index.html",
    ctaLabel: "Open Static Preview",
    highlights: ["Kota office profile", "DTDC courier details", "Clear visitor to team flow"],
    metrics: [
      { label: "Location", value: "Kota, Rajasthan", note: "The page now clearly identifies the branch and partner position." },
      { label: "Network", value: "220+ Destinations", note: "International courier support is surfaced instead of hidden behind generic copy." },
      { label: "Contact", value: "7300187325", note: "Visitors can quickly find the main service number for bookings and pickups." },
    ],
    panels: [
      {
        title: "Service introduction",
        copy: "Top hero now introduces Ved Logistics as a Kota-based DTDC courier and dispatch support desk.",
        bullets: ["Courier services", "Pickup and parcel flow", "Contact visibility"],
      },
      {
        title: "Customer-facing details",
        copy: "The public layer tells customers what the business handles instead of using vague generic copy.",
        bullets: ["Domestic courier", "International support", "E-commerce shipments"],
      },
      {
        title: "Operations continuity",
        copy: "After service details, the page still connects smoothly into internal admin and employee operations.",
        bullets: ["Dedicated option pages", "Login continuity", "Clean navigation flow"],
      },
    ],
  },
  {
    slug: "admin-command",
    eyebrow: "Admin Control",
    title: "Admin command center for courier desk operations, staff control, and finance visibility.",
    summary: "The admin side manages employee records, payroll, attendance, bike meter reading, approvals, and reporting.",
    detail:
      "The admin experience acts like the central control room for Ved Logistics. From here the business can supervise salary, attendance, advance approvals, bike movement, and daily courier operations without the interface feeling cluttered.",
    accent: "from-rose-400/80 via-fuchsia-400/70 to-ved-500/75",
    shadow: "shadow-rose-500/20",
    badge: "Admin Layer",
    ctaHref: "/admin/login",
    ctaLabel: "Open Admin Access",
    highlights: ["Courier desk control", "Approval visibility", "Separate operational pages"],
    metrics: [
      { label: "Coverage", value: "Full", note: "Staff records, attendance, salary, logs, approvals, and reports." },
      { label: "Readability", value: "High", note: "Important courier and payroll numbers remain easy to read." },
      { label: "Action Flow", value: "Direct", note: "Core admin actions stay close without visual confusion." },
    ],
    panels: [
      {
        title: "Operations snapshot",
        copy: "Top-level cards help the operator read staffing, payroll, and movement status quickly.",
        bullets: ["Employee count", "Pending payroll", "Advance activity"],
      },
      {
        title: "Dedicated controls",
        copy: "Every important function has its own page so the control layer stays clear.",
        bullets: ["Attendance page", "Salary page", "Bike meter page"],
      },
      {
        title: "Desk usability",
        copy: "The workspace keeps a premium look while staying practical for real daily operations.",
        bullets: ["Sticky top bar", "Focused cards", "Fast operator flow"],
      },
    ],
  },
  {
    slug: "employee-workspace",
    eyebrow: "Employee Flow",
    title: "Employee workspace designed for attendance, salary clarity, and daily courier support work.",
    summary: "The employee side keeps daily actions simple while still showing salary, advance history, and personal records.",
    detail:
      "The employee flow is calmer than the admin layer. It focuses on shift start and end actions, salary visibility, advance history, and personal daily records tied to regular operations.",
    accent: "from-emerald-400/80 via-cyan-300/70 to-sky-300/70",
    shadow: "shadow-emerald-400/20",
    badge: "Employee Lane",
    ctaHref: "/employee/login",
    ctaLabel: "Open Employee Access",
    highlights: ["Simple action flow", "Personal salary view", "Cleaner record access"],
    metrics: [
      { label: "Daily Actions", value: "Fast", note: "Check-in, check-out, and absent status are front and center." },
      { label: "Payroll View", value: "Readable", note: "Salary, advance deduction, and payment state stay easy to follow." },
      { label: "Records", value: "Personal", note: "History remains focused on the signed-in staff member only." },
    ],
    panels: [
      {
        title: "Action-first start",
        copy: "The first employee screen supports immediate shift and attendance actions.",
        bullets: ["Quick buttons", "Current day status", "Live feedback messages"],
      },
      {
        title: "Monthly context",
        copy: "Salary and advance records stay understandable without jumping through mixed pages.",
        bullets: ["Salary card", "Advance history", "Payment status"],
      },
      {
        title: "Consistency",
        copy: "The employee flow keeps the same premium visual language as the public service page and login screens.",
        bullets: ["Shared styling", "Cleaner cards", "Better continuity"],
      },
    ],
  },
  {
    slug: "attendance-flow",
    eyebrow: "Attendance Module",
    title: "Attendance flow organized clearly for courier desk staff and field team usage.",
    summary: "A structured attendance system helps admins review staff activity while employees complete daily actions quickly.",
    detail:
      "Attendance now has its own clear identity. Admins can track monthly presence, while employees can mark daily status without digging through unrelated screens.",
    accent: "from-amber-400/80 via-orange-300/70 to-rose-300/70",
    shadow: "shadow-amber-400/20",
    badge: "Attendance",
    ctaHref: "/admin/attendance",
    ctaLabel: "Open Attendance Module",
    highlights: ["Monthly controls", "Edit-friendly admin view", "Fast daily actions"],
    metrics: [
      { label: "Admin Review", value: "Focused", note: "Only the necessary filters and fields stay visible." },
      { label: "Employee Use", value: "Quick", note: "Daily attendance actions remain easy and direct." },
      { label: "History", value: "Readable", note: "Recent records are easier to scan and trust." },
    ],
    panels: [
      {
        title: "Monthly filtering",
        copy: "The attendance module stays anchored to a clear month instead of spreading records across mixed screens.",
        bullets: ["Month picker", "Clean record tables", "Action feedback"],
      },
      {
        title: "Manual control",
        copy: "Admins can create, edit, and remove entries from one dedicated page.",
        bullets: ["Modal editing", "Status control", "Timeline fields"],
      },
      {
        title: "Operational clarity",
        copy: "Attendance feels like a real operations module rather than an afterthought.",
        bullets: ["Clear role split", "Single-purpose page", "Less visual noise"],
      },
    ],
  },
  {
    slug: "payroll-system",
    eyebrow: "Payroll Control",
    title: "Payroll pages separated cleanly for staff salary, advances, and payout records.",
    summary: "Salary, advance deductions, and payment history stay structured for real logistics team management.",
    detail:
      "Salary, advances, and payment history now behave like one complete payroll system. Admins can supervise payouts clearly, and employees can understand their numbers without confusion.",
    accent: "from-cyan-400/80 via-sky-300/70 to-indigo-300/70",
    shadow: "shadow-cyan-400/20",
    badge: "Payroll",
    ctaHref: "/admin/salary",
    ctaLabel: "Open Payroll Pages",
    highlights: ["Cleaner payroll cards", "Dedicated financial pages", "Approval-ready structure"],
    metrics: [
      { label: "Salary View", value: "Monthly", note: "Net payable and deductions are easier to read at a glance." },
      { label: "Advance Flow", value: "Managed", note: "Requests, approvals, and edits stay in their own lane." },
      { label: "Payment History", value: "Stored", note: "Final paid records remain easy to review and verify." },
    ],
    panels: [
      {
        title: "Salary snapshot",
        copy: "Core payroll numbers stay visible without the cards breaking or crowding the layout.",
        bullets: ["Monthly total", "Advance deduction", "Payment state"],
      },
      {
        title: "Advance approvals",
        copy: "Approvals remain deliberate and easier to manage because the page is dedicated to them.",
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
    title: "Bike meter reading turned into a proper route and movement tracking module.",
    summary: "A dedicated page now handles bike number, morning meter, evening meter, distance, and trip status cleanly.",
    detail:
      "Instead of a confusing rider-facing flow, the system now uses a proper bike meter module for delivery movement tracking and operational record keeping.",
    accent: "from-lime-300/80 via-emerald-300/70 to-cyan-300/70",
    shadow: "shadow-emerald-400/20",
    badge: "Bike Meter",
    ctaHref: "/admin/riders",
    ctaLabel: "Open Bike Meter Reading",
    highlights: ["Dedicated bike log page", "Distance tracking", "Cleaner route language"],
    metrics: [
      { label: "Entries", value: "Separate", note: "Bike meter logs no longer hide behind unrelated rider wording." },
      { label: "Tracking", value: "Morning to Night", note: "Start and end meter values calculate a clearer running distance." },
      { label: "Visibility", value: "Operational", note: "Open, pending, and completed movement status stays easy to monitor." },
    ],
    panels: [
      {
        title: "Log overview",
        copy: "The operator can see counts and distance totals before going into the entry table.",
        bullets: ["Total bikes", "Running distance", "Open vs pending"],
      },
      {
        title: "Entry management",
        copy: "The module supports dedicated creation and editing instead of hiding inside mixed forms.",
        bullets: ["Operator name", "Bike number", "Meter readings"],
      },
      {
        title: "Cleaner positioning",
        copy: "The language now matches the real work of route movement and field tracking.",
        bullets: ["Bike meter wording", "Operational focus", "Improved first impression"],
      },
    ],
  },
  {
    slug: "reporting-center",
    eyebrow: "Reporting",
    title: "Reporting pages framed as dispatch summaries, payroll references, and daily admin reports.",
    summary: "The reporting center keeps daily operations, salary visibility, and summary exports in one clean area.",
    detail:
      "Reports matter more when they sit inside a proper operations system. This module keeps daily summaries, dispatch records, and export actions connected to the rest of Ved Logistics.",
    accent: "from-indigo-400/80 via-violet-300/70 to-cyan-300/70",
    shadow: "shadow-indigo-500/20",
    badge: "Reports",
    ctaHref: "/admin/reports",
    ctaLabel: "Open Reporting Center",
    highlights: ["Dispatch summaries", "Export language", "Connected admin context"],
    metrics: [
      { label: "Use Case", value: "Operational", note: "Daily and monthly reporting flows stay tied to actual operations." },
      { label: "Exports", value: "Ready", note: "PDF or summary actions stay visible and understandable." },
      { label: "Placement", value: "Integrated", note: "Reports feel like part of the workspace instead of an extra screen." },
    ],
    panels: [
      {
        title: "Summary layer",
        copy: "The reporting module makes daily summary generation feel like a finished operations feature.",
        bullets: ["Generated reports", "Operational summary", "Clear admin copy"],
      },
      {
        title: "Export flow",
        copy: "Export actions stay inside the premium system instead of looking like a plain utility page.",
        bullets: ["PDF action", "Recent report awareness", "Simple controls"],
      },
      {
        title: "System fit",
        copy: "Reports now connect properly with the rest of the dashboard and the public service profile.",
        bullets: ["Consistent cards", "Shared visual language", "Cleaner narrative"],
      },
    ],
  },
];

export function getShowcaseModule(slug: string) {
  return showcaseModules.find((item) => item.slug === slug);
}
