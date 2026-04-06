"use client";

import { useEffect } from "react";
import { defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  useEffect(() => {
    window.location.replace(`/${defaultLocale}/`);
  }, []);

  return (
    <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}/`} />
  );
}
