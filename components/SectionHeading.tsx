interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ badge, title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={`space-y-3 ${centered ? "text-center" : ""}`}>
      {badge && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">{badge}</p>
      )}
      <h2 className="font-(--font-jakarta) text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-slate-600 ${centered ? "mx-auto max-w-2xl" : ""}`}>{subtitle}</p>
      )}
    </div>
  );
}
