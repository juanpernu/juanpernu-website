"use client";

import { memo, useCallback, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

/**
 * Pixel-art loading indicator shown while the Spline scene downloads.
 * Uses pure CSS animations — no JS timers, no layout shifts.
 */
const PixelLoader = memo(function PixelLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-[1]">
      <div className="flex flex-col items-center gap-6">
        {/* Pixel-art spinning cube */}
        <div
          className="relative"
          style={{
            width: 32,
            height: 32,
            animation: "pixelSpin 2s steps(8) infinite",
          }}
        >
          {/* 4x4 pixel grid forming a stylized shape */}
          {[
            [1, 0], [2, 0],
            [0, 1], [1, 1], [2, 1], [3, 1],
            [0, 2], [1, 2], [2, 2], [3, 2],
            [1, 3], [2, 3],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="absolute"
              style={{
                left: x * 8,
                top: y * 8,
                width: 8,
                height: 8,
                backgroundColor: "#DD00F2",
                opacity: 0.6 + (i % 3) * 0.15,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "#DD00F2" }}
        >
          <span className="inline-block" style={{ animation: "pixelBlink 1.2s steps(1) infinite" }}>
            Loading
          </span>
        </p>

        {/* Pixel progress bar */}
        <div className="flex gap-[2px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="block"
              style={{
                width: 6,
                height: 6,
                backgroundColor: "#DD00F2",
                animation: "pixelBlink 1.6s steps(1) infinite",
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pixelSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pixelBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
});

export const FloatingShape = memo(function FloatingShape() {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback((splineApp: Application) => {
    // Hide the Spline watermark logo
    const canvas = splineApp.canvas as HTMLCanvasElement;
    if (canvas) {
      let el = canvas.parentElement;
      while (el && el.tagName !== "SECTION") {
        const logo = el.querySelector('a[href*="spline"]');
        if (logo) (logo as HTMLElement).style.display = "none";
        el = el.parentElement;
      }
    }

    // Trigger fade-in on next frame so the transition is visible
    requestAnimationFrame(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Pixel-art loader — visible until Spline is ready */}
      {!loaded && <PixelLoader />}

      {/* Spline canvas wrapper — pre-sized via CSS, fades in when loaded */}
      <div
        data-spline-wrapper
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        <Spline
          scene="https://prod.spline.design/eNJvNsa1OczrFU8g/scene.splinecode"
          onLoad={onLoad}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
});
