import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>VoiceBridge AAC</h1>
      <p>
        A universal AAC app that bridges <strong>text-based</strong> and{" "}
        <strong>symbol-based</strong> communication in one simple interface.
      </p>

      <div className="card">
        <h2>Why it matters</h2>
        <ul>
          <li>For literate users (ALS, stroke/aphasia): fast typing + predictions.</li>
          <li>For pre-literate users (autism, cerebral palsy): consistent symbol grids that support motor planning.</li>
          <li>For caregivers/SLPs: PIN-protected editing and safe customization.</li>
        </ul>
      </div>

      <div className="card">
        <h2>Get the app</h2>
        <p>
          Coming soon on iOS and Android. Want early access?{" "}
          <Link href="/contact">Contact us</Link>.
        </p>
      </div>

      <p>
        Next: <Link href="/features">See features →</Link>
      </p>
    </>
  );
}
