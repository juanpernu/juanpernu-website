# Projects Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Featured Work" section to the homepage with draggable project cards, slide-over detail panels, and a Japanese shine text background.

**Architecture:** Static project data in a data file, server component wrapper importing a client component for drag/click interactivity. Section placed between Hero and LatestPosts on the homepage.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion (already in project)

---

## File Structure

| File | Responsibility |
|------|---------------|
| `src/lib/projects.ts` | Static project data (titles, descriptions, tech stacks, images, gradient configs) |
| `src/components/home/projects.tsx` | Server component wrapper — section layout, header, decorations, shine text |
| `src/components/home/projects-client.tsx` | Client component — draggable cards, slide-over panel, all interactivity |
| `src/app/page.tsx` | Modify — add `<Projects />` between Hero and LatestPosts |
| `src/components/home/latest-posts.tsx` | Modify — update section number from 02 to 03 |
| `public/projects/bilog-logo.svg` | Create — download Bilog logo SVG locally |

---

### Task 1: Download Bilog logo SVG and verify project images

**Files:**
- Create: `packages/website/public/projects/bilog-logo.svg`

- [ ] **Step 1: Download the Bilog logo SVG**

```bash
cd packages/website
curl -o public/projects/bilog-logo.svg https://ai.bilog.com.ar/bilog-logo.svg
```

- [ ] **Step 2: Verify all project images exist**

```bash
ls -la public/projects/
```

Expected: bilog1.png, bilog2.png, bilog3.png, bilog4.png, bilog5.png, iangela1.png, iangela2.png, iangela3.png, bilog-logo.svg

- [ ] **Step 3: Commit**

```bash
git add public/projects/bilog-logo.svg
git commit -m "chore: add bilog logo SVG for projects section"
```

---

### Task 2: Create project data file

**Files:**
- Create: `packages/website/src/lib/projects.ts`

- [ ] **Step 1: Create the data file**

```typescript
// packages/website/src/lib/projects.ts

export interface ProjectImage {
  src: string;
  alt: string;
  full?: boolean;
}

export interface ProjectGradient {
  colors: string[];
  borderHover: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  techStack: string[];
  url: string;
  gradient: ProjectGradient;
  slideoverBg: string;
  images: ProjectImage[];
  position: { left?: string; right?: string; top: string };
}

export const projects: Project[] = [
  {
    id: "iangela",
    number: "01",
    title: "iAngela — AI Virtual Assistant",
    description:
      "Asistente virtual con inteligencia artificial para clínicas odontológicas. Gestión de turnos, pacientes y consultas con interacción por voz y texto, integrado con el ecosistema Bilog.",
    techStack: ["AI", "NLP", "Voice", "Astro", "Claude API"],
    url: "https://ai.bilog.com.ar",
    gradient: {
      colors: ["#7C3AED", "#A855F7", "#6D28D9"],
      borderHover: "#A855F7",
    },
    slideoverBg: "#1a0022",
    images: [
      { src: "/projects/iangela1.png", alt: "iAngela es innovación", full: true },
      { src: "/projects/iangela2.png", alt: "iAngela chat interface" },
      { src: "/projects/iangela3.png", alt: "iAngela features" },
    ],
    position: { left: "18%", top: "40px" },
  },
  {
    id: "bilog",
    number: "02",
    title: "Bilog — Dental Tech Ecosystem",
    description:
      "Ecosistema tecnológico integral para clínicas y consultorios odontológicos. Software de gestión, historia clínica digital, facturación y herramientas de productividad para profesionales de la salud.",
    techStack: ["React", "Node.js", "AWS", "PostgreSQL"],
    url: "https://www.bilog.com.ar",
    gradient: {
      colors: ["#1D4ED8", "#3B82F6", "#1E40AF"],
      borderHover: "#3B82F6",
    },
    slideoverBg: "#001a1a",
    images: [
      { src: "/projects/bilog1.png", alt: "Bilog agenda desktop y mobile", full: true },
      { src: "/projects/bilog5.png", alt: "Bilog estadísticas y facturación" },
      { src: "/projects/bilog3.png", alt: "Bilog turno agendado mobile" },
    ],
    position: { right: "22%", top: "120px" },
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd packages/website && npx tsc --noEmit --pretty 2>&1 | head -20
```

Expected: no errors related to projects.ts

- [ ] **Step 3: Commit**

```bash
git add src/lib/projects.ts
git commit -m "feat: add static project data for projects section"
```

---

### Task 3: Create the client component (drag + slide-over)

**Files:**
- Create: `packages/website/src/components/home/projects-client.tsx`

This is the most complex component. It handles:
1. Draggable project cards with gradient backgrounds and grain overlay
2. Click detection (distinguishing drag from click)
3. Slide-over panel with project details and image grid
4. Keyboard navigation (ESC to close)
5. Touch support for mobile

- [ ] **Step 1: Create the client component**

Reference the approved mockup at `.superpowers/brainstorm/12803-1774043182/projects-sutera-style.html` for exact styles.

```typescript
// packages/website/src/components/home/projects-client.tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { projects, type Project } from "@/lib/projects";
```

Key implementation details:

**Draggable cards:**
- Use `onMouseDown`/`onMouseMove`/`onMouseUp` (and touch equivalents) on each card
- Track `hasMoved` boolean — if mouse moved >3px from start, it's a drag not a click
- On drag: update card position via `style.left`/`style.top`, set `style.right = "auto"`
- On click (no drag): open slide-over

**Card visuals:**
- Each card gets inline styles for its gradient: `background: linear-gradient(135deg, ...colors)`
- `background-size: 300% 300%` with CSS animation `gradientShift 6s ease infinite`
- Grain overlay via `::before` pseudo-element with inline SVG data URL feTurbulence
- Glow via `::after` pseudo-element with radial gradients
- iAngela card: robot emoji + "iAngela" label + "powered by" + Bilog logo img
- Bilog card: Bilog logo img (white, `filter: brightness(10)`)

