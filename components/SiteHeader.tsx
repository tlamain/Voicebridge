import Link from "next/link";

export default function SiteHeader() {
  return (
    <header>
      <div className="container">
        <nav className="nav" aria-label="Primary">
          <Link href="/">VoiceBridge AAC</Link>
          <Link href="/features">Features</Link>
          <Link href="/who-its-for">Who it’s for</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
