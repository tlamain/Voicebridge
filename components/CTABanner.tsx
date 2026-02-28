import Link from "next/link";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTABanner({ title, subtitle, buttonText, buttonHref }: CTABannerProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-indigo-700 to-blue-800 px-8 py-14 text-center shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      <div className="relative z-10">
        <h2 className="font-(--font-jakarta) text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 mx-auto max-w-xl text-lg text-indigo-100">{subtitle}</p>
        )}
        <Link
          href={buttonHref}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg transition-all duration-200 hover:bg-indigo-50 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
