import { PawMark } from "./PawMark";

export function RuleOrnament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-4 text-brass ${className}`}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brass/70 to-brass" />
      <PawMark className="h-4 w-4 shrink-0 opacity-90" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-brass/70 to-brass" />
    </div>
  );
}
