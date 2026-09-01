import { cn } from "@/lib/utils";

export function ArchitectureFlow({
  steps,
  className,
}: {
  steps: string[];
  className?: string;
}) {
  if (steps.length === 0) return null;

  const nodeWidth = 156;
  const gap = 28;
  const width = steps.length * nodeWidth + (steps.length - 1) * gap;
  const height = 72;

  return (
    <div className={cn("space-y-6", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="hidden h-auto w-full text-border md:block"
        role="img"
        aria-label="Architecture flow"
      >
        {steps.map((step, index) => {
          const x = index * (nodeWidth + gap);
          return (
            <g key={step}>
              {index > 0 ? (
                <line
                  x1={x - gap}
                  y1={height / 2}
                  x2={x}
                  y2={height / 2}
                  stroke="currentColor"
                />
              ) : null}
              <rect
                x={x}
                y={12}
                width={nodeWidth}
                height={48}
                fill="#0a0a0f"
                stroke="rgba(255,255,255,0.14)"
              />
              <text
                x={x + nodeWidth / 2}
                y={32}
                textAnchor="middle"
                fill="#4f8eff"
                fontSize={10}
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.12em"
              >
                {String(index + 1).padStart(2, "0")}
              </text>
              <text
                x={x + nodeWidth / 2}
                y={48}
                textAnchor="middle"
                fill="#f0f0f5"
                fontSize={10}
                fontFamily="ui-monospace, monospace"
              >
                {shortLabel(step)}
              </text>
            </g>
          );
        })}
      </svg>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span className="mt-0.5 font-mono text-[11px] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm leading-relaxed text-muted">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function shortLabel(step: string) {
  const words = step.split(" ").slice(0, 2).join(" ");
  return words.length > 16 ? `${words.slice(0, 14)}…` : words;
}
