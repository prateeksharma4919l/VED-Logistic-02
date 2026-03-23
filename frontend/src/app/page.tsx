"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";
import { accessPortals, showcaseModules, workDetailCards, workflowSteps, workshopStats } from "@/lib/showcase";

export default function Home() {
  const featuredModules = showcaseModules.slice(0, 6);

  return (
    <main className="relative overflow-hidden px-6 py-8 sm:px-8 lg:px-12">
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />

      <div className="landing-shell mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="glass flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo priority className="justify-center" />
            <div className="hidden min-w-0 sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">Ved Logistics</p>
              <p className="mt-1 text-sm text-indigo-100/70">
                Premium workshop showcase with separate system pages and clean role-based access.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/preview/index.html"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400/80 to-sky-300/70 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Open Static Preview
            </Link>
            <Link
              href="#modules"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Explore Modules
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Enter Login Flow
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <motion.article
            className="glass mesh-panel overflow-hidden p-7 sm:p-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">
              Preview First
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl">
              A proper premium website layer for Ved Logistics, with clear details and separate option pages.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-indigo-100/75">
              The first page now works like a real preview of the project: it explains the work,
              shows the system quality, and sends every important option into its own dedicated
              page so the experience no longer feels mixed or scattered.
            </p>

            <div className="mt-6 rounded-[1.6rem] border border-cyan-300/15 bg-cyan-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">Best Starting Point</p>
              <p className="mt-3 text-sm leading-7 text-indigo-100/78">
                Sabse pehle static preview open karo. Wahan se full premium look, work quality,
                sections, aur overall delivery feel sabse clearly samajh aata hai.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/preview/index.html"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400/80 to-sky-300/70 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Open Static Preview
              </Link>
              <Link
                href="/showcase/workspace-preview"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Open Work Details
              </Link>
            </div>
          </motion.article>

          <motion.aside
            className="glass flex flex-col gap-4 p-6 sm:p-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          >
            <div className="rounded-[1.6rem] border border-cyan-300/15 bg-cyan-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/80">Start Here</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Open the static preview first.</h2>
              <p className="mt-3 text-sm leading-7 text-indigo-100/76">
                Ye sabse clean entry hai. Isse full premium website direction turant samajh aati hai.
              </p>
              <Link
                href="/preview/index.html"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400/80 to-sky-300/70 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Open Static Preview
              </Link>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/80">Quick Stats</p>
            {workshopStats.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-100/60">{item.label}</p>
                <strong className="mt-3 block text-3xl font-semibold text-white">{item.value}</strong>
                <p className="mt-2 text-sm leading-7 text-indigo-100/72">{item.note}</p>
              </div>
            ))}
          </motion.aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-4">
          {workDetailCards.map((item, index) => (
            <motion.article
              key={item.title}
              className="glass p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 * index, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">Work Detail</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-indigo-100/74">{item.copy}</p>
            </motion.article>
          ))}
        </section>

        <section id="modules" className="glass p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/80">Separate Option Pages</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Each important option now gets its own premium page.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-indigo-100/72">
              This keeps the website clean. Users can understand every module properly before they move into the live system.
            </p>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {featuredModules.map((module, index) => (
              <motion.article
                key={module.slug}
                className="glass flex h-full flex-col gap-5 p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 * index, ease: "easeOut" }}
              >
                <div className={`inline-flex self-start rounded-full bg-gradient-to-r ${module.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-lg ${module.shadow}`}>
                  {module.badge}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-100/55">{module.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{module.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-indigo-100/74">{module.summary}</p>
                </div>

                <div className="space-y-3">
                  {module.highlights.map((point) => (
                    <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-indigo-100/80">
                      {point}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/showcase/${module.slug}`}
                  className={`mt-auto inline-flex items-center justify-center rounded-2xl bg-gradient-to-r ${module.accent} px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110 ${module.shadow}`}
                >
                  Open Detail Page
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {accessPortals.map((portal, index) => (
            <motion.article
              key={portal.title}
              className="glass flex h-full flex-col gap-6 p-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * index, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-100/55">{portal.badge}</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">{portal.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-indigo-100/74">{portal.description}</p>
                </div>
                <div className={`rounded-full bg-gradient-to-r ${portal.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-lg ${portal.shadow}`}>
                  Access
                </div>
              </div>

              <div className="space-y-3">
                {portal.points.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-indigo-100/80">
                    {point}
                  </div>
                ))}
              </div>

              <Link
                href={portal.href}
                className={`mt-auto inline-flex items-center justify-center rounded-2xl bg-gradient-to-r ${portal.accent} px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110 ${portal.shadow}`}
              >
                Continue to {portal.title}
              </Link>
            </motion.article>
          ))}
        </section>

        <section className="glass p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/80">How The Site Works</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {workflowSteps.map((item) => (
              <article key={item.step} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/75">{item.step}</span>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-indigo-100/72">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
