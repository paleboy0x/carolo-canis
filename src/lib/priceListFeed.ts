import {
  ANCHOR_DATE,
  ANCHOR_DATE_DISPLAY,
  findPublicationByFileStem,
  getCurrentProductPublication,
  getCurrentPublication,
  outletAddressSlug,
  parseProductFileStem,
  pricedProducts,
  pricedServices,
  priceListOutlet,
  productFileStem,
  productPrices,
  productPublicationForDate,
  publicationFileStem,
  type PricePublication,
  type ProductDayPublication,
} from "@/data/priceList";

export type FeedExt = "csv" | "xml";

export function fileName(pub: PricePublication, ext: FeedExt): string {
  return `${publicationFileStem(pub)}.${ext}`;
}

export function productFileName(
  pub: ProductDayPublication,
  ext: FeedExt,
): string {
  return `${productFileStem(pub)}.${ext}`;
}

export function formatHrAmount(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Citira polja sa ; , " ili prijelomom — sprječava Excel cijepanje 25,00 */
function csvCell(value: string): string {
  if (/[;,"\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function csvAmount(value: number): string {
  return csvCell(formatHrAmount(value));
}

function csvDocument(rows: string[]): string {
  return `\uFEFF${["sep=;", ...rows].join("\r\n")}\r\n`;
}

function outletAddressLine(): string {
  return `${priceListOutlet.addressStreet}, ${priceListOutlet.addressPostal} ${priceListOutlet.addressCity}`;
}

export function toServicesCsv(pub: PricePublication): string {
  const header = [
    "naziv_usluge",
    "jedinica_mjere",
    "maloprodajna_cijena",
    "posebni_oblik_prodaje",
    "naziv_posebnog_oblika_prodaje",
    "sidrena_cijena",
    "datum_sidrene_cijene",
    "valuta",
  ].join(";");

  const body = pricedServices.map((service) => {
    const retail = pub.prices[service.id] ?? service.sidrenaCijena;
    return [
      csvCell(service.naziv),
      csvCell(service.jedinica),
      csvAmount(retail),
      "ne",
      "",
      csvAmount(service.sidrenaCijena),
      ANCHOR_DATE_DISPLAY,
      "EUR",
    ].join(";");
  });

  return csvDocument([header, ...body]);
}

export function toProductsCsv(_pub: ProductDayPublication): string {
  const header = [
    "sifra",
    "naziv",
    "marka",
    "jedinica_mjere",
    "cijena_za_jedinicu_mjere",
    "maloprodajna_cijena",
    "posebni_oblik_prodaje",
    "naziv_posebnog_oblika_prodaje",
    "sidrena_cijena",
    "barkod",
    "dostupnost",
    "datum_sidrene_cijene",
    "valuta",
  ].join(";");

  const body = pricedProducts.map((product) => {
    const retail = productPrices[product.id] ?? product.sidrenaCijena;
    return [
      "",
      csvCell(product.naziv),
      csvCell(product.marka),
      csvCell(product.jedinica),
      csvAmount(retail),
      csvAmount(retail),
      "ne",
      "",
      csvAmount(product.sidrenaCijena),
      csvCell(product.barkod),
      "dostupno",
      ANCHOR_DATE_DISPLAY,
      "EUR",
    ].join(";");
  });

  return csvDocument([header, ...body]);
}

export function toServicesXml(pub: PricePublication): string {
  const [datePart, timePart] = pub.publishedAt.split("T");
  const servicesXml = pricedServices
    .map((service) => {
      const retail = pub.prices[service.id] ?? service.sidrenaCijena;
      return [
        "  <usluga>",
        `    <naziv_usluge>${escapeXml(service.naziv)}</naziv_usluge>`,
        `    <jedinica_mjere>${escapeXml(service.jedinica)}</jedinica_mjere>`,
        `    <maloprodajna_cijena>${formatHrAmount(retail)}</maloprodajna_cijena>`,
        "    <posebni_oblik_prodaje>ne</posebni_oblik_prodaje>",
        "    <naziv_posebnog_oblika_prodaje></naziv_posebnog_oblika_prodaje>",
        `    <sidrena_cijena>${formatHrAmount(service.sidrenaCijena)}</sidrena_cijena>`,
        `    <datum_sidrene_cijene>${ANCHOR_DATE_DISPLAY}</datum_sidrene_cijene>`,
        "    <valuta>EUR</valuta>",
        "  </usluga>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<cjenik>",
    "  <zaglavlje>",
    "    <oblik_objekta>usluge</oblik_objekta>",
    `    <adresa>${escapeXml(outletAddressLine())}</adresa>`,
    `    <adresa_slug>${escapeXml(outletAddressSlug())}</adresa_slug>`,
    `    <oznaka_objekta>${escapeXml(priceListOutlet.code)}</oznaka_objekta>`,
    `    <broj_pohrane>${pub.storageNumber}</broj_pohrane>`,
    `    <datum_objave>${escapeXml(datePart!)}</datum_objave>`,
    `    <vrijeme_objave>${escapeXml(timePart!)}</vrijeme_objave>`,
    `    <datum_sidrene_cijene>${ANCHOR_DATE}</datum_sidrene_cijene>`,
    `    <datoteka>${escapeXml(fileName(pub, "xml"))}</datoteka>`,
    "  </zaglavlje>",
    "  <usluge>",
    servicesXml,
    "  </usluge>",
    "</cjenik>",
    "",
  ].join("\n");
}

export function toProductsXml(pub: ProductDayPublication): string {
  const [datePart, timePart] = pub.publishedAt.split("T");
  const productsXml = pricedProducts
    .map((product) => {
      const retail = productPrices[product.id] ?? product.sidrenaCijena;
      return [
        "  <proizvod>",
        "    <sifra></sifra>",
        `    <naziv>${escapeXml(product.naziv)}</naziv>`,
        `    <marka>${escapeXml(product.marka)}</marka>`,
        `    <jedinica_mjere>${escapeXml(product.jedinica)}</jedinica_mjere>`,
        `    <cijena_za_jedinicu_mjere>${formatHrAmount(retail)}</cijena_za_jedinicu_mjere>`,
        `    <maloprodajna_cijena>${formatHrAmount(retail)}</maloprodajna_cijena>`,
        "    <posebni_oblik_prodaje>ne</posebni_oblik_prodaje>",
        "    <naziv_posebnog_oblika_prodaje></naziv_posebnog_oblika_prodaje>",
        `    <sidrena_cijena>${formatHrAmount(product.sidrenaCijena)}</sidrena_cijena>`,
        `    <barkod>${escapeXml(product.barkod)}</barkod>`,
        "    <dostupnost>dostupno</dostupnost>",
        `    <datum_sidrene_cijene>${ANCHOR_DATE_DISPLAY}</datum_sidrene_cijene>`,
        "    <valuta>EUR</valuta>",
        "  </proizvod>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<cjenik>",
    "  <zaglavlje>",
    "    <oblik_objekta>proizvodi</oblik_objekta>",
    `    <adresa>${escapeXml(outletAddressLine())}</adresa>`,
    `    <adresa_slug>${escapeXml(outletAddressSlug())}</adresa_slug>`,
    `    <oznaka_objekta>${escapeXml(priceListOutlet.code)}</oznaka_objekta>`,
    `    <broj_pohrane>${pub.storageNumber}</broj_pohrane>`,
    `    <datum_objave>${escapeXml(datePart!)}</datum_objave>`,
    `    <vrijeme_objave>${escapeXml(timePart!)}</vrijeme_objave>`,
    `    <datum_sidrene_cijene>${ANCHOR_DATE}</datum_sidrene_cijene>`,
    `    <datoteka>${escapeXml(productFileName(pub, "xml"))}</datoteka>`,
    "  </zaglavlje>",
    "  <proizvodi>",
    productsXml,
    "  </proizvodi>",
    "</cjenik>",
    "",
  ].join("\n");
}

export function resolveFeedFile(file: string): {
  body: string;
  contentType: string;
  downloadName: string;
} | null {
  const match = /^(.*?)\.(csv|xml)$/i.exec(file);
  if (!match) return null;

  const stem = match[1]!;
  const ext = match[2]!.toLowerCase() as FeedExt;

  const isCsv = ext === "csv";
  const contentType = isCsv
    ? "text/csv; charset=utf-8"
    : "application/xml; charset=utf-8";

  // Aliases
  if (
    stem === "latest" ||
    stem === "latest-usluge" ||
    stem === "usluge-latest"
  ) {
    const pub = getCurrentPublication();
    return {
      body: isCsv ? toServicesCsv(pub) : toServicesXml(pub),
      contentType,
      downloadName: fileName(pub, ext),
    };
  }

  if (stem === "latest-proizvodi" || stem === "proizvodi-latest") {
    const pub = getCurrentProductPublication();
    return {
      body: isCsv ? toProductsCsv(pub) : toProductsXml(pub),
      contentType,
      downloadName: productFileName(pub, ext),
    };
  }

  const servicePub = findPublicationByFileStem(stem);
  if (servicePub) {
    return {
      body: isCsv ? toServicesCsv(servicePub) : toServicesXml(servicePub),
      contentType,
      downloadName: fileName(servicePub, ext),
    };
  }

  const productPub = parseProductFileStem(stem);
  if (productPub) {
    return {
      body: isCsv ? toProductsCsv(productPub) : toProductsXml(productPub),
      contentType,
      downloadName: productFileName(productPub, ext),
    };
  }

  return null;
}

export {
  publicationFileStem,
  productFileStem,
  productPublicationForDate,
  fileName as publicationFileName,
};
