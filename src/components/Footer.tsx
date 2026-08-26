import Image from "next/image";
import { useTranslations } from "next-intl";
import { LogoMark } from "./LogoMark";

const navLinks = [
  { href: "#about", key: "about" },
  { href: "#method", key: "method" },
  { href: "#locations", key: "locations" },
  { href: "#contact", key: "contact" },
] as const;

// TODO: zamijeniti stvarnim Facebook linkom kad bude dostupan
const FACEBOOK_URL = "#";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="footer-shepherd" aria-hidden>
        <Image
          src="/shepherd-hero.png"
          alt=""
          fill
          sizes="30rem"
          className="object-contain"
        />
      </div>

      <div className="wrap relative">
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

            <a
              href={FACEBOOK_URL}
              className="fb-link"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13.5 21v-8.25h2.77l.41-3.22h-3.18V7.47c0-.93.26-1.57 1.6-1.57h1.7V3.02c-.3-.04-1.31-.13-2.49-.13-2.46 0-4.15 1.5-4.15 4.27v2.37H7.38v3.22h2.78V21h3.34z" />
              </svg>
            </a>
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
