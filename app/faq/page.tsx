export default function FaqPage() {
  return (
    <>
      <h1>FAQ</h1>

      <div className="card">
        <h2>Does it work offline?</h2>
        <p>Yes. Core communication works offline. Voice quality can adapt depending on connectivity.</p>
      </div>

      <div className="card">
        <h2>Is my data private?</h2>
        <p>VoiceBridge is designed around local-first principles so sensitive communication isn’t uploaded by default.</p>
      </div>

      <div className="card">
        <h2>Can caregivers customize vocabulary?</h2>
        <p>Yes. Admin features are protected to prevent accidental edits.</p>
      </div>
    </>
  );
}
