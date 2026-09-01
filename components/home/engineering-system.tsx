"use client";

import { useState } from "react";
import { systemCenter, systemNodes } from "@/content/system";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

export function EngineeringSystem() {
  const [active, setActive] = useState<string | null>(null);
  const current = systemNodes.find((node) => node.id === active);

  return (
    <section id="system" className="border-y border-border py-20 sm:py-24">
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Engineering system
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-foreground">
          How the stack actually connects
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Hover a layer to see the technologies I use there. On smaller screens,
          expand a module instead of shrinking a diagram until it breaks.
        </p>

        <div className="mt-12 hidden lg:block">
          <svg
            viewBox="0 0 920 420"
            className="h-auto w-full text-border"
            role="img"
            aria-label="Engineering system map connecting frontend, backend, data, cloud, and architecture"
          >
            <line x1="460" y1="48" x2="460" y2="120" stroke="currentColor" />
            <line x1="120" y1="150" x2="800" y2="150" stroke="currentColor" />
            <line x1="120" y1="150" x2="120" y2="250" stroke="currentColor" />
            <line x1="290" y1="150" x2="290" y2="250" stroke="currentColor" />
            <line x1="460" y1="150" x2="460" y2="250" stroke="currentColor" />
            <line x1="630" y1="150" x2="630" y2="250" stroke="currentColor" />
            <line x1="800" y1="150" x2="800" y2="250" stroke="currentColor" />
            <line x1="120" y1="320" x2="800" y2="320" stroke="currentColor" />
            <line x1="460" y1="320" x2="460" y2="372" stroke="currentColor" />

            <Node x={460} y={28} label={systemCenter} primary />
            {systemNodes.map((node, index) => {
              const x = 120 + index * 170;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
                  data-cursor="EXPLORE"
                >
                  <Node x={x} y={250} label={node.label} active={active === node.id} />
                </g>
              );
            })}
            <Node x={460} y={388} label="Products" />
          </svg>
          <div className="mt-6 min-h-16 border-t border-border pt-4">
            {current ? (
              <p className="text-sm text-muted">
                <span className="font-mono text-accent">{current.label}</span>
                {" — "}
                {current.children.join(" · ")}
              </p>
            ) : (
              <p className="text-sm text-muted-dim">
                Explore a node to reveal the layer.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 space-y-3 lg:hidden">
          {systemNodes.map((node) => {
            const open = active === node.id;
            return (
              <button
                key={node.id}
                type="button"
                className={cn(
                  "w-full border border-border px-4 py-4 text-left transition-colors",
                  open && "border-border-bright bg-surface",
                )}
                onClick={() => setActive(open ? null : node.id)}
                aria-expanded={open}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {node.label}
                </span>
                {open ? (
                  <p className="mt-3 text-sm text-muted">{node.children.join(" · ")}</p>
                ) : (
                  <p className="mt-2 text-sm text-muted-dim">Expand</p>
                )}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Node({
  x,
  y,
  label,
  primary,
  active,
}: {
  x: number;
  y: number;
  label: string;
  primary?: boolean;
  active?: boolean;
}) {
  const width = primary ? 150 : 128;
  return (
    <g transform={`translate(${x - width / 2}, ${y - 16})`}>
      <rect
        width={width}
        height={32}
        fill={active || primary ? "rgba(79,142,255,0.12)" : "#0a0a0f"}
        stroke={active || primary ? "#4f8eff" : "rgba(255,255,255,0.14)"}
      />
      <text
        x={width / 2}
        y={21}
        textAnchor="middle"
        fill={active || primary ? "#f0f0f5" : "#8b8b9c"}
        fontSize={11}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.08em"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}
