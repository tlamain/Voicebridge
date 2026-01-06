import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between" aria-label="Primary">
          <Link href="/" className="text-xl font-bold text-indigo-900">
            AyAySee (AAC)
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="/who-its-for" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Who it’s for</Link>
            <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">FAQ</Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
