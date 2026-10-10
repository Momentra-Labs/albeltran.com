"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export type DeskMood = "idle" | "listen" | "think" | "happy" | "sorry";

/** Mouth strokes drawn on the visor, centred on x=32. */
const MOUTH: Record<DeskMood, string> = {
  idle: "M28.4 42.4c2 2.1 5.2 2.1 7.2 0",
  listen: "M28.4 42.4c2 2.1 5.2 2.1 7.2 0",
  think: "M29.6 43.2h4.8",
  happy: "M27.2 41.4c2.6 3.6 7 3.6 9.6 0",
  sorry: "M28.6 44.2c2-1.7 4.8-1.7 6.8 0",
};

const VISOR = "#0b1324";
const EYE = "#e6f0ff";

export function TechDeskMark({
  mood = "idle",
}: {
  mood?: DeskMood;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const play = !reduce && (mood === "idle" || mood === "happy");
  // Two mascots can be on screen at once (launcher + panel header), so gradient ids must be unique.
  const uid = useId().replace(/:/g, "");
  const shell = `desk-shell-${uid}`;
  const glass = `desk-glass-${uid}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (play) node.unpauseAnimations();
    else node.pauseAnimations();
  }, [play]);

  return (
    <svg
      ref={ref}
      className="tech-desk-mark"
      data-mood={mood}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      onPointerEnter={() => ref.current?.pauseAnimations()}
      onPointerLeave={() => {
        if (play) ref.current?.unpauseAnimations();
      }}
    >
      <defs>
        <linearGradient id={shell} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent-hover)" />
          <stop offset="0.55" stopColor="var(--accent)" />
          <stop
            offset="1"
            stopColor="color-mix(in srgb, var(--accent) 70%, #050507)"
          />
        </linearGradient>
        <linearGradient id={glass} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16223d" />
          <stop offset="1" stopColor={VISOR} />
        </linearGradient>
      </defs>

      <g className="tech-desk-mark-sparkles">
        <path
          className="tech-desk-mark-spark spark-a"
          d="M7 12 8.4 15.2 12 16.6 8.4 18 7 21.2 5.6 18 2 16.6 5.6 15.2Z"
          fill="#fff"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;1;0.25;0"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          className="tech-desk-mark-spark spark-b"
          d="M57 9 58.2 11.8 61 13 58.2 14.2 57 17 55.8 14.2 53 13 55.8 11.8Z"
          fill="#fff"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;1;0.25;0"
            dur="2.2s"
            begin="0.35s"
            repeatCount="indefinite"
          />
        </path>
        <path
          className="tech-desk-mark-spark spark-c"
          d="M56 46 57 48.4 59.6 49.4 57 50.4 56 52.8 55 50.4 52.4 49.4 55 48.4Z"
          fill="#fff"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;1;0.25;0"
            dur="2.2s"
            begin="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      <ellipse
        className="tech-desk-mark-shadow"
        cx="32"
        cy="61.4"
        rx="13"
        ry="2.1"
        fill="#050507"
        opacity="0.2"
      >
        <animate
          attributeName="rx"
          values="13;9.5;12;10;13"
          dur="2.7s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.22;0.1;0.18;0.1;0.22"
          dur="2.7s"
          repeatCount="indefinite"
        />
      </ellipse>
      <g className="tech-desk-mark-body">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -4; 0 -1; 0 -3; 0 0"
          keyTimes="0;0.28;0.52;0.76;1"
          dur="2.7s"
          repeatCount="indefinite"
          additive="sum"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 36; -6 32 36; 3 32 36; -2 32 36; 0 32 36"
          keyTimes="0;0.28;0.52;0.76;1"
          dur="2.7s"
          repeatCount="indefinite"
          additive="sum"
        />

        <g className="tech-desk-mark-antenna">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 35.5 11; -12 35.5 11; 0 35.5 11"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <path
            d="M35.5 11.5 41.6 3.8"
            fill="none"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle
            className="tech-desk-mark-pip-halo"
            cx="43"
            cy="2.4"
            r="5"
            fill="var(--accent-hover)"
            opacity="0.38"
          >
            <animate
              attributeName="opacity"
              values="0.28;0.7;0.28"
              dur="1.35s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="43" cy="2.4" r="3.3" fill="#fff" />
          <circle
            className="tech-desk-mark-pip"
            cx="43"
            cy="2.4"
            r="1.95"
            fill="var(--accent-hover)"
          >
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="1.35s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Speech-bubble shell: rounded square with a tail at the lower left. */}
        <path
          d="M24 10h16c9.9 0 18 8.1 18 18v10c0 9.9-8.1 18-18 18H25.5L12.6 62.2c-1.2.6-2.5-.6-1.9-1.8l3.4-7.1C9.3 50.1 6 44.5 6 38V28c0-9.9 8.1-18 18-18Z"
          fill={`url(#${shell})`}
        />
        <path
          d="M15 19.5c2.8-4.6 7.6-6.5 12.6-6.5"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Headset: ear cups + mic boom. */}
        <rect x="2" y="26" width="7.4" height="15" rx="3.7" fill="#fff" />
        <rect x="4.3" y="29" width="2.8" height="9" rx="1.4" fill="var(--accent)" />
        <rect x="54.6" y="26" width="7.4" height="15" rx="3.7" fill="#fff" />
        <rect x="56.9" y="29" width="2.8" height="9" rx="1.4" fill="var(--accent)" />
        <path
          d="M58.3 40.6c0 6.6-4.6 10.4-11.2 10.4"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect x="42" y="48.6" width="6.4" height="4.8" rx="2.4" fill="#fff" />

        {/* Visor face. */}
        <rect x="13.5" y="22.5" width="37" height="27" rx="12" fill={`url(#${glass})`} />
        <rect
          x="13.5"
          y="22.5"
          width="37"
          height="27"
          rx="12"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <g className="tech-desk-mark-blush" opacity="0.58">
          <animate
            attributeName="opacity"
            values="0.48;0.84;0.48"
            dur="2.7s"
            repeatCount="indefinite"
          />
          <ellipse cx="19.8" cy="41.4" rx="2.8" ry="1.6" fill="#ff9eb8" />
          <ellipse cx="44.2" cy="41.4" rx="2.8" ry="1.6" fill="#ff9eb8" />
        </g>
        <path
          className="tech-desk-mark-mouth"
          d={MOUTH[mood]}
          fill="none"
          stroke="var(--accent-hover)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g className="tech-desk-mark-gaze">
          <rect x="22" y="29.6" width="6.4" height="9" rx="3.2" fill={EYE} />
          <rect x="35.6" y="29.6" width="6.4" height="9" rx="3.2" fill={EYE} />
          <circle cx="24.1" cy="32.2" r="1.25" fill="#fff" />
          <circle cx="37.7" cy="32.2" r="1.25" fill="#fff" />
        </g>
        {/* Left-eye wink / blink: cover the eye, then draw it closed. */}
        <rect
          className="tech-desk-mark-lid"
          x="21"
          y="28.6"
          width="8.4"
          height="11"
          rx="3"
          fill="#111a2f"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes="0;0.62;0.66;0.74;0.78;1"
            dur="4.8s"
            repeatCount="indefinite"
          />
        </rect>
        <path
          className="tech-desk-mark-lid"
          d="M22.2 35.2c1.9-2.2 4.1-2.2 6 0"
          fill="none"
          stroke={EYE}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes="0;0.62;0.66;0.74;0.78;1"
            dur="4.8s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
}
