"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

/**
 * The signature honeycomb — a faithful reimagining of the original's canvas
 * effect, rebuilt for React/TS and recolored on-brand.
 *
 * How it works (and why it glows, unlike a flat SVG grid):
 *  - A full hex grid is drawn to a <canvas> with additive ("lighter") blending
 *    over a dark warm-brown base, so overlapping light *adds up* into real glow.
 *  - Each frame paints a low-alpha wash over the whole canvas, leaving decaying
 *    comet-like afterimages — the trail.
 *  - "Igniting" a cell (pointer move / click / idle auto-spark) starts a
 *    selection that, after a few frames, RELATES to its neighbors — so a wave
 *    ripples outward hex-to-hex through the comb.
 *
 * Recoloring: the original cycled rainbow hues. We restrict to the brand accent
 * hues — honey (~48°) and sky (~200°) — so ripples read as warm gold and cool
 * blue light against the espresso field.
 *
 * Perf: pure canvas + a single rAF loop; no per-cell React. Accessibility: it's
 * decorative (aria-hidden); the same stats live in the Step 6 stats band, and
 * reduced-motion renders a calm static comb with no animation loop.
 */

const RADIUS = 26;
const RATE = 0.98;

// Brand accent hues to sample ripples from (HSL degrees).
const BRAND_HUES = [46, 44, 200, 198];

type Selection = { count: number; hue: number };
type Source = { indices: number[]; hue: number; count: number };

