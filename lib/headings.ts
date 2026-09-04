export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractToc(markdown: string) {
  return [...markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match, index) => {
    const level = match[1].length;
    const text = match[2].replace(/[`*_]/g, "").trim();
    return {
      id: slugifyHeading(text) || `section-${index + 1}`,
      text,
      level,
    };
  });
}
