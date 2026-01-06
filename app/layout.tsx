import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SkipLink from "../components/SkipLink";

export const metadata: Metadata = {
  title: "AyAySee (AAC)",
  description:
    "A universal AAC app that bridges text and symbols, with natural voice output. Built for users and caregivers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <SkipLink />
        <SiteHeader />
        <main id="main" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
