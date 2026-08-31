export const sectionLinks = [
  { hash: "#about", key: "about" },
  { hash: "#services", key: "services" },
  { hash: "#method", key: "method" },
  { hash: "#locations", key: "locations" },
  { hash: "#contact", key: "contact" },
] as const;

export function sectionHref(locale: string, hash: string) {
  return locale === "en" ? `/en/${hash}` : `/${hash}`;
}
