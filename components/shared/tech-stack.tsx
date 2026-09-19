"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { techGroups } from "@/content/person";
import { TechIcon } from "@/components/icons/tech-icons";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

function tabLabel(title: string) {
  switch (title) {
    case "Data & Platforms":
      return "Data";
    case "Operating Systems":
      return "Systems";
    case "Design Tools":
      return "Design";
    case "AI Tools":
      return "AI";
    default:
      return title;
  }
}

function folioIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function GroupChips({
  items,
  animate,
  className,
}: {
  items: readonly string[];
  animate?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("stack-chip-list flex list-none flex-wrap gap-2 p-0", className)}>
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={animate ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={
            animate
              ? { duration: 0.32, ease, delay: Math.min(index, 8) * 0.028 }
              : { duration: 0 }
          }
        >
          <span className="stack-chip">
            <TechIcon name={item} />
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

type TechGroupTitle = (typeof techGroups)[number]["title"];

export function TechStack({ className }: { className?: string }) {
  const baseId = useId();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<TechGroupTitle>(techGroups[0].title);
  const [direction, setDirection] = useState(1);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const activeIndex = techGroups.findIndex((group) => group.title === active);
  const activeGroup = techGroups[activeIndex] ?? techGroups[0];
  const last = techGroups.length - 1;

  function select(index: number) {
    const group = techGroups[index];
    if (!group || group.title === active) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActive(group.title);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    } else {
      return;
    }
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  function onStagePointerDown(event: PointerEvent<HTMLDivElement>) {
    swipe.current = { x: event.clientX, y: event.clientY };
  }

  function onStagePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) select(activeIndex === last ? 0 : activeIndex + 1);
    else select(activeIndex === 0 ? last : activeIndex - 1);
  }

  return (
    <div className={className}>
      <div className="stack-tabs md:hidden">
        <div className="stack-tablist-wrap">
          <div
            className="stack-tablist"
            role="tablist"
            aria-label="Day-to-day stack"
          >
            {techGroups.map((group, index) => {
              const selected = group.title === active;
              return (
                <button
                  key={group.title}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  className="stack-tab"
                  role="tab"
                  id={`${baseId}-tab-${index}`}
                  aria-controls={`${baseId}-panel`}
                  aria-selected={selected}
                  aria-label={group.title}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  {selected && !reduce ? (
                    <motion.span
                      layoutId={`${baseId}-tab-ink`}
                      className="stack-tab-ink"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : selected ? (
                    <span className="stack-tab-ink" />
                  ) : null}
                  <span className="stack-tab-label">{tabLabel(group.title)}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="stack-tab-head">
          <p className="stack-tab-kicker">
            {activeGroup.title}
            <span className="text-muted-dim"> · {activeGroup.items.length}</span>
          </p>
          <p className="stack-tab-folio">
            {folioIndex(activeIndex)} / {folioIndex(last)}
          </p>
        </div>
        <div
          className="stack-tab-stage"
          onPointerDown={onStagePointerDown}
          onPointerUp={onStagePointerUp}
          onPointerCancel={() => {
            swipe.current = null;
          }}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={activeGroup.title}
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-tab-${activeIndex}`}
              className="stack-tab-panel"
              custom={direction}
              initial={
                reduce ? false : { opacity: 0, x: direction * 28 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: direction * -22 }}
              transition={{ duration: reduce ? 0 : 0.28, ease }}
            >
              <GroupChips items={activeGroup.items} animate={!reduce} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ul
        className="hidden list-none grid-cols-2 gap-x-6 gap-y-5 p-0 md:grid lg:grid-cols-3"
        aria-label="Day-to-day stack"
      >
        {techGroups.map((group) => (
          <li key={group.title} className="min-w-0">
            <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {group.title}
            </p>
            <div className="mt-3">
              <GroupChips items={group.items} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
