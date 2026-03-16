"use client";

import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig, socialLinks } from "@/lib/constants";
import { FloatingShape } from "./floating-shape";

// Deterministic pseudo-random to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * BarcodeBars — memoized to prevent re-renders from parent state changes (e.g. clock tick).
 * Removed individual animate-pulse on 24 elements; using a single shared CSS animation
 * on the container instead, and static opacity per bar.
 */
const BarcodeBars = memo(function BarcodeBars() {
  const bars = [3,1,2,1,3,2,1,3,2,3,1,3,2,1,2,3,1,2,3,2,1,3,2,1];
  const gaps = [2,1,2,1,1,2,1,2,1,2,1,1,2,1,2,1,2,1,1,2,1,2,1,1];

  return (
    <span className="inline-flex items-center gap-px h-3 overflow-hidden">
      {bars.map((w, i) => (
        <span
          key={i}
          className="inline-block bg-muted animate-pulse"
          style={{
            width: `${w}px`,
            height: "100%",
            marginRight: `${gaps[i]}px`,
            animationDelay: `${i * 120}ms`,
            animationDuration: `${Math.round(1500 + seededRandom(i + 42) * 1000)}ms`,
            opacity: `${(0.4 + seededRandom(i + 99) * 0.4).toFixed(2)}`,
          }}
        />
      ))}
    </span>
  );
});

const BarcodeBlock = memo(function BarcodeBlock() {
  const bars = [3,1,2,3,2,1,3,2,1,3,1,2,3,1,2,3,2,1,3,1,2,3,2,1,3,1,2,3,2,1];

  return (
    <div className="flex items-end gap-px h-4">
      {bars.map((w, i) => (
        <span
          key={i}
          className="inline-block bg-accent-cyan animate-pulse"
          style={{
            width: `${w}px`,
            height: "100%",
            opacity: `${(0.5 + seededRandom(i + 200) * 0.4).toFixed(2)}`,
            animationDelay: `${i * 100}ms`,
            animationDuration: `${Math.round(1200 + seededRandom(i + 150) * 800)}ms`,
          }}
        />
      ))}
    </div>
  );
});

/**
 * GlobeIcon — uses CSS `will-change: transform` for GPU-accelerated spin.
 * The spin animation is purely transform-based (no layout/paint).
 */
const GlobeIcon = memo(function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      style={{
        animation: "spin 12s linear infinite",
        willChange: "transform",
      }}
    >
      <circle cx="16" cy="16" r="12" />
      <ellipse cx="16" cy="16" rx="6" ry="12" />
      <ellipse cx="16" cy="16" rx="10" ry="12" opacity="0.4" />
      <line x1="4" y1="12" x2="28" y2="12" />
      <line x1="4" y1="20" x2="28" y2="20" />
      <line x1="16" y1="4" x2="16" y2="28" />
    </svg>
  );
});


/**
 * Isolated clock component — only this subtree re-renders every second,
 * not the entire Hero.
 */
const LocalClock = memo(function LocalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "America/Argentina/Buenos_Aires",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-accent-cyan">{time || "--:--"}</span>;
});

/**
 * Static SVG backgrounds — memoized so they never re-render.
 */
const CircuitBackground = memo(function CircuitBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="160" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="80" y1="0" x2="80" y2="160" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="160" y1="0" x2="160" y2="160" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="160" y2="0" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="0" y1="80" x2="160" y2="80" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="0" y1="160" x2="160" y2="160" stroke="#fafafa" strokeWidth="0.5" />
            <rect x="20" y="20" width="40" height="40" fill="none" stroke="#fafafa" strokeWidth="0.5" />
            <rect x="100" y="100" width="30" height="30" fill="none" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="60" y1="40" x2="100" y2="40" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="40" y1="60" x2="40" y2="100" stroke="#fafafa" strokeWidth="0.5" />
            <rect x="110" y="30" width="20" height="15" fill="none" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="130" y1="37" x2="150" y2="37" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="100" y1="115" x2="80" y2="115" stroke="#fafafa" strokeWidth="0.5" />
            <line x1="80" y1="115" x2="80" y2="140" stroke="#fafafa" strokeWidth="0.5" />
            <rect x="15" y="110" width="25" height="20" fill="none" stroke="#fafafa" strokeWidth="0.5" />
            <circle cx="115" cy="60" r="6" fill="none" stroke="#fafafa" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
});

const ConcentricRings = memo(function ConcentricRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
      <svg width="800" height="800" viewBox="0 0 800 800" fill="none">
        {[150, 220, 300, 370].map((r) => (
          <circle key={r} cx="400" cy="400" r={r} stroke="#fafafa" strokeWidth="0.5" strokeDasharray="8 12" />
        ))}
      </svg>
    </div>
  );
});

