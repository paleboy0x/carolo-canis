export type LocationStatus = "active" | "coming";

export type TrainingLocation = {
  id: string;
  city: string;
  address?: string;
  noteKey?: "headquarters";
  status: LocationStatus;
};

export const locations: TrainingLocation[] = [
  {
    id: "karlovac",
    city: "Karlovac",
    address: "Smičiklasova 11b, HR-47000",
    noteKey: "headquarters",
    status: "active",
  },
  {
    id: "city-2",
    city: "",
    status: "coming",
  },
  {
    id: "city-3",
    city: "",
    status: "coming",
  },
];
