"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { BrandLogo } from "@/components/BrandLogo";

export default function EmployeeLoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiFetch<{ token: string; user: any }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier, password, role: "employee" }),
      });
      signIn(data.token, data.user);
      router.push("/employee/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Unable to log in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-6 flex justify-center">
            <BrandLogo priority />
          </div>
          <h1 className="text-3xl font-semibold text-white">Employee Login</h1>
          <p className="mt-2 text-sm text-indigo-100/80">
            Access your attendance, status updates, and work history.
          </p>
        </div>
        <form onSubmit={onSubmit} className="glass space-y-5 p-8">
          {error ? (
            <div className="rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-50">
              {error}
            </div>
          ) : null}
          <label className="block">
            <span className="text-sm font-medium text-indigo-100/80">Email or User ID</span>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/40"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-indigo-100/80">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/40"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-400/80 to-emerald-200/70 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-400/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <div className="pt-3 text-center text-sm text-indigo-100/70">
            <Link href="/" className="font-medium text-emerald-200 hover:text-white">
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
