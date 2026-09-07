import { useTranslations } from "next-intl";
import type { GalleryVideo } from "@/data/gallery";

type GalleryVideosProps = {
  videos: GalleryVideo[];
  title: string;
};

const FRAMEABLE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
  "youtu.be",
  "player.vimeo.com",
  "vimeo.com",
  "www.vimeo.com",
  "facebook.com",
  "www.facebook.com",
]);

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function isDirectFile(url: string) {
  return (
    url.startsWith("/") ||
    /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)
  );
}

function youtubeEmbed(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "").replace(/^m\./, "");
    if (
      host !== "youtube.com" &&
      host !== "youtu.be" &&
      host !== "youtube-nocookie.com"
    ) {
      return null;
    }

    const parts = parsed.pathname.split("/").filter(Boolean);
    const isShort = parts[0] === "shorts";
    let id = "";

    if (host === "youtu.be") {
      id = parts[0] ?? "";
    } else if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") {
      id = parts[1] ?? "";
    } else {
      id = parsed.searchParams.get("v") ?? "";
    }

    if (!id) return null;

    return {
      url: `https://www.youtube-nocookie.com/embed/${id}`,
      portrait: isShort,
    };
  } catch {
    return null;
  }
}

function playback(video: GalleryVideo) {
  if (video.src) {
    return { kind: "file" as const, url: video.src, portrait: false };
  }

  const fromYoutube = [video.embedUrl, video.watchUrl]
    .filter(Boolean)
    .map((url) => youtubeEmbed(url!))
    .find(Boolean);

  if (fromYoutube) {
    return { kind: "iframe" as const, ...fromYoutube };
  }

  if (video.embedUrl && FRAMEABLE_HOSTS.has(hostname(video.embedUrl))) {
    return { kind: "iframe" as const, url: video.embedUrl, portrait: false };
  }

  const external = video.watchUrl ?? video.embedUrl;
  if (external && isDirectFile(external)) {
    return { kind: "file" as const, url: external, portrait: false };
  }
  if (external) {
    return { kind: "watch" as const, url: external, portrait: false };
  }
  return null;
}

export function GalleryVideos({ videos, title }: GalleryVideosProps) {
  const t = useTranslations("gallery");
  if (videos.length === 0) return null;

  return (
    <ul className="gallery-video-list">
      {videos.map((video) => {
        const mode = playback(video);
        if (!mode) return null;

        return (
          <li
            key={video.id}
            className={`gallery-video-item${mode.portrait ? " is-portrait" : ""}`}
          >
            <div className="gallery-video-frame">
              {mode.kind === "iframe" ? (
                <iframe
                  src={mode.url}
                  title={title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : mode.kind === "file" ? (
                <video
                  src={mode.url}
                  poster={video.poster}
                  controls
                  playsInline
                  preload="metadata"
                  title={title}
                />
              ) : (
                <a
                  href={mode.url}
                  className="gallery-video-watch"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} — ${t("videoWatchNewWindow")}`}
                >
                  <span className="gallery-video-play" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.2 5.4v13.2L19.5 12 8.2 5.4z" />
                    </svg>
                  </span>
                  <span className="gallery-video-watch-copy">
                    <span className="gallery-video-watch-cta">
                      {t("videoWatchCta")}
                    </span>
                    <span className="gallery-video-watch-hint">
                      {t("videoWatchNewWindow")}
                    </span>
                  </span>
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
