"""Extract a refined German Shepherd silhouette from the old Carolo Canis logo.

The source ``idnthumb.jpeg`` (208 px tall) shows a leaping shepherd on
white paper with the wordmark "Carolo Canis" d.o.o. beneath it. To turn
that raster into a modern, high-resolution brass silhouette this script:

  1. Auto-crops the wordmark strip below the dog.
  2. Isolates the shepherd ink and closes the fur strokes into one blob.
  3. Computes a signed distance field of the binary silhouette so the
     boundary can be resampled with float precision instead of being
     forced through a stair-stepped LANCZOS upscale.
  4. Upsamples the SDF, then maps the smooth field to a soft alpha
     channel — this is what turns the small, jagged source into a
     large, silky-edged silhouette.
  5. Applies a light Gaussian blur to polish any residual noise and
     paints the mask in the site's brass tone.

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

# Output roughly ~2500px wide — plenty of headroom for retina displays.
UPSCALE = 12

# Smooths the shape itself at native resolution: bigger values round
# corners more aggressively. 2.0 gives a modern, refined outline while
# keeping ears/legs recognisable.
SHAPE_SMOOTHING_SIGMA = 1.4

# How wide the anti-aliased transition band is, in upscaled pixels.
EDGE_SOFTNESS = 2.8


def largest_component(mask: np.ndarray) -> np.ndarray:
    labels, n = ndimage.label(mask)
    if n == 0:
        return mask
    sizes = ndimage.sum(mask, labels, index=range(1, n + 1))
    keep = int(np.argmax(sizes)) + 1
    return labels == keep


def crop_wordmark(img: Image.Image) -> Image.Image:
    """Drop the "Carolo Canis d.o.o." wordmark below the dog."""
    arr = np.asarray(img.convert("L"))
    row_min = arr.min(axis=1)
    height = arr.shape[0]

    content_rows = np.where(row_min < 130)[0]
    if len(content_rows) == 0:
        return img
    first_content = content_rows[0]

    for r in range(first_content + 20, height - 1):
        if row_min[r] > 220 and row_min[r + 1] > 220:
            if (row_min[r + 2 :] < 130).any():
                return img.crop((0, 0, img.width, r))
            break
    return img


def build_silhouette(arr: np.ndarray) -> np.ndarray:
    """Return the boolean shepherd silhouette at the source's native res."""
    gray = 0.299 * arr[..., 0] + 0.587 * arr[..., 1] + 0.114 * arr[..., 2]
    is_ink = gray < 160

    grown = ndimage.binary_dilation(is_ink, iterations=1)
    shepherd_ink = largest_component(grown)

    closed = ndimage.binary_dilation(shepherd_ink, iterations=3)

    # Fill only *small* interior gaps so the arch under the leaping
    # dog's belly stays as air rather than becoming a solid slab.
    filled = ndimage.binary_fill_holes(closed)
    holes = filled & ~closed
    hole_labels, n_holes = ndimage.label(holes)
    if n_holes:
        hole_sizes = ndimage.sum(holes, hole_labels, index=range(1, n_holes + 1))
        small_hole_ids = [i + 1 for i, s in enumerate(hole_sizes) if s < 220]
        closed = closed | np.isin(hole_labels, small_hole_ids)

    closed = ndimage.binary_erosion(closed, iterations=2)
    return largest_component(closed)


def signed_distance(mask: np.ndarray) -> np.ndarray:
    """Return a signed distance field: >0 inside, <0 outside, 0 on boundary."""
    inside = ndimage.distance_transform_edt(mask)
    outside = ndimage.distance_transform_edt(~mask)
    return inside - outside


def extract() -> None:
    img = crop_wordmark(Image.open(SRC).convert("RGB"))
    arr = np.asarray(img, dtype=np.int16)

    silhouette = build_silhouette(arr)

    # Compute a signed distance field and smooth it *at native
    # resolution*. Smoothing an SDF is equivalent to rounding the
    # silhouette itself — pixel-scale jaggies inherited from the small
    # source vanish while ears, legs and tail keep their character.
    sdf_native = signed_distance(silhouette).astype(np.float32)
    sdf_native = ndimage.gaussian_filter(sdf_native, sigma=SHAPE_SMOOTHING_SIGMA)

    # Scale distance values so they stay in "upscaled pixel" units after
    # the resize below, then float-interpolate to full output size.
    sdf_scaled = sdf_native * UPSCALE
    sdf_img = Image.fromarray(sdf_scaled, mode="F")
    up_size = (sdf_img.width * UPSCALE, sdf_img.height * UPSCALE)
    sdf_up = np.asarray(
        sdf_img.resize(up_size, Image.Resampling.LANCZOS),
        dtype=np.float32,
    )

    # Ramp the SDF into a smooth alpha over ±EDGE_SOFTNESS pixels.
    alpha_float = np.clip(
        (sdf_up + EDGE_SOFTNESS) * (255.0 / (2.0 * EDGE_SOFTNESS)),
        0.0,
        255.0,
    )
    alpha_img = Image.fromarray(alpha_float.astype(np.uint8), mode="L")
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.8))

    w_up, h_up = alpha_img.size
    rgba = np.zeros((h_up, w_up, 4), dtype=np.uint8)
    rgba[..., 0] = BRASS[0]
    rgba[..., 1] = BRASS[1]
    rgba[..., 2] = BRASS[2]
    rgba[..., 3] = np.asarray(alpha_img, dtype=np.uint8)

    out = Image.fromarray(rgba, "RGBA")

    bbox = out.getbbox()
    if bbox is not None:
        pad = 60
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
