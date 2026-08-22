"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-1 font-sans text-[11px] tracking-[0.18em] uppercase"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`px-1.5 py-0.5 transition-colors ${
              active
                ? "text-rust"
                : "text-ink-soft hover:text-ivory"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
