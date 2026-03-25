"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { BrandLogo } from "@/components/BrandLogo";
import {
  digitalAccess,
  homeMenuItems,
  quickStats,
  serviceLanes,
  serviceSuites,
  tickerItems,
  visitFlow,
} from "@/lib/home-data";

export default function Home() {
  const [menuQuery, setMenuQuery] = useState("");

  const filteredMenuItems = homeMenuItems.filter((item) => {
    const query = menuQuery.trim().toLowerCase();
    if (!query) {
      return true;
    }

    return (
      item.label.toLowerCase().includes(query) ||
      item.note.toLowerCase().includes(query)
    );
  });

  return (
    <main className="relative isolate overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
      <div className="hero-spotlight pointer-events-none absolute -left-28 top-8 h-[25rem] w-[25rem] rounded-full bg-[radial-gradient(circle,_rgba(239,68,68,0.16),transparent_70%)]" />
      <div className="hero-spotlight pointer-events-none absolute right-[-7rem] top-[-3rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.14),transparent_72%)] [animation-delay:-3s]" />
      <div className="hero-spotlight pointer-events-none absolute bottom-[-10rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.12),transparent_72%)] [animation-delay:-6s]" />
      <div className="courier-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto flex w-full max-w-[1520px] flex-col gap-6">
        <header
          id="home-top"
          className="rounded-[30px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-5"
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <BrandLogo priority className="justify-center sm:justify-start" />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700/80">
                  Ved Logistics | DTDC Partner Desk
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                  DTDC partner courier services from Kota, Rajasthan for parcel booking, domestic
                  shipping, international support, pickup requests, and business shipments.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/preview/index.html"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(239,68,68,0.2)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Open Static Preview
              </Link>
              <a
                href="tel:+917300187325"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Call 7300187325
              </a>
              <Link
                href="/admin/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Team Login
              </Link>
            </div>
          </div>
        </header>

        <div className="xl:hidden">
          <div className="rounded-[28px] border border-slate-200/80 bg-white/86 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-[0_12px_24px_rgba(239,68,68,0.18)]">
                <FaSearch />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700/75">
                  Quick Menu
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Homepage sections and direct access options.
                </p>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {homeMenuItems.map((item) =>
                item.route ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-slate-50"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden xl:block">
            <div className="flex flex-col gap-6">
              <div className="home-sidebar-shell">
                <div className="home-sidebar-top">
                  <span className="home-sidebar-badge">
                    <span className="home-sidebar-dot" />
                    Ved Logistics Menu
                  </span>
                  <div className="relative">
                    <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/60" />
                    <input
                      type="text"
                      value={menuQuery}
                      onChange={(event) => setMenuQuery(event.target.value)}
                      placeholder="Search Menu..."
                      className="home-sidebar-search pl-11"
                    />
                  </div>
                </div>

                <nav className="home-sidebar-menu" aria-label="Homepage sections">
                  {filteredMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    const content = (
                      <>
                        <span className="home-sidebar-item-main">
                          <span className="home-sidebar-icon">
                            <Icon />
                          </span>
                          <span className="home-sidebar-item-copy">
                            <span className="home-sidebar-item-label">{item.label}</span>
                            <span className="home-sidebar-item-note">{item.note}</span>
                          </span>
                        </span>
                        <FaChevronRight className="home-sidebar-arrow" />
                      </>
                    );

                    if (item.route) {
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`home-sidebar-item ${index === 0 ? "is-highlight" : ""}`.trim()}
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className={`home-sidebar-item ${index === 0 ? "is-highlight" : ""}`.trim()}
                      >
                        {content}
                      </a>
                    );
                  })}
                </nav>

                <div className="home-sidebar-footer">
                  <div className="home-sidebar-utility">
                    <p>Branch Desk</p>
                    <strong>Call 7300187325</strong>
                    <span>Parcel booking, pickup coordination, shipment support, and business enquiries.</span>
                  </div>
                  <div className="home-sidebar-utility">
                    <p>Theme Switch</p>
                    <strong>Top Theme Button</strong>
                    <span>Light aur dark mode ka option top par available hai aur poori React site me kaam karega.</span>
                  </div>
                </div>
              </div>

              <div className="home-sidebar-support-card">
                <p className="home-sidebar-support-label">Service Support</p>
                <h3 className="home-sidebar-support-title">
                  Booking, tracking, pickup, aur business dispatch ke liye direct branch guidance.
                </h3>
                <div className="home-sidebar-support-points">
                  <span>Domestic courier desk</span>
                  <span>International shipment support</span>
                  <span>Pickup coordination</span>
                  <span>Customer and team login access</span>
                </div>
                <Link
                  href="/preview/index.html"
                  className="home-sidebar-support-button"
                >
                  Open Static Preview
                </Link>
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-6">
            <section
              id="overview"
              className="grid gap-6 xl:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)]"
            >
              <motion.article
                className="rounded-[34px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,247,237,0.92),rgba(255,255,255,0.98))] p-7 shadow-[0_28px_90px_rgba(15,23,42,0.08)] sm:p-9 lg:p-10"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-3 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-red-700">
                  <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_16px_rgba(248,113,113,0.4)]" />
                  Authorized DTDC Partner | Kota, Rajasthan
                </div>

                <h1 className="font-display mt-6 max-w-5xl text-4xl font-semibold leading-[0.95] tracking-tight text-slate-900 sm:text-5xl xl:text-[4.2rem]">
                  Domestic courier, international shipping, pickup support, and business dispatch
                  services from Ved Logistics.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                  Ved Logistics, based in Kota, Rajasthan, works as an authorized DTDC partner for
                  parcel and document movement. Services include domestic courier booking,
                  international shipment assistance, doorstep pickup, tracking support, COD and
                  returns handling, and courier help for personal as well as business shipments.
                  Contact <strong className="text-slate-900">7300187325</strong> for booking and support.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {["Parcel Booking", "Tracking Support", "Business Shipping", "International Help"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/preview/index.html"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(239,68,68,0.2)] transition hover:-translate-y-0.5 hover:brightness-110"
                  >
                    Explore Service Preview
                  </Link>
                  <a
                    href="https://www.dtdc.com/in/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    Visit DTDC Official Site
                  </a>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                  {quickStats.map((item) => (
                    <div
                      key={item.label}
                      className="flex min-h-[180px] flex-col rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        {item.label}
                      </p>
                      <strong className="mt-3 block break-words text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-tight text-slate-900">
                        {item.value}
                      </strong>
                      <p className="mt-2 break-words text-sm leading-6 text-slate-600">{item.note}</p>
                    </div>
                  ))}
                </div>
              </motion.article>

              <motion.aside
                className="grid gap-4"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              >
                <div className="scan-beam courier-panel rounded-[34px] border border-slate-200/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(255,247,237,0.88),rgba(240,249,255,0.9))] p-6 shadow-[0_26px_80px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700/75">Service Shortcuts</p>
                      <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900">
                        Courier services at Ved Logistics
                      </h2>
                    </div>
                    <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">
                      Services
                    </span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {[
                      {
                        title: "Book Parcel",
                        copy: "Domestic and document courier guidance for customers who are ready to ship.",
                      },
                      {
                        title: "Track Shipment",
                        copy: "Real-time tracking support, delivery follow-up, and POD guidance for active shipments.",
                      },
                      {
                        title: "Business Enquiry",
                        copy: "Bulk dispatch, COD, returns, and repeat shipping support for online sellers or office clients.",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className="float-slow rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-[0_10px_26px_rgba(15,23,42,0.05)]"
                        style={{ animationDelay: `${index * 0.6}s` }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p>
                          </div>
                          <span className="rounded-full border border-slate-200 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    {["Pickup Coordination", "220+ Reach", "COD + Returns"].map((item) => (
                      <div key={item} className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(254,242,242,0.98),rgba(255,247,237,0.96))] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700/75">Branch Support</p>
                  <h3 className="font-display mt-3 text-2xl font-semibold text-slate-900">
                    Parcel booking, pickup coordination, and shipment support from one branch desk.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Customers can use the branch for domestic courier, international shipping support,
                    shipment tracking help, COD and returns, and regular dispatch assistance.
                  </p>
                </div>
              </motion.aside>
            </section>

            <section
              id="shipping-solutions"
              className="rounded-[34px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700/75">
                    Shipping Solutions
                  </p>
                  <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold text-slate-900 sm:text-4xl">
                    Courier solutions for individual customers, businesses, and international shipments.
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-slate-600">
                  Ved Logistics branch supports day-to-day parcel movement, repeat dispatch work,
                  business shipping, and overseas courier assistance through a DTDC-connected service network.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {serviceSuites.map((item, index) => (
                  <motion.article
                    key={item.title}
                    className="rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,249,245,0.92))] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-700/75">
                      {item.eyebrow}
                    </p>
                    <h3 className="font-display mt-3 text-2xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>

                    <div className="mt-5 space-y-3">
                      {item.bullets.map((point) => (
                        <div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          {point}
                        </div>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
            <section
              id="service-lanes"
              className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]"
            >
              <div className="rounded-[34px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700/75">
                  Core Service Lanes
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  DTDC-backed services available through the Ved Logistics branch.
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                  These core service lanes show the main courier, pickup, tracking, and business
                  shipment support available through the Ved Logistics branch.
                </p>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {serviceLanes.map((item, index) => (
                    <motion.article
                      key={item.title}
                      className={`rounded-[24px] border border-slate-200 bg-gradient-to-br ${item.accent} p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.38, delay: index * 0.05, ease: "easeOut" }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Service {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
                    </motion.article>
                  ))}
                </div>
              </div>

              <div
                id="booking-flow"
                className="rounded-[34px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700/75">
                  Booking Flow
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold text-slate-900">
                  How shipment handling works at the branch.
                </h2>

                <div className="mt-6 space-y-4">
                  {visitFlow.map((item) => (
                    <div key={item.step} className="rounded-[24px] border border-slate-200 bg-slate-50/85 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-700/75">
                        Step {item.step}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/preview/index.html"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-[22px] bg-gradient-to-r from-red-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(239,68,68,0.18)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  Open Static Preview
                </Link>
              </div>
            </section>

            <section
              id="contact-panel"
              className="rounded-[34px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(254,242,242,0.95),rgba(255,247,237,0.96),rgba(255,255,255,0.94))] p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] sm:p-7"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700/78">
                    Contact Ved Logistics
                  </p>
                  <h2 className="font-display mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                    Call 7300187325 for parcel booking, pickup scheduling, tracking help, or bulk shipping support.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Ved Logistics supports domestic courier, international shipment assistance, pickup
                    scheduling, business dispatch work, and e-commerce-related courier requirements.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+917300187325"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(239,68,68,0.18)] transition hover:-translate-y-0.5 hover:brightness-110"
                  >
                    Call Now
                  </a>
                  <a
                    href="https://www.dtdc.com/in/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    Visit DTDC Official Site
                  </a>
                </div>
              </div>
            </section>

            <section className="rounded-[30px] border border-slate-200/80 bg-[linear-gradient(90deg,rgba(255,237,213,0.76),rgba(255,255,255,0.92),rgba(224,242,254,0.76))] p-3 shadow-[0_18px_52px_rgba(15,23,42,0.05)]">
              <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/60">
                <div className="service-ticker-track">
                  {[...tickerItems, ...tickerItems].map((item, index) => (
                    <span
                      key={`bottom-${item}-${index}`}
                      className="flex items-center gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700"
                    >
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section
              id="digital-access"
              className="rounded-[34px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700/75">
                    Digital Access
                  </p>
                  <h2 className="font-display mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                    Service and login access.
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-slate-600">
                  Quick access to self-service, customer, partner, employee, and DTDC marketplace portals.
                </p>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {digitalAccess.map((item, index) =>
                  item.external ? (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.95))] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_36px_rgba(239,68,68,0.1)]"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.38, delay: index * 0.05, ease: "easeOut" }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-700/75">
                        Access {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-4 text-lg font-semibold leading-7 text-slate-900">{item.label}</h3>
                    </motion.a>
                  ) : (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.38, delay: index * 0.05, ease: "easeOut" }}
                    >
                      <Link
                        href={item.href}
                        className="block rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.95))] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_36px_rgba(239,68,68,0.1)]"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-700/75">
                          Access {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-4 text-lg font-semibold leading-7 text-slate-900">{item.label}</h3>
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
