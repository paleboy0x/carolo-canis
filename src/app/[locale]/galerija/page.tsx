import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ownerImages, workImages } from "@/data/gallery";
import { absoluteUrl, localePath, SITE_NAME, SITE_URL } from "@/lib/site";

type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  const canonical = absoluteUrl(localePath(locale, "galerija"));
  const ogImage = absoluteUrl("/brand-mark.png");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
      languages: {
        hr: absoluteUrl(localePath("hr", "galerija")),
        en: absoluteUrl(localePath("en", "galerija")),
        "x-default": absoluteUrl(localePath("hr", "galerija")),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_GB" : "hr_HR",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1774,
          height: 887,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
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

        <div className="mt-12">
          <h2 className="gallery-section-title reveal">{t("workTitle")}</h2>
          <p className="reveal mt-3 max-w-[40rem] text-[1.04rem] leading-[1.7] text-mute">
            {t("workLede")}
          </p>
          <div className="mt-8">
            <GalleryGrid images={workImages} />
          </div>
        </div>

        <div id="vlasnik" className="mt-16 scroll-mt-28">
          <h2 className="gallery-section-title reveal">{t("ownerTitle")}</h2>
          <div className="mt-8">
            <GalleryGrid images={ownerImages} />
          </div>
        </div>
      </div>
    </section>
  );
}
