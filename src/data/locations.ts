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
    coords: null,
  },
  {
    id: "zagreb",
    city: "Zagreb",
    status: "active",
    coords: null,
  },
  {
    id: "rijeka",
    city: "Rijeka",
    status: "active",
    coords: null,
  },
];

export function googleMapsUrl(location: TrainingLocation): string | null {
  if (!location.coords) return null;
  const { lat, lng } = location.coords;
  return `https://www.google.com/maps?q=${lat},${lng}`;
}
