"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

function FlagHR() {
  return (
    <svg viewBox="0 0 24 16" aria-hidden>
      <rect width="24" height="16" fill="#fff" />
      <rect width="24" height="5.33" fill="#ce1126" />
      <rect y="10.67" width="24" height="5.33" fill="#0093dd" />
      <g transform="translate(9 5)">
        <rect width="6" height="6" fill="#fff" />
        <rect width="1.5" height="1.5" fill="#ce1126" />
        <rect x="3" width="1.5" height="1.5" fill="#ce1126" />
        <rect x="1.5" y="1.5" width="1.5" height="1.5" fill="#ce1126" />
        <rect x="4.5" y="1.5" width="1.5" height="1.5" fill="#ce1126" />
        <rect y="3" width="1.5" height="1.5" fill="#ce1126" />
        <rect x="3" y="3" width="1.5" height="1.5" fill="#ce1126" />
        <rect x="1.5" y="4.5" width="1.5" height="1.5" fill="#ce1126" />
        <rect x="4.5" y="4.5" width="1.5" height="1.5" fill="#ce1126" />
      </g>
    </svg>
  );
}

function FlagEN() {
  return (
    <svg viewBox="0 0 24 16" aria-hidden>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#c8102e" strokeWidth="1.6" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.3" />
      <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="3.2" />
    </svg>
  );
}

const flags = { hr: FlagHR, en: FlagEN } as const;
const labels = { hr: "Hrvatski", en: "English" } as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Jezik / Language">
      {routing.locales.map((loc) => {
        const active = loc === locale;
        const Flag = flags[loc];
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`lang-flag ${active ? "lang-flag-active" : ""}`}
            aria-current={active ? "true" : undefined}
            aria-label={labels[loc]}
            title={labels[loc]}
          >
            <Flag />
          </button>
        );
      })}
    </div>
  );
}
