export type LocationStatus = "active" | "coming";

export type MapCoords = {
  lat: number;
  lng: number;
};

export type TrainingLocation = {
  id: string;
  city: string;
  address?: string;
  noteKey?: "headquarters";
  status: LocationStatus;
  /** Google Maps pin — add when the exact training spot is known. */
  coords?: MapCoords | null;
};

export const locations: TrainingLocation[] = [
  {
    id: "karlovac",
    city: "Karlovac",
    address: "Smičiklasova 11b, HR-47000",
    noteKey: "headquarters",
    status: "active",
    coords: { lat: 45.4928, lng: 15.5552 },
  },
  {
    id: "zagreb",
    city: "Zagreb",
    status: "active",
    coords: { lat: 45.8131, lng: 15.9772 },
  },
  {
    id: "rijeka",
    city: "Rijeka",
    status: "active",
    coords: { lat: 45.3271, lng: 14.4422 },
  },
];

export function mapEmbedUrl(
  location: TrainingLocation,
  locale: string = "hr",
): string | null {
  if (!location.coords) return null;
  const { lat, lng } = location.coords;
  const hl = locale === "en" ? "en" : "hr";
  return `https://maps.google.com/maps?q=${lat},${lng}&z=14&hl=${hl}&output=embed`;
}
