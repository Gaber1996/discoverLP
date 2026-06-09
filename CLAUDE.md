# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DiscoverDev landing page — a single-page React application built with TypeScript, Vite, and Tailwind CSS.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally
- `npm run lint` — ESLint across the project
- `npm run typecheck` — TypeScript type checking (`tsc --noEmit`)

No test framework is configured.

## Architecture

**Single-page composition**: `App.tsx` composes 12 section components rendered sequentially (Header → Hero → About → Services → Team → TeamStats → WhyDiscoverDev → VisionMission → Clients → Testimonials → EngagementModels → Footer). Navigation uses anchor links with smooth scroll (`scrollIntoView`).

**Styling**: Tailwind CSS utilities with custom keyframe animations defined in `src/index.css` (fade-in, fade-in-up, float, blob, scroll). Responsive font sizing scales from 10px base on mobile to 16px at 1280px+ via media queries in index.css.

**State**: Local React hooks only (useState, useEffect). No global state management. Each component is self-contained with its own data arrays defined inline.

**Icons**: `lucide-react` for SVG icons. One custom inline SVG (UpworkIcon in Footer).

**Hero particle animation**: Canvas 2D API with `requestAnimationFrame` loop — defined entirely within `Hero.tsx`.

## Key Dependencies

- `@supabase/supabase-js` — present but not actively used in components
- `lucide-react` — icon library (excluded from Vite pre-bundling via `optimizeDeps`)

## TypeScript Config

Strict mode enabled. Target ES2020. `noUnusedLocals` and `noUnusedParameters` are enforced — unused variables will fail typecheck.
