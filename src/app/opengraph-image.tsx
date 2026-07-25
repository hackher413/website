import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";
import { event } from "@/content/event";

/**
 * Default social share image for the whole site, generated at build time with
 * next/og. Brand espresso background with a honeycomb-inspired accent and the
 * wordmark — no static asset to keep in sync. Individual routes could add their
 * own opengraph-image later; this is the sitewide fallback.
 */
export const alt = `${siteConfig.name} — Where women and gender minorities build in tech`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const brown = "#1b1210";
  const cream = "#fbf6ee";
  const honey = "#fff1b5";
  const sky = "#c1dbe8";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brown,
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative hex row across the top */}
        <div style={{ display: "flex", gap: "16px" }}>
          {[honey, sky, honey, sky, honey, sky, honey, sky].map((c, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 46,
                background: c,
                opacity: 0.25 + (i % 3) * 0.2,
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: honey,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            {event.dates} · UMass Amherst
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: cream,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Where women and gender minorities build in tech.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
            color: cream,
          }}
        >
          Hack
          <span
            style={{
              display: "flex",
              background: honey,
              color: brown,
              borderRadius: 10,
              padding: "0 10px",
              margin: "0 4px",
            }}
          >
            (H)
          </span>
          er413
        </div>
      </div>
    ),
    { ...size },
  );
}