const ConnectorLines = memo(function ConnectorLines() {
  return (
    <>
      <line x1="340" y1="240" x2="600" y2="390" stroke="rgba(221,0,242,0.18)" strokeWidth="1" />
      <rect x="336" y="236" width="8" height="8" fill="rgba(221,0,242,0.4)" stroke="rgba(221,0,242,0.3)" strokeWidth="1" />
      <line x1="600" y1="520" x2="300" y2="660" stroke="rgba(221,0,242,0.18)" strokeWidth="1" />
      <rect x="296" y="656" width="8" height="8" fill="rgba(221,0,242,0.4)" stroke="rgba(221,0,242,0.3)" strokeWidth="1" />
      <line x1="840" y1="490" x2="1060" y2="630" stroke="rgba(221,0,242,0.18)" strokeWidth="1" />
      <rect x="1056" y="626" width="8" height="8" fill="rgba(221,0,242,0.4)" stroke="rgba(221,0,242,0.3)" strokeWidth="1" />
      <line x1="820" y1="380" x2="1100" y2="270" stroke="rgba(221,0,242,0.12)" strokeWidth="1" />
      <line x1="800" y1="540" x2="1100" y2="740" stroke="rgba(221,0,242,0.12)" strokeWidth="1" />
    </>
  );
});

