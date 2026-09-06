"use client";

import { useState, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

function getSnapshot() {
  const query = new URLSearchParams(window.location.search).get("c");
  const hash = window.location.hash.replace(/^#/, "");
  return query || hash || "";
}

export function useLabChallengeParam() {
  const value = useSyncExternalStore(subscribe, getSnapshot, () => "");
  return value || null;
}

export function useSelectedId(fallback: string, fromUrl: string | null) {
  const [manual, setManual] = useState<string | null>(null);
  return {
    id: manual ?? fromUrl ?? fallback,
    setId: setManual,
  };
}
