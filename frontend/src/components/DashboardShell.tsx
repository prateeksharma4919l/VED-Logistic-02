"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import {
  FaChartLine,
  FaClock,
  FaCoins,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaMotorcycle,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "@/lib/auth";
import { BrandLogo } from "@/components/BrandLogo";

type NavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

const fallbackIcons: Record<string, React.ReactNode> = {
  Dashboard: <FaChartLine />,
  Overview: <FaChartLine />,
  "User Registration": <FaUserPlus />,
  Employees: <FaUsers />,
  "Bike Meter Reading": <FaMotorcycle />,
  Riders: <FaMotorcycle />,
  Attendance: <FaClock />,
  Salary: <FaCoins />,
  "Advance Payments": <FaMoneyBillWave />,
  "Payment History": <FaFileInvoiceDollar />,
  Reports: <FaFileInvoiceDollar />,
};

const workspaceGuides: Record<string, { tag: string; points: string[] }> = {
  Overview: {
    tag: "Control Center",
    points: [
      "Open any admin module directly from the workspace map.",
      "Review monthly numbers before moving into salary or advances.",
      "Use the watchlist to catch pending actions quickly.",
    ],
  },
  Dashboard: {
    tag: "Workspace",
    points: [
      "Use this page as the first stop for current status, actions, and recent records.",
      "Move into attendance, salary, or payment history from the quick access rail.",
      "Review the current month before exporting or sharing any report.",
    ],
  },
  "User Registration": {
    tag: "Account Flow",
    points: [
      "Create complete employee access with salary setup in one pass.",
      "Keep user ID, email, and salary details accurate before saving.",
      "Move to Employees after creation to review the final roster.",
    ],
  },
  Employees: {
    tag: "Roster Control",
    points: [
      "Use search to find employee records before editing.",
      "Keep salary and contact details aligned with payroll records.",
      "Delete only after confirming no active operational dependency.",
    ],
  },
  "Bike Meter Reading": {
    tag: "Movement Desk",
    points: [
      "Check bike number and operator name before saving a log.",
      "Track morning and evening meter values to avoid distance mismatch.",
      "Use the status field to distinguish pending and completed routes.",
    ],
  },
  Attendance: {
    tag: "Shift Monitor",
    points: [
      "Filter by month first to avoid editing the wrong period.",
      "Use notes for exceptions such as late check-in or half-day context.",
      "Open salary later to confirm how attendance reflects in payroll.",
    ],
  },
  Salary: {
    tag: "Payroll Desk",
    points: [
      "Review monthly salary, deductions, and final payable for the selected month.",
      "Check attendance and approved advance data if numbers feel off.",
      "Use payment history to verify the final disbursement record.",
    ],
  },
  "Advance Payments": {
    tag: "Approval Lane",
    points: [
      "Pending requests should be reviewed before monthly salary closing.",
      "Approved amounts flow into payroll automatically as deductions.",
      "Rejected entries should still carry a note for audit clarity.",
    ],
  },
  "Payment History": {
    tag: "Payout Records",
    points: [
      "Use this page to verify final paid amounts across the selected month.",
      "Toggle status carefully to keep salary and payment records aligned.",
      "Delete only if a payout entry was created in error.",
    ],
  },
  Reports: {
    tag: "Export Desk",
    points: [
      "Generate daily reports after attendance and payment changes are final.",
      "Use PDF export for quick sharing and offline record keeping.",
      "Return to the dashboard for the latest module-level totals.",
    ],
  },
};

