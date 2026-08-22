import { getTranslations } from "next-intl/server";
import { googleMapsUrl, locations } from "@/data/locations";

export async function LocationRoute() {
  const t = await getTranslations("locations");

  return (
    <ol className="relative grid gap-0 md:grid-cols-3">
      <div className="pointer-events-none absolute top-[2.15rem] right-[16%] left-[16%] hidden h-px bg-brass/50 md:block" />
      {locations.map((location, index) => {
        const maps = googleMapsUrl(location);
        const body = (
          <>
            <span className="relative z-10 mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-brass bg-void font-display text-sm text-brass">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-5 text-4xl italic text-bone md:text-5xl">
              {location.city}
            </h3>
            {location.noteKey ? (
              <p className="mt-2 text-sm text-brass">{t(location.noteKey)}</p>
            ) : null}
            {location.address ? (
              <p className="mt-2 text-sm leading-relaxed text-mute">
                {location.address}
              </p>
            ) : null}
            <p className="mt-4 text-sm text-mute">
              {maps ? t("openMap") : t("mapsPending")}
            </p>
          </>
        );

        const className =
          "flex flex-col items-center px-4 py-8 text-center md:py-4";

        if (maps) {
          return (
            <li key={location.id}>
              <a
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                className={`${className} transition-colors hover:text-brass`}
              >
                {body}
              </a>
            </li>
          );
        }

        return (
          <li key={location.id} className={className}>
            {body}
          </li>
        );
      })}
    </ol>
  );
}
