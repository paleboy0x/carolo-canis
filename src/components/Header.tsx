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
    <header className="sticky top-0 z-40 border-b border-line bg-void/92 backdrop-blur-sm">
      <div className="mx-auto flex h-[3.75rem] max-w-[88rem] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size={28} />
          <span className="font-display text-[1.35rem] italic leading-none text-bone">
            Carolo Canis
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-text text-[0.95rem] text-mute transition-colors hover:text-bone"
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
            className="font-text text-bone"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-line px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-3xl italic text-bone"
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
