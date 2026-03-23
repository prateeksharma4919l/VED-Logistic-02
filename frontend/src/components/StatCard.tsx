import Link from "next/link";
import { ReactNode } from "react";

export function StatCard({
  title,
  value,
  delta,
  icon,
  href,
}: {
  title: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
  href?: string;
}) {
  const isLoading = value === "..." || value === "";
  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-indigo-100/80">{title}</p>
          {isLoading ? (
            <div className="pulse-loader mt-3 h-8 w-24 rounded-full bg-white/10" />
          ) : (
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          )}
        </div>
        {icon ? (
          <div className="icon-button rounded-full bg-white/10 p-3 text-2xl text-white/90">{icon}</div>
        ) : null}
      </div>
      {delta ? (
        <p className="mt-4 text-sm text-green-200">{delta}</p>
      ) : null}
      {href ? <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/75">Open module</p> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="card block p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/20">
        {body}
      </Link>
    );
  }

  return <div className="card p-6">{body}</div>;
}
