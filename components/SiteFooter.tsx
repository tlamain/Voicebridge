import Link from "next/link";
import { assetPath, siteConfig } from "@/lib/site";
import { localizeHref, type Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
  translations: Record<string, string>;
};

export default function SiteFooter({ locale, translations: t }: SiteFooterProps) {
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
            {t["footer.tagline"]}
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{t["footer.pages"]}</p>
            <ul className="space-y-2">
              <li><Link href={localizeHref("/features", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["nav.features"]}</Link></li>
              <li><Link href={localizeHref("/who-its-for", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["nav.whoItsFor"]}</Link></li>
              <li><Link href={localizeHref("/faq", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["nav.faq"]}</Link></li>
              <li><Link href={localizeHref("/contact", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["nav.contact"]}</Link></li>
              <li><Link href={localizeHref("/try-loquor-aac", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["nav.tryApp"]}</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{t["footer.deepDive"]}</p>
            <ul className="space-y-2">
              <li><Link href={localizeHref("/smart-grammar", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["footer.smartGrammar"]}</Link></li>
              <li><Link href={localizeHref("/progressive-vocabulary", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["footer.progressiveVocabulary"]}</Link></li>
              <li><Link href={localizeHref("/grid-modes", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["footer.gridModes"]}</Link></li>
              <li><Link href={localizeHref("/activity-boards", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["footer.activityBoards"]}</Link></li>
              <li><Link href={localizeHref("/core-fringe", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["footer.coreFringeLayouts"]}</Link></li>
              <li><Link href={localizeHref("/symbol-management", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["footer.symbolLibrary"]}</Link></li>
              <li><Link href={localizeHref("/setup-wizard", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["footer.setupWizard"]}</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{t["footer.legal"]}</p>
            <ul className="space-y-2">
              <li><Link href={localizeHref("/privacy-policy", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["nav.privacyPolicy"]}</Link></li>
              <li><Link href={localizeHref("/terms-of-service", locale)} className="text-sm text-slate-700 no-underline transition hover:text-indigo-600">{t["nav.termsOfService"]}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4">
        <p className="text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {siteConfig.name}. {t["footer.copyright"]}
        </p>
      </div>
    </footer>
  );
}
