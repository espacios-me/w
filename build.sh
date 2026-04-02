#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="dist"
mkdir -p "$OUT_DIR"

cp espacios-main.html "$OUT_DIR/espacios-main.html"
cp espacios-privacy.html "$OUT_DIR/espacios-privacy.html"
cp espacios-terms.html "$OUT_DIR/espacios-terms.html"
cp espacios-main.html "$OUT_DIR/index.html"

echo "Built site into $OUT_DIR/"
