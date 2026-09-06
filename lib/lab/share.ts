export async function shareLabResult(input: {
  title: string;
  text: string;
  url: string;
}): Promise<"shared" | "copied" | "failed"> {
  const payload = `${input.text}\n${input.url}`;
  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({
        title: input.title,
        text: input.text,
        url: input.url,
      });
      return "shared";
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return "failed";
    }
  }
  try {
    await navigator.clipboard.writeText(payload);
    return "copied";
  } catch {
    return "failed";
  }
}

export function formatShareText(input: {
  experience: string;
  challenge?: string;
  score: number;
  maxScore: number;
  breakdown?: { label: string; value: number }[];
}) {
  const lines = [
    "AL BELTRAN ENGINEERING LAB",
    input.challenge
      ? `${input.experience.toUpperCase()} · ${input.challenge.toUpperCase()}`
      : input.experience.toUpperCase(),
    `${input.score} / ${input.maxScore}`,
  ];
  if (input.breakdown?.length) {
    for (const row of input.breakdown) {
      lines.push(`${row.label.padEnd(14, " ")} ${row.value}`);
    }
  }
  lines.push("", "Can you beat my score?");
  return lines.join("\n");
}
