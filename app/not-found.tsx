import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container">
      <h1>Page not found</h1>
      <p>That page doesn’t exist.</p>
      <p><Link href="/">Go home</Link></p>
    </main>
  );
}
