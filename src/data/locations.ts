type TrainingLocation = {
  id: string;
  city: string;
  coords: { lat: number; lng: number };
};

export const locations: TrainingLocation[] = [
  {
    id: "karlovac",
    city: "Karlovac",
    coords: { lat: 45.502657390785814, lng: 15.558459263814207 },
  },
  {
    id: "zagreb",
    city: "Zagreb",
    coords: { lat: 45.794325778719205, lng: 15.855034706158175 },
  },
  {
    id: "rijeka",
    city: "Rijeka",
    coords: { lat: 45.38447987605842, lng: 14.496787722114266 },
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
