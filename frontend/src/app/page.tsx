"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

export default function Home() {
  const portals = [
    {
      title: "Admin Login",
      description: "Access management dashboard, riders, attendance, salary, and reporting controls.",
      href: "/admin/login",
      badge: "Control",
      accent: "from-ved-500/80 to-ved-300/70",
      shadow: "shadow-ved-500/20",
      points: ["Employees and riders", "Attendance and payroll", "Reports and approvals"],
    },
    {
      title: "Employee Login",
      description: "Mark attendance, view salary breakdown, track advances, and check payment history.",
      href: "/employee/login",
      badge: "Quick",
      accent: "from-emerald-400/80 to-emerald-200/70",
      shadow: "shadow-emerald-400/20",
      points: ["Check-in and check-out", "Salary and advances", "Personal report lane"],
    },
    {
      title: "Rider Login",
      description: "Track attendance, payout status, route-linked work context, and advance requests.",
      href: "/rider/login",
      badge: "Field",
      accent: "from-cyan-400/80 to-sky-300/70",
      shadow: "shadow-cyan-400/20",
      points: ["Attendance tracking", "Payment history", "Route-ready workflow"],
    },
  ];

  const highlights = [
    { label: "Core Modules", value: "9+", note: "attendance, salary, advances, reports, riders, and more" },
    { label: "Access Layers", value: "3", note: "admin, employee, and rider role flows" },
    { label: "Delivery Feel", value: "Premium", note: "cleaner UI, richer surfaces, and stronger motion" },
  ];

  const systemBlocks = [
    {
      title: "Attendance Engine",
      copy: "Check-in, check-out, absent flow, monthly summaries, and quick review lanes.",
    },
    {
      title: "Payroll Control",
      copy: "Salary snapshots, advance deductions, payment history, and admin payout actions.",
    },
    {
      title: "Reports and Exports",
      copy: "Daily summary packs, payroll sheets, and preview-ready export workflows.",
    },
  ];

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />

      <div className="landing-shell mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="glass flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo priority className="justify-center" />
            <div className="hidden min-w-0 sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                Ved Logistics
              </p>
              <p className="mt-1 text-sm text-indigo-100/70">
                Attendance, payroll, reporting, and rider operations in one system.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/preview/index.html"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Open Premium Preview
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-ved-500/80 to-ved-300/70 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-ved-500/20 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Enter Dashboard
            </Link>
          </div>
        </header>

        <section className="landing-grid gap-6 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <motion.article
            className="glass relative overflow-hidden p-7 sm:p-9"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/80">
              Workshop Ready System
            </p>
            <h1 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl">
              Built to run logistics operations with more clarity and better flow.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-indigo-100/75">
              This repo now carries a complete Ved Logistics style workspace: admin, employee, and
              rider access with cleaner onboarding, stronger visuals, polished dashboards, and
              premium preview assets.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/admin/login"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400/80 to-sky-300/70 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Start with Admin
              </Link>
              <Link
                href="/preview/system.html"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                View Static System Mock
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="landing-stat rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/65">
                    {item.label}
                  </p>
                  <strong className="mt-3 block text-2xl font-semibold text-white">{item.value}</strong>
                  <p className="mt-2 text-sm leading-6 text-indigo-100/65">{item.note}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.aside
            className="glass mesh-panel flex flex-col gap-4 p-6 sm:p-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/80">
              System Layers
            </p>
            {systemBlocks.map((block, index) => (
              <div key={block.title} className="rounded-[1.4rem] border border-white/10 bg-slate-950/25 p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/75">
                  0{index + 1}
                </span>
                <h2 className="mt-3 text-xl font-semibold text-white">{block.title}</h2>
                <p className="mt-2 text-sm leading-7 text-indigo-100/70">{block.copy}</p>
              </div>
            ))}
          </motion.aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {portals.map((portal, index) => (
            <motion.article
              key={portal.title}
              className="glass flex h-full flex-col gap-6 p-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 * index, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{portal.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-indigo-100/75">{portal.description}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
                  {portal.badge}
                </span>
              </div>

              <div className="space-y-3">
                {portal.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-indigo-100/80"
                  >
                    {point}
                  </div>
                ))}
              </div>

              <Link
                href={portal.href}
                className={`mt-auto inline-flex items-center justify-center rounded-2xl bg-gradient-to-r ${portal.accent} px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110 ${portal.shadow}`}
              >
                Go to {portal.title}
              </Link>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  );
}
