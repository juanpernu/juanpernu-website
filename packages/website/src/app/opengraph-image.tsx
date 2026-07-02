import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#22d3ee",
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            juanpernumian.com.ar
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#fafafa",
            }}
          >
            Juan
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#22d3ee",
            }}
          >
            Pernumian
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 26,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#a1a1aa",
            }}
          >
            Software Engineer — Buenos Aires
          </div>
          <div
            style={{
              fontSize: 26,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#f97316",
            }}
          >
            Blog / IA / Tech
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
