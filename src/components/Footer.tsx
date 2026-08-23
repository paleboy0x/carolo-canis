import Image from "next/image";
import { useTranslations } from "next-intl";
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
  const meta = useTranslations("meta");
  const contact = useTranslations("contact");
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
        <div className="grid gap-10 py-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2.5">
              <LogoMark size={26} />
              <span className="font-display text-lg font-bold leading-none tracking-[-0.02em] text-bone">
                Carolo Canis
              </span>
            </div>
            <p className="mt-4 max-w-[26rem] font-text text-sm leading-relaxed text-mute">
              {meta("description")}
            </p>
          </div>

          <nav className="md:col-span-3">
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav-link font-text text-sm">
                    {nav(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <a
              href={contact("phoneHref")}
              className="block font-display text-base font-semibold text-bone no-underline transition-colors hover:text-brass"
            >
              {contact("phone")}
            </a>
            <a
              href={`mailto:${contact("email")}`}
              className="mt-2 block font-text text-sm text-mute no-underline transition-colors hover:text-brass"
            >
              {contact("email")}
            </a>
            <p className="mt-4 font-text text-sm leading-snug text-mute">
              {contact("address")}
              <br />
              {contact("city")}
            </p>
          </div>
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
