"use client";

/* Decorative rAF cursor overlay - plain <img> avoids next/image layout thrash. */
/* eslint-disable @next/next/no-img-element */

import * as React from "react";

const BEE_SRC = "/brand/bee-cursor.png";
/** Clean bee (sparkles stripped) - native 73×54. */
const CURSOR_W = 37;
const CURSOR_H = 27;
/** Offset so the bee sits centered under the pointer tip. */
const HOTSPOT_X = CURSOR_W / 2;
const HOTSPOT_Y = CURSOR_H / 2;

/** Logo honey - matches the yellow pixels in bee-mark. */
const PIXEL_COLOR = "#f2d26d";
const PIXEL_COUNT = 14;
/** Snap trail to a grid so it reads as pixel art, not smoke. */
const GRID = 3;

type Point = { x: number; y: number };

type Pixel = {
  x: number;
  y: number;
  life: number;
  size: number;
};

/**
 * Brand cursor: pixel bee + logo-style yellow pixel trail.
 * Fine pointer + hover only; skipped for touch and prefers-reduced-motion.
 */
export function BeeCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const beeRef = React.useRef<HTMLImageElement>(null);
  const pixelRefs = React.useRef<(HTMLSpanElement | null)[]>([]);

  const mouse = React.useRef<Point>({ x: -100, y: -100 });
  const bee = React.useRef<Point>({ x: -100, y: -100 });
  const prevBee = React.useRef<Point>({ x: -100, y: -100 });
  const pixels = React.useRef<Pixel[]>(
    Array.from({ length: PIXEL_COUNT }, () => ({
      x: -100,
      y: -100,
      life: 0,
      size: GRID,
    })),
  );
  const visible = React.useRef(false);
  const spawnAcc = React.useRef(0);
  const raf = React.useRef(0);

  React.useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(mqFine.matches && !mqMotion.matches);
    };
    sync();
    mqFine.addEventListener("change", sync);
    mqMotion.addEventListener("change", sync);
    return () => {
      mqFine.removeEventListener("change", sync);
      mqMotion.removeEventListener("change", sync);
    };
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("bee-cursor-active");

    const snap = (n: number) => Math.round(n / GRID) * GRID;
    /** Keep trail clear of the bee body. */
    const CLEARANCE = Math.max(CURSOR_W, CURSOR_H) * 0.55;

    const spawnPixel = (bx: number, by: number, dx: number, dy: number) => {
      const speed = Math.hypot(dx, dy);
      if (speed < 0.4) return;

      const slot = pixels.current.find((p) => p.life <= 0);
      if (!slot) return;

      // Strictly behind travel; only lateral jitter (never onto the bee).
      const behindX = -dx / speed;
      const behindY = -dy / speed;
      const sideX = -behindY;
      const sideY = behindX;
      const back = CLEARANCE + 4 + Math.random() * 16;
      const side = (Math.random() - 0.5) * 10;

      slot.x = snap(bx + behindX * back + sideX * side);
      slot.y = snap(by + behindY * back + sideY * side);
      slot.life = 1;
      slot.size = Math.random() > 0.78 ? GRID * 2 : GRID;
    };

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        bee.current.x = e.clientX;
        bee.current.y = e.clientY;
        prevBee.current.x = e.clientX;
        prevBee.current.y = e.clientY;
        rootRef.current?.style.setProperty("opacity", "1");
      }
    };

    const onLeave = () => {
      visible.current = false;
      rootRef.current?.style.setProperty("opacity", "0");
    };

    const tick = () => {
      const m = mouse.current;
      const b = bee.current;
      const prev = prevBee.current;

      prev.x = b.x;
      prev.y = b.y;

      b.x += (m.x - b.x) * 0.45;
      b.y += (m.y - b.y) * 0.45;

      if (beeRef.current) {
        beeRef.current.style.transform = `translate3d(${b.x - HOTSPOT_X}px, ${b.y - HOTSPOT_Y}px, 0)`;
      }

      const dx = b.x - prev.x;
      const dy = b.y - prev.y;
      const speed = Math.hypot(dx, dy);

      if (speed >= 0.4) {
        spawnAcc.current += speed;
        while (spawnAcc.current > 12) {
          spawnAcc.current -= 12;
          spawnPixel(b.x, b.y, dx, dy);
        }
      } else {
        spawnAcc.current = 0;
      }

      for (let i = 0; i < PIXEL_COUNT; i++) {
        const p = pixels.current[i];
        const el = pixelRefs.current[i];
        if (!el) continue;
        if (p.life <= 0) {
          el.style.opacity = "0";
          continue;
        }

        // Kill anything that drifts into the bee's footprint.
        const dist = Math.hypot(p.x - b.x, p.y - b.y);
        if (dist < CLEARANCE) {
          p.life = 0;
          el.style.opacity = "0";
          continue;
        }

        // Fade faster when idle so nothing hangs around the bee.
        p.life -= speed < 0.4 ? 0.08 : 0.04;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        el.style.width = `${p.size}px`;
        el.style.height = `${p.size}px`;
        el.style.opacity = String(Math.max(0, p.life) * 0.9);
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("bee-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-150"
    >
      {Array.from({ length: PIXEL_COUNT }, (_, i) => (
        <span
          key={`px-${i}`}
          ref={(el) => {
            pixelRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 will-change-transform"
          style={{
            backgroundColor: PIXEL_COLOR,
            imageRendering: "pixelated",
            opacity: 0,
          }}
        />
      ))}
      <img
        ref={beeRef}
        src={BEE_SRC}
        alt=""
        width={CURSOR_W}
        height={CURSOR_H}
        draggable={false}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          imageRendering: "pixelated",
          width: CURSOR_W,
          height: CURSOR_H,
          filter: "drop-shadow(0 1px 1px rgba(27, 18, 16, 0.25))",
        }}
      />
    </div>
  );
}
