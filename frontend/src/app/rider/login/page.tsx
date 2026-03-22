"use client";

import { RoleLoginExperience } from "@/components/RoleLoginExperience";

export default function RiderLoginPage() {
  return (
    <RoleLoginExperience
      role="rider"
      title="Rider access with a sharper field-ready login experience."
      description="Open your route-linked workspace, attendance tools, payment records, and advance requests through a premium rider-first entry screen."
      redirectTo="/rider/dashboard"
      badge="Rider Access"
      accentClassName="from-cyan-400/85 to-sky-300/75"
      accentTextClassName="text-cyan-200/80"
      accentGlowClassName="bg-cyan-400/20"
      quickPoints={[
        "Faster entry to attendance, payment status, and route-friendly workflow panels.",
        "Cleaner visual cues for field usage on desktop and mobile screens.",
        "Quick-fill local demo credentials so testing the rider system is instant.",
      ]}
      stats={[
        { label: "Field Flow", value: "Direct", note: "Rider actions are brought front and center after login." },
        { label: "Payment", value: "Tracked", note: "Salary history and advance entries remain easy to access." },
        { label: "Motion", value: "Smooth", note: "Subtle layered animation keeps the page feeling premium." },
      ]}
      demoAccess={{
        label: "Rider Demo",
        identifier: "rider01",
        password: "admin123",
      }}
    />
  );
}
