import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${jakarta.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-linear-to-b from-white via-slate-50 to-slate-100 text-slate-900 flex flex-col font-(--font-inter)">
        {children}
      </body>
    </html>
  );
}
