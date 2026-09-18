"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TechDeskMark } from "@/components/chat/tech-desk-mark";
import {
  TECH_DESK,
  TECH_DESK_STARTERS,
} from "@/content/chat";
import {
  DeskError,
  GROQ_CONFIG,
  clipPrompt,
  groqConfigured,
  remainingDeskTurns,
  readDeskLog,
  streamDeskReply,
  writeDeskLog,
  type ChatTurn,
} from "@/lib/groq";
import { cn } from "@/lib/utils";

const deskEase = [0.23, 1, 0.32, 1] as const;

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

function CopyButton({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "tech-desk-copy font-mono text-[9px] uppercase tracking-[0.16em] text-muted hover:text-foreground",
        copied && "is-copied",
      )}
      onClick={onCopy}
    >
      {copied ? TECH_DESK.copied : TECH_DESK.copy}
    </button>
  );
}

function errorCopy(error: unknown) {
  if (error instanceof DeskError) {
    if (error.code === "offline") return TECH_DESK.offline;
    if (error.code === "capped") return TECH_DESK.capped;
    if (error.code === "cors") return TECH_DESK.cors;
    return error.message;
  }
  if (error instanceof DOMException && error.name === "AbortError") {
    return "";
  }
  return "The desk dropped the line. Try once more.";
}

