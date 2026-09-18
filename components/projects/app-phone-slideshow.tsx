"use client";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import type { Project } from "@/content/projects";
import { appScreensFor, type AppScreen } from "@/content/app-screens";
import {
  DeviceShotPending,
  useDecodedImage,
} from "@/components/shared/use-decoded-image";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;

function PhotoScreen({
  screen,
  decorative = false,
}: {
  screen: AppScreen;
  decorative?: boolean;
}) {
  const { status, boxRef, onLoad, onError } = useDecodedImage(screen.src);
  if (!screen.src) return null;
  return (
    <div ref={boxRef} className="absolute inset-0" data-shot={status}>
      {status === "missing" ? null : <DeviceShotPending />}
      <Image
        src={screen.src}
        alt={decorative ? "" : (screen.alt ?? screen.title)}
        fill
        unoptimized
        sizes="(max-width: 640px) 70vw, 360px"
        onLoad={onLoad}
        onError={onError}
        className="device-phone-photo z-[1] object-cover object-top"
      />
    </div>
  );
}

function EditorialScreen({
  project,
  screen,
  index,
}: {
  project: Project;
  screen: AppScreen;
  index: number;
}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-surface-2 px-4 pb-7 pt-10 sm:px-5 sm:pt-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(79,142,255,0.16),transparent_52%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(240,240,245,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(240,240,245,0.16)_1px,transparent_1px)] [background-size:28px_28px]" />
      <span className="magazine-crop magazine-crop-tl left-3 top-3" />
      <span className="magazine-crop magazine-crop-tr right-3 top-3" />
      <span className="magazine-crop magazine-crop-bl bottom-3 left-3" />
      <span className="magazine-crop magazine-crop-br bottom-3 right-3" />
      <div className="relative flex items-start justify-between gap-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-accent">
          {project.shortName}
        </p>
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-dim">
          {String(index + 1).padStart(2, "0")} / 06
        </p>
      </div>
      <div className="relative">
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
          {screen.kicker}
        </p>
        <p className="mt-2 font-display text-[1.65rem] leading-[0.9] tracking-tight text-foreground sm:text-[1.85rem]">
          {screen.title}
        </p>
        <p className="mt-3 max-w-[18ch] text-[11px] leading-relaxed text-muted">
          {screen.detail}
        </p>
      </div>
    </div>
  );
}

function PhoneChrome({
  children,
  interactive = false,
  labelledBy,
  onSelect,
  onPointerDown,
}: {
  children: ReactNode;
  interactive?: boolean;
  labelledBy?: string;
  onSelect?: () => void;
  onPointerDown?: (event: PointerEvent<HTMLElement>) => void;
}) {
  const className = "device-frame border-0 bg-transparent p-0 text-left";
  const chrome = (
    <div className="device-chrome device-iphone relative overflow-hidden">
      <div className="device-iphone-screen relative aspect-[393/852] overflow-hidden bg-surface-2">
        {children}
        <span aria-hidden className="device-iphone-island">
          <span className="device-iphone-lens" />
        </span>
      </div>
    </div>
  );

  if (interactive) {
    return (
      <button
        type="button"
        data-device="phone"
        className={className}
        aria-label={labelledBy}
        onClick={onSelect}
        onPointerDown={onPointerDown}
      >
        {chrome}
      </button>
    );
  }

  return (
    <div
      data-device="phone"
      className={className}
      aria-hidden={labelledBy ? undefined : true}
      onPointerDown={onPointerDown}
    >
      {chrome}
    </div>
  );
}

function ScreenFace({
  project,
  screen,
  index,
  decorative,
}: {
  project: Project;
  screen: AppScreen;
  index: number;
  decorative?: boolean;
}) {
  return screen.src ? (
    <PhotoScreen screen={screen} decorative={decorative} />
  ) : (
    <EditorialScreen project={project} screen={screen} index={index} />
  );
}

function wrappedOffset(i: number, active: number, count: number) {
  let offset = i - active;
  const half = Math.floor(count / 2);
  if (offset > half) offset -= count;
  if (offset < -half) offset += count;
  return offset;
}

function indexesToRender(count: number, active: number, compact: boolean) {
  if (count <= 1) return [active];
  if (!compact) return Array.from({ length: count }, (_, i) => i);
  if (count === 2) return [active, (active + 1) % 2];
  return [(active - 1 + count) % count, active, (active + 1) % count];
}

