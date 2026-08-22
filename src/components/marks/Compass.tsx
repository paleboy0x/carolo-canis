export function Compass({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
    >
      <circle cx="32" cy="32" r="28" strokeWidth="1" opacity="0.6" />
      <circle cx="32" cy="32" r="22" strokeWidth="0.75" opacity="0.4" />
      {/* long N/S arrow */}
      <path
        d="M32 8 L36 32 L32 56 L28 32 Z"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* short E/W arrow */}
      <path
        d="M8 32 L32 28 L56 32 L32 36 Z"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="32" cy="32" r="2" fill="currentColor" stroke="none" />
      <text
        x="32"
        y="6"
        fontFamily="var(--font-display), serif"
        fontSize="6"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
      >
        N
      </text>
    </svg>
  );
}
