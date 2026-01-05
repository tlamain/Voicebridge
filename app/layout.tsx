import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SkipLink from "../components/SkipLink";

export const metadata: Metadata = {
  title: "VoiceBridge AAC",
  description:
    "A universal AAC app that bridges text and symbols, with natural voice output. Built for users and caregivers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main" className="container">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
