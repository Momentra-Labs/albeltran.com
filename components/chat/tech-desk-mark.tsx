export function TechDeskMark() {
  return (
    <svg
      className="tech-desk-mark"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17 51 7 62 27 55.5" fill="var(--accent)" />
      <circle cx="32" cy="31.5" r="29.5" fill="var(--accent)" />
      <path
        d="M13 42c4 13 34 15 40-2"
        fill="color-mix(in srgb, var(--accent) 72%, #050507)"
      />
      <ellipse cx="22" cy="20" rx="11" ry="7.5" fill="#fff" opacity="0.16" />
      <g className="tech-desk-mark-antenna">
        <path
          d="M34 16.5 42.5 4.2"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle
          cx="44.4"
          cy="2.4"
          r="5.4"
          fill="var(--accent-hover)"
          opacity="0.38"
        />
        <circle cx="44.4" cy="2.4" r="3.45" fill="#fff" />
        <circle cx="44.4" cy="2.4" r="2.05" fill="var(--accent-hover)" />
        <circle cx="43.4" cy="1.5" r="0.75" fill="#fff" />
      </g>
      <circle cx="14.2" cy="31.8" r="5.4" fill="#fff" />
      <circle cx="49.8" cy="31.8" r="5.4" fill="#fff" />
      <ellipse cx="32" cy="39.6" rx="18.6" ry="17.4" fill="#fff" />
      <ellipse cx="21.2" cy="44.6" rx="4.4" ry="2.5" fill="#ff9eb8" opacity="0.58" />
      <ellipse cx="42.8" cy="44.6" rx="4.4" ry="2.5" fill="#ff9eb8" opacity="0.58" />
      <ellipse cx="25" cy="39.2" rx="4.7" ry="5.7" fill="#111" />
      <ellipse cx="40.8" cy="40" rx="4.1" ry="5.1" fill="#111" />
      <circle cx="23.5" cy="37" r="1.75" fill="#fff" />
      <circle cx="26.4" cy="41" r="0.72" fill="#fff" />
      <circle cx="39.4" cy="38" r="1.5" fill="#fff" />
      <circle cx="42" cy="41.4" r="0.62" fill="#fff" />
      <rect
        className="tech-desk-mark-lid"
        x="20"
        y="33"
        width="10"
        height="11.6"
        rx="4.5"
        fill="#fff"
      />
      <path
        d="M27.8 47.8c2.6 2.4 8 2.5 10.8-.2"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
