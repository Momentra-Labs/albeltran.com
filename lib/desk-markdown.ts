export type DeskBlock =
  | { type: "title"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "code"; lang: string; text: string };

function isFence(line: string) {
  return /^```/.test(line);
}

function isHeading(line: string) {
  return /^#{1,3}\s+\S/.test(line);
}

function isHr(line: string) {
  return /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line);
}

function isListItem(line: string) {
  return /^\s*(?:[-*+]|\d+[.)])\s+\S/.test(line);
}

function isOrderedItem(line: string) {
  return /^\s*\d+[.)]\s+\S/.test(line);
}

function isTableRow(line: string) {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) return false;
  const pipes = trimmed.match(/\|/g)?.length ?? 0;
  return pipes >= 2 && (trimmed.startsWith("|") || trimmed.endsWith("|"));
}

function isSeparator(line: string) {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line);
}

function isQuote(line: string) {
  return /^>\s?/.test(line);
}

function isTitleLine(text: string) {
  return /^\*\*[^*]+\*\*\s*$/.test(text.trim());
}

function splitTableRow(line: string) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let cell = "";
  let inCode = false;
  for (const char of trimmed) {
    if (char === "`") inCode = !inCode;
    if (char === "|" && !inCode) {
      cells.push(cell.trim());
      cell = "";
      continue;
    }
    cell += char;
  }
  cells.push(cell.trim());
  return cells;
}

function stripListMarker(line: string) {
  return line.replace(/^\s*(?:[-*+]|\d+[.)])\s+/, "");
}

export function parseDeskMarkdown(source: string): DeskBlock[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: DeskBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (isFence(line)) {
      const lang = line.replace(/^```/, "").trim();
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !isFence(lines[index])) {
        body.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: "code", lang, text: body.join("\n") });
      continue;
    }

    if (isHeading(line)) {
      const match = /^(#{1,3})\s+(.+)$/.exec(line);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        if (level === 1) blocks.push({ type: "title", text });
        else blocks.push({ type: "heading", level: level === 2 ? 2 : 3, text });
      }
      index += 1;
      continue;
    }

    if (isTableRow(line) && index + 1 < lines.length && isSeparator(lines[index + 1])) {
      const header = splitTableRow(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && isTableRow(lines[index]) && !isSeparator(lines[index])) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    if (isHr(line)) {
      index += 1;
      continue;
    }

    if (isListItem(line)) {
      const ordered = isOrderedItem(line);
      const items: string[] = [];
      while (
        index < lines.length &&
        (ordered ? isOrderedItem(lines[index]) : isListItem(lines[index]) && !isOrderedItem(lines[index]))
      ) {
        let item = stripListMarker(lines[index]);
        index += 1;
        while (
          index < lines.length &&
          /^\s{2,}\S/.test(lines[index]) &&
          !isListItem(lines[index]) &&
          !isFence(lines[index]) &&
          !isHeading(lines[index])
        ) {
          item += ` ${lines[index].trim()}`;
          index += 1;
        }
        items.push(item);
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    if (isQuote(line)) {
      const quoted: string[] = [];
      while (index < lines.length && isQuote(lines[index])) {
        quoted.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", text: quoted.join(" ") });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim()) {
      const current = lines[index];
      if (
        isFence(current) ||
        isHeading(current) ||
        isHr(current) ||
        isListItem(current) ||
        isQuote(current) ||
        (isTableRow(current) &&
          index + 1 < lines.length &&
          isSeparator(lines[index + 1]))
      ) {
        break;
      }
      paragraph.push(current.trim());
      index += 1;
    }
    const text = paragraph.join(" ");
    if (!text) continue;
    blocks.push({ type: isTitleLine(text) ? "title" : "p", text });
  }

  return blocks;
}
