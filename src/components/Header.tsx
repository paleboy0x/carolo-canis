"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { sectionHref, sectionLinks } from "@/data/nav";
import { FacebookLink } from "./FacebookLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./LogoMark";
import { ScrollProgress } from "./ScrollProgress";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[linear-gradient(to_bottom,rgba(15,21,28,0.92),rgba(15,21,28,0.62))] backdrop-blur-[10px]">
      <div className="wrap flex h-[3.75rem] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-bone no-underline">
          <LogoMark size={28} />
          <span className="font-display text-[1.15rem] font-bold leading-none tracking-[-0.02em]">
            Carolo Canis
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {sectionLinks.map((link) => (
            <a
              key={link.hash}
              href={sectionHref(locale, link.hash)}
              className="nav-link font-text text-[0.95rem]"
            >
              {t(link.key)}
            </a>
          ))}
          <Link href="/galerija" className="nav-link font-text text-[0.95rem]">
            {t("gallery")}
          </Link>
          <FacebookLink />
          <span className="mx-1 h-5 w-px bg-line" aria-hidden />
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="border border-bone px-2.5 py-1 font-text text-sm text-bone"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-line">
          <div className="wrap flex flex-col gap-3 py-5 lg:hidden">
            {sectionLinks.map((link) => (
              <a
                key={link.hash}
                href={sectionHref(locale, link.hash)}
                className="font-display text-3xl font-bold tracking-[-0.02em] text-bone no-underline"
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
              </a>
            ))}
            <Link
              href="/galerija"
              className="font-display text-3xl font-bold tracking-[-0.02em] text-bone no-underline"
              onClick={() => setOpen(false)}
            >
              {t("gallery")}
            </Link>
          </div>
        </nav>
      ) : null}

      <ScrollProgress />
    </header>
  );
}
