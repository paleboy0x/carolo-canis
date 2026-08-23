import type { ReactElement } from "react";

export type StepIconType = "chat" | "focus" | "clock" | "award" | "scale";

const paths: Record<StepIconType, ReactElement> = {
  chat: (
    <>
      <path d="M6 8h20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6l-4 4v-4H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
      <line x1="10" y1="13" x2="22" y2="13" />
      <line x1="10" y1="17" x2="18" y2="17" />
    </>
  ),
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
  scale: (
    <>
      <line x1="16" y1="5" x2="16" y2="27" />
      <line x1="10" y1="27" x2="22" y2="27" />
      <line x1="6" y1="10" x2="26" y2="10" />
      <path d="M6 10l-3 8h6z" />
      <path d="M26 10l-3 8h6z" />
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
