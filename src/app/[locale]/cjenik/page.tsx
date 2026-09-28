import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ANCHOR_DATE_DISPLAY,
  getArchivePublications,
  getCurrentProductPublication,
  getCurrentPublication,
  getProductArchivePublications,
  pricedProducts,
  pricedServices,
  priceListOutlet,
  productPrices,
} from "@/data/priceList";
import { absoluteUrl, localePath, SITE_NAME, SITE_URL } from "@/lib/site";
import {
  fileName,
  formatHrAmount,
  productFileName,
  productFileStem,
  publicationFileStem,
} from "@/lib/priceListFeed";

type PriceListPageProps = {
  params: Promise<{ locale: string }>;
};

/** Osvježi dnevni cjenik proizvoda i arhivu bez novog deploya. */
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: PriceListPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "priceList" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  const canonical = absoluteUrl(localePath(locale, "cjenik"));
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
        hr: absoluteUrl(localePath("hr", "cjenik")),
        en: absoluteUrl(localePath("en", "cjenik")),
        "x-default": absoluteUrl(localePath("hr", "cjenik")),
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

function formatPublishedLabel(isoLocal: string) {
  const [datePart, timePart] = isoLocal.split("T");
  const [y, m, day] = datePart!.split("-");
  return `${day}.${m}.${y}. ${timePart}`;
}

