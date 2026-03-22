"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaLock, FaPlay, FaShieldAlt } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { apiFetch } from "@/lib/api";
import { type AuthUser, type UserRole, useAuth } from "@/lib/auth";
import { BrandLogo } from "@/components/BrandLogo";

type LoginResponse = {
  token: string;
  user: AuthUser;
};

type RoleLoginExperienceProps = {
  role: UserRole;
  title: string;
  description: string;
  redirectTo: string;
  accentClassName: string;
  accentTextClassName: string;
  accentGlowClassName: string;
  badge: string;
  quickPoints: string[];
  stats: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  demoAccess: {
    label: string;
    identifier: string;
    password: string;
  };
};

export function RoleLoginExperience({
  role,
  title,
  description,
  redirectTo,
  accentClassName,
  accentTextClassName,
  accentGlowClassName,
  badge,
  quickPoints,
  stats,
  demoAccess,
}: RoleLoginExperienceProps) {
  const router = useRouter();
  const { signIn } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier, password, role }),
      });
      signIn(data.token, data.user);
      router.push(redirectTo);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to log in";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function useDemoAccess() {
    setIdentifier(demoAccess.identifier);
    setPassword(demoAccess.password);
    setError(null);
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8 sm:px-8 lg:px-12">
      <motion.div
        className={`absolute -right-16 top-0 h-72 w-72 rounded-full blur-3xl ${accentGlowClassName}`}
        animate={{ y: [0, 24, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-5rem] top-[30%] h-80 w-80 rounded-full bg-ved-500/15 blur-3xl"
        animate={{ y: [0, -18, 0], scale: [1.04, 1, 1.04] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-stretch gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <motion.section
          className="glass mesh-panel flex flex-col justify-between overflow-hidden p-7 sm:p-9"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] ${accentTextClassName} bg-white/5`}>
                {badge}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-100/65">
                Local Workshop Mode
              </span>
            </div>

            <div className="mt-7 max-w-3xl">
              <BrandLogo priority />
              <h1 className="mt-8 text-4xl font-semibold leading-[0.94] tracking-tight text-white sm:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-indigo-100/72">
                {description}
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-100/60">
                    {item.label}
                  </p>
                  <strong className="mt-3 block text-2xl font-semibold text-white">{item.value}</strong>
                  <p className="mt-2 text-sm leading-6 text-indigo-100/62">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.86fr)]">
            <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/20 p-5">
              <div className="flex items-center gap-3">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${accentClassName} text-white shadow-lg`}>
                  <FaShieldAlt />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">What improves here</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-indigo-100/50">UI + flow + clarity</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {quickPoints.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-indigo-100/78">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200/70">
                Demo Access
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                  <p className="text-sm font-semibold text-white">{demoAccess.label}</p>
                  <p className="mt-1 text-sm text-indigo-100/70">{demoAccess.identifier}</p>
                  <p className="mt-1 text-sm text-indigo-100/70">{demoAccess.password}</p>
                </div>
                <button
                  type="button"
                  onClick={useDemoAccess}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                    <FaPlay />
                  Use Demo Credentials
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="glass relative flex flex-col justify-center overflow-hidden p-6 sm:p-8"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="mx-auto w-full max-w-md">
            <div className="mb-7">
              <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${accentTextClassName}`}>
                Secure Login
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Welcome back</h2>
              <p className="mt-2 text-sm leading-7 text-indigo-100/70">
                Sign in to continue into the {role} workspace with improved visuals and smoother motion.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {error ? (
                <motion.div
                  className="rounded-2xl border border-red-400/20 bg-red-500/12 px-4 py-3 text-sm text-red-50"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              ) : null}

              <label className="block">
                <span className="text-sm font-medium text-indigo-100/80">Email or User ID</span>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="Enter email or username"
                  className="field-input mt-2 w-full"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-indigo-100/80">Password</span>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    className="field-input w-full pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${accentClassName} px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {loading ? (
                  <>
                    <FaLock className="animate-pulse" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Continue to Dashboard
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">Back to workspace home</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-indigo-100/50">
                  Ved Logistics
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Home
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
