# Projects Section — Design Spec

## Overview

Add a "Featured Work" section to the homepage between the Hero and Latest Posts sections. Sutera-inspired layout with draggable project items, slide-over detail panels, and a Japanese shine text background effect.

## Projects Data

Two projects, stored as static data (no MDX/content files needed):

### 01. iAngela
- **Title:** iAngela — AI Virtual Assistant
- **Description:** Asistente virtual con inteligencia artificial para clínicas odontológicas. Gestión de turnos, pacientes y consultas con interacción por voz y texto, integrado con el ecosistema Bilog.
- **Tech stack:** AI, NLP, Voice, Astro, Claude API
- **URL:** https://ai.bilog.com.ar
- **Card visual:** Purple gradient bg (#7C3AED → #A855F7 → #6D28D9) + grain overlay + robot emoji + "powered by [Bilog logo]"
- **Slide-over images:** iangela1.png (hero full), iangela2.png (chat), iangela3.png (features)
- **Slide-over bg:** #1a0022

### 02. Bilog
- **Title:** Bilog — Dental Tech Ecosystem
- **Description:** Ecosistema tecnológico integral para clínicas y consultorios odontológicos. Software de gestión, historia clínica digital, facturación y herramientas de productividad para profesionales de la salud.
- **Tech stack:** React, Node.js, AWS, PostgreSQL
- **URL:** https://www.bilog.com.ar
- **Card visual:** Blue gradient bg (#1D4ED8 → #3B82F6 → #1E40AF) + grain overlay + Bilog logo SVG (white)
- **Slide-over images:** bilog1.png (agenda full), bilog5.png (stats), bilog3.png (mobile)
- **Slide-over bg:** #001a1a

## Section Layout

### Header
- Label: `02 — Projects` (monospace, 10px, uppercase, tracking wide, color subtle)
- Title: `Featured ✦ Work` (heading font, italic, uppercase, ✦ pulsing in accent-cyan)
- Subtitle: `( drag around & click to explore )` (monospace, 11px, subtle)
- Aligned: center

### Background
- Circuit-board SVG grid (same pattern as other sections, opacity 0.03)
- Large Japanese text "職人の技、コードで。" (286px, italic serif, centered)
  - Radial gradient shine effect sweeping left-to-right, 16s infinite loop
  - Gradient: accent magenta (#DD00F2) → dark (#1a1a1a)
  - `background-clip: text` with `background-size: 400%`
  - Opacity: 0.35
  - Slide-up entrance with stagger (300ms between lines)
  - Second line has 2s animation-delay for offset shine

### Project Items (Canvas)
- Positioned absolutely within a relative canvas container (500px height)
- Each item: numbered label (01., 02.) + visual card (200x160px, rounded)
- **Draggable** via mouse events (track drag vs click to prevent accidental navigation)
- **Clickable** → opens slide-over
- Hover: scale(1.05), border color changes to project accent
- Decorative elements: + crosses and ✦ sparkles scattered, low opacity

### Bottom Legend
- Centered text listing: `01.iAngela — AI Virtual Assistant   02.Bilog — Dental Tech Ecosystem`
- Monospace, 10px, uppercase, subtle color, border-top separator

## Slide-Over Panel

Triggered on project item click. Full-screen overlay with backdrop blur.

### Structure
- **Left panel (45%):** Project details on tinted background
  - Close button (×) top-right
  - Project number (accent color)
  - Project title (serif, 36px, bold)
  - Divider line
  - Description (monospace, 11px, uppercase, muted)
  - Tech stack badges (pill-shaped, bordered)
  - External link with arrow
- **Right panel (55%):** Image grid
  - 2x2 grid with 2px gap
  - Top row: full-width hero image (grid-column: 1/-1)
  - Bottom row: two images side by side
  - Images: object-fit cover
- **Navigation:** Circular prev/next buttons (fixed position, left/right edges)
- **Close:** × button or ESC key
- **Animation:** slideIn (translateY 20px → 0, opacity 0 → 1, 0.4s ease)

## Component Architecture

### New files
- `src/components/home/projects.tsx` — Main section component (server component wrapper)
- `src/components/home/projects-client.tsx` — Client component with drag + slide-over interactivity
- `src/lib/projects.ts` — Static project data

### Data structure
```typescript
interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  techStack: string[];
  url: string;
  gradient: { colors: string[]; borderHover: string };
  slideoverBg: string;
  images: { src: string; alt: string; full?: boolean }[];
  cardContent: React.ReactNode; // flexible for logo vs emoji+powered by
}
```

### Integration
- Add `<Projects />` to `src/app/page.tsx` between `<Hero />` and `<LatestPosts />`
- Update section numbering: Projects becomes 02, Latest Posts becomes 03
- Add navigation item "Projects" → scroll-to-section (optional, not required for MVP)

## Static Assets
Already in place at `public/projects/`:
- bilog1.png, bilog2.png, bilog3.png, bilog4.png, bilog5.png
- iangela1.png, iangela2.png, iangela3.png
- Bilog logo SVG: fetched from https://ai.bilog.com.ar/bilog-logo.svg → save locally

## Animations & Interactions

| Element | Technique | Details |
|---------|-----------|---------|
| Shine text entrance | CSS transition + translateY(100%→0) | 0.8s cubic-bezier(0,0,0,1), stagger 300ms |
| Shine sweep | radial-gradient + background-position animation | 16s infinite, bg-size 400% |
| Project card hover | CSS transform scale(1.05) | 0.2s ease |
| Drag | Mouse events (mousedown/move/up) | Track hasMoved to distinguish click vs drag |
| Slide-over entrance | CSS animation slideIn | translateY(20px→0) + opacity, 0.4s ease |
| Card gradient | CSS animated background-position | 6s ease infinite, bg-size 300% |
| Card grain | SVG noise via inline data URL + mix-blend-mode overlay | opacity 0.35 |
| Card glow | radial-gradient pseudo-element | 4s ease-in-out alternate |

## Responsive Considerations
- Mobile: stack items vertically instead of scattered canvas
- Slide-over: full screen, text panel above images panel (stacked)
- Shine text: reduce font-size to ~120px on mobile
- Touch drag support (touchstart/move/end)

## Out of Scope (for now)
- Dedicated /projects page
- Adding more projects dynamically
- CMS integration
- Project detail pages
