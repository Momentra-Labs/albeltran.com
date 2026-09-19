"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TechDeskMark } from "@/components/chat/tech-desk-mark";
import { TECH_DESK } from "@/content/chat";

function LaunchPlaceholder({
  onLoad,
}: {
  onLoad?: (open?: boolean) => void;
}) {
  return (
    <div className="tech-desk">
      <button
        type="button"
        className="tech-desk-launch"
        aria-label={TECH_DESK.launcher}
        aria-expanded={false}
        aria-haspopup="dialog"
        data-cursor="ASK"
        onPointerEnter={onLoad ? () => onLoad(false) : undefined}
        onFocus={onLoad ? () => onLoad(false) : undefined}
        onClick={onLoad ? () => onLoad(true) : undefined}
      >
        <TechDeskMark />
      </button>
    </div>
  );
}

const TechDesk = dynamic(
  () => import("@/components/chat/tech-desk").then((mod) => mod.TechDesk),
  {
    ssr: false,
    loading: () => <LaunchPlaceholder />,
  },
);

export function TechDeskMount() {
  const [ready, setReady] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  const load = useCallback((open = false) => {
    if (open) setStartOpen(true);
    setReady(true);
  }, []);

  useEffect(() => {
    const schedule = window.requestIdleCallback
      ? window.requestIdleCallback.bind(window)
      : (callback: () => void) => window.setTimeout(callback, 1800);
    const cancel = window.cancelIdleCallback
      ? window.cancelIdleCallback.bind(window)
      : window.clearTimeout;
    const id = schedule(() => load(false));
    return () => cancel(id);
  }, [load]);

  if (!ready) {
    return <LaunchPlaceholder onLoad={load} />;
  }

  return <TechDesk startOpen={startOpen} />;
}
