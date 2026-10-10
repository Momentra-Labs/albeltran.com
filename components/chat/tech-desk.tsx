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
  type MouseEvent as ReactMouseEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, Check, Copy, Square, SquarePen, X } from "lucide-react";
import { DeskMarkdown } from "@/components/chat/desk-markdown";
import { TechDeskLaunch } from "@/components/chat/tech-desk-launch";
import { TechDeskMark, type DeskMood } from "@/components/chat/tech-desk-mark";
import {
  TechDeskNudge,
  deskUnseen,
  markDeskOpened,
} from "@/components/chat/tech-desk-nudge";
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
/** Below this width the desk opens as a full-screen sheet. */
const SHEET_QUERY = "(max-width: 639px)";
/** How close to the bottom (px) still counts as "following" the stream. */
const FOLLOW_SLACK = 72;
const DRAFT_MAX_HEIGHT = 160;
const LOW_TURNS = 5;

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

export function TechDesk({ startOpen = false }: { startOpen?: boolean }) {
  const titleId = useId();
  const inputId = useId();
  const hintId = useId();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const followRef = useRef(true);
  /** Set when the desk itself cancels a reply (close / new chat), so no "Stopped" notice shows. */
  const quietAbortRef = useRef(false);
  const winkTimer = useRef<number>(0);
  const copyTimer = useRef<number>(0);
  const [open, setOpen] = useState(startOpen);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(() =>
    startOpen && !groqConfigured() ? TECH_DESK.offline : "",
  );
  const [left, setLeft] = useState<number>(GROQ_CONFIG.dailyTurns);
  const [wink, setWink] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [peek, setPeek] = useState(false);
  const [logReady, setLogReady] = useState(false);
  const [ping, setPing] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const [announce, setAnnounce] = useState("");
  const online = groqConfigured();
  const motionMs = reduce ? 0 : 0.28;
  const lineLabel = busy
    ? TECH_DESK.listening
    : online
      ? TECH_DESK.live
      : TECH_DESK.offlineShort;
  const mood: DeskMood = busy
    ? "think"
    : notice
      ? "sorry"
      : wink
        ? "happy"
        : "idle";
  const canSend = online && !busy && !!draft.trim() && left > 0;

  const pinLog = useCallback((mode: "follow" | "turn" = "follow") => {
    const node = logRef.current;
    if (!node) return;
    if (mode === "turn") {
      const items = node.querySelectorAll<HTMLElement>(".tech-desk-turn");
      const last = items[items.length - 1];
      if (last) {
        node.scrollTop +=
          last.getBoundingClientRect().top - node.getBoundingClientRect().top;
        return;
      }
    }
    node.scrollTop = node.scrollHeight;
  }, []);

  const jumpToLatest = useCallback(() => {
    followRef.current = true;
    setShowJump(false);
    const node = logRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [reduce]);

  const onLogScroll = useCallback(() => {
    const node = logRef.current;
    if (!node) return;
    const gap = node.scrollHeight - node.scrollTop - node.clientHeight;
    const near = gap < FOLLOW_SLACK;
    followRef.current = near;
    setShowJump(!near);
  }, []);

  const triggerWink = useCallback(() => {
    setWink(true);
    window.clearTimeout(winkTimer.current);
    winkTimer.current = window.setTimeout(() => setWink(false), 900);
  }, []);

  const openDesk = useCallback(() => {
    markDeskOpened();
    setPing(false);
    setNotice(groqConfigured() ? "" : TECH_DESK.offline);
    followRef.current = true;
    setOpen(true);
  }, []);

  useEffect(() => {
    setTurns(readDeskLog());
    setLeft(remainingDeskTurns());
    setPing(deskUnseen());
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
      setShowJump(false);
      return;
    }
    inputRef.current?.focus();
  }, [open]);

  // Phones get a full-screen sheet: stop the page behind it from scrolling.
  useEffect(() => {
    if (!open || !window.matchMedia(SHEET_QUERY).matches) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    // While a reply streams, only follow it if the reader hasn't scrolled up.
    if (busy && !followRef.current) return;
    const mode = busy ? "follow" : "turn";
    pinLog(mode);
    const frame = window.requestAnimationFrame(() => pinLog(mode));
    const timer = window.setTimeout(() => pinLog(mode), 320);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [open, turns, busy, pinLog]);

  // Grow the composer with its content, up to a cap.
  useLayoutEffect(() => {
    const node = inputRef.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${Math.min(node.scrollHeight, DRAFT_MAX_HEIGHT)}px`;
  }, [draft, open]);

  useEffect(() => {
    if (busyRef.current && !busy) {
      const hasReply = turns.some(
        (turn) => turn.role === "assistant" && turn.content.trim(),
      );
      if (hasReply) {
        triggerWink();
        setAnnounce(TECH_DESK.replied);
      }
    }
    busyRef.current = busy;
  }, [busy, turns, triggerWink]);

  const close = useCallback(() => {
    if (abortRef.current) quietAbortRef.current = true;
    abortRef.current?.abort();
    abortRef.current = null;
    setBusy(false);
    setOpen(false);
    // Return focus to the launcher once it has re-mounted.
    window.setTimeout(() => {
      document.querySelector<HTMLElement>(".tech-desk-launch")?.focus();
    }, 60);
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
      followRef.current = true;
      setShowJump(false);
      setAnnounce("");
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
        const stopped =
          error instanceof DOMException && error.name === "AbortError";
        const quiet = stopped && quietAbortRef.current;
        quietAbortRef.current = false;
        const copy = stopped ? TECH_DESK.stopped : errorCopy(error);
        if (copy && !quiet) setNotice(copy);
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

  const stop = useCallback(() => {
    abortRef.current?.abort();
    inputRef.current?.focus();
  }, []);

  const newChat = useCallback(() => {
    if (abortRef.current) quietAbortRef.current = true;
    abortRef.current?.abort();
    abortRef.current = null;
    setBusy(false);
    setTurns([]);
    setNotice(online ? "" : TECH_DESK.offline);
    setAnnounce("");
    setShowJump(false);
    followRef.current = true;
    inputRef.current?.focus();
  }, [online]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(draft);
  }

  function onDraftKey(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void send(draft);
    }
  }

  // Keep keyboard focus inside the dialog while it is open.
  function onPanelKey(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // On the phone sheet, following a link to a page on this site should reveal that page.
  function onLogClick(event: ReactMouseEvent<HTMLDivElement>) {
    const link = (event.target as HTMLElement).closest("a");
    if (!link || link.target === "_blank") return;
    if (window.matchMedia(SHEET_QUERY).matches) close();
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
    <div className={cn("tech-desk", open && "is-open", `is-${mood}`)}>
      <TechDeskNudge open={open} busy={busy} onOpen={openDesk} />
      <AnimatePresence mode="popLayout" initial={false}>
        {open ? (
          <motion.div
            key="panel"
            ref={panelRef}
            className="tech-desk-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: motionMs, ease: deskEase }}
            onKeyDown={onPanelKey}
            onAnimationComplete={() => {
              if (followRef.current) pinLog(busy ? "follow" : "turn");
              inputRef.current?.focus();
            }}
          >
            <header
              className={cn(
                "tech-desk-head",
                busy && "is-listening",
                !online && "is-offline",
                notice && "is-sorry",
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
                    mood === "happy" && "is-happy",
                    mood === "sorry" && "is-sorry",
                    mood === "think" && "is-think",
                  )}
                  aria-label={TECH_DESK.poke}
                  onPointerEnter={() => setPeek(true)}
                  onPointerLeave={() => setPeek(false)}
                  onClick={triggerWink}
                >
                  <motion.span
                    className="tech-desk-launch-mark"
                    layoutId="desk-mascot"
                    layout
                  >
                    <TechDeskMark mood={mood} />
                  </motion.span>
                </button>
                <div className="min-w-0">
                  <h2 id={titleId} className="tech-desk-title">
                    {TECH_DESK.title}
                    <span className="tech-desk-title-tag">{TECH_DESK.subtitle}</span>
                  </h2>
                  <p className="tech-desk-live">
                    <span
                      className={cn(
                        "tech-desk-live-pip",
                        busy && "is-listening",
                        !online && "is-offline",
                      )}
                      aria-hidden="true"
                    />
                    <span className="tech-desk-head-status">{lineLabel}</span>
                  </p>
                </div>
              </div>
              <div className="tech-desk-head-actions">
                {turns.length > 0 ? (
                  <button
                    type="button"
                    className="tech-desk-icon-btn"
                    aria-label={TECH_DESK.newChat}
                    title={TECH_DESK.newChat}
                    onClick={newChat}
                  >
                    <SquarePen aria-hidden="true" />
                  </button>
                ) : null}
                <button
                  type="button"
                  className="tech-desk-icon-btn"
                  aria-label={TECH_DESK.close}
                  title={TECH_DESK.close}
                  onClick={close}
                >
                  <X aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="tech-desk-body">
              <div
                ref={(node) => {
                  logRef.current = node;
                }}
                className="tech-desk-log"
                aria-label="Conversation"
                onScroll={onLogScroll}
                onClick={onLogClick}
              >
                {turns.length === 0 ? (
                  <div className="tech-desk-welcome">
                    <p className="tech-desk-greet">{TECH_DESK.greet}</p>
                    <p className="tech-desk-greet-next">{TECH_DESK.greetNext}</p>
                    <p className="tech-desk-empty">{TECH_DESK.empty}</p>
                    <p className="tech-desk-starters-label">{TECH_DESK.suggestions}</p>
                    <div className="tech-desk-starters">
                      {TECH_DESK_STARTERS.map((starter) => (
                        <button
                          key={starter.id}
                          type="button"
                          disabled={busy || !online || left <= 0}
                          className="tech-desk-chip"
                          data-cursor="→"
                          onClick={() => void send(starter.prompt)}
                        >
                          {starter.label}
                          <ArrowUp className="tech-desk-chip-icon" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  turns.map((turn, index) => {
                    const last = index === turns.length - 1;
                    const desk = turn.role === "assistant";
                    const waiting = busy && last && desk && !turn.content;
                    const streaming = busy && last && desk && !!turn.content;
                    const canCopy = desk && !waiting && !streaming && !!turn.content.trim();
                    const copied = copiedIndex === index;
                    return (
                      <article
                        key={`${turn.role}-${index}`}
                        className={cn(
                          "tech-desk-turn min-w-0",
                          desk ? "tech-desk-turn-desk max-w-full" : "tech-desk-turn-you",
                        )}
                      >
                        <p className="tech-desk-turn-meta">
                          {desk ? (
                            <span className="tech-desk-turn-avatar" aria-hidden="true" />
                          ) : null}
                          <span>{desk ? "Desk" : "You"}</span>
                        </p>
                        <div
                          className={cn(
                            "tech-desk-bubble min-w-0 max-w-full",
                            desk && "is-md",
                          )}
                        >
                          {waiting ? (
                            <span className="tech-desk-waiting">
                              <span className="tech-desk-pips" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                              </span>
                              <span>{TECH_DESK.thinking}</span>
                            </span>
                          ) : desk ? (
                            <>
                              <DeskMarkdown source={turn.content} />
                              {streaming ? (
                                <span className="tech-desk-caret" aria-hidden="true" />
                              ) : null}
                            </>
                          ) : (
                            turn.content
                          )}
                        </div>
                        {canCopy ? (
                          <div className="tech-desk-turn-foot">
                            <button
                              type="button"
                              className={cn("tech-desk-copy", copied && "is-copied")}
                              onClick={() => void copyMessage(index, turn.content)}
                            >
                              {copied ? (
                                <Check aria-hidden="true" />
                              ) : (
                                <Copy aria-hidden="true" />
                              )}
                              {copied ? TECH_DESK.copied : TECH_DESK.copy}
                            </button>
                          </div>
                        ) : null}
                      </article>
                    );
                  })
                )}
              </div>

              <AnimatePresence>
                {showJump && turns.length > 0 ? (
                  <motion.button
                    key="jump"
                    type="button"
                    className="tech-desk-jump"
                    aria-label={TECH_DESK.jumpLabel}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 6 }}
                    transition={{ duration: reduce ? 0 : 0.18 }}
                    onClick={jumpToLatest}
                  >
                    <ArrowDown aria-hidden="true" />
                    {TECH_DESK.jump}
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>

            <p className="sr-only" aria-live="polite">
              {announce}
            </p>

            {notice ? (
              <p className="tech-desk-notice" role="status">
                {notice}
              </p>
            ) : null}

            <form className="tech-desk-compose" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor={inputId}>
                Tech question
              </label>
              <div className={cn("tech-desk-field", busy && "is-busy")}>
                <textarea
                  ref={inputRef}
                  id={inputId}
                  rows={1}
                  maxLength={GROQ_CONFIG.promptMax}
                  value={draft}
                  placeholder={TECH_DESK.placeholder}
                  aria-describedby={hintId}
                  enterKeyHint="send"
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={onDraftKey}
                  className="tech-desk-input"
                />
                {busy ? (
                  <button
                    type="button"
                    className="tech-desk-send is-stop"
                    aria-label={TECH_DESK.stop}
                    title={TECH_DESK.stop}
                    onClick={stop}
                  >
                    <Square aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="tech-desk-send"
                    aria-label={TECH_DESK.send}
                    title={TECH_DESK.send}
                    disabled={!canSend}
                    data-cursor="→"
                  >
                    <ArrowUp aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="tech-desk-compose-foot">
                <p id={hintId} className="tech-desk-hint">
                  {TECH_DESK.hint}
                </p>
                <p className={cn("tech-desk-left", left <= LOW_TURNS && "is-low")}>
                  {TECH_DESK.turnsLeft(left)}
                </p>
              </div>
            </form>
          </motion.div>
        ) : (
          <TechDeskLaunch
            key="launch"
            mood={mood}
            ping={ping}
            onClick={openDesk}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