**Slide-over:**
- Fixed overlay with `backdrop-filter: blur(4px)`, dark semi-transparent bg
- Two-panel layout: left 45% (text), right 55% (images)
- Left panel: number, title (serif 36px), divider, description, tech badges, external link
- Right panel: CSS grid 2 cols × 2 rows, top image spans full width
- Prev/next navigation buttons (circular, fixed position)
- Close on × button or ESC key
- Entry animation: `translateY(20px) → 0` + `opacity 0 → 1`, 0.4s ease

**Mobile responsive:**
- Cards stack vertically instead of absolute positioning
- Slide-over: panels stack (text above, images below), scrollable
- Shine text: reduce to ~120px

- [ ] **Step 2: Verify it compiles**

```bash
cd packages/website && npx tsc --noEmit --pretty 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/projects-client.tsx
git commit -m "feat: add projects client component with drag and slide-over"
```

---

### Task 4: Create the server component wrapper

**Files:**
- Create: `packages/website/src/components/home/projects.tsx`

This component renders:
1. The section wrapper with circuit-board SVG background
2. The section header (label, title with pulsing ✦, subtitle)
3. The Japanese shine text background ("職人の技、コードで。")
4. Decorative elements (+ crosses, ✦ sparkles)
5. The `<ProjectsClient />` component
6. The bottom legend

- [ ] **Step 1: Create the server component**

```typescript
// packages/website/src/components/home/projects.tsx
import { ProjectsClient } from "./projects-client";
import { projects } from "@/lib/projects";
```

Key implementation details:

**Section wrapper:**
- Same pattern as `latest-posts.tsx`: `<section className="relative w-full py-16 md:py-32 overflow-hidden">`
- Circuit-board SVG background (copy pattern from latest-posts, use unique pattern id like `circuit-projects`)

**Header:**
- Label: `02 — Projects` (same style as `02 — Writing` in latest-posts)
- Title: `Featured ✦ Work` with pulsing ✦ in accent-cyan (same as latest-posts)
- Subtitle: `( drag around & click to explore )`
- All center-aligned (unlike latest-posts which is right-aligned)

**Shine text:**
- Two `<span>` wrappers with `overflow: hidden` (the "curtina" effect)
- Inner spans with the Japanese text, using Tailwind + custom inline styles for:
  - `font-size: 286px` (desktop), `120px` (mobile)
  - `background-image: radial-gradient(circle 8rem, #DD00F2, #1a1a1a)`
  - `background-size: 400%`, `background-clip: text`, `color: transparent`
  - CSS animation `txt_shine 16s ease-out infinite`
  - Opacity 0.35
- Use IntersectionObserver or framer-motion `useInView` to trigger slide-up entrance
- Stagger: 300ms delay between lines, 2s animation-delay on second line's shine

**Bottom legend:**
- Border-top separator
- Centered text listing projects with numbers
- Same monospace/uppercase style

- [ ] **Step 2: Verify it compiles**

```bash
cd packages/website && npx tsc --noEmit --pretty 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/projects.tsx
git commit -m "feat: add projects section server component with shine text"
```

---

### Task 5: Add CSS animations to globals.css

**Files:**
- Modify: `packages/website/src/app/globals.css`

- [ ] **Step 1: Add the keyframe animations**

Add to the end of `globals.css`:

```css
/* Projects section animations */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes txt_shine {
  0% { background-position: 100% center; }
  100% { background-position: 0% center; }
}

@keyframes glowShift {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add CSS animations for projects section"
```

---

### Task 6: Integrate into homepage and update section numbering

**Files:**
- Modify: `packages/website/src/app/page.tsx`
- Modify: `packages/website/src/components/home/latest-posts.tsx`

- [ ] **Step 1: Add Projects import and component to page.tsx**

In `packages/website/src/app/page.tsx`:
- Add import: `import { Projects } from "@/components/home/projects";`
- Add `<Projects />` between `<Hero />` and `<LatestPosts />`

```tsx
<Hero />
<Projects />
<LatestPosts />
```

- [ ] **Step 2: Update LatestPosts section number**

In `packages/website/src/components/home/latest-posts.tsx`, change the section label from `02` to `03`:

```tsx
// Change:
02 &mdash; Writing
// To:
03 &mdash; Writing
```

- [ ] **Step 3: Build and verify**

```bash
cd packages/website && npx next build 2>&1 | tail -20
```

Expected: Build succeeds, static pages generated (count should increase by 0 since we're only modifying the homepage)

- [ ] **Step 4: Dev server visual check**

```bash
cd packages/website && npm run dev
```

Open http://localhost:3000 and verify:
- Projects section appears between Hero and Latest Posts
- Cards render with gradient backgrounds
- Drag works (cards move)
- Click opens slide-over with correct project data and images
- ESC closes slide-over
- Shine text animates in background
- Section numbering: 02 (Projects), 03 (Writing)
- Mobile responsive (resize browser)

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/home/latest-posts.tsx
git commit -m "feat: integrate projects section into homepage"
```

---

### Task 7: Final build verification

**Files:** None (verification only)

- [ ] **Step 1: Full production build**

```bash
cd packages/website && npx next build 2>&1 | tail -20
```

Expected: Build succeeds with no errors, all static pages generated.

- [ ] **Step 2: Lint check**

```bash
cd packages/website && npm run lint 2>&1 | tail -20
```

Expected: No lint errors in new files.

- [ ] **Step 3: Final commit if any fixes needed, then report**

If any fixes were made, commit them. Then report completion.