export default async function PriceListPage({ params }: PriceListPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("priceList");
  const current = getCurrentPublication();
  const serviceArchive = getArchivePublications();
  const productCurrent = getCurrentProductPublication();
  const productArchive = getProductArchivePublications();
  const addressLine = `${priceListOutlet.addressStreet}, ${priceListOutlet.addressPostal} ${priceListOutlet.addressCity}`;

  const negotiated = ["risk", "opinions", "events"] as const;

  return (
    <section className="band py-16 lg:py-20">
      <div className="wrap">
        <p className="reveal font-text text-sm text-mute">
          <Link href="/" className="nav-link">
            {t("backHome")}
          </Link>
        </p>

        <h1 className="section-title reveal mt-4">{t("title")}</h1>
        <p className="price-page-copy reveal mt-5 text-[1.04rem] leading-[1.7] text-mute">
          {t("lede")}
        </p>
        <p className="reveal mt-3 font-text text-sm text-mute">
          {t("anchorNote", { date: ANCHOR_DATE_DISPLAY })}
        </p>
        <p className="reveal mt-1 font-text text-sm text-mute">
          {t("outletLine", { address: addressLine })}
        </p>

        <div className="mt-12">
          <h2 className="gallery-section-title reveal">{t("servicesTitle")}</h2>
          <div className="price-table-wrap reveal mt-6">
            <table className="price-table">
              <thead>
                <tr>
                  <th scope="col" className="price-col-name">{t("colService")}</th>
                  <th scope="col" className="price-col-unit">{t("colUnit")}</th>
                  <th scope="col" className="price-col-number">{t("colPrice")}</th>
                  <th scope="col" className="price-col-number">
                    {t("colAnchor", { date: ANCHOR_DATE_DISPLAY })}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricedServices.map((service) => {
                  const retail =
                    current.prices[service.id] ?? service.sidrenaCijena;
                  return (
                    <tr key={service.id}>
                      <td>
                        <span className="price-name">
                          {locale === "en"
                            ? t(`services.${service.id}`)
                            : service.naziv}
                        </span>
                      </td>
                      <td className="price-col-unit">{t(`units.${service.jedinica}`)}</td>
                      <td className="price-amount price-col-number">
                        {formatHrAmount(retail)} €
                      </td>
                      <td className="price-anchor price-col-number">
                        {formatHrAmount(service.sidrenaCijena)} €
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="gallery-section-title reveal">{t("productsTitle")}</h2>
          <p className="price-page-copy reveal mt-3 text-[1.04rem] leading-[1.7] text-mute">
            {t("productsLede")}
          </p>
          <div className="price-table-wrap reveal mt-6">
            <table className="price-table">
              <thead>
                <tr>
                  <th scope="col" className="price-col-product">{t("colProduct")}</th>
                  <th scope="col" className="price-col-brand">{t("colBrand")}</th>
                  <th scope="col" className="price-col-unit">{t("colUnit")}</th>
                  <th scope="col" className="price-col-number">{t("colPrice")}</th>
                  <th scope="col" className="price-col-number">
                    {t("colAnchor", { date: ANCHOR_DATE_DISPLAY })}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricedProducts.map((product) => {
                  const retail =
                    productPrices[product.id] ?? product.sidrenaCijena;
                  return (
                    <tr key={product.id}>
                      <td>
                        <span className="price-name">
                          {locale === "en"
                            ? t(`products.${product.id}`)
                            : product.naziv}
                        </span>
                      </td>
                      <td>{product.marka}</td>
                      <td className="price-col-unit">{t("productUnit")}</td>
                      <td className="price-amount price-col-number">
                        {formatHrAmount(retail)} €
                      </td>
                      <td className="price-anchor price-col-number">
                        {formatHrAmount(product.sidrenaCijena)} €
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="gallery-section-title reveal">{t("negotiatedTitle")}</h2>
          <p className="price-page-copy reveal mt-3 text-[1.04rem] leading-[1.7] text-mute">
            {t("negotiatedLede")}
          </p>
          <ul className="price-negotiated stagger mt-8">
            {negotiated.map((key) => (
              <li key={key} className="card reveal">
                <span className="card-tick card-tick-tl" aria-hidden />
                <span className="card-tick card-tick-tr" aria-hidden />
                <span className="card-tick card-tick-bl" aria-hidden />
                <span className="card-tick card-tick-br" aria-hidden />
                <h3 className="price-negotiated-title">
                  {t(`negotiated.${key}.title`)}
                </h3>
                <p className="price-negotiated-body">
                  {t(`negotiated.${key}.body`)}
                </p>
                <p className="price-negotiated-tag">{t("byAgreement")}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="gallery-section-title reveal">{t("machineTitle")}</h2>
          <p className="price-page-copy reveal mt-3 text-[1.04rem] leading-[1.7] text-mute">
            {t("machineLede")}
          </p>

          <div className="price-feed-links reveal mt-8">
            <a href="/cjenik/latest-usluge.csv" className="btn">
              {t("downloadServicesCsv")}
            </a>
            <a href="/cjenik/latest-usluge.xml" className="btn">
              {t("downloadServicesXml")}
            </a>
            <a href="/cjenik/latest-proizvodi.csv" className="btn">
              {t("downloadProductsCsv")}
            </a>
            <a href="/cjenik/latest-proizvodi.xml" className="btn">
              {t("downloadProductsXml")}
            </a>
          </div>

          <div className="price-archive reveal mt-10">
            <h3 className="price-archive-title">{t("archiveServicesTitle")}</h3>
            <p className="mt-2 font-text text-sm text-mute">
              {t("archiveServicesLede")}
            </p>
            <ul className="price-archive-list mt-5">
              {serviceArchive.map((pub) => {
                const stem = publicationFileStem(pub);
                const csv = fileName(pub, "csv");
                const xml = fileName(pub, "xml");
                const isCurrent = publicationFileStem(current) === stem;
                return (
                  <li key={stem} className="price-archive-item">
                    <div>
                      <p className="price-archive-when">
                        {formatPublishedLabel(pub.publishedAt)}
                        {isCurrent ? (
                          <span className="price-archive-badge">
                            {t("currentBadge")}
                          </span>
                        ) : null}
                      </p>
                      <p className="price-archive-file">{csv}</p>
                    </div>
                    <div className="price-archive-actions">
                      <a href={`/cjenik/${csv}`} className="nav-link">
                        CSV
                      </a>
                      <a href={`/cjenik/${xml}`} className="nav-link">
                        XML
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="price-archive reveal mt-10">
            <h3 className="price-archive-title">{t("archiveProductsTitle")}</h3>
            <p className="mt-2 font-text text-sm text-mute">
              {t("archiveProductsLede")}
            </p>
            <ul className="price-archive-list mt-5">
              {productArchive.map((pub) => {
                const stem = productFileStem(pub);
                const csv = productFileName(pub, "csv");
                const xml = productFileName(pub, "xml");
                const isCurrent = productFileStem(productCurrent) === stem;
                return (
                  <li key={stem} className="price-archive-item">
                    <div>
                      <p className="price-archive-when">
                        {formatPublishedLabel(pub.publishedAt)}
                        {isCurrent ? (
                          <span className="price-archive-badge">
                            {t("currentBadge")}
                          </span>
                        ) : null}
                      </p>
                      <p className="price-archive-file">{csv}</p>
                    </div>
                    <div className="price-archive-actions">
                      <a href={`/cjenik/${csv}`} className="nav-link">
                        CSV
                      </a>
                      <a href={`/cjenik/${xml}`} className="nav-link">
                        XML
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
