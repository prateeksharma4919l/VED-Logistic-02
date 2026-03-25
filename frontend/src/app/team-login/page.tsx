"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaClipboardCheck, FaShieldAlt, FaUserTie } from "react-icons/fa";
import { BrandLogo } from "@/components/BrandLogo";

const teamRoles = [
  {
    title: "Admin Login",
    subtitle: "Full control access",
    href: "/admin/login",
    accent: "from-red-500 to-orange-400",
    icon: FaShieldAlt,
    bullets: [
      "Attendance, salary, reports, and bike meter controls",
      "Employee management and payment workflow access",
      "Admin demo: admin / admin123",
    ],
  },
  {
    title: "Employee Login",
    subtitle: "Daily workspace access",
    href: "/employee/login",
    accent: "from-emerald-500 to-lime-400",
    icon: FaUserTie,
    bullets: [
      "Attendance mark, salary breakdown, and payment history",
      "Advance requests and personal report visibility",
      "Employee demo: employee01 / admin123",
    ],
  },
];

export default function TeamLoginPage() {
  return (
    <main className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="hero-spotlight pointer-events-none absolute left-[-8rem] top-10 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,_rgba(239,68,68,0.14),transparent_72%)]" />
      <div className="hero-spotlight pointer-events-none absolute right-[-6rem] top-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.12),transparent_72%)] [animation-delay:-3s]" />

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-6">
        <header className="glass flex flex-col gap-4 rounded-[30px] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <BrandLogo priority className="justify-center sm:justify-start" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700/80">
                Ved Logistics Team Access
              </p>
              <h1 className="font-display mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                One team login page for admin and employee access.
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Team Login ke andar ab dono options available hain, taaki branch team directly
                apna role choose karke sahi login page open kar sake.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Back to Home
            </Link>
            <Link
              href="/preview/index.html"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(239,68,68,0.18)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Open Static Preview
            </Link>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_340px]">
          <div className="grid gap-6 md:grid-cols-2">
            {teamRoles.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  className="glass overflow-hidden rounded-[32px] p-6 sm:p-7"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: index * 0.08, ease: "easeOut" }}
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-r ${item.accent} text-xl text-white shadow-[0_16px_34px_rgba(15,23,42,0.12)]`}>
                    <Icon />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {item.subtitle}
                  </p>
                  <h2 className="font-display mt-3 text-3xl font-semibold text-slate-900">
                    {item.title}
                  </h2>

                  <div className="mt-5 space-y-3">
                    {item.bullets.map((point) => (
                      <div
                        key={point}
                        className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700"
                      >
                        {point}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={item.href}
                    className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-gradient-to-r ${item.accent} px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:brightness-110`}
                  >
                    Continue
                    <FaArrowRight />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <aside className="glass rounded-[32px] p-6 sm:p-7">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-r from-sky-500 to-cyan-400 text-lg text-white shadow-[0_16px_34px_rgba(14,165,233,0.18)]">
              <FaClipboardCheck />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Quick Notes
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900">
              Choose the right login path.
            </h2>
            <div className="mt-5 space-y-3">
              {[
                "Admin role se full dashboard aur controls open honge.",
                "Employee role se personal attendance aur salary workspace open hoga.",
                "Agar sirf team entry chahiye ho to yahi page common starting point hai.",
              ].map((note) => (
                <div
                  key={note}
                  className="rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {note}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-orange-200 bg-gradient-to-r from-red-50 to-orange-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-700/75">
                Contact
              </p>
              <strong className="mt-3 block text-xl text-slate-900">7300187325</strong>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Branch assistance for courier support, login help, and day-to-day operations guidance.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
