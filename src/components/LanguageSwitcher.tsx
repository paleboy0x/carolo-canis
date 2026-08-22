"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-baseline gap-2 font-text text-sm" role="group">
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={active ? "text-brass" : "text-mute hover:text-bone"}
            aria-current={active ? "true" : undefined}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
