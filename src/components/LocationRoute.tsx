import { getLocale } from "next-intl/server";
import { locations, mapEmbedUrl } from "@/data/locations";
import { Compass } from "@/components/marks/Compass";

export async function LocationRoute() {
  const locale = await getLocale();

  return (
    <ol className="stagger mt-10 grid gap-6 md:grid-cols-3">
      {locations.map((location, index) => (
        <li key={location.id} className="loc-card reveal">
          <div className="loc-map">
            <iframe
              title={location.city}
              src={mapEmbedUrl(location, locale)}
              className="h-56 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <Compass className="loc-compass" />

            <div className="loc-overlay">
              <span className="loc-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="loc-city">{location.city}</h3>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
