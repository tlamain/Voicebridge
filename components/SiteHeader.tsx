"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNavigation, resourceNavigation, siteConfig } from "@/lib/site";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={siteConfig.links.home}
          className="group inline-flex flex-col leading-tight no-underline"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="font-[var(--font-jakarta)] text-lg font-semibold text-slate-900 transition group-hover:text-blue-700">
            {siteConfig.shortName}
          </span>
          <span className="text-xs uppercase tracking-[0.14em] text-slate-500">AAC Platform</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 no-underline transition hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.links.contact}
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white no-underline transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Get Early Access
          </Link>
        </nav>

        <button
          className="rounded-md p-2 text-slate-700 transition hover:bg-slate-100 hover:text-blue-700 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-haspopup="menu"
        >
          <svg aria-hidden className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav id="mobile-navigation" className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Mobile">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 no-underline transition hover:bg-slate-100 hover:text-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="my-1 h-px bg-slate-200" />
            {resourceNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 no-underline transition hover:bg-slate-100 hover:text-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.links.contact}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white no-underline transition hover:bg-blue-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Early Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
