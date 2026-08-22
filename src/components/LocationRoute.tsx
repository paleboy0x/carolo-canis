import { getLocale, getTranslations } from "next-intl/server";
import { locations, mapEmbedUrl } from "@/data/locations";
import { Compass } from "@/components/marks/Compass";

const roman = ["I", "II", "III", "IV", "V"] as const;

export async function LocationRoute() {
  const t = await getTranslations("locations");
  const locale = await getLocale();

  return (
    <ol className="mt-10 grid gap-6 md:grid-cols-3">
      {locations.map((location, index) => {
        const embed = mapEmbedUrl(location, locale);

        return (
          <li
            key={location.id}
            className="card reveal relative overflow-hidden !p-0"
          >
            <span className="card-tick card-tick-tl" aria-hidden />
            <span className="card-tick card-tick-tr" aria-hidden />

            {embed ? (
              <iframe
                title={location.city}
                src={embed}
                className="h-48 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-48 items-center justify-center bg-turf text-sm text-mute">
                {t("mapsPending")}
              </div>
            )}

            <div className="relative flex items-end justify-between gap-4 px-6 pt-4 pb-6">
              <div>
                <span className="font-display text-sm italic text-brass">
                  {roman[index]}.
                </span>
                <h3 className="mt-1 font-display text-3xl italic text-bone">
                  {location.city}
                </h3>
              </div>

              <Compass className="h-14 w-14 shrink-0 text-brass/80" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
