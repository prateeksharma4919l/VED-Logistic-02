import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import RootAuthProvider from "@/components/AuthProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable} theme-light`}>
        <div className="min-h-screen">
          <div className="app-ambient app-ambient-top" />
          <div className="app-ambient app-ambient-bottom" />
          <RootAuthProvider>
            <ThemeToggle />
            {children}
          </RootAuthProvider>
        </div>
      </body>
    </html>
  );
}
