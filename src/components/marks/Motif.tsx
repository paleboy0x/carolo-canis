import Image from "next/image";

type MotifProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Editorial engraving of a lone oak — used as a subtle low-opacity
 * watermark across the site. Placement is controlled by the parent;
 * this component just fills its container.
 */
export function Motif({
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 32rem, 50vw",
}: MotifProps) {
  return (
    <Image
      src="/motif-tree.png"
      alt=""
      fill
      priority={priority}
      sizes={sizes}
      className={`object-contain ${className}`}
    />
  );
}
