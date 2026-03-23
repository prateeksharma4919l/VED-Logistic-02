import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { getShowcaseModule, showcaseModules } from "@/lib/showcase";

export function generateStaticParams() {
  return showcaseModules.map((module) => ({ slug: module.slug }));
}

export default function ShowcaseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const module = getShowcaseModule(params.slug);

  if (!module) {
    notFound();
  }

  const relatedModules = showcaseModules.filter((item) => item.slug !== module.slug).slice(0, 3);

  return (
    <main className="relative overflow-hidden px-6 py-8 sm:px-8 lg:px-12">
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="glass flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo priority className="justify-center" />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">Ved Logistics Showcase</p>
              <p className="mt-1 text-sm text-indigo-100/70">Module-first preview flow with separate premium pages.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Back to Home
            </Link>
            <Link
              href="/preview/index.html"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Open Static Preview
            </Link>
            <Link
              href={module.ctaHref}
              className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r ${module.accent} px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110 ${module.shadow}`}
            >
              {module.ctaLabel}
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <article className="glass mesh-panel overflow-hidden p-7 sm:p-9">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/80">
              {module.eyebrow}
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl">
              {module.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-indigo-100/75">{module.detail}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {module.highlights.map((item) => (
                <div key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-100/80">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="glass flex flex-col gap-4 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/80">Quick Snapshot</p>
            {module.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-100/60">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-7 text-indigo-100/72">{metric.note}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {module.panels.map((panel) => (
            <article key={panel.title} className="glass flex flex-col gap-5 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">{module.badge}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{panel.title}</h2>
                <p className="mt-3 text-sm leading-7 text-indigo-100/75">{panel.copy}</p>
              </div>
              <div className="space-y-3">
                {panel.bullets.map((bullet) => (
                  <div key={bullet} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-indigo-100/80">
                    {bullet}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="glass p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/75">Related Modules</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Explore the rest of the system flow.</h2>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Return to Showcase Home
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {relatedModules.map((item) => (
              <Link
                key={item.slug}
                href={`/showcase/${item.slug}`}
                className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.08]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/75">{item.eyebrow}</span>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-indigo-100/72">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
