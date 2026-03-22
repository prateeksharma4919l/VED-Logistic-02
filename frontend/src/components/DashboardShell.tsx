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
  Riders: <FaMotorcycle />,
  Attendance: <FaClock />,
  Salary: <FaCoins />,
  "Advance Payments": <FaMoneyBillWave />,
  "Payment History": <FaFileInvoiceDollar />,
  Reports: <FaFileInvoiceDollar />,
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

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <header className="glass sticky top-0 z-20 border-b border-transparent bg-white/[0.03] px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
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

      <main className="mx-auto flex max-w-6xl overflow-hidden gap-8 px-6 py-8">
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
      </main>
    </motion.div>
  );
}
