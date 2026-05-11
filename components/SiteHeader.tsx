"use client";

import Link from "next/link";
import { useState } from "react";
import { assetPath, siteConfig } from "@/lib/site";
import { localizeHref, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

type SiteHeaderProps = {
  locale: Locale;
  translations: Record<string, string>;
};

const navLinks = [
  { href: "/features", key: "nav.features" },
  { href: "/who-its-for", key: "nav.whoItsFor" },
  { href: "/faq", key: "nav.faq" },
];

export default function SiteHeader({ locale, translations: t }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={localizeHref("/", locale)}
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
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={localizeHref(item.href, locale)}
              className="text-sm font-medium text-slate-700 no-underline transition hover:text-indigo-600"
            >
              {t[item.key]}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
          <Link
            href={localizeHref(siteConfig.links.tryApp, locale)}
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white no-underline transition hover:bg-indigo-700"
          >
            {t["nav.tryApp"]}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="rounded-md p-2 text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={t["nav.toggleMenu"]}
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
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={localizeHref(item.href, locale)}
                className="rounded-md px-3 py-2 text-base font-medium text-slate-700 no-underline transition hover:bg-slate-50 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t[item.key]}
              </Link>
            ))}
            <Link
              href={localizeHref("/privacy-policy", locale)}
              className="rounded-md px-3 py-2 text-base font-medium text-slate-700 no-underline transition hover:bg-slate-50 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t["nav.privacyPolicy"]}
            </Link>
            <div className="px-3 py-2">
              <LanguageSwitcher locale={locale} />
            </div>
            <Link
              href={localizeHref(siteConfig.links.tryApp, locale)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-indigo-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {t["nav.tryApp"]}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
