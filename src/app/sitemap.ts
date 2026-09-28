import type { MetadataRoute } from "next";
import { absoluteUrl, localePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["", "galerija"] as const;

  return routes.flatMap((route) => {
    const hr = localePath("hr", route);
    const en = localePath("en", route);

    return [
      {
        url: absoluteUrl(hr),
        lastModified,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: {
          languages: {
            hr: absoluteUrl(hr),
            en: absoluteUrl(en),
            "x-default": absoluteUrl(hr),
          },
        },
      },
      {
        url: absoluteUrl(en),
        lastModified,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 0.9 : 0.6,
        alternates: {
          languages: {
            hr: absoluteUrl(hr),
            en: absoluteUrl(en),
            "x-default": absoluteUrl(hr),
          },
        },
      },
    ];
  });
}
