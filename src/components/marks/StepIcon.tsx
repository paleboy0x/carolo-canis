import type { ReactElement } from "react";

export type StepIconType = "focus" | "clock" | "award";

const paths: Record<StepIconType, ReactElement> = {
  focus: (
    <>
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="7" />
      <circle cx="16" cy="16" r="2.2" fill="currentColor" stroke="none" />
    </>
  ),
  clock: (
    <>
      <circle cx="16" cy="16" r="12" />
      <polyline points="16,9 16,16 21,20" />
    </>
  ),
  award: (
    <>
      <circle cx="16" cy="13" r="8" />
      <polyline points="10,17 8,29 16,25 24,29 22,17" />
      <polyline points="12.5,13 15,15.5 19.5,10.5" />
    </>
  ),
};

export function StepIcon({
  type,
  className = "",
}: {
  type: StepIconType;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[type]}
    </svg>
  );
}
