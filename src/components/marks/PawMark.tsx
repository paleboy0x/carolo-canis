type PawMarkProps = {
  className?: string;
  variant?: "solid" | "outline";
  strokeWidth?: number;
};

export function PawMark({
  className = "",
  variant = "solid",
  strokeWidth = 2,
}: PawMarkProps) {
  const stroke = variant === "outline" ? "currentColor" : "none";
  const fill = variant === "outline" ? "none" : "currentColor";

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M60 60 C 42 60, 34 78, 40 96 C 44 106, 50 110, 60 110 C 70 110, 76 106, 80 96 C 86 78, 78 60, 60 60 Z" />
      <ellipse cx="24" cy="52" rx="9" ry="14" transform="rotate(-22 24 52)" />
      <ellipse cx="44" cy="30" rx="9" ry="15" transform="rotate(-8 44 30)" />
      <ellipse cx="76" cy="30" rx="9" ry="15" transform="rotate(8 76 30)" />
      <ellipse cx="96" cy="52" rx="9" ry="14" transform="rotate(22 96 52)" />
      {variant === "outline" ? (
        <path
          d="M60 76 C 55 82, 55 92, 60 100 M50 74 C 48 78, 48 84, 50 88 M70 74 C 72 78, 72 84, 70 88"
          fill="none"
          strokeWidth={strokeWidth * 0.8}
          opacity="0.55"
        />
      ) : null}
    </svg>
  );
}
