import Link from "next/link";
import { assetPath, legalNavigation, siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="flex items-center gap-2 font-(--font-jakarta) text-lg font-semibold text-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath("/images/logo.png")}
              alt={`${siteConfig.name} logo`}
              width={28}
              height={28}
              className="h-7 w-7"
            />
            {siteConfig.name}
          </p>
          <p className="max-w-md text-sm text-slate-600">
            Empowering communication through symbols, text, and voice — with privacy and accessibility at the core.
          </p>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="inline-block text-sm font-medium text-indigo-600 no-underline transition hover:text-indigo-800"
          >
            {siteConfig.supportEmail}
          </a>
        </div>

        <div className="flex flex-wrap gap-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Pages</p>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Features</Link></li>
              <li><Link href="/who-its-for" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Who It&apos;s For</Link></li>
              <li><Link href="/faq" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Deep Dive</p>
            <ul className="space-y-2">
              <li><Link href="/smart-grammar" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Smart Grammar</Link></li>
              <li><Link href="/progressive-vocabulary" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Progressive Vocabulary</Link></li>
              <li><Link href="/grid-modes" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Grid Modes</Link></li>
              <li><Link href="/activity-boards" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Activity Boards</Link></li>
              <li><Link href="/core-fringe" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Core-Fringe Layouts</Link></li>
              <li><Link href="/symbol-management" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Symbol Library</Link></li>
              <li><Link href="/setup-wizard" className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">Setup Wizard</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Legal</p>
            <ul className="space-y-2">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4">
        <p className="text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Built with privacy and accessibility in mind.
        </p>
      </div>
    </footer>
  );
}
