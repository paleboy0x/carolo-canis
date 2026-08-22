import { getLocale, getTranslations } from "next-intl/server";
import { locations, mapEmbedUrl } from "@/data/locations";

export async function LocationRoute() {
  const t = await getTranslations("locations");
  const locale = await getLocale();

  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {locations.map((location, index) => {
        const embed = mapEmbedUrl(location, locale);

        return (
          <li key={location.id} className="card overflow-hidden">
            {embed ? (
              <iframe
                title={location.city}
                src={embed}
                className="h-40 w-full border-0 grayscale contrast-[0.92]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-40 items-center justify-center bg-turf text-sm text-mute">
                {t("mapsPending")}
              </div>
            )}
            <div className="px-5 py-4">
              <span className="font-display text-sm text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-1 text-3xl italic text-bone">
                {location.city}
              </h3>
              {location.noteKey ? (
                <p className="mt-1 text-sm text-brass">{t(location.noteKey)}</p>
              ) : null}
              {location.address ? (
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {location.address}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
