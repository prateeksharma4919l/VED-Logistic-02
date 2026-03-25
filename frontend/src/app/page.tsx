"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

const tickerItems = [
  "Domestic Courier",
  "International Shipping",
  "Doorstep Pickup",
  "Real-Time Tracking",
  "COD and Returns",
  "Business Shipments",
  "Kota, Rajasthan",
];

const quickStats = [
  {
    label: "Location",
    value: "Kota, Rajasthan",
    note: "Authorized DTDC partner desk for courier bookings and pickup coordination.",
  },
  {
    label: "Coverage",
    value: "Domestic + International",
    note: "Parcel and document support across India plus international shipment assistance.",
  },
  {
    label: "Network Reach",
    value: "220+ Destinations",
    note: "International courier support aligned with the DTDC-connected global network.",
  },
  {
    label: "Contact",
    value: "7300187325",
    note: "Call for bookings, pickup requests, tracking help, and business shipment support.",
  },
];

const serviceSuites = [
  {
    eyebrow: "For Individuals",
    title: "Personal courier and document shipping",
    copy: "Send documents, parcels, office packets, and urgent courier items with branch support for booking, pickup, and delivery guidance.",
    bullets: ["Document and parcel booking", "Pickup request support", "Tracking and POD guidance"],
  },
  {
    eyebrow: "For Businesses",
    title: "Regular dispatch and bulk shipment support",
    copy: "Ved Logistics supports repeated dispatch work for offices, sellers, and growing businesses with COD handling, returns, and shipment coordination.",
    bullets: ["Bulk and repeat shipments", "COD and return support", "E-commerce shipment handling"],
  },
  {
    eyebrow: "International Shipping",
    title: "Overseas courier assistance from Kota",
    copy: "Get international document and parcel support with access to a DTDC-connected global network and branch-level shipment assistance.",
    bullets: ["International courier assistance", "220+ destination reach", "Branch support and follow-up"],
  },
];

const serviceLanes = [
  {
    title: "Domestic Courier Services",
    copy: "Document courier, parcel booking, office packets, and shipment guidance for delivery across India.",
    accent: "from-red-500/10 via-orange-400/10 to-white",
  },
  {
    title: "International Shipping Support",
    copy: "Document and parcel assistance for overseas movement through the DTDC-connected global network.",
    accent: "from-orange-500/12 via-amber-300/12 to-white",
  },
  {
    title: "Doorstep Pickup Requests",
    copy: "Pickup scheduling, address coordination, and shipment readiness support for faster dispatch handling.",
    accent: "from-amber-400/14 via-orange-200/10 to-white",
  },
  {
    title: "Real-Time Tracking Support",
    copy: "Shipment visibility, tracking guidance, and POD help for customers who need clear delivery follow-up.",
    accent: "from-sky-400/10 via-cyan-200/10 to-white",
  },
  {
    title: "E-Commerce Logistics",
    copy: "COD orders, returns handling, and operational courier support for online sellers and repeat dispatch businesses.",
    accent: "from-rose-400/10 via-red-200/10 to-white",
  },
  {
    title: "Branch Assistance and Support",
    copy: "Get booking guidance, shipment follow-up, service information, and courier assistance directly from the Ved Logistics branch desk.",
    accent: "from-slate-200/55 via-white to-orange-50/80",
  },
];

const visitFlow = [
  {
    step: "01",
    title: "Booking or pickup request",
    copy: "Shipment details, parcel type, destination, and pickup requirement are recorded at the branch desk or over call support.",
  },
  {
    step: "02",
    title: "Shipment processing and dispatch",
    copy: "Parcels move through booking, dispatch preparation, courier routing, and tracking updates according to the selected service.",
  },
  {
    step: "03",
    title: "Tracking and delivery follow-up",
    copy: "Customers can check shipment status, request support, and receive delivery-related follow-up including POD assistance when required.",
  },
];

const digitalAccess = [
  { label: "SELF SERVICE", href: "https://www.dtdc.com/in/", external: true },
  { label: "CUSTOMER LOGIN", href: "https://www.dtdc.com/in/", external: true },
  { label: "CHANNEL PARTNER LOGIN", href: "https://www.dtdc.com/in/", external: true },
  { label: "EMPLOYEE LOGIN", href: "/employee/login", external: false },
  { label: "MYDTDC BAZAAR", href: "https://www.dtdc.com/in/", external: true },
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
      <div className="hero-spotlight pointer-events-none absolute -left-28 top-8 h-[25rem] w-[25rem] rounded-full bg-[radial-gradient(circle,_rgba(239,68,68,0.16),transparent_70%)]" />
      <div className="hero-spotlight pointer-events-none absolute right-[-7rem] top-[-3rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.14),transparent_72%)] [animation-delay:-3s]" />
      <div className="hero-spotlight pointer-events-none absolute bottom-[-10rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.12),transparent_72%)] [animation-delay:-6s]" />
      <div className="courier-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-6">
        <header className="rounded-[30px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[linear-gradient(90deg,rgba(255,237,213,0.76),rgba(255,255,255,0.92),rgba(224,242,254,0.76))]">
            <div className="service-ticker-track">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex items-center gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700"
                >
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
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

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)]">
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

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {item.label}
                  </p>
                  <strong className="mt-3 block text-2xl font-semibold text-slate-900">{item.value}</strong>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
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

        <section className="rounded-[34px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7">
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

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
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

          <div className="rounded-[34px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7">
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

        <section className="rounded-[34px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(254,242,242,0.95),rgba(255,247,237,0.96),rgba(255,255,255,0.94))] p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] sm:p-7">
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

        <section className="rounded-[34px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7">
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
    </main>
  );
}
