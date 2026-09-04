"use client";

import { useEffect, useState } from "react";

export function ArticleProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const article = document.querySelector("[data-article-body]");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const height = article.scrollHeight - window.innerHeight;
      const next =
        height <= 0 ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / height));
      setProgress(next);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[2px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-accent"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  );
}
