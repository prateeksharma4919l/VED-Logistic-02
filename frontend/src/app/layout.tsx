import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import RootAuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Ved Logistics",
  description: "Ved Logistics DTDC courier service profile with parcel support, payroll control, attendance, and bike meter operations.",
};

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} theme-light`}>
        <div className="min-h-screen">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.18),transparent_55%)]" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),transparent_55%)]" />
          <RootAuthProvider>{children}</RootAuthProvider>
        </div>
      </body>
    </html>
  );
}
