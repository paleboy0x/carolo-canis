import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GalleryGrid } from "@/components/GalleryGrid";

type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("gallery");

  return (
    <section className="band py-16 lg:py-20">
      <div className="wrap">
        <p className="reveal font-text text-sm text-mute">
          <Link href="/" className="nav-link">
            {t("backHome")}
          </Link>
        </p>

        <h1 className="section-title reveal mt-4">{t("title")}</h1>
        <p className="reveal mt-4 max-w-[40rem] text-[1.04rem] leading-[1.7] text-mute">
          {t("lede")}
        </p>

        <div className="mt-10">
          <GalleryGrid />
        </div>
      </div>
    </section>
  );
}
