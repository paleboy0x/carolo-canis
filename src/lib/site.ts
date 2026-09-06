export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://carolo-canis.hr";

export const FACEBOOK_URL = "https://www.facebook.com/carolo.canis/";

export const SITE_NAME = "Carolo Canis d.o.o.";

export function localePath(locale: string, path = "") {
  const clean = path.replace(/^\//, "");
  if (locale === "en") {
    return clean ? `/en/${clean}` : "/en";
  }
  return clean ? `/${clean}` : "/";
}

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
