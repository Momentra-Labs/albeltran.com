type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-dim">
        Contents
      </p>
      <ol className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
            <a
              href={`#${item.id}`}
              className="text-sm text-muted hover:text-foreground"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
