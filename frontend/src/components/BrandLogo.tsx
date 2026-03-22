"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

type BrandLogoProps = {
  href?: string;
  compact?: boolean;
  className?: string;
  imageClassName?: string;
  markClassName?: string;
  priority?: boolean;
};

function getDashboardHref(role?: "admin" | "employee" | "rider") {
  if (!role) return "/";
  return `/${role}/dashboard`;
}

export function BrandLogo({
  href,
  compact = false,
  className = "",
  imageClassName = "",
  markClassName = "",
  priority = false,
}: BrandLogoProps) {
  const { user } = useAuth();
  const resolvedHref = href ?? getDashboardHref(user?.role);

  return (
    <Link href={resolvedHref} className={`brand-logo group ${className}`.trim()}>
      <div className={`brand-logo-mark ${markClassName}`.trim()}>
        <Image
          src="/assets/ved-logo.jpg"
          alt="Ved Logistics"
          width={compact ? 132 : 260}
          height={compact ? 88 : 174}
          priority={priority}
          className={`h-auto w-full object-contain ${imageClassName}`.trim()}
        />
      </div>
    </Link>
  );
}
