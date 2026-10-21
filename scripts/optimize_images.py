"""Optimize generated PNG images -> web-friendly WebP, and shrink logo."""
from pathlib import Path
from PIL import Image

IMG = Path(__file__).resolve().parent.parent / "public" / "images"

SIZES = {
    "hero": 1920,
    "factory-floor": 1600,
    "factory-warehouse": 1200,
    "factory-showroom": 1200,
    "factory-sewing": 1200,
    "factory-cutting": 1200,
    "factory-qc": 1200,
}

for png in sorted(IMG.glob("*.png")):
    stem = png.stem
    target_w = SIZES.get(stem, 900)  # product shots: 900px wide is plenty
    out = IMG / f"{stem}.webp"
    im = Image.open(png).convert("RGB")
    if im.width > target_w:
        im = im.resize((target_w, int(im.height * target_w / im.width)), Image.LANCZOS)
    im.save(out, "WEBP", quality=82, method=6)
    print(f"{png.name} {png.stat().st_size//1024}KB -> {out.name} {out.stat().st_size//1024}KB ({im.width}x{im.height})")

# logo: 512px png
logo_src = Path(__file__).resolve().parent.parent / "public" / "logo.png"
im = Image.open(logo_src).convert("RGBA")
im = im.resize((512, int(im.height * 512 / im.width)), Image.LANCZOS)
im.save(logo_src, "PNG", optimize=True)
print(f"logo resized -> {logo_src.stat().st_size//1024}KB")
