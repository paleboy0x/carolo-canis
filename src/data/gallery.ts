export type GalleryImage = {
  id: string;
  src: string;
  width: number;
  height: number;
};

/** Normalized JPEGs from /pics — longest edge ≤ 1600px. */
export const galleryImages: GalleryImage[] = [
  { id: "gallery-01", src: "/gallery/gallery-01.jpg", width: 901, height: 1600 },
  { id: "gallery-02", src: "/gallery/gallery-02.jpg", width: 1600, height: 1071 },
  { id: "gallery-03", src: "/gallery/gallery-03.jpg", width: 640, height: 402 },
  { id: "gallery-04", src: "/gallery/gallery-04.jpg", width: 1200, height: 1600 },
  { id: "gallery-05", src: "/gallery/gallery-05.jpg", width: 640, height: 429 },
  { id: "gallery-06", src: "/gallery/gallery-06.jpg", width: 1095, height: 631 },
  { id: "gallery-07", src: "/gallery/gallery-07.jpg", width: 967, height: 794 },
  { id: "gallery-08", src: "/gallery/gallery-08.jpg", width: 383, height: 640 },
  { id: "gallery-09", src: "/gallery/gallery-09.jpg", width: 901, height: 1600 },
  { id: "gallery-10", src: "/gallery/gallery-10.jpg", width: 1600, height: 901 },
  { id: "gallery-11", src: "/gallery/gallery-11.jpg", width: 1099, height: 595 },
  { id: "gallery-12", src: "/gallery/gallery-12.jpg", width: 1200, height: 1600 },
];