/** Core threads list — static content, memoized */
const CoreThreads = memo(function CoreThreads() {
  return (
    <div className="font-mono text-base text-subtle space-y-3.5 hidden lg:block">
      <p className="text-foreground uppercase tracking-[0.2em] text-sm mb-4">
        [ Core Threads ]
      </p>
      {["Web Architecture", "React & Next.js", "TypeScript", "System Design"].map((item, i) => (
        <div key={item} className="flex items-center gap-4">
          <span className="text-muted text-sm">{String(i + 1).padStart(2, "0")}.</span>
          <BarcodeBars />
          <span className="text-foreground uppercase text-sm tracking-wider">{item}</span>
        </div>
      ))}
    </div>
  );
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scoped scroll tracking to this section for better perf
  const { scrollY } = useScroll();

  // Hero content fade-out — fully transparent at 500px scroll
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Connectors fade-out — slightly slower
  const connectorsOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Bottom section — fade + slight parallax
  const bottomOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const bottomY = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Circuit-board background — memoized, never re-renders */}
      <CircuitBackground />

      {/* Concentric arc rings — memoized */}
      <ConcentricRings />

      {/* Spline 3D scene */}
      <div className="absolute inset-0 z-0">
        <FloatingShape />
      </div>

      {/* Gradient overlay — vignette + bottom fade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(10,10,10,0.3), transparent 20%, transparent 80%, rgba(10,10,10,0.3)),
            linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.85))
          `,
        }}
      />

      {/* Connector lines — fade on scroll, GPU-composited via will-change */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        style={{ opacity: connectorsOpacity, willChange: "opacity" }}
      >
        <ConnectorLines />
      </motion.svg>

      {/* Hero content — fades on scroll, GPU-composited */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: contentOpacity, willChange: "opacity" }}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 md:px-16 pt-6 sm:pt-8 md:pt-12 pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/" className="font-mono text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-foreground hover:text-foreground transition-colors duration-200">
              {siteConfig.name}
            </Link>
            <Link href="/blog" className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground hover:text-accent-cyan transition-colors duration-200">
              Blog
            </Link>
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-subtle flex items-center gap-2 sm:gap-3">
            <span className="text-foreground hidden sm:inline">Buenos Aires</span>
            {/* Isolated clock — only this span re-renders every second */}
            <LocalClock />
          </div>
        </div>

        {/* Globe icon */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 hidden lg:block">
          <GlobeIcon className="w-9 h-9 text-accent-cyan opacity-40" />
        </div>

        {/* Main heading */}
        <div className="absolute top-[12%] sm:top-[15%] left-4 right-4 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:right-auto">
          <h1 className="font-heading text-[2.55rem] font-bold leading-[0.9] tracking-tighter short:text-[3rem] sm:text-[4rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[8rem] 2xl:text-[9.2rem] uppercase">
            Code,
            <br />
            <span className="text-accent-cyan">By Craft.</span>
          </h1>
          <p className="mt-6 font-mono text-[10px] tracking-[0.2em] uppercase text-foreground max-w-[280px] leading-relaxed">
            From solid foundations, software draws its strength
          </p>

          {/* About box — mobile only, right below the heading */}
          <div className="mt-6 lg:hidden border border-border bg-black/20">
            <div className="flex items-center justify-between border-b border-border px-5 py-2.5 bg-surface">
              <span className="font-mono text-sm uppercase tracking-wider text-foreground">About</span>
              <span className="w-3.5 h-3.5 border border-border flex items-center justify-center text-[9px] text-subtle">&times;</span>
            </div>
            <div className="px-5 py-5">
              <p className="font-mono text-sm leading-relaxed text-foreground">
                Tech entrepreneur with an MBA (IAE Business School)
                and a hands-on technical profile. Specialized in
                JavaScript, TypeScript, and UX/UI design, currently
                focused on artificial intelligence: integrating AI
                into my workflows and leading the development of
                AI-powered solutions at Bilog, where I serve as CTO.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-5">
                {socialLinks
                  .filter((l) => l.icon !== "mail")
                  .map((link) => (
                    <a
                      key={`mobile-${link.name}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-foreground px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground hover:text-accent-cyan hover:border-accent-cyan transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating label */}
        <div className="absolute top-[28%] right-8 lg:right-16 max-w-[260px] hidden lg:block">
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-foreground leading-relaxed text-right">
            Scalable,
            <br />
            Structured,
            <br />
            <span className="text-accent-cyan">Philosophical</span>
          </p>
        </div>

        {/* Data card — draggable, animated, larger */}
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.1}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-[20%] left-[100px] lg:left-[160px] hidden lg:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        >
          <div className="border border-border/60 p-5 bg-background/90 max-w-[340px]">
            {/* Scan line animation */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ opacity: 0.06 }}
            >
              <div
                className="absolute left-0 right-0 h-px bg-accent-cyan"
                style={{
                  animation: "scanline 3s linear infinite",
                }}
              />
              <style>{`
                @keyframes scanline {
                  0% { top: 0%; }
                  100% { top: 100%; }
                }
              `}</style>
            </div>

            <div className="flex items-start gap-4">
              {/* Rotated label */}
              <div className="flex flex-col items-center gap-1 -mr-1">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent-cyan uppercase"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  /PERNU
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading text-xl font-bold uppercase text-accent-cyan leading-tight">Pernu</p>
                    <p className="font-heading text-xl font-bold uppercase text-accent-cyan leading-tight">Craft</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <GlobeIcon className="w-8 h-8 text-accent-cyan opacity-60" />
                    <div className="w-9 h-9 border border-border/60 flex items-center justify-center">
                      <span className="text-accent-cyan text-sm">&#x2318;</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 mt-3">
                  <div>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-wider">HS8CYB3R2150</p>
                    <p className="font-mono text-[10px] text-accent-cyan uppercase tracking-wider">Pernu</p>
                    <p className="font-mono text-[10px] text-accent-cyan uppercase tracking-wider">B3R</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-wider">Craft</p>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-wider">150</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <BarcodeBlock />
              <div className="flex items-center justify-between mt-1.5">
                <p className="font-mono text-[10px] text-accent-cyan">&mdash; CRAFT/2150.</p>
                <p className="font-mono text-[8px] text-subtle uppercase tracking-widest animate-pulse">Drag me</p>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* Bottom section — fade + parallax, GPU-composited */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 md:px-16 pb-6 sm:pb-8 md:pb-12 z-10"
        style={{ opacity: bottomOpacity, y: bottomY, willChange: "opacity, transform" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          {/* Core threads — memoized */}
          <CoreThreads />

          {/* About box — on mobile: appears first (above buttons). On desktop: 3rd column via order */}
          <div className="hidden lg:block order-last border border-border max-w-md lg:ml-auto relative lg:-left-20 lg:-top-5">
            <div className="flex items-center justify-between border-b border-border px-5 py-2.5 bg-surface">
              <span className="font-mono text-sm uppercase tracking-wider text-foreground">About</span>
              <span className="w-3.5 h-3.5 border border-border flex items-center justify-center text-[9px] text-subtle">&times;</span>
            </div>
            <div className="px-5 py-5">
              <p className="font-mono text-sm leading-relaxed text-foreground">
                Tech entrepreneur with an MBA (IAE Business School)
                and a hands-on technical profile. Specialized in
                JavaScript, TypeScript, and UX/UI design, currently
                focused on artificial intelligence: integrating AI
                into my workflows and leading the development of
                AI-powered solutions at Bilog, where I serve as CTO.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-5">
                {socialLinks
                  .filter((l) => l.icon !== "mail")
                  .map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-foreground px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground hover:text-accent-cyan hover:border-accent-cyan transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* CTA links */}
          <div className="flex flex-row gap-3 sm:gap-5 justify-center items-center">
            <Link
              href="/blog"
              className="border border-foreground px-4 sm:px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground hover:bg-accent-cyan hover:text-background hover:border-accent-cyan transition-all duration-200"
            >
              Read the Blog
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="border border-foreground px-4 sm:px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground hover:text-accent-cyan hover:border-accent-cyan transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
