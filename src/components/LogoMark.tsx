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
        src="/shepherd-hero.png"
        alt=""
        width={900}
        height={430}
        decoding="async"
      />
    </span>
  );
}
