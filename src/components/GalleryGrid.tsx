"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import type { GalleryImage } from "@/data/gallery";

type GalleryGridProps = {
  images: GalleryImage[];
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const t = useTranslations("gallery");
  const titleId = useId();
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const showPrev = useCallback(() => {
    setActive((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);
  const showNext = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, showPrev, showNext]);

  const current: GalleryImage | null =
    active === null ? null : images[active];

  return (
    <>
      <ul className="gallery-grid">
        {images.map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              className="gallery-thumb"
              onClick={() => setActive(index)}
              aria-label={`${t("openImage")} ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.thumb}
                alt=""
                width={480}
                height={360}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={close}
        >
          <p id={titleId} className="sr-only">
            {t("lightboxLabel")}
          </p>

          <button
            type="button"
            className="lightbox-close"
            onClick={close}
            aria-label={t("close")}
          >
            ×
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label={t("prev")}
          >
            ‹
          </button>

          <div
            className="lightbox-figure"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt=""
              width={current.width}
              height={current.height}
              className="lightbox-img"
              decoding="async"
            />
            <p className="lightbox-count">
              {active! + 1} / {images.length}
            </p>
          </div>

          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label={t("next")}
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
