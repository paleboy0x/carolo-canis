import {
  FACEBOOK_URL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

type JsonLdProps = {
  locale: string;
  description: string;
};

export function JsonLd({ locale, description }: JsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Carolo Canis",
    description,
    url: SITE_URL,
    image: absoluteUrl("/brand-mark.png"),
    logo: absoluteUrl("/brand-mark.png"),
    telephone: "+385952244355",
    email: "carolo_canis@net.hr",
    areaServed: [
      { "@type": "City", name: "Karlovac" },
      { "@type": "City", name: "Zagreb" },
      { "@type": "City", name: "Rijeka" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karlovac",
      addressCountry: "HR",
    },
    sameAs: [FACEBOOK_URL],
    inLanguage: locale === "en" ? "en" : "hr",
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