export function TechDesk() {
  const titleId = useId();
  const inputId = useId();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const winkTimer = useRef<number>(0);
  const copyTimer = useRef<number>(0);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [left, setLeft] = useState<number>(GROQ_CONFIG.dailyTurns);
  const [wink, setWink] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [peek, setPeek] = useState(false);
  const [logReady, setLogReady] = useState(false);
  const online = groqConfigured();
  const motionMs = reduce ? 0 : 0.28;
  const lineLabel = busy
    ? TECH_DESK.listening
    : online
      ? TECH_DESK.live
      : TECH_DESK.offlineShort;

  const pinLog = useCallback(() => {
    const node = logRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, []);

  const triggerWink = useCallback(() => {
    setWink(true);
    window.clearTimeout(winkTimer.current);
    winkTimer.current = window.setTimeout(() => setWink(false), 400);
  }, []);

  useEffect(() => {
    setTurns(readDeskLog());
    setLeft(remainingDeskTurns());
    setLogReady(true);
    return () => {
      window.clearTimeout(winkTimer.current);
      window.clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!logReady) return;
    writeDeskLog(turns);
  }, [logReady, turns]);

  useEffect(() => {
    if (!open) {
      setPeek(false);
      return;
    }
    inputRef.current?.focus();
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    pinLog();
    const frame = window.requestAnimationFrame(pinLog);
    const timer = window.setTimeout(pinLog, 320);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [open, turns, pinLog]);

  useEffect(() => {
    if (busyRef.current && !busy) {
      const hasReply = turns.some(
        (turn) => turn.role === "assistant" && turn.content.trim(),
      );
      if (hasReply) triggerWink();
    }
    busyRef.current = busy;
  }, [busy, turns, triggerWink]);

  const close = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setBusy(false);
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (panelRef.current?.contains(event.target)) return;
      close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  const send = useCallback(
    async (raw: string) => {
      const prompt = clipPrompt(raw);
      if (!prompt || busy) return;
      if (!online) {
        setNotice(TECH_DESK.offline);
        triggerWink();
        return;
      }
      if (remainingDeskTurns() <= 0) {
        setLeft(0);
        setNotice(TECH_DESK.capped);
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setNotice("");
      setDraft("");
      setBusy(true);
      setTurns((current) => [
        ...current,
        { role: "user", content: prompt },
        { role: "assistant", content: "" },
      ]);

      try {
        await streamDeskReply({
          history: turns,
          prompt,
          signal: controller.signal,
          onDelta: (chunk) => {
            setTurns((current) => {
              const next = [...current];
              const last = next[next.length - 1];
              if (!last || last.role !== "assistant") return current;
              next[next.length - 1] = {
                ...last,
                content: last.content + chunk,
              };
              return next;
            });
          },
        });
        setTurns((current) => {
          const last = current[current.length - 1];
          if (last?.role === "assistant" && !last.content.trim()) {
            const next = [...current];
            next[next.length - 1] = {
              role: "assistant",
              content: "No reply came back. Ask again in a shorter line.",
            };
            return next;
          }
          return current;
        });
      } catch (error) {
        const copy = errorCopy(error);
        if (copy) setNotice(copy);
        setTurns((current) => {
          const last = current[current.length - 1];
          if (last?.role === "assistant" && !last.content.trim()) {
            return current.slice(0, -1);
          }
          return current;
        });
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setLeft(remainingDeskTurns());
        setBusy(false);
      }
    },
    [busy, online, turns, triggerWink],
  );

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(draft);
  }

  function onDraftKey(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(draft);
    }
  }

  const copyMessage = useCallback(async (index: number, content: string) => {
    if (!content.trim()) return;
    const copied = await writeClipboard(content);
    if (!copied) return;
    setCopiedIndex(index);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopiedIndex(null), 1600);
  }, []);

  return (
    <div className="tech-desk">
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="panel"
            ref={panelRef}
            className="tech-desk-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 10 }}
            transition={{ duration: motionMs, ease: deskEase }}
            onAnimationComplete={() => {
              pinLog();
              inputRef.current?.focus();
            }}
          >
            <header
              className={cn(
                "tech-desk-head",
                busy && "is-listening",
                !online && "is-offline",
              )}
            >
              <div className="tech-desk-head-lead">
                <button
                  type="button"
                  className={cn(
                    "tech-desk-head-mascot",
                    busy && "is-listening",
                    wink && "is-wink",
                    peek && "is-peek",
                  )}
                  aria-label={TECH_DESK.poke}
                  onPointerEnter={() => setPeek(true)}
                  onPointerLeave={() => setPeek(false)}
                  onClick={triggerWink}
                >
                  <TechDeskMark mood={busy ? "listen" : "idle"} />
                </button>
                <div className="min-w-0">
                  <div className="tech-desk-live">
                    <span
                      className={cn(
                        "tech-desk-live-pip",
                        busy && "is-listening",
                        !online && "is-offline",
                      )}
                      aria-hidden="true"
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {TECH_DESK.kicker}
                    </p>
                  </div>
                  <h2
                    id={titleId}
                    className="mt-1 font-display text-2xl tracking-tight text-foreground"
                  >
                    {TECH_DESK.title}
                  </h2>
                  <p
                    className="tech-desk-head-status"
                    aria-live="polite"
                  >
                    {lineLabel}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
                onClick={close}
              >
                Close
              </button>
            </header>

            <div
              ref={(node) => {
                logRef.current = node;
                if (node) node.scrollTop = node.scrollHeight;
              }}
              className="tech-desk-log"
            >
              {turns.length === 0 ? (
                <p className="text-sm leading-relaxed text-muted">
                  {TECH_DESK.empty}
                </p>
              ) : (
                turns.map((turn, index) => {
                  const last = index === turns.length - 1;
                  const waiting =
                    busy && last && turn.role === "assistant" && !turn.content;
                  const streaming =
                    busy && last && turn.role === "assistant" && !!turn.content;
                  const canCopy = !waiting && !!turn.content.trim();
                  const copied = copiedIndex === index;
                  const onCopy = () => void copyMessage(index, turn.content);
                  return (
                    <article
                      key={`${turn.role}-${index}`}
                      className={cn(
                        "tech-desk-turn min-w-0",
                        turn.role === "user"
                          ? "tech-desk-turn-you"
                          : "tech-desk-turn-desk max-w-full",
                      )}
                    >
                      <div className="tech-desk-turn-meta flex max-w-full flex-row items-baseline gap-2 whitespace-nowrap">
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-dim">
                          {turn.role === "user" ? "You" : "Desk"}
                        </p>
                        {canCopy ? (
                          <CopyButton copied={copied} onCopy={onCopy} />
                        ) : null}
                      </div>
                      <div className="tech-desk-bubble min-w-0 max-w-full [overflow-wrap:anywhere] [word-break:break-word]">
                        {waiting ? (
                          <span className="tech-desk-pips" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                          </span>
                        ) : (
                          <>
                            {turn.content}
                            {streaming ? (
                              <span className="tech-desk-caret" aria-hidden="true" />
                            ) : null}
                          </>
                        )}
                      </div>
                      {canCopy ? (
                        <div className="tech-desk-turn-foot">
                          <CopyButton copied={copied} onCopy={onCopy} />
                        </div>
                      ) : null}
                      {copied ? (
                        <span className="sr-only" aria-live="polite">
                          {TECH_DESK.copied}
                        </span>
                      ) : null}
                    </article>
                  );
                })
              )}
            </div>

            {turns.length === 0 ? (
              <div className="tech-desk-starters">
                {TECH_DESK_STARTERS.map((starter) => (
                  <button
                    key={starter.id}
                    type="button"
                    disabled={busy || !online}
                    className="tech-desk-chip"
                    onClick={() => void send(starter.prompt)}
                  >
                    {starter.label}
                  </button>
                ))}
              </div>
            ) : null}

            {notice ? (
              <p className="tech-desk-notice text-sm text-muted" role="status">
                {notice}
              </p>
            ) : null}

            <form className="tech-desk-compose" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor={inputId}>
                Tech question
              </label>
              <Textarea
                ref={inputRef}
                id={inputId}
                rows={2}
                maxLength={GROQ_CONFIG.promptMax}
                disabled={busy}
                value={draft}
                placeholder={TECH_DESK.placeholder}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={onDraftKey}
                className="min-h-[4.5rem] resize-none rounded-none border-border bg-transparent px-0 py-2 focus-visible:ring-0"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-dim">
                  {left} / {GROQ_CONFIG.dailyTurns} today
                </p>
                <Button
                  type="submit"
                  variant="hairline"
                  size="sm"
                  disabled={busy || !draft.trim()}
                  data-cursor="→"
                >
                  {busy ? "Listening" : "Send"}
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="launch"
            type="button"
            className="tech-desk-launch"
            aria-label={TECH_DESK.launcher}
            aria-expanded={false}
            aria-haspopup="dialog"
            data-cursor="ASK"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: motionMs, ease: deskEase }}
            onClick={() => {
              setNotice(online ? "" : TECH_DESK.offline);
              setOpen(true);
            }}
          >
            <TechDeskMark />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
