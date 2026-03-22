"use client";

import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "employee" | "rider";

export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isReady: boolean;
  signIn: (token: string, user: AuthUser) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("ved_auth") : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setToken(parsed.token);
        setUser(parsed.user);
      } catch {
        // ignore
      }
    }
    setIsReady(true);
  }, []);

  const value = useMemo(() => {
    const signIn = (token: string, user: AuthUser) => {
      setToken(token);
      setUser(user);
      if (typeof window !== "undefined") {
        localStorage.setItem("ved_auth", JSON.stringify({ token, user }));
      }
    };

    const signOut = () => {
      setToken(null);
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("ved_auth");
      }
    };

    return { user, token, isReady, signIn, signOut };
  }, [isReady, token, user]);

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function requireRole(user: AuthUser | null, role: UserRole) {
  return user?.role === role;
}

export function getDashboardPath(role: UserRole) {
  return `/${role}/dashboard`;
}

// Hook to protect client routes
export function useRequireAuth(role: UserRole, redirectTo: string) {
  const { user, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (user === null) {
      router.replace(redirectTo);
    } else if (user && user.role !== role) {
      router.replace(getDashboardPath(user.role));
    }
  }, [isReady, user, role, redirectTo, router]);
}
