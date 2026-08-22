export type MapCoords = {
  lat: number;
  lng: number;
};

export type TrainingLocation = {
  id: string;
  city: string;
  coords: MapCoords;
};

export const locations: TrainingLocation[] = [
  {
    id: "karlovac",
    city: "Karlovac",
    coords: { lat: 45.4928, lng: 15.5552 },
  },
  {
    id: "zagreb",
    city: "Zagreb",
    coords: { lat: 45.8131, lng: 15.9772 },
  },
  {
    id: "rijeka",
    city: "Rijeka",
    coords: { lat: 45.3271, lng: 14.4422 },
  },
];

export function mapEmbedUrl(
  location: TrainingLocation,
  locale: string = "hr",
): string {
  const { lat, lng } = location.coords;
  const hl = locale === "en" ? "en" : "hr";
  return `https://maps.google.com/maps?q=${lat},${lng}&z=14&hl=${hl}&output=embed`;
}
