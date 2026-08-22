import { PawMark } from "./PawMark";

type SealProps = {
  className?: string;
  outer?: string;
  inner?: string;
};

export function Seal({
  className = "",
  outer = "MARINKO ALIĆ",
  inner = "SVJEDOK · SUDAC",
}: SealProps) {
  const outerId = "seal-outer";
  const innerId = "seal-inner";

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
    >
      <defs>
        <path
          id={outerId}
          d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
        />
        <path
          id={innerId}
          d="M100,100 m-56,0 a56,56 0 1,0 112,0 a56,56 0 1,0 -112,0"
        />
      </defs>

      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />

      {/* four cardinal dots on the inner ring */}
      {[0, 90, 180, 270].map((deg) => (
        <circle
          key={deg}
          cx={100 + 72 * Math.cos((deg * Math.PI) / 180)}
          cy={100 + 72 * Math.sin((deg * Math.PI) / 180)}
          r="1.6"
          fill="currentColor"
        />
      ))}

      <text
        fontFamily="var(--font-display), Didot, serif"
        fontSize="12"
        letterSpacing="3"
        fill="currentColor"
      >
        <textPath href={`#${outerId}`} startOffset="50%" textAnchor="middle">
          {outer}
        </textPath>
      </text>
      <text
        fontFamily="var(--font-display), Didot, serif"
        fontSize="8"
        letterSpacing="2.5"
        fill="currentColor"
        opacity="0.75"
      >
        <textPath href={`#${innerId}`} startOffset="50%" textAnchor="middle">
          {inner}
        </textPath>
      </text>

      <g transform="translate(80 82) scale(0.34)" opacity="0.9">
        <PawMark />
      </g>
    </svg>
  );
}
