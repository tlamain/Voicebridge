export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Loquor AAC. Built with privacy and accessibility in mind.
        </p>
      </div>
    </footer>
  );
}
