/**
 * Pointy-top hexagon geometry for the honeycomb hero.
 *
 * We lay cells out on an offset grid and emit pixel coordinates + an SVG path,
 * all derived from a single `size` (the hex circumradius). Everything renders
 * inside an SVG `viewBox`, so the whole grid scales fluidly and stays crisp at
 * any resolution.
 *
 * Reference: https://www.redblobgames.com/grids/hexagons/ (pointy-top, "odd-r"
 * horizontal layout).
 */

export type HexCoord = {
  /** Stable id, e.g. "r1c2". */
  id: string;
  row: number;
  col: number;
  /** Pixel center within the SVG viewBox. */
  cx: number;
  cy: number;
};

export type HexLayout = {
  cells: HexCoord[];
  width: number;
  height: number;
  /** SVG path for a single hex centered at (0,0); translate per cell. */
  path: string;
  size: number;
};

/** Pointy-top hex: 6 vertices starting at the top, going clockwise. */
function hexPath(size: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    // Pointy-top: first vertex straight up, so offset by -90deg (−π/2).
    const angle = (Math.PI / 180) * (60 * i - 90);
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    pts.push(`${x.toFixed(3)},${y.toFixed(3)}`);
  }
  return `M${pts.join("L")}Z`;
}

/**
 * Build an `odd-r` offset grid. `rowLengths` lets callers sculpt a shape
 * (e.g. a hexagon-of-hexagons) instead of a plain rectangle by specifying how
 * many cells each row has.
 */
export function buildHexLayout({
  size = 48,
  rowLengths,
  gap = 0.14,
}: {
  size?: number;
  rowLengths: number[];
  /** Fractional gap between cells, relative to hex width. */
  gap?: number;
}): HexLayout {
  const hexW = Math.sqrt(3) * size;
  const hexH = 2 * size;
  const gapPx = hexW * gap;

  const stepX = hexW + gapPx; // center-to-center horizontally
  const stepY = (hexH * 3) / 4 + gapPx * 0.87; // pointy-top vertical step

  const cells: HexCoord[] = [];
  const maxLen = Math.max(...rowLengths);
  const gridWidth = maxLen * stepX;

  rowLengths.forEach((len, row) => {
    // Center each row within the widest row.
    const rowWidth = len * stepX;
    const offset = (gridWidth - rowWidth) / 2;
    for (let col = 0; col < len; col++) {
      cells.push({
        id: `r${row}c${col}`,
        row,
        col,
        cx: offset + col * stepX + stepX / 2,
        cy: row * stepY + hexH / 2,
      });
    }
  });

  const width = gridWidth;
  const height = (rowLengths.length - 1) * stepY + hexH;

  return { cells, width, height, path: hexPath(size), size };
}

/**
 * A pleasing hexagonal cluster (rows grow then shrink). `radius` = rings around
 * the center row. radius 2 → rows of [3,4,5,4,3] = 19 cells.
 */
export function hexagonRowLengths(radius: number): number[] {
  const mid = radius + 1;
  const lengths: number[] = [];
  for (let i = 0; i <= radius * 2; i++) {
    lengths.push(mid + Math.min(i, radius * 2 - i));
  }
  return lengths;
}

/**
 * Build a dense, edge-to-edge honeycomb field that fully tiles a `width` ×
 * `height` box (measured from the container). Used for the immersive hero
 * background: the viewBox equals the pixel box, so cell centers ARE pixel
 * coordinates — no scaling math needed to place overlays or hit-test the
 * pointer.
 *
 * `odd-r` offset layout, pointy-top. We overscan by a row/column on every edge
 * so no gaps show at the boundaries.
 */
export function buildHexField({
  width,
  height,
  size = 26,
  gap = 0.1,
}: {
  width: number;
  height: number;
  size?: number;
  gap?: number;
}): HexLayout {
  const hexW = Math.sqrt(3) * size;
  const hexH = 2 * size;
  const vStep = hexH * 0.75;

  const cols = Math.ceil(width / hexW) + 2;
  const rows = Math.ceil(height / vStep) + 2;

  const cells: HexCoord[] = [];
  for (let row = 0; row < rows; row++) {
    const rowOffset = row % 2 === 1 ? hexW / 2 : 0;
    for (let col = 0; col < cols; col++) {
      cells.push({
        id: `r${row}c${col}`,
        row,
        col,
        // Shift back by one cell so the overscan hides the top/left seams.
        cx: col * hexW + rowOffset - hexW / 2,
        cy: row * vStep - vStep,
      });
    }
  }

  return {
    cells,
    width,
    height,
    // Slightly inset path so a thin gutter separates neighbours.
    path: hexPath(size * (1 - gap)),
    size,
  };
}
