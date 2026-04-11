"use client";

import { useEffect } from "react";

interface TallyEmbedProps {
  formId: string;
  title: string;
  className?: string;
}

const TALLY_SCRIPT_SRC = "https://tally.so/widgets/embed.js";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export default function TallyEmbed({ formId, title, className = "" }: TallyEmbedProps) {
  useEffect(() => {
    const loadEmbeds = () => {
      if (typeof window !== "undefined" && window.Tally?.loadEmbeds) {
        window.Tally.loadEmbeds();
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TALLY_SCRIPT_SRC}"]`
    );

    if (existing) {
      loadEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.src = TALLY_SCRIPT_SRC;
    script.async = true;
    script.onload = loadEmbeds;
    document.body.appendChild(script);
  }, [formId]);

  const src = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  return (
    <iframe
      data-tally-src={src}
      src={src}
      loading="lazy"
      width="100%"
      height={500}
      title={title}
      className={className}
      style={{ border: 0 }}
    />
  );
}
