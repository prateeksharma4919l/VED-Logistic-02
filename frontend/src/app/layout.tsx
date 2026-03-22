import "./globals.css";
import type { Metadata } from "next";
import RootAuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Ved Logistics",
  description: "Premium logistics management workspace for admin, employee, and rider operations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),transparent_60%)]" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,_rgba(34,211,238,0.17),transparent_55%)]" />
          <RootAuthProvider>{children}</RootAuthProvider>
        </div>
      </body>
    </html>
  );
}
