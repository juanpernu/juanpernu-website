import { ProjectsClient } from "./projects-client";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section className="relative w-full py-16 md:py-32 overflow-hidden">
      {/* Circuit-board background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-projects" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="80" y1="0" x2="80" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="160" y1="0" x2="160" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="160" y2="0" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="160" y2="80" stroke="#fafafa" strokeWidth="0.5" />
              <rect x="20" y="20" width="40" height="40" fill="none" stroke="#fafafa" strokeWidth="0.5" />
              <rect x="100" y="100" width="30" height="30" fill="none" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="60" y1="40" x2="100" y2="40" stroke="#fafafa" strokeWidth="0.5" />
              <circle cx="115" cy="60" r="6" fill="none" stroke="#fafafa" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-projects)" />
        </svg>
      </div>

      {/* Japanese shine text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-full text-center overflow-hidden">
        <span className="block overflow-hidden">
          <span
            className="block font-bold italic uppercase"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(132px, 22vw, 315px)",
              lineHeight: 0.9,
              color: "transparent",
              backgroundImage: "radial-gradient(circle 8rem, #DD00F2, #1a1a1a)",
              backgroundSize: "400%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "100% center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              animation: "txt_shine 16s ease-out 0s infinite",
              opacity: 0.35,
            }}
          >
            職人の技、
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            className="block font-bold italic uppercase"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(132px, 22vw, 315px)",
              lineHeight: 0.9,
              color: "transparent",
              backgroundImage: "radial-gradient(circle 8rem, #DD00F2, #1a1a1a)",
              backgroundSize: "400%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "100% center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              animation: "txt_shine 16s ease-out 2s infinite",
              opacity: 0.35,
            }}
          >
            コードで。
          </span>
        </span>
      </div>

      {/* Content wrapper */}
      <div className="w-full px-8 md:px-16">
        {/* Section header — center aligned */}
        <div className="mb-10 md:mb-20 text-center">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
            02 &mdash; Projects
          </p>
          <h2 className="font-heading text-4xl font-bold italic md:text-5xl lg:text-6xl uppercase tracking-tight">
            Featured{" "}
            <span className="text-accent-cyan inline-block animate-pulse" style={{ animationDuration: "3s" }}>&#x2726;</span>{" "}
            Work
          </h2>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
            ( drag around &amp; click to explore )
          </p>
        </div>

        {/* Decorative elements */}
        <span className="absolute text-accent-cyan text-sm opacity-50 pointer-events-none z-[1]" style={{ top: "140px", left: "30%" }}>+</span>
        <span className="absolute text-accent-cyan text-sm opacity-50 pointer-events-none z-[1]" style={{ top: "320px", right: "25%" }}>+</span>
        <span className="absolute text-accent-cyan text-sm opacity-50 pointer-events-none z-[1]" style={{ bottom: "180px", left: "15%" }}>+</span>
        <span className="absolute text-accent-cyan text-sm opacity-30 pointer-events-none z-[1]" style={{ top: "180px", right: "12%" }}>&#x2726;</span>
        <span className="absolute text-accent-cyan text-sm opacity-30 pointer-events-none z-[1]" style={{ bottom: "120px", left: "55%" }}>&#x2726;</span>

        {/* Client component */}
        <ProjectsClient projects={projects} />

        {/* Bottom legend */}
        <div className="relative z-[2] text-center border-t border-border/50 pt-5 mt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-subtle leading-loose">
          {projects.map((p) => (
            <span key={p.id} className="mx-4">
              {p.number}.{p.title.split(" — ")[0]} &mdash; {p.title.split(" — ")[1]}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
