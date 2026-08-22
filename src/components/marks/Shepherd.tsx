import Image from "next/image";

type ShepherdProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** 0..1 — passed through as CSS opacity */
  opacity?: number;
  /** Flip horizontally so the dog faces left */
  flip?: boolean;
};

/**
 * Modernized vector-style German Shepherd in mid-leap.
 * Derived from the founder's logo but stripped of the CC monogram —
 * used both as the hero visual and as a subtle background element.
 */
export function Shepherd({
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 640px, 90vw",
  opacity,
  flip = false,
}: ShepherdProps) {
  return (
    <Image
      src="/shepherd-leap.png"
      alt=""
      fill
      priority={priority}
      sizes={sizes}
      className={`object-contain ${flip ? "-scale-x-100" : ""} ${className}`}
      style={opacity !== undefined ? { opacity } : undefined}
    />
  );
}
