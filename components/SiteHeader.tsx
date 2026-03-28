"use client";

import Link from "next/link";
import { useState } from "react";
import { assetPath, primaryNavigation, siteConfig } from "@/lib/site";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-(--font-jakarta) text-xl font-bold text-indigo-700 hover:text-indigo-800 transition-colors no-underline"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath("/images/logo.png")}
            alt={`${siteConfig.name} logo`}
            width={32}
            height={32}
            className="h-8 w-8"
          />
          {siteConfig.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 no-underline transition hover:text-indigo-600"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.links.contact}
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white no-underline transition hover:bg-indigo-700"
          >
            Try Loquor AAC
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="rounded-md p-2 text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Mobile">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-base font-medium text-slate-700 no-underline transition hover:bg-slate-50 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/privacy-policy"
              className="rounded-md px-3 py-2 text-base font-medium text-slate-700 no-underline transition hover:bg-slate-50 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy Policy
            </Link>
            <Link
              href={siteConfig.links.contact}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-indigo-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Try Loquor AAC
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
