import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FacebookLink } from "./FacebookLink";
import { LogoMark } from "./LogoMark";

const sectionLinks = [
  { hash: "#about", key: "about" },
  { hash: "#services", key: "services" },
  { hash: "#method", key: "method" },
  { hash: "#locations", key: "locations" },
  { hash: "#contact", key: "contact" },
] as const;

function sectionHref(locale: string, hash: string) {
  return locale === "en" ? `/en/${hash}` : `/${hash}`;
}

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="wrap">
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark size={26} />
            <span className="font-display text-lg font-bold leading-none tracking-[-0.02em] text-bone">
              Carolo Canis
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {sectionLinks.map((link) => (
              <a
                key={link.hash}
                href={sectionHref(locale, link.hash)}
                className="nav-link font-text text-sm"
              >
                {nav(link.key)}
              </a>
            ))}
            <Link href="/galerija" className="nav-link font-text text-sm">
              {nav("gallery")}
            </Link>
            <FacebookLink />
          </nav>
        </div>

        <div className="border-t border-line py-5">
          <p className="font-text text-xs text-mute">
            © {year} {t("legal")}
          </p>
        </div>
      </div>
    </footer>
  );
}