function coverflowPose(offset: number, compact: boolean, reduce: boolean) {
  if (reduce) {
    return {
      x: 0,
      y: 0,
      rotateY: 0,
      scale: 1,
      z: 0,
      opacity: offset === 0 ? 1 : 0,
    };
  }
  const abs = Math.abs(offset);
  return {
    x: `${offset * (compact ? 34 : 42)}%`,
    y: 0,
    rotateY: offset * -20,
    scale: offset === 0 ? 1 : Math.max(0.84, 0.94 - abs * 0.04),
    z: offset === 0 ? 48 : -abs * 64,
    opacity: abs > 2 ? 0 : abs === 2 ? 0.72 : 1,
  };
}

function haltBubble(event: { stopPropagation: () => void }) {
  event.stopPropagation();
}

export function AppPhoneShowcase({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const screens = appScreensFor(project.slug);
  const reduce = Boolean(useReducedMotion());
  const [index, setIndex] = useState(0);
  const count = screens.length;
  const dragged = useRef(false);
  const dragControls = useDragControls();
  const canRotate = count > 1;
  const canDrag = canRotate && !reduce;

  const startDrag = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!canDrag) return;
      event.stopPropagation();
      dragControls.start(event);
    },
    [canDrag, dragControls],
  );

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
    },
    [count],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
      }
    },
    [go, index],
  );

  const onDragStart = useCallback(() => {
    dragged.current = false;
  }, []);

  const onDrag = useCallback((_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 10) dragged.current = true;
  }, []);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const distance = info.offset.x;
      const flick = info.velocity.x;
      if (Math.abs(distance) > 40 || Math.abs(flick) > 350) {
        dragged.current = true;
      }
      if (distance < -40 || flick < -350) go(index + 1);
      else if (distance > 40 || flick > 350) go(index - 1);
    },
    [go, index],
  );

  const select = useCallback(
    (next: number) => {
      if (dragged.current) {
        dragged.current = false;
        return;
      }
      go(next);
    },
    [go],
  );

  if (count === 0) return null;

  const visible = indexesToRender(count, index, compact);

  return (
    <div
      className={cn(
        "device-phone-showcase",
        !compact && "device-phone-showcase-hero",
        canRotate && "device-phone-showcase-live",
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${project.name} screens`}
      tabIndex={canRotate ? 0 : undefined}
      onClick={haltBubble}
      onPointerDown={haltBubble}
      onKeyDown={canRotate ? onKeyDown : undefined}
    >
      <div className="device-phone-coverflow-wrap">
        <motion.div
          className="device-phone-coverflow"
          drag={canDrag ? "x" : false}
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onPointerDown={canDrag ? startDrag : undefined}
          onDragStart={canDrag ? onDragStart : undefined}
          onDrag={canDrag ? onDrag : undefined}
          onDragEnd={canDrag ? onDragEnd : undefined}
        >
          {visible.map((i) => {
            const screen = screens[i];
            const offset = wrappedOffset(i, index, count);
            const abs = Math.abs(offset);
            const interactive = canRotate && !reduce && abs > 0 && abs <= 2;
            return (
              <motion.div
                key={screen.kicker}
                className="device-phone-coverflow-item"
                data-active={offset === 0 || undefined}
                data-interactive={interactive || undefined}
                initial={false}
                animate={coverflowPose(offset, compact, reduce)}
                transition={{ duration: reduce ? 0.28 : 0.46, ease: EASE }}
                style={{
                  zIndex: 8 - abs,
                  pointerEvents: abs > 2 || (reduce && offset !== 0) ? "none" : undefined,
                }}
              >
                <PhoneChrome
                  interactive={interactive}
                  labelledBy={
                    interactive ? `Show ${screen.kicker}` : undefined
                  }
                  onSelect={interactive ? () => select(i) : undefined}
                  onPointerDown={canDrag ? startDrag : undefined}
                >
                  <ScreenFace
                    project={project}
                    screen={screen}
                    index={i}
                    decorative={false}
                  />
                </PhoneChrome>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {canRotate ? (
        <div className="device-phone-slide-meter">
          <button
            type="button"
            aria-label="Previous screen"
            className="device-phone-coverflow-nav"
            onClick={(event) => {
              event.stopPropagation();
              go(index - 1);
            }}
          >
            ‹
          </button>
          <p className="device-phone-slide-kicker">Slide</p>
          <div className="device-phone-dots">
            {screens.map((screen, i) => (
              <button
                key={screen.kicker}
                type="button"
                aria-label={`Show ${screen.kicker}`}
                aria-current={i === index}
                className={cn(
                  "device-phone-dot",
                  i === index && "device-phone-dot-active",
                )}
                onClick={(event) => {
                  event.stopPropagation();
                  go(i);
                }}
              />
            ))}
          </div>
          <p className="device-phone-slide-count">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          <button
            type="button"
            aria-label="Next screen"
            className="device-phone-coverflow-nav"
            onClick={(event) => {
              event.stopPropagation();
              go(index + 1);
            }}
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
}
