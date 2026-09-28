/** Sidrena / referentna cijena — NN 101/2026 */
export const ANCHOR_DATE = "2026-09-10" as const;
export const ANCHOR_DATE_DISPLAY = "10.09.2026" as const;

/** Podaci o sjedištu za naziv datoteke (točka VI.) */
export const priceListOutlet = {
  addressStreet: "Smičiklasova 11B",
  addressPostal: "47000",
  addressCity: "Karlovac",
  /** Oznaka objekta u nazivu datoteke */
  code: "CC01",
} as const;

export type FeedKind = "usluge" | "proizvodi";

export type ServiceUnit = "sat" | "mjesec" | "tecaj";

export type PricedService = {
  /** Interni ključ (nije u CSV-u usluga) */
  id: string;
  naziv: string;
  jedinica: ServiceUnit;
  sidrenaCijena: number;
};

/** Usluge s fiksnom cijenom — ulaze u CSV/XML usluga (bez šifre) */
export const pricedServices: PricedService[] = [
  {
    id: "u01",
    naziv: "Pojedinačni sat – po potrebi klijenta",
    jedinica: "sat",
    sidrenaCijena: 25,
  },
  {
    id: "u02",
    naziv: "Mjesečna naknada za klijenta u procesu edukacije",
    jedinica: "mjesec",
    sidrenaCijena: 50,
  },
  {
    id: "u03",
    naziv: "Mjesečna naknada za klijenta u treningu nakon procesa edukacije",
    jedinica: "mjesec",
    sidrenaCijena: 60,
  },
  {
    id: "u04",
    naziv:
      "Mjesečna naknada za klijenta u procesu priprema za uzgojne preglede",
    jedinica: "mjesec",
    sidrenaCijena: 60,
  },
  {
    id: "u05",
    naziv: "Mjesečna naknada za klijenta u procesu priprema za izložbe",
    jedinica: "mjesec",
    sidrenaCijena: 60,
  },
  {
    id: "u06",
    naziv: "Osnovni tečaj poslušnosti – obročno plaćanje",
    jedinica: "tecaj",
    sidrenaCijena: 400,
  },
];

export type PricedProduct = {
  /** Interni ključ; nije poslovna šifra i ne objavljuje se u feedu. */
  id: string;
  naziv: string;
  marka: string;
  jedinica: string;
  sidrenaCijena: number;
  barkod: string;
};

/** Hrana za pse — cjenik proizvoda (točka III.) */
export const pricedProducts: PricedProduct[] = [
  {
    id: "p01",
    naziv: "Hrana za odrasle pse na bazi piletine Eukanuba vreća 18 kg",
    marka: "Eukanuba",
    jedinica: "vreća",
    sidrenaCijena: 70,
    barkod: "",
  },
  {
    id: "p02",
    naziv: "Hrana za pse na bazi janjetine i za štenad vreća 18 kg",
    marka: "Eukanuba",
    jedinica: "vreća",
    sidrenaCijena: 75,
    barkod: "",
  },
  {
    id: "p03",
    naziv: "Hrana za odrasle pse Eukanuba-veterinary vreća 12 kg",
    marka: "Eukanuba",
    jedinica: "vreća",
    sidrenaCijena: 70,
    barkod: "",
  },
];

export type PricePublication = {
  storageNumber: number;
  /** Europe/Zagreb wall clock, npr. 2026-10-01T07:00 */
  publishedAt: string;
  /** Maloprodajne cijene usluga po internom id */
  prices: Record<string, number>;
};

/**
 * Objave usluga — nova stavka samo kod promjene cijene.
 * Deploy prije 8:00 na dan publishedAt.
 */
export const publications: PricePublication[] = [
  {
    storageNumber: 1,
    publishedAt: "2026-10-01T07:00",
    prices: {
      u01: 25,
      u02: 50,
      u03: 60,
      u04: 60,
      u05: 60,
      u06: 400,
    },
  },
];

/** Trenutne maloprodajne cijene proizvoda po internom id-u. */
export const productPrices: Record<string, number> = {
  p01: 70,
  p02: 75,
  p03: 70,
};

/** Prvi dan dnevne objave proizvoda (obveza trgovca) */
export const PRODUCT_FEED_START = "2026-10-01" as const;

