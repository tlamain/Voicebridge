import { assetPath } from "@/lib/site";

type AppScreenshotProps = {
  src?: string;
  label: string;
  description?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  size?: "sm" | "md" | "lg" | "full";
};

const aspectRatioClasses = {
  portrait: "aspect-[9/16]",
  landscape: "aspect-[16/9]",
  square: "aspect-square",
};

const sizeClasses = {
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-md",
  full: "w-full",
};

export default function AppScreenshot({
  src,
  label,
  description,
  aspectRatio = "portrait",
  size = "md",
}: AppScreenshotProps) {
  return (
    <div className={`mx-auto ${sizeClasses[size]}`}>
      <div
        className={`relative w-full ${aspectRatioClasses[aspectRatio]} overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 shadow-md`}
      >
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={assetPath(src)}
            alt={description ? `${label} — ${description}` : label}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            {/* Phone frame top notch */}
            {aspectRatio === "portrait" && (
              <div className="absolute top-0 inset-x-0 flex justify-center pt-3 z-10">
                <div className="h-1.5 w-16 rounded-full bg-slate-300" />
              </div>
            )}

            {/* Placeholder content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 ring-1 ring-indigo-200 shadow-sm">
                <svg
                  className="h-8 w-8 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold text-slate-600">{label}</p>
                {description && (
                  <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
                )}
              </div>
              <div className="mt-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-500 ring-1 ring-indigo-100">
                App screenshot
              </div>
            </div>

            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 23px, #cbd5e1 23px, #cbd5e1 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, #cbd5e1 23px, #cbd5e1 24px)",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