export function DashboardShell({
  title,
  subtitle,
  items,
  children,
}: {
  title: string;
  subtitle?: string;
  items: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentItem = items.find((item) => pathname === item.href) ?? items[0];
  const isAdminRoute = pathname.startsWith("/admin");
  const currentGuide = workspaceGuides[currentItem?.label] ?? {
    tag: "Workspace",
    points: [
      "Use the quick access rail to move across modules faster.",
      "Keep current records updated before switching pages.",
      "Return to the overview whenever you need a full snapshot.",
    ],
  };
  const showWorkspaceRail =
    (pathname.startsWith("/employee") || pathname.startsWith("/rider")) && !isAdminRoute;
  const shellMaxWidthClass = isAdminRoute ? "max-w-none" : "max-w-[1600px]";
  const mainMaxWidthClass = isAdminRoute ? "max-w-none" : "max-w-[1760px]";

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <header className="glass sticky top-0 z-20 border-b border-transparent bg-white/[0.03] px-6 py-4 backdrop-blur-xl">
        <div className={`mx-auto flex w-full items-center justify-between gap-6 ${shellMaxWidthClass}`}>
          <div className="flex min-w-0 items-center gap-4">
            <BrandLogo compact className="shrink-0" />
            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold text-white">{title}</h1>
              {subtitle ? <p className="truncate text-sm text-indigo-100/70">{subtitle}</p> : null}
            </div>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="rounded-full border border-transparent bg-white/[0.04] px-4 py-2 text-sm text-white shadow-sm transition hover:bg-white/[0.08]"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className={`mx-auto flex w-full overflow-hidden gap-8 px-6 py-8 xl:gap-10 ${mainMaxWidthClass}`}>
        <motion.nav
          className="hidden shrink-0 overflow-hidden flex-col gap-2 lg:flex"
          animate={{ width: sidebarOpen ? 288 : 92 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
        >
          <div
            className={`glass border-transparent bg-white/[0.03] overflow-hidden px-3 py-3 ${
              sidebarOpen ? "flex items-center justify-between gap-3" : "flex flex-col items-center gap-2"
            }`}
          >
            <BrandLogo
              compact={!sidebarOpen}
              className={`min-w-0 overflow-hidden ${sidebarOpen ? "" : "mx-auto w-full justify-center p-1"}`.trim()}
              markClassName={sidebarOpen ? "" : "w-11 rounded-lg p-1 shadow-none"}
              imageClassName={sidebarOpen ? "max-w-[142px]" : "max-w-[38px]"}
            />
            <motion.button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="icon-button shrink-0"
              animate={{ rotate: sidebarOpen ? 0 : 180 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {sidebarOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
            </motion.button>
          </div>
          <div className="px-1 text-xs font-semibold uppercase tracking-wide text-indigo-200/80">
            <div className="flex items-center justify-between gap-3">
              <span>{sidebarOpen ? "Navigation" : "Menu"}</span>
              <span className="text-[10px] text-indigo-100/45">{sidebarOpen ? "Live" : ""}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  className="overflow-hidden"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-ved-500/18 text-white shadow-[0_0_18px_rgba(139,92,246,0.16)]"
                        : "bg-white/[0.03] text-indigo-100/80 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="icon-button border-transparent bg-transparent p-0 text-lg shadow-none group-hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]">
                      {item.icon ?? fallbackIcons[item.label] ?? <FaChartLine />}
                    </span>
                    {sidebarOpen ? <span className="truncate">{item.label}</span> : null}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.nav>

        <section className="min-w-0 flex-1 overflow-hidden">
          <div className="mb-5 flex items-center justify-between gap-3 overflow-x-auto pb-2 lg:hidden">
            <BrandLogo compact className="shrink-0" />
            <div className="flex gap-2">
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                      active ? "bg-ved-500/18 text-white" : "bg-white/[0.03] text-indigo-100/80 hover:bg-white/[0.06]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {children}
          </div>
        </section>

        {showWorkspaceRail ? (
          <aside className="hidden xl:block xl:w-[330px] xl:shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="glass p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/70">{currentGuide.tag}</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{currentItem?.label ?? title}</h2>
                    <p className="mt-2 text-sm leading-7 text-indigo-100/72">
                      {subtitle ?? "Admin workspace quick actions and page guidance."}
                    </p>
                  </div>
                  <div className="icon-button h-11 w-11 border-transparent bg-white/5 text-lg text-cyan-100">
                    {currentItem?.icon ?? fallbackIcons[currentItem?.label ?? "Overview"] ?? <FaChartLine />}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-100/55">Visible Pages</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{items.length}</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/75">Active Module</p>
                    <p className="mt-2 text-base font-semibold text-white">{currentItem?.label ?? title}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100/60">Current Checklist</p>
                  <div className="mt-4 space-y-3">
                    {currentGuide.points.map((point, index) => (
                      <div key={point} className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-indigo-100/78">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100/55">Quick Access</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">All admin pages</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-100/55">
                    live
                  </span>
                </div>

                <div className="mt-4 grid gap-2">
                  {items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                          active
                            ? "border-cyan-300/25 bg-cyan-400/10 text-white"
                            : "border-white/10 bg-white/5 text-indigo-100/78 hover:bg-white/10"
                        }`}
                      >
                        <span className="icon-button h-9 w-9 border-transparent bg-transparent p-0 text-base shadow-none">
                          {item.icon ?? fallbackIcons[item.label] ?? <FaChartLine />}
                        </span>
                        <span className="truncate font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        ) : null}
      </main>
    </motion.div>
  );
}
