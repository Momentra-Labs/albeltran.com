"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function TechDeskMark({
  mood = "idle",
}: {
  mood?: "idle" | "listen";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const play = !reduce && mood === "idle";

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
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      onPointerEnter={() => ref.current?.pauseAnimations()}
      onPointerLeave={() => {
        if (play) ref.current?.unpauseAnimations();
      }}
    >
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
        <path d="M17 51 7 62 27 55.5" fill="var(--accent)" />
        <circle cx="32" cy="31.5" r="29.5" fill="var(--accent)" />
        <path
          d="M13 42c4 13 34 15 40-2"
          fill="color-mix(in srgb, var(--accent) 72%, #050507)"
        />
        <ellipse cx="22" cy="20" rx="11" ry="7.5" fill="#fff" opacity="0.16" />
        <g className="tech-desk-mark-antenna">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 34 16; -12 34 16; 0 34 16"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <path
            d="M34 16.5 42.5 4.2"
            fill="none"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle
            className="tech-desk-mark-pip-halo"
            cx="44.4"
            cy="2.4"
            r="5.4"
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
          <circle cx="44.4" cy="2.4" r="3.45" fill="#fff" />
          <circle
            className="tech-desk-mark-pip"
            cx="44.4"
            cy="2.4"
            r="2.05"
            fill="var(--accent-hover)"
          >
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="1.35s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="43.4" cy="1.5" r="0.75" fill="#fff" />
        </g>
        <circle cx="14.2" cy="31.8" r="5.4" fill="#fff" />
        <circle cx="49.8" cy="31.8" r="5.4" fill="#fff" />
        <ellipse cx="32" cy="39.6" rx="18.6" ry="17.4" fill="#fff" />
        <g className="tech-desk-mark-blush" opacity="0.58">
          <animate
            attributeName="opacity"
            values="0.48;0.84;0.48"
            dur="2.7s"
            repeatCount="indefinite"
          />
          <ellipse cx="21.2" cy="44.6" rx="4.4" ry="2.5" fill="#ff9eb8" />
          <ellipse cx="42.8" cy="44.6" rx="4.4" ry="2.5" fill="#ff9eb8" />
        </g>
        <path
          className="tech-desk-mark-mouth"
          d="M25.2 51.4c3.4 4.2 10.2 4.2 13.8 0"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse cx="25" cy="38.2" rx="4.7" ry="5.7" fill="#111" />
        <ellipse cx="40.8" cy="39" rx="4.1" ry="5.1" fill="#111" />
        <circle cx="23.5" cy="36" r="1.75" fill="#fff" />
        <circle cx="26.4" cy="40" r="0.72" fill="#fff" />
        <circle cx="39.4" cy="37" r="1.5" fill="#fff" />
        <circle cx="42" cy="40.4" r="0.62" fill="#fff" />
        <rect
          className="tech-desk-mark-lid"
          x="20"
          y="32"
          width="10"
          height="11.6"
          rx="4.5"
          fill="#fff"
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
      </g>
    </svg>
  );
}
