import { TECH_DESK_SYSTEM } from "@/content/chat";

function resolveGroqModel() {
  const raw = (process.env.NEXT_PUBLIC_GROQ_MODEL || "llama-3.1-8b-instant").trim();
  return raw.startsWith("llama-openai/") ? raw.slice("llama-".length) : raw;
}

export const GROQ_CONFIG = {
  endpoint: "https://api.groq.com/openai/v1/chat/completions",
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY ?? "",
  model: resolveGroqModel(),
  dailyTurns: 24,
  promptMax: 2000,
  history: 12,
  maxTokens: 800,
} as const;

export type ChatRole = "user" | "assistant";

export type ChatTurn = {
  role: ChatRole;
  content: string;
};

const CAP_KEY = "albeltran-tech-desk";
const LOG_KEY = "albeltran-tech-desk-log";
const LOG_MAX = 40;

type CapState = {
  day: string;
  turns: number;
};

function utcDay() {
  return new Date().toISOString().slice(0, 10);
}

function readCap(): CapState {
  if (typeof window === "undefined") return { day: utcDay(), turns: 0 };
  try {
    const raw = window.localStorage.getItem(CAP_KEY);
    if (!raw) return { day: utcDay(), turns: 0 };
    const parsed = JSON.parse(raw) as CapState;
    if (parsed.day !== utcDay() || typeof parsed.turns !== "number") {
      return { day: utcDay(), turns: 0 };
    }
    return parsed;
  } catch {
    return { day: utcDay(), turns: 0 };
  }
}

function writeCap(state: CapState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CAP_KEY, JSON.stringify(state));
}

export function groqConfigured() {
  return GROQ_CONFIG.apiKey.length > 8;
}

function isChatTurn(value: unknown): value is ChatTurn {
  if (!value || typeof value !== "object") return false;
  const turn = value as ChatTurn;
  return (
    (turn.role === "user" || turn.role === "assistant") &&
    typeof turn.content === "string"
  );
}

export function readDeskLog(): ChatTurn[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isChatTurn).slice(-LOG_MAX);
  } catch {
    return [];
  }
}

export function writeDeskLog(turns: ChatTurn[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    LOG_KEY,
    JSON.stringify(turns.filter(isChatTurn).slice(-LOG_MAX)),
  );
}

export function remainingDeskTurns() {
  const cap = readCap();
  return Math.max(0, GROQ_CONFIG.dailyTurns - cap.turns);
}

export function consumeDeskTurn() {
  const cap = readCap();
  const next = { day: utcDay(), turns: cap.turns + 1 };
  writeCap(next);
  return Math.max(0, GROQ_CONFIG.dailyTurns - next.turns);
}

export function clipPrompt(value: string) {
  return value.trim().slice(0, GROQ_CONFIG.promptMax);
}

export class DeskError extends Error {
  code: "offline" | "capped" | "cors" | "http";

  constructor(code: DeskError["code"], message: string) {
    super(message);
    this.name = "DeskError";
    this.code = code;
  }
}

type StreamArgs = {
  history: ChatTurn[];
  prompt: string;
  signal?: AbortSignal;
  onDelta: (chunk: string) => void;
};

export async function streamDeskReply({
  history,
  prompt,
  signal,
  onDelta,
}: StreamArgs) {
  if (!groqConfigured()) {
    throw new DeskError("offline", "The desk is offline.");
  }
  if (remainingDeskTurns() <= 0) {
    throw new DeskError("capped", "Daily turn cap reached.");
  }

  const messages = [
    { role: "system" as const, content: TECH_DESK_SYSTEM },
    ...history
      .filter((turn) => turn.content.trim())
      .slice(-GROQ_CONFIG.history)
      .map((turn) => ({
        role: turn.role,
        content: turn.content,
      })),
    { role: "user" as const, content: clipPrompt(prompt) },
  ];

  let response: Response;
  try {
    response = await fetch(GROQ_CONFIG.endpoint, {
      method: "POST",
      signal,
      headers: {
        Authorization: `Bearer ${GROQ_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_CONFIG.model,
        temperature: 0.4,
        max_tokens: GROQ_CONFIG.maxTokens,
        stream: true,
        messages,
      }),
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new DeskError(
      "cors",
      error instanceof Error ? error.message : "Network error",
    );
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new DeskError(
      "http",
      `Groq ${response.status}${detail ? `: ${detail.slice(0, 180)}` : ""}`,
    );
  }

  consumeDeskTurn();

  if (!response.body) {
    throw new DeskError("http", "Groq returned an empty body.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const payload = line.trim();
      if (!payload.startsWith("data:")) continue;
      const data = payload.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const json = JSON.parse(data) as {
          choices?: { delta?: { content?: string } }[];
        };
        const delta = json.choices?.[0]?.delta?.content;
        if (typeof delta === "string" && delta) onDelta(delta);
      } catch {
        // ignore keep-alives
      }
    }
  }
}
