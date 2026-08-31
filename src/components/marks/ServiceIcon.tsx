import type { ReactElement } from "react";

export type ServiceIconType =
  | "training"
  | "puppy"
  | "obedience"
  | "social"
  | "exam"
  | "show"
  | "behavior"
  | "legal"
  | "education"
  | "club"
  | "gov";

const paths: Record<ServiceIconType, ReactElement> = {
  training: (
    <>
      <circle cx="11" cy="10" r="3.2" />
      <path d="M6 22v-1.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5V22" />
      <path d="M20 14c1.8.4 3 1.8 3 3.5V22" />
      <path d="M18.5 11.5c.9-.3 1.9-.2 2.7.3" />
      <path d="M17 18.5c1.2-.2 2.2.2 3 1" />
    </>
  ),
  puppy: (
    <>
      <ellipse cx="16" cy="17" rx="7" ry="6" />
      <circle cx="11.5" cy="10.5" r="2.4" />
      <circle cx="20.5" cy="10.5" r="2.4" />
      <circle cx="13.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
      <ellipse cx="16" cy="19.2" rx="1.4" ry="1" />
    </>
  ),
  obedience: (
    <>
      <path d="M10 22v-6.5c0-2.2 1.6-4 4-4.5" />
      <path d="M14 11.2c2.8-.2 5.5 1.6 6 4.3L21 22" />
      <circle cx="12.5" cy="7.5" r="2.8" />
      <path d="M8 22h16" />
      <path d="M18 14.5l3-1.5" />
    </>
  ),
  social: (
    <>
      <circle cx="10" cy="9" r="2.8" />
      <path d="M5.5 21v-1.2c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4V21" />
      <circle cx="21" cy="11" r="2.2" />
      <path d="M17.5 21v-.8c0-1.7 1.4-3.1 3.2-3.4" />
      <path d="M14.5 13.5c1.1.4 2 1.2 2.4 2.2" />
    </>
  ),
  exam: (
    <>
      <rect x="8" y="5" width="16" height="22" rx="1.5" />
      <line x1="12" y1="10" x2="20" y2="10" />
      <line x1="12" y1="14" x2="20" y2="14" />
      <line x1="12" y1="18" x2="17" y2="18" />
      <polyline points="11,22 13.5,24.5 18,19.5" />
    </>
  ),
  show: (
    <>
      <path d="M16 5l2.2 4.5 5 .7-3.6 3.5.9 5L16 16.2 11.5 18.7l.9-5L8.8 10.2l5-.7z" />
      <path d="M10 24h12" />
      <path d="M16 18.5V24" />
    </>
  ),
  behavior: (
    <>
      <circle cx="16" cy="16" r="10" />
      <path d="M12 14.5c.5-1 1.5-1.6 2.6-1.6" />
      <path d="M17.4 12.9c1.1 0 2.1.6 2.6 1.6" />
      <path d="M12.5 20c1 .9 2.2 1.4 3.5 1.4s2.5-.5 3.5-1.4" />
      <line x1="11" y1="9" x2="13" y2="11" />
      <line x1="21" y1="9" x2="19" y2="11" />
    </>
  ),
  legal: (
    <>
      <path d="M9 5h14v18H9z" />
      <path d="M9 5l-3 3v15h3" />
      <line x1="13" y1="11" x2="19" y2="11" />
      <line x1="13" y1="15" x2="19" y2="15" />
      <line x1="13" y1="19" x2="17" y2="19" />
    </>
  ),
  education: (
    <>
      <path d="M4 13l12-6 12 6-12 6z" />
      <path d="M10 16v5c2.5 1.5 5.5 1.5 8 0v-5" />
      <path d="M26 14.5V21" />
      <circle cx="26" cy="22.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  club: (
    <>
      <circle cx="11" cy="10" r="2.6" />
      <circle cx="21" cy="10" r="2.6" />
      <circle cx="16" cy="8.5" r="2.8" />
      <path d="M7 22v-1c0-2 1.8-3.6 4-3.6" />
      <path d="M25 22v-1c0-2-1.8-3.6-4-3.6" />
      <path d="M12 17.4c1.2-.5 2.8-.5 4 0 1.2-.5 2.8-.5 4 0" />
      <path d="M12 22v-2.2c0-1.5 1.5-2.8 4-2.8s4 1.3 4 2.8V22" />
    </>
  ),
  gov: (
    <>
      <path d="M6 13h20v12H6z" />
      <path d="M4 13l12-7 12 7" />
      <line x1="11" y1="17" x2="11" y2="25" />
      <line x1="16" y1="17" x2="16" y2="25" />
      <line x1="21" y1="17" x2="21" y2="25" />
      <line x1="6" y1="25" x2="26" y2="25" />
    </>
  ),
};

export function ServiceIcon({
  type,
  className = "",
}: {
  type: ServiceIconType;
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
