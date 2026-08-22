"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./LogoMark";

const links = [
  { href: "#services", key: "services" },
  { href: "#about", key: "about" },
  { href: "#method", key: "method" },
  { href: "#locations", key: "locations" },
  { href: "#contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule/60 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size={34} />
          <span className="font-display text-[1.15rem] leading-none tracking-tight text-ink">
            Carolo Canis
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] tracking-[0.16em] uppercase text-ink-soft transition-colors hover:text-ink"
            >
              {t(link.key)}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="text-[12px] tracking-[0.16em] uppercase text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-rule/70 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-2xl text-ink"
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
