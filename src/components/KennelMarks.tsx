type MarkProps = { className?: string };

export function TrainingMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 80 56" className={className} aria-hidden fill="none">
      <path
        d="M14 48c2-10 8-18 16-20 2-8 8-16 18-18 6-1 12 2 16 8 6 2 12 8 12 16 0 6-4 12-14 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M32 46v-8m16 8c0-10 2-16-4-22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M46 16l4-8m6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="58" cy="22" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function ShopMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 80 56" className={className} aria-hidden fill="none">
      <ellipse
        cx="28"
        cy="40"
        rx="16"
        ry="6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 40v-6c0-6 7-10 16-10s16 4 16 10v6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M50 22c8-2 18 2 22 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="50" cy="22" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function AdviceMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 80 56" className={className} aria-hidden fill="none">
      <path
        d="M18 12h28v36H18z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M46 16h14l4 8v24H46"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M26 22h12M26 30h12M26 38h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MapPin({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden fill="none">
      <path
        d="M12 30s10-11 10-18A10 10 0 1 0 2 12c0 7 10 18 10 18z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
    </svg>
  );
}
