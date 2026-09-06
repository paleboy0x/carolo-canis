import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Newsreader, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { absoluteUrl, localePath, SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const brand = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-brand",
  display: "swap",
});

const text = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  const ogTitle = t("ogTitle");
  const keywords = t("keywords");
  const canonical = absoluteUrl(localePath(locale));
  const ogImage = absoluteUrl("/brand-mark.png");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: keywords.split(",").map((k) => k.trim()),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Dog training",
    alternates: {
      canonical,
      languages: {
        hr: absoluteUrl(localePath("hr")),
        en: absoluteUrl(localePath("en")),
        "x-default": absoluteUrl(localePath("hr")),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_GB" : "hr_HR",
      alternateLocale: locale === "en" ? ["hr_HR"] : ["en_GB"],
      url: canonical,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1774,
          height: 887,
          alt: "Carolo Canis",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [{ url: "/brand-mark.png", type: "image/png" }],
      apple: [{ url: "/brand-mark.png" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const meta = await getTranslations({ locale, namespace: "meta" });

  return (
    <html
      lang={locale}
      className={`${display.variable} ${brand.variable} ${text.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-void text-bone">
        <JsonLd locale={locale} description={meta("description")} />
        <NextIntlClientProvider messages={messages}>
          <div className="relative z-10 flex min-h-full flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Reveal />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
