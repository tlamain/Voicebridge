import Link from "next/link";
import { legalNavigation, resourceNavigation, siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="font-[var(--font-jakarta)] text-lg font-semibold text-slate-900">{siteConfig.name}</p>
            <p className="max-w-md text-sm text-slate-600">{siteConfig.description}</p>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="inline-block text-sm font-medium text-blue-700 no-underline transition hover:text-blue-800"
            >
              {siteConfig.supportEmail}
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Resources</p>
              <ul className="space-y-2">
                {resourceNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-slate-700 no-underline transition hover:text-blue-700">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Legal</p>
              <ul className="space-y-2">
                {legalNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-slate-700 no-underline transition hover:text-blue-700">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Copyright {new Date().getFullYear()} {siteConfig.name}. Built for accessible, privacy-first communication.
        </p>
      </div>
    </footer>
  );
}
