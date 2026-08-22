import { useTranslations } from "next-intl";
import { LogoMark } from "./LogoMark";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-7 sm:px-8">
        <LogoMark size={24} />
        <p className="text-[12px] tracking-[0.08em] text-ink-soft">
          © {year} {t("legal")}
        </p>
      </div>
    </footer>
  );
}
