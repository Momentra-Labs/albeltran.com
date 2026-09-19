import type { ReactNode } from "react";
import { parseDeskMarkdown } from "@/lib/desk-markdown";

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*([^*\n]+)\*/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }
    if (match[1] != null) {
      nodes.push(<code key={`c-${key}`}>{match[1]}</code>);
    } else if (match[2] != null) {
      nodes.push(<strong key={`s-${key}`}>{match[2]}</strong>);
    } else if (match[3] != null && match[4] != null) {
      nodes.push(
        <a
          key={`a-${key}`}
          href={match[4]}
          target="_blank"
          rel="noreferrer noopener"
        >
          {match[3]}
        </a>,
      );
    } else if (match[5] != null) {
      nodes.push(<em key={`e-${key}`}>{match[5]}</em>);
    }
    key += 1;
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export function DeskMarkdown({ source }: { source: string }) {
  if (!source) return null;
  const blocks = parseDeskMarkdown(source);

  return (
    <div className="tech-desk-md">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        if (block.type === "title") {
          return (
            <p key={key} className="tech-desk-md-title">
              {renderInline(block.text)}
            </p>
          );
        }
        if (block.type === "heading") {
          const Tag = block.level === 2 ? "h3" : "h4";
          return (
            <Tag key={key} className="tech-desk-md-heading">
              {renderInline(block.text)}
            </Tag>
          );
        }
        if (block.type === "p") {
          return <p key={key}>{renderInline(block.text)}</p>;
        }
        if (block.type === "quote") {
          return (
            <blockquote key={key}>
              <p>{renderInline(block.text)}</p>
            </blockquote>
          );
        }
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={key}>
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>{renderInline(item)}</li>
              ))}
            </Tag>
          );
        }
        if (block.type === "table") {
          return (
            <div key={key} className="tech-desk-md-table">
              <table>
                <thead>
                  <tr>
                    {block.header.map((cell, cellIndex) => (
                      <th key={`${key}-h-${cellIndex}`}>{renderInline(cell)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`${key}-r-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${key}-c-${rowIndex}-${cellIndex}`}>
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <pre key={key} className="tech-desk-md-code">
            <code>{block.text}</code>
          </pre>
        );
      })}
    </div>
  );
}
