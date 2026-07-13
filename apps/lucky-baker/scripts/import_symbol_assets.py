#!/usr/bin/env python3
"""Build symbolsStatic.webp atlas from Lucky Baker symbol PNGs."""

from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path

from PIL import Image

SCRIPT_DIR = Path(__file__).resolve().parent
WEB_ROOT = SCRIPT_DIR.parent
OUT_DIR = WEB_ROOT / "static/assets/sprites/symbolsStatic"
CACHE_DIR = OUT_DIR / "_import_cache"
JSON_PATH = OUT_DIR / "symbolsStatic.json"
OUT_WEBP = OUT_DIR / "symbolsStatic.webp"

CELL = 200
COLS = 4
ROWS = 3
ATLAS_W = COLS * CELL
ATLAS_H = ROWS * CELL

DEFAULT_SOURCE = WEB_ROOT / "static/assets/sprites/symbolsStatic/source"

# source filename prefix -> symbol id
SOURCE_FILES: dict[str, str] = {
    "low_1": "L1",
    "low_2": "L2",
    "low_3": "L3",
    "low_4": "L4",
    "high_1": "H1",
    "high_2": "H2",
    "high_3": "H3",
    "high_4": "H4",
    "wild": "W",
    "fs": "S",
}

SYMBOLS: list[tuple[str, str]] = [
    ("l1.webp", "L1"),
    ("l2.webp", "L2"),
    ("l3.webp", "L3"),
    ("l4.webp", "L4"),
    ("h1.webp", "H1"),
    ("h2.webp", "H2"),
    ("h3.webp", "H3"),
    ("h4.webp", "H4"),
    ("w.webp", "W"),
    ("s.webp", "S"),
]


def find_source(source: Path, prefix: str) -> Path:
    exact = source / f"{prefix}.png"
    if exact.exists():
        return exact
    matches = sorted(source.glob(f"{prefix}-*.png"))
    if not matches:
        raise FileNotFoundError(f"No PNG matching {prefix}.png or {prefix}-*.png in {source}")
    return matches[0]


def frame_entry(x: int, y: int, w: int, h: int) -> dict:
    return {
        "frame": {"x": x, "y": y, "w": w, "h": h},
        "rotated": False,
        "trimmed": False,
        "spriteSourceSize": {"x": 0, "y": 0, "w": w, "h": h},
        "sourceSize": {"w": w, "h": h},
        "pivot": {"x": 0.5, "y": 0.5},
    }


def build_atlas_json() -> dict:
    frames: dict[str, dict] = {}
    for i, (name, _) in enumerate(SYMBOLS):
        col, row = i % COLS, i // COLS
        frames[name] = frame_entry(col * CELL, row * CELL, CELL, CELL)
    return {
        "frames": frames,
        "meta": {
            "app": "lucky-baker-import_symbol_assets.py",
            "version": "1.0",
            "image": "symbolsStatic.webp",
            "format": "RGBA8888",
            "size": {"w": ATLAS_W, "h": ATLAS_H},
            "scale": "1",
        },
    }


def prepare_cell(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    if rgba.size != (CELL, CELL):
        rgba = rgba.resize((CELL, CELL), Image.Resampling.LANCZOS)
    return rgba


def main() -> int:
    parser = argparse.ArgumentParser(description="Import Lucky Baker symbol PNGs into symbolsStatic atlas")
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    args = parser.parse_args()

    source: Path = args.source
    if not source.is_dir():
        print(f"Source directory not found: {source}")
        return 1

    by_id: dict[str, Path] = {}
    for prefix, sid in SOURCE_FILES.items():
        by_id[sid] = find_source(source, prefix)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    atlas = Image.new("RGBA", (ATLAS_W, ATLAS_H), (0, 0, 0, 0))

    for i, (fname, sid) in enumerate(SYMBOLS):
        src = by_id[sid]
        cache_path = CACHE_DIR / f"{sid}.png"
        shutil.copy2(src, cache_path)

        tile = prepare_cell(Image.open(src))
        col, row = i % COLS, i // COLS
        atlas.paste(tile, (col * CELL, row * CELL), tile)
        print(f"  {sid} <- {src.name}")

    JSON_PATH.write_text(json.dumps(build_atlas_json(), indent="\t") + "\n")
    atlas.save(OUT_WEBP, "WEBP", quality=92, method=6)
    print(f"Wrote {JSON_PATH}")
    print(f"Wrote {OUT_WEBP}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
