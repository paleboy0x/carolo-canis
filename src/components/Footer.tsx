import { useTranslations } from "next-intl";
import { LogoMark } from "./LogoMark";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="wrap flex items-center gap-3 py-6">
        <LogoMark size={22} />
        <p className="font-text text-sm text-mute">
          © {year} {t("legal")}
        </p>
      </div>
    </footer>
  );
}