class Hex {
  x: number;
  y: number;
  hue = 46;
  neighbors: (Hex | null)[] = new Array(6).fill(null);
  selections: Selection[] = [];
  sources: Source[] = [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  select(hue: number) {
    this.hue = hue;
    this.selections.push({ count: 0, hue });
  }

  relate(source: Source) {
    this.sources.push(source);
  }
}

const COUNT_MIN = 5;
const COUNT_MAX = 50;
const LUM_MIN = 6;
const LUM_MAX = 32;

function fillLuminance(count: number) {
  if (count < COUNT_MIN) {
    return (
      LUM_MIN +
      (LUM_MAX - LUM_MIN) *
        Math.pow(Math.sin((Math.PI / 2) * (count / COUNT_MIN)), 3)
    );
  }
  if (count < COUNT_MAX) {
    return (
      LUM_MIN +
      (LUM_MAX - LUM_MIN) *
        Math.pow(
          Math.sin(
            (Math.PI / 2) * (1 + (count - COUNT_MIN) / (COUNT_MAX - COUNT_MIN)),
          ),
          3,
        )
    );
  }
  return 0;
}

function strokeLuminance(count: number) {
  if (count < COUNT_MIN * 2) {
    return (
      LUM_MIN +
      (LUM_MAX - LUM_MIN) * Math.sin((Math.PI / 2) * (count / (COUNT_MIN * 2)))
    );
  }
  if (count < COUNT_MAX * 2) {
    return (
      LUM_MIN +
      (LUM_MAX - LUM_MIN) *
        Math.sin(
          (Math.PI / 2) *
            (1 + (count - COUNT_MIN * 2) / ((COUNT_MAX - COUNT_MIN) * 2)),
        )
    );
  }
  return 0;
}

export function HoneycombCanvas({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let hexes: Hex[] = [];
    let vertices: { x: number; y: number }[] = [];
    let hexWidth = 0;
    let hexHeight = 0;
    let radius = RADIUS * RATE;
    let raf = 0;
    let idleTimer = 0;

    const rand = (min: number, max: number) =>
      (min + (max - min) * Math.random()) | 0;
    const brandHue = () => BRAND_HUES[rand(0, BRAND_HUES.length)];

    const build = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      radius = RADIUS * RATE;
      vertices = [];
      for (let i = 0; i < 6; i++) {
        vertices.push({
          x: radius * Math.sin((Math.PI / 3) * i),
          y: -radius * Math.cos((Math.PI / 3) * i),
        });
      }
      hexWidth = RADIUS * Math.cos(Math.PI / 6) * 2;
      hexHeight = RADIUS * (2 - Math.sin(Math.PI / 6));

      let countX = Math.ceil(width / hexWidth) + 1;
      const countY = Math.ceil(height / hexHeight) + 1;
      const offsetX = -(countX * hexWidth - width) / 2;
      const offsetY = -(countY * hexHeight - height) / 2;
      countX++;

      hexes = [];
      for (let y = 0; y < countY; y++) {
        for (let x = 0; x < countX; x++) {
          hexes.push(
            new Hex(
              offsetX +
                (x + 0.5) * hexWidth -
                (y % 2 === 1 ? 0 : hexWidth / 2),
              offsetY + (y + 0.5) * hexHeight,
            ),
          );
        }
      }
      // Wire up the 6 neighbors of each hex (odd-r offset adjacency).
      for (let y = 0; y < countY; y++) {
        for (let x = 0; x < countX; x++) {
          const hex = hexes[y * countX + x];
          const odd = y % 2 === 1;
          if (x < countX - 1) hex.neighbors[0] = hexes[y * countX + x + 1];
          if ((x < countX - 1 || !odd) && y < countY - 1)
            hex.neighbors[1] = hexes[(y + 1) * countX + x + (odd ? 1 : 0)];
          if ((x > 0 || odd) && y < countY - 1)
            hex.neighbors[2] = hexes[(y + 1) * countX + x + (odd ? 0 : -1)];
          if (x > 0) hex.neighbors[3] = hexes[y * countX + x - 1];
          if ((x > 0 || odd) && y > 0)
            hex.neighbors[4] = hexes[(y - 1) * countX + x + (odd ? 0 : -1)];
          if ((x < countX - 1 || !odd) && y > 0)
            hex.neighbors[5] = hexes[(y - 1) * countX + x + (odd ? 1 : 0)];
        }
      }
    };

    const drawHexPath = () => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const v = vertices[i];
        if (i === 0) ctx.moveTo(v.x, v.y);
        else ctx.lineTo(v.x, v.y);
      }
      ctx.closePath();
    };

    const drawSelections = (targets: { count: number; hue: number }[]) => {
      for (const t of targets) {
        // Additive blending sums overlapping glows, so keep per-layer alpha low
        // and luminance modest — otherwise stacked cells blow out to white.
        const fl = fillLuminance(t.count);
        ctx.fillStyle = `hsla(${t.hue}, 60%, ${fl}%, 0.2)`;
        ctx.fill();
        const sl = strokeLuminance(t.count);
        ctx.strokeStyle = `hsla(${t.hue}, 65%, ${sl}%, 0.26)`;
        ctx.stroke();
      }
    };

    const renderHex = (hex: Hex) => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.translate(hex.x, hex.y);
      drawHexPath();
      // Faint base so the comb is always visible (warm brown baseline).
      ctx.fillStyle = `hsla(20, 30%, ${LUM_MIN}%, 0.16)`;
      ctx.fill();

      drawSelections(hex.selections);
      drawSelections(hex.sources);
      ctx.restore();

      // Propagate: a selection that reaches COUNT_MIN seeds all 6 neighbors.
      for (let i = hex.selections.length - 1; i >= 0; i--) {
        const sel = hex.selections[i];
        if (sel.count === COUNT_MIN) {
          for (let j = 0; j < 6; j++) {
            const nb = hex.neighbors[j];
            if (nb) {
              const indices: number[] = [];
              for (let k = 0; k < 3; k++) indices.push((j - 1 + k + 6) % 6);
              nb.relate({ indices, hue: hex.hue, count: 0 });
            }
          }
        }
        if (++sel.count === COUNT_MAX * 2) hex.selections.splice(i, 1);
      }
      // Sources propagate directionally, so the wave keeps moving outward. Pick
      // ONLY from the 3 forward directions (indices has exactly 3 entries) —
      // indexing past that hits undefined and kills the wave prematurely.
      for (let i = hex.sources.length - 1; i >= 0; i--) {
        const src = hex.sources[i];
        const index = src.indices[rand(0, 3)];
        if (hex.neighbors[index] && src.count === COUNT_MIN) {
          hex.neighbors[index]!.relate({
            indices: src.indices,
            hue: src.hue,
            count: 0,
          });
        }
        if (++src.count === COUNT_MAX) hex.sources.splice(i, 1);
      }
    };

    const paintStatic = () => {
      // Reduced motion: draw the comb once with a soft central bloom, no loop.
      ctx.fillStyle = "#1b1210";
      ctx.fillRect(0, 0, width, height);
      const cxp = width / 2;
      const cyp = height * 0.5;
      for (const hex of hexes) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.translate(hex.x, hex.y);
        drawHexPath();
        const d = Math.hypot(hex.x - cxp, hex.y - cyp);
        const bloom = Math.max(0, 1 - d / (Math.max(width, height) * 0.5));
        const hue = hex.x < width / 2 ? 46 : 200;
        ctx.fillStyle = `hsla(${hue}, 90%, ${LUM_MIN + bloom * 30}%, 0.35)`;
        ctx.fill();
        ctx.strokeStyle = `hsla(20, 40%, ${LUM_MIN + bloom * 20}%, 0.5)`;
        ctx.stroke();
        ctx.restore();
      }
    };

    const igniteAt = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      // Find nearest hex; ignite it.
      let best: Hex | null = null;
      let bestD = Infinity;
      for (const hex of hexes) {
        const d = Math.hypot(hex.x - px, hex.y - py);
        if (d < bestD) {
          bestD = d;
          best = hex;
        }
      }
      // Don't re-ignite an already-lit cell — stacking selections on one hex is
      // what causes the additive blow-out to white.
      if (best && bestD < RADIUS * 1.2 && best.selections.length === 0) {
        best.select(brandHue());
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      // Translucent wash → decaying afterimage trail (espresso tint). A higher
      // alpha fades glows faster, keeping trails short and calm.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "hsla(18, 45%, 5%, 0.42)";
      ctx.fillRect(0, 0, width, height);
      for (const hex of hexes) renderHex(hex);
    };

    let lastMove = 0;
    const onPointerMove = (e: PointerEvent) => {
      const now = e.timeStamp;
      // Throttle ignition so the cursor leaves a gentle trail, not a flood.
      if (now - lastMove < 75) return;
      lastMove = now;
      igniteAt(e.clientX, e.clientY);
    };
    const onClick = (e: MouseEvent) => {
      // A single, quiet ripple on click.
      igniteAt(e.clientX, e.clientY);
    };

    build();

    if (reduceMotion) {
      paintStatic();
      const onResize = () => {
        build();
        paintStatic();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // Seed one gentle ripple so it's quietly alive on load.
    if (hexes.length) {
      hexes[rand(0, hexes.length)].select(46);
    }

    // Occasional idle spark so the hive breathes when untouched — infrequent
    // enough to feel ambient, not busy.
    idleTimer = window.setInterval(() => {
      if (hexes.length) hexes[rand(0, hexes.length)].select(brandHue());
    }, 2600);

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("click", onClick);

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(build);
    };
    window.addEventListener("resize", onResize);

    loop();

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      clearInterval(idleTimer);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{ background: "#1b1210" }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
