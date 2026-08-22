import { getTranslations } from "next-intl/server";
import {
  googleMapsUrl,
  type TrainingLocation,
} from "@/data/locations";
import { MapPin } from "./KennelMarks";

type LocationPlateProps = {
  location: TrainingLocation;
};

export async function LocationPlate({ location }: LocationPlateProps) {
  const t = await getTranslations("locations");
  const maps = googleMapsUrl(location);
  const inner = (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Contour />
      </div>
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] tracking-[0.18em] uppercase text-rust">
            {location.noteKey ? t(location.noteKey) : location.city}
          </p>
          <MapPin
            className={`h-8 w-6 ${maps ? "text-rust" : "text-rule"}`}
          />
        </div>
        <h3 className="font-display mt-5 text-4xl text-ivory">{location.city}</h3>
        {location.address ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {location.address}
          </p>
        ) : null}
        <p className="mt-6 text-[12px] tracking-[0.14em] uppercase text-ink-soft">
          {maps ? t("openMap") : t("mapsPending")}
        </p>
      </div>
    </>
  );

  const frame =
    "relative min-h-[14.5rem] overflow-hidden border border-rule bg-paper-deep px-6 py-7 transition-colors";

  if (maps) {
    return (
      <a
        href={maps}
        target="_blank"
        rel="noopener noreferrer"
        className={`${frame} hover:bg-dusk-mid`}
      >
        {inner}
      </a>
    );
  }

  return <article className={frame}>{inner}</article>;
}

function Contour() {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full text-rule" aria-hidden>
      <path
        d="M-10 210c40-20 80-8 120-28s70-40 110-22 80 10 120-18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-10 170c50-16 90 6 140-20s90-24 120 4 80-20 90-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-10 130c40 10 90-24 130-8s80 8 120-16 70-4 100 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="210" cy="96" r="28" fill="none" stroke="currentColor" />
      <circle cx="210" cy="96" r="54" fill="none" stroke="currentColor" />
    </svg>
  );
}
