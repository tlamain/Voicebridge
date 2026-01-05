export default function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <p>
          © {new Date().getFullYear()} VoiceBridge AAC. Built with privacy and accessibility in mind.
        </p>
      </div>
    </footer>
  );
}
