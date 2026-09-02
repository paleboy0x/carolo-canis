import type { CSSProperties } from "react";

type LogoMarkProps = {
  size?: number;
  className?: string;
};

export function LogoMark({ size = 28, className = "" }: LogoMarkProps) {
  return (
    <span
      className={`logo-mark ${className}`.trim()}
      style={{ "--logo-mark-h": `${size}px` } as CSSProperties}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand-mark.png"
        alt=""
        width={1774}
        height={887}
        decoding="async"
      />
    </span>
  );
}
