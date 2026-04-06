import Link from "next/link";
import { defaultLocale, getNamespace } from "@/lib/i18n";

export default function NotFound() {
  const t = getNamespace(defaultLocale, "not-found");

  return (
    <div className="py-32 text-center space-y-6">
      <p className="text-7xl font-bold text-indigo-200">404</p>
      <h1 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">{t.title}</h1>
      <p className="text-slate-600 max-w-md mx-auto">
        {t.description}
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 no-underline"
      >
        {t.goHome}
      </Link>
    </div>
  );
}
