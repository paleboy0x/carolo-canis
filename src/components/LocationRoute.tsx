import { getLocale } from "next-intl/server";
import { locations, mapEmbedUrl } from "@/data/locations";
import { Compass } from "@/components/marks/Compass";

export async function LocationRoute() {
  const locale = await getLocale();

  return (
    <ol className="mt-12 grid gap-6 md:grid-cols-3">
      {locations.map((location, index) => (
        <li
          key={location.id}
          className="card reveal relative overflow-hidden !p-0"
        >
          <span className="card-tick card-tick-tl" aria-hidden />
          <span className="card-tick card-tick-tr" aria-hidden />

          <iframe
            title={location.city}
            src={mapEmbedUrl(location, locale)}
            className="h-48 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="relative flex items-end justify-between gap-4 px-6 pt-5 pb-6">
            <div>
              <span className="font-display text-sm font-semibold tracking-[0.1em] text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-bone">
                {location.city}
              </h3>
            </div>

            <Compass className="h-12 w-12 shrink-0 text-brass/80" />
          </div>
        </li>
      ))}
    </ol>
  );
}
