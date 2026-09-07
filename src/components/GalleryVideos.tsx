import type { GalleryVideo } from "@/data/gallery";

type GalleryVideosProps = {
  videos: GalleryVideo[];
  title: string;
};

export function GalleryVideos({ videos, title }: GalleryVideosProps) {
  if (videos.length === 0) return null;

  return (
    <ul className="gallery-video-list">
      {videos.map((video) => (
        <li key={video.id} className="gallery-video-item">
          <div className="gallery-video-frame">
            <iframe
              src={video.embedUrl}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
