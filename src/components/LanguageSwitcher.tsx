"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const flags = {
  hr: { src: "/flags/hr.svg", label: "Hrvatski" },
  en: { src: "/flags/gb.svg", label: "English" },
} as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Jezik / Language">
      {routing.locales.map((loc) => {
        const active = loc === locale;
        const flag = flags[loc];
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`lang-flag ${active ? "lang-flag-active" : ""}`}
            aria-current={active ? "true" : undefined}
            aria-label={flag.label}
            title={flag.label}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={flag.src} alt="" width={23} height={15} draggable={false} />
          </button>
        );
      })}
    </div>
  );
}
