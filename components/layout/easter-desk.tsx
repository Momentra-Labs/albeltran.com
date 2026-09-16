"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export function EasterDesk() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<string[]>([
    "issue console · Vol. 01 / Manila",
    "demo desk. type help.",
  ]);
  const [line, setLine] = useState("");
  const buffer = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const push = useCallback((message: string) => {
    setLog((current) => [...current.slice(-12), message]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const command = raw.trim().toLowerCase();
      if (!command) return;
      push(`› ${raw}`);
      if (command === "help") {
        push("help · status · 4821 · build · failures · clear · exit");
        return;
      }
      if (command === "status") {
        push("desks online: incident · how-id-build · system-design");
        push("telemetry: fictional. progress: localStorage only.");
        return;
      }
      if (command === "4821" || command === "incident" || command === "open 4821") {
        push("opening incident #4821…");
        setOpen(false);
        router.push("/lab/incident/?c=4821");
        return;
      }
      if (command === "build") {
        setOpen(false);
        router.push("/lab/how-id-build/");
        return;
      }
      if (command === "failures") {
        setOpen(false);
        router.push("/failures/");
        return;
      }
      if (command === "clear") {
        setLog([]);
        return;
      }
      if (command === "exit" || command === "q") {
        setOpen(false);
        return;
      }
      push("unknown. try help.");
    },
    [push, router],
  );

  useEffect(() => {
    function maybeOpenFromLocation() {
      const params = new URLSearchParams(window.location.search);
      if (window.location.hash === "#desk" || params.get("desk") === "1") {
        setOpen(true);
      }
    }

    function onDeskEvent() {
      setOpen(true);
      push("desk mark · type help.");
    }

    maybeOpenFromLocation();
    window.addEventListener("hashchange", maybeOpenFromLocation);
    window.addEventListener("albeltran-desk", onDeskEvent);
    return () => {
      window.removeEventListener("hashchange", maybeOpenFromLocation);
      window.removeEventListener("albeltran-desk", onDeskEvent);
    };
  }, [push]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.defaultPrevented) return;

      if (event.key === "`" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        if (isTypingTarget(event.target) && !open) return;
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }

      if (open && event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (isTypingTarget(event.target)) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      buffer.current = [...buffer.current, key].slice(-KONAMI.length);
      const matched = KONAMI.every((item, index) => buffer.current[index] === item);
      if (matched) {
        buffer.current = [];
        setOpen(true);
        push("konami · desk unlocked. idle-in-transaction from inventory-sync.");
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, push]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto w-auto max-w-[min(32rem,calc(100vw-1.5rem))] border border-border bg-background p-3 shadow-none sm:inset-x-auto sm:right-3 sm:left-auto"
      role="dialog"
      aria-label="Issue console"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          Issue console
        </p>
        <button
          type="button"
          onClick={close}
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
        >
          Close
        </button>
      </div>
      <pre className="mt-2 max-h-40 overflow-y-auto font-mono text-[11px] leading-relaxed text-muted">
        {log.join("\n")}
      </pre>
      <form
        className="mt-2 flex items-center gap-2 border-t border-border pt-2"
        onSubmit={(event) => {
          event.preventDefault();
          run(line);
          setLine("");
        }}
      >
        <label className="sr-only" htmlFor="issue-console">
          Console command
        </label>
        <span className="font-mono text-[11px] text-accent" aria-hidden>
          ›
        </span>
        <input
          id="issue-console"
          ref={inputRef}
          value={line}
          onChange={(event) => setLine(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          className={cn(
            "min-h-10 flex-1 bg-transparent font-mono text-[12px] text-foreground outline-none",
          )}
        />
      </form>
    </div>
  );
}
