"use client";

export function DeskMark() {
  return (
    <button
      type="button"
      className="ml-2 font-mono text-[10px] text-muted-dim/70 hover:text-muted"
      aria-label="Open issue console"
      onClick={() => window.dispatchEvent(new Event("albeltran-desk"))}
    >
      {"//"}
    </button>
  );
}