export function outletAddressSlug(): string {
  const raw = `${priceListOutlet.addressStreet}-${priceListOutlet.addressPostal}-${priceListOutlet.addressCity}`;
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parsePublishedAt(isoLocal: string): Date {
  return new Date(`${isoLocal}:00+02:00`);
}

/** Zagreb YYYY-MM-DD za trenutak `now` */
export function zagrebDateString(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Zagreb",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Zagreb sati:minute kao brojevi */
export function zagrebHourMinute(now = new Date()): { hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zagreb",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return { hour, minute };
}

function addDaysIso(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const utc = Date.UTC(y!, m! - 1, d! + days);
  const dt = new Date(utc);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function daysBetweenIso(from: string, to: string): number {
  const [y1, m1, d1] = from.split("-").map(Number);
  const [y2, m2, d2] = to.split("-").map(Number);
  const a = Date.UTC(y1!, m1! - 1, d1!);
  const b = Date.UTC(y2!, m2! - 1, d2!);
  return Math.round((b - a) / 86_400_000);
}

/** Datum (YYYY-MM-DD) za koji vrijedi „današnja“ product objava u 07:00 */
export function currentProductFeedDate(now = new Date()): string {
  const today = zagrebDateString(now);
  const { hour } = zagrebHourMinute(now);
  // Prije 07:00 koristi jučer; od 07:00 nadalje danas
  const effective = hour < 7 ? addDaysIso(today, -1) : today;
  if (effective < PRODUCT_FEED_START) return PRODUCT_FEED_START;
  return effective;
}

export type ProductDayPublication = {
  kind: "proizvodi";
  storageNumber: number;
  publishedAt: string;
  dateIso: string;
};

export function productStorageNumberForDate(dateIso: string): number {
  return daysBetweenIso(PRODUCT_FEED_START, dateIso) + 1;
}

export function productPublicationForDate(dateIso: string): ProductDayPublication {
  const storageNumber = productStorageNumberForDate(dateIso);
  return {
    kind: "proizvodi",
    storageNumber,
    publishedAt: `${dateIso}T07:00`,
    dateIso,
  };
}

export function getCurrentProductPublication(
  now = new Date(),
): ProductDayPublication {
  return productPublicationForDate(currentProductFeedDate(now));
}

/** Zadnjih 30 dana product objava (uključujući danas / effective) */
export function getProductArchivePublications(
  now = new Date(),
): ProductDayPublication[] {
  const end = currentProductFeedDate(now);
  const startCandidate = addDaysIso(end, -29);
  const start =
    startCandidate < PRODUCT_FEED_START ? PRODUCT_FEED_START : startCandidate;
  const out: ProductDayPublication[] = [];
  let cursor = start;
  while (cursor <= end) {
    out.push(productPublicationForDate(cursor));
    cursor = addDaysIso(cursor, 1);
  }
  return out.reverse();
}

export function getCurrentPublication(now = new Date()): PricePublication {
  const past = publications.filter(
    (p) => parsePublishedAt(p.publishedAt).getTime() <= now.getTime(),
  );
  if (past.length > 0) {
    return past[past.length - 1]!;
  }
  return publications[0]!;
}

export function getArchivePublications(now = new Date()): PricePublication[] {
  const cutoff = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  const archived = publications.filter(
    (p) => parsePublishedAt(p.publishedAt).getTime() >= cutoff,
  );
  if (archived.length === 0 && publications[0]) {
    return [publications[0]];
  }
  return archived;
}

function fileStem(kind: FeedKind, storageNumber: number, publishedAt: string): string {
  const [datePart, timePart] = publishedAt.split("T");
  const [y, m, day] = datePart!.split("-");
  const [hh, mm] = timePart!.split(":");
  const storage = String(storageNumber).padStart(3, "0");
  return [
    kind,
    outletAddressSlug(),
    priceListOutlet.code,
    storage,
    `${day}${m}${y}_${hh}${mm}`,
  ].join("_");
}

export function publicationFileStem(pub: PricePublication): string {
  return fileStem("usluge", pub.storageNumber, pub.publishedAt);
}

export function productFileStem(pub: ProductDayPublication): string {
  return fileStem("proizvodi", pub.storageNumber, pub.publishedAt);
}

export function findPublicationByFileStem(
  stem: string,
): PricePublication | undefined {
  return publications.find((p) => publicationFileStem(p) === stem);
}

/** Parse proizvodi_..._DDMMYYYY_0700 stem → objava ili null */
export function parseProductFileStem(stem: string): ProductDayPublication | null {
  const prefix = `proizvodi_${outletAddressSlug()}_${priceListOutlet.code}_`;
  if (!stem.startsWith(prefix)) return null;
  const rest = stem.slice(prefix.length);
  const match = /^(\d{3})_(\d{2})(\d{2})(\d{4})_(\d{2})(\d{2})$/.exec(rest);
  if (!match) return null;
  const storageNumber = Number(match[1]);
  const dateIso = `${match[4]}-${match[3]}-${match[2]}`;
  if (dateIso < PRODUCT_FEED_START) return null;
  const expected = productPublicationForDate(dateIso);
  if (expected.storageNumber !== storageNumber) return null;
  const end = currentProductFeedDate();
  const earliest = addDaysIso(end, -29);
  const windowStart =
    earliest < PRODUCT_FEED_START ? PRODUCT_FEED_START : earliest;
  if (dateIso > end || dateIso < windowStart) return null;
  return expected;
}
