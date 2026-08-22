import { useTranslations } from "next-intl";
import { LogoMark } from "./LogoMark";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule/80">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-3">
          <LogoMark size={26} />
          <p className="text-[12px] tracking-[0.08em] text-ink-soft">
            © {year} {t("legal")}
          </p>
        </div>
        <p className="text-[12px] tracking-[0.08em] text-ink-soft">
          {t("rights")}
        </p>
      </div>
    </footer>
  );
}
