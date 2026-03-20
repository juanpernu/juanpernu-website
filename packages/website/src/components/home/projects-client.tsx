"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

/* ------------------------------------------------------------------ */
/*  Noise SVG data URL (grain overlay)                                 */
/* ------------------------------------------------------------------ */
const NOISE_URL =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")';

/* ------------------------------------------------------------------ */
/*  Card content renderers                                             */
/* ------------------------------------------------------------------ */
function CardContent({ project }: { project: Project }) {
  if (project.id === "iangela") {
    return (
      <>
        <span className="relative z-10 text-5xl leading-none">🤖</span>
        <span className="relative z-10 text-[10px] uppercase tracking-[2px] text-white drop-shadow-md">
          iAngela
        </span>
        <span className="relative z-10 flex items-center gap-1 mt-1 opacity-70">
          <span className="text-[8px] uppercase tracking-[1px] text-white">
            powered by
          </span>
          <Image
            src="/projects/bilog-logo.svg"
            alt="Bilog"
            width={40}
            height={16}
            className="brightness-[10]"
          />
        </span>
      </>
    );
  }

  if (project.id === "bilog") {
    return (
      <Image
        src="/projects/bilog-logo.svg"
        alt="Bilog"
        width={120}
        height={48}
        className="relative z-10 brightness-[10]"
      />
    );
  }

  // Fallback for future projects
  return (
    <span className="relative z-10 text-[10px] uppercase tracking-[2px] text-muted">
      {project.title}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Project Card                                                       */
/* ------------------------------------------------------------------ */
function ProjectCard({
  project,
  onOpen,
  triggerRef,
}: {
  project: Project;
  onOpen: (id: string) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const hasMoved = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const dragDelta = useRef({ x: 0, y: 0 });
  const dragEndedAt = useRef(0);

  const gradientStyle = useMemo<React.CSSProperties>(
    () => ({
      background: `linear-gradient(135deg, ${project.gradient.colors.join(", ")})`,
      backgroundSize: "300% 300%",
      animation: "gradientShift 6s ease infinite",
      "--hover-border": project.gradient.borderHover,
    } as React.CSSProperties),
    [project.gradient.colors, project.gradient.borderHover],
  );

  const glowStyle = useMemo<React.CSSProperties>(
    () => ({
      background: `radial-gradient(ellipse at 30% 20%, ${project.gradient.colors[1]}66 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, ${project.gradient.colors[2]}80 0%, transparent 60%)`,
      animation: "glowShift 4s ease-in-out infinite alternate",
    }),
    [project.gradient.colors],
  );

  /* --- Mouse drag --- */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    // No e.preventDefault() — select-none handles text selection
    dragging.current = true;
    hasMoved.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
    const el = itemRef.current;
    if (el) {
      el.style.cursor = "grabbing";
      el.style.zIndex = "20";
      el.style.transition = "none";
    }
  }, []);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
      dragDelta.current.x += dx;
      dragDelta.current.y += dy;
      el.style.transform = `translate(${dragDelta.current.x}px, ${dragDelta.current.y}px) scale(1)`;
      startPos.current = { x: e.clientX, y: e.clientY };
    };

    const onUp = () => {
      if (dragging.current) {
        dragging.current = false;
        el.style.cursor = "grab";
        el.style.zIndex = "";
        el.style.transition = "transform 0.2s";
        el.style.transform = `translate(${dragDelta.current.x}px, ${dragDelta.current.y}px) scale(1)`;
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  /* --- Touch drag --- */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    hasMoved.current = false;
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
    const el = itemRef.current;
    if (el) {
      el.style.zIndex = "20";
      el.style.transition = "none";
    }
  }, []);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      const dx = touch.clientX - startPos.current.x;
      const dy = touch.clientY - startPos.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
      dragDelta.current.x += dx;
      dragDelta.current.y += dy;
      el.style.transform = `translate(${dragDelta.current.x}px, ${dragDelta.current.y}px) scale(1)`;
      startPos.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchEnd = () => {
      if (dragging.current) {
        dragging.current = false;
        dragEndedAt.current = Date.now();
        el.style.zIndex = "";
        el.style.transition = "transform 0.2s";
        el.style.transform = `translate(${dragDelta.current.x}px, ${dragDelta.current.y}px) scale(1)`;
      }
    };

    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (hasMoved.current) return;
    if (Date.now() - dragEndedAt.current < 400) return;
    onOpen(project.id);
  }, [onOpen, project.id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen(project.id);
      }
    },
    [onOpen, project.id],
  );

  const positionStyle: React.CSSProperties = {
    left: project.position.left,
    right: project.position.right,
    top: project.position.top,
  };

  return (
    <div
      ref={(node) => {
        (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (project.id && triggerRef) {
          (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} details`}
      className="absolute cursor-grab select-none hover:z-10 active:cursor-grabbing md:absolute md:flex-none
                 max-md:relative max-md:!left-auto max-md:!right-auto max-md:!top-auto"
      style={{
        ...positionStyle,
        transition: "transform 0.2s",
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        const el = itemRef.current;
        if (el && !dragging.current) {
          el.style.transform = `translate(${dragDelta.current.x}px, ${dragDelta.current.y}px) scale(1.05)`;
        }
      }}
      onMouseLeave={() => {
        const el = itemRef.current;
        if (el && !dragging.current) {
          el.style.transform = `translate(${dragDelta.current.x}px, ${dragDelta.current.y}px) scale(1)`;
        }
      }}
    >
      {/* Number label */}
      <div className="text-xs font-bold tracking-[1px] mb-1.5 text-accent-cyan">
        {project.number}.
      </div>

      {/* Visual box */}
      <div
        className="relative w-[200px] h-[160px] rounded-xl overflow-hidden border border-border hover:border-[var(--hover-border)] flex items-center justify-center flex-col gap-2 transition-colors duration-200"
        style={gradientStyle}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            backgroundImage: NOISE_URL,
            backgroundSize: "128px 128px",
            opacity: 0.35,
            mixBlendMode: "overlay",
          }}
        />
        {/* Glow overlay */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={glowStyle}
        />
        {/* Card content */}
        <CardContent project={project} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide-Over Panel                                                   */
/* ------------------------------------------------------------------ */
function SlideOver({
  projects,
  activeId,
  onClose,
  onNavigate,
}: {
  projects: Project[];
  activeId: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const activeIdx = projects.findIndex((p) => p.id === activeId);
  const project = projects[activeIdx];
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus close button on open
  useEffect(() => {
    closeRef.current?.focus();
  }, [activeId]);

  if (!project) return null;

  const hasPrev = activeIdx > 0;
  const hasNext = activeIdx < projects.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-stretch"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Backdrop hit area */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div
        className="relative flex w-full h-full max-md:flex-col max-md:overflow-y-auto"
        style={{ animation: "slideIn 0.4s ease" }}
        key={project.id}
      >
        {/* Left: text panel */}
        <div
          className="w-[45%] max-md:w-full p-12 flex flex-col justify-center relative"
          style={{ background: project.slideoverBg }}
        >
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 border border-white/20 rounded text-white text-base flex items-center justify-center bg-transparent cursor-pointer transition-colors duration-200 hover:border-accent-cyan"
          >
            &times;
          </button>

          <div className="text-[13px] text-accent-cyan tracking-[2px] mb-4">
            {project.number}.
          </div>
          <h2
            id={`project-title-${project.id}`}
            className="font-serif text-4xl font-bold leading-tight mb-6"
          >
            {project.title}
          </h2>
          <div className="w-full h-px bg-white/20 mb-6" />
          <p className="font-mono text-[11px] uppercase tracking-[1.5px] leading-[2] text-muted mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[9px] px-3 py-1 border border-white/20 rounded-full uppercase tracking-[1px] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] text-accent-cyan no-underline transition-[gap] duration-200 hover:gap-3"
          >
            Visit project <span>&#x2197;</span>
          </a>
        </div>

        {/* Right: image grid */}
        <div className="w-[55%] max-md:w-full grid grid-cols-2 grid-rows-2 gap-0.5 max-md:min-h-[400px]">
          {project.images.map((img) => (
            <div
              key={img.src}
              className={`relative bg-white overflow-hidden ${img.full ? "col-span-2" : ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={img.full ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 768px) 50vw, 27.5vw"}
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows — hidden on mobile */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(projects[activeIdx - 1].id);
          }}
          className="fixed left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-surface border border-border rounded-full text-white text-xl flex items-center justify-center cursor-pointer z-[110] transition-colors duration-200 hover:border-accent-cyan max-md:hidden"
        >
          &#x2039;
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(projects[activeIdx + 1].id);
          }}
          className="fixed right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-surface border border-border rounded-full text-white text-xl flex items-center justify-center cursor-pointer z-[110] transition-colors duration-200 hover:border-accent-cyan max-md:hidden"
        >
          &#x203A;
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */
export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const triggerRefs = useRef<Map<string, React.RefObject<HTMLDivElement | null>>>(new Map());

  // Ensure each project has a stable trigger ref
  for (const p of projects) {
    if (!triggerRefs.current.has(p.id)) {
      triggerRefs.current.set(p.id, { current: null });
    }
  }

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleOpen = useCallback((id: string) => {
    setActiveProject(id);
  }, []);

  const handleClose = useCallback(() => {
    setActiveProject((prev) => {
      // Return focus to the triggering card
      if (prev) {
        const ref = triggerRefs.current.get(prev);
        requestAnimationFrame(() => ref?.current?.focus());
      }
      return null;
    });
  }, []);

  return (
    <>
      {/* Canvas area */}
      <div className="relative w-full h-[500px] mb-10 z-[2] max-md:h-auto max-md:flex max-md:flex-col max-md:items-center max-md:gap-10">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={handleOpen}
            triggerRef={triggerRefs.current.get(project.id)!}
          />
        ))}
      </div>

      {/* Slide-over */}
      {activeProject && (
        <SlideOver
          projects={projects}
          activeId={activeProject}
          onClose={handleClose}
          onNavigate={handleOpen}
        />
      )}
    </>
  );
}
