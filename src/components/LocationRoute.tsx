import { getTranslations } from "next-intl/server";
import { googleMapsUrl, locations } from "@/data/locations";

export async function LocationRoute() {
  const t = await getTranslations("locations");

  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {locations.map((location, index) => {
        const maps = googleMapsUrl(location);
        const body = (
          <>
            <span className="font-display text-sm text-brass">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-2 text-3xl italic text-bone">
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
            <p className="mt-3 text-sm text-mute">
              {maps ? t("openMap") : t("mapsPending")}
            </p>
          </>
        );

        if (maps) {
          return (
            <li key={location.id}>
              <a
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                className="card block px-5 py-5"
              >
                {body}
              </a>
            </li>
          );
        }

        return (
          <li key={location.id} className="card px-5 py-5">
            {body}
          </li>
        );
      })}
    </ol>
  );
}
