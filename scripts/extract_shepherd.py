"""Extract the German Shepherd silhouette from the old Carolo Canis logo.

The ``idnthumb.jpeg`` mark shows a leaping shepherd on white paper with
the words "Carolo Canis" d.o.o. beneath it. This script:

  1. auto-crops the text away by finding the topmost solid horizontal
     paper band between the dog and the wordmark,
  2. treats every dark pixel remaining as shepherd ink,
  3. gently closes the fur-stroke pattern into a solid silhouette and
     fills any small interior holes,
  4. keeps the single largest connected blob (dropping any leftover
     specks from JPEG noise),
  5. upsamples the mask smoothly and paints it in the site's brass tone.

Run once whenever the source mark changes:
    python3 scripts/extract_shepherd.py
"""

from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "idnthumb.jpeg"
DST = ROOT / "public" / "shepherd-leap.png"

BRASS = (208, 166, 99)
UPSCALE = 6


def largest_component(mask: np.ndarray) -> np.ndarray:
    labels, n = ndimage.label(mask)
    if n == 0:
        return mask
    sizes = ndimage.sum(mask, labels, index=range(1, n + 1))
    keep = int(np.argmax(sizes)) + 1
    return labels == keep


def crop_wordmark(img: Image.Image) -> Image.Image:
    """Drop the "Carolo Canis d.o.o." wordmark that sits below the dog.

    Walk down the image row by row: the first fully paper-white row
    after the dog's silhouette marks the gap between the shepherd and
    the text. Cropping just above the text keeps the dog intact.
    """
    arr = np.asarray(img.convert("L"))
    row_min = arr.min(axis=1)  # darkest pixel in each row
    height = arr.shape[0]

    # Find the first "content" row (some dark pixel) — the top of the dog.
    content_rows = np.where(row_min < 130)[0]
    if len(content_rows) == 0:
        return img
    first_content = content_rows[0]

    # Walk downward from the first content row; once we hit a fully
    # bright row, and it's followed by more content further down (the
    # wordmark), cut at that gap.
    for r in range(first_content + 20, height - 1):
        if row_min[r] > 220 and row_min[r + 1] > 220:
            # There's a bright band here. If content resumes below, this
            # gap is between dog and text — crop at r.
            if (row_min[r + 2 :] < 130).any():
                return img.crop((0, 0, img.width, r))
            break
    return img


def extract() -> None:
    img_native = Image.open(SRC).convert("RGB")
    img_native = crop_wordmark(img_native)

    arr = np.asarray(img_native, dtype=np.int16)
    gray = 0.299 * arr[..., 0] + 0.587 * arr[..., 1] + 0.114 * arr[..., 2]

    is_ink = gray < 160

    grown = ndimage.binary_dilation(is_ink, iterations=1)
    shepherd_ink = largest_component(grown)

    closed = ndimage.binary_dilation(shepherd_ink, iterations=3)

    # Fill only *small* interior gaps between fur strokes, so the true
    # anatomical negative spaces (like the arch under the leaping dog's
    # belly) survive and read as air rather than as a solid slab.
    filled = ndimage.binary_fill_holes(closed)
    holes = filled & ~closed
    hole_labels, n_holes = ndimage.label(holes)
    if n_holes:
        hole_sizes = ndimage.sum(holes, hole_labels, index=range(1, n_holes + 1))
        small_hole_ids = [i + 1 for i, s in enumerate(hole_sizes) if s < 220]
        small_holes = np.isin(hole_labels, small_hole_ids)
        closed = closed | small_holes

    closed = ndimage.binary_erosion(closed, iterations=2)
    silhouette_native = largest_component(closed)

    alpha_native = Image.fromarray(
        silhouette_native.astype(np.uint8) * 255, mode="L"
    )
    up_size = (alpha_native.width * UPSCALE, alpha_native.height * UPSCALE)
    alpha_up = alpha_native.resize(up_size, Image.Resampling.LANCZOS).filter(
        ImageFilter.GaussianBlur(radius=1.8)
    )

    w_up, h_up = alpha_up.size
    rgba = np.zeros((h_up, w_up, 4), dtype=np.uint8)
    rgba[..., 0] = BRASS[0]
    rgba[..., 1] = BRASS[1]
    rgba[..., 2] = BRASS[2]
    rgba[..., 3] = np.asarray(alpha_up, dtype=np.uint8)

    out = Image.fromarray(rgba, "RGBA")

    bbox = out.getbbox()
    if bbox is not None:
        pad = 40
        out = out.crop(
            (
                max(bbox[0] - pad, 0),
                max(bbox[1] - pad, 0),
                min(bbox[2] + pad, out.width),
                min(bbox[3] + pad, out.height),
            )
        )

    out.save(DST, "PNG", optimize=True)
    print(f"Saved {DST} ({out.size[0]}x{out.size[1]})")


if __name__ == "__main__":
    extract()
