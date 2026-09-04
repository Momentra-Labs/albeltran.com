"use client";

import { useRef, useState, type ReactNode } from "react";

function languageFromClass(className?: string) {
  const match = className?.match(/language-([\w+-]+)/);
  return match?.[1] ?? "code";
}

export function CodeBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const language = languageFromClass(className);

  async function copy() {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="group relative my-6 overflow-hidden border border-border bg-[#08080d]">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre ref={preRef} className="overflow-x-auto p-4 text-[13px] leading-6">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
