import Image from "next/image";

type LogoMarkProps = {
  size?: number;
  className?: string;
};

export function LogoMark({ size = 36, className = "" }: LogoMarkProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-stamp ring-1 ring-rule/80 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.jpg"
        alt="Carolo Canis"
        width={size}
        height={size}
        className="h-full w-full object-contain p-[3px]"
        priority={size >= 32}
      />
    </span>
  );
}
