import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="space-y-4 py-16">
      <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold text-slate-900">Page not found</h1>
      <p className="text-slate-600">The page you requested does not exist on {siteConfig.name}.</p>
      <p>
        <Link href="/" className="font-semibold text-blue-700 no-underline hover:text-blue-800">
          Go home
        </Link>
      </p>
    </main>
  );
}
