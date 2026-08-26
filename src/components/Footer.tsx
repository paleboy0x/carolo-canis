import { useTranslations } from "next-intl";
import { FacebookLink } from "./FacebookLink";
import { LogoMark } from "./LogoMark";

const navLinks = [
  { href: "#about", key: "about" },
  { href: "#method", key: "method" },
  { href: "#locations", key: "locations" },
  { href: "#contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link font-text text-sm"
              >
                {nav(link.key)}
              </a>
            ))}
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
