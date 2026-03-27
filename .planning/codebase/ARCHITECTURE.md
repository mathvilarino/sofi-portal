# Architecture

**Analysis Date:** 2025-05-15

## Pattern Overview

**Overall:** Next.js Static Site Generation (SSG) with Client-Side Hydration.

**Key Characteristics:**
- **Static Export:** Configured to export as a static site using `output: "export"` in `next.config.mjs`.
- **Portal Strategy:** Acts as a central entry point for the "SOFI Data Ecossystem", linking to various platforms (SOFIX, SOFI Virtualization).
- **Responsive & Animated:** Modern UI using Tailwind CSS and Framer Motion for a sleek portal experience.

## Layers

**UI Layer:**
- Purpose: Presentation and user interaction for the ecosystem portal.
- Location: `app/`
- Contains: React components, styling (Tailwind CSS), and landing page logic.
- Depends on: Next.js, Lucide React, Framer Motion.
- Used by: End-users.

**Data/Platform Layer:**
- Purpose: Defines the metadata and connection points for the external services in the ecosystem.
- Location: Hardcoded in `app/page.tsx` (under the `platforms` and `ecosystemFeatures` constants).
- Contains: Service names, URLs, feature descriptions, and styling metadata.
- Depends on: External services (health checks).

## Data Flow

**Health Check Flow:**

1. `StatusDot` component in `app/page.tsx` initializes on mount.
2. It performs a periodic `fetch` request (client-side) to the platform URL.
3. The response status (online/offline) is reflected in the UI using reactive state.

**Static Generation Flow:**

1. During build, Next.js generates static HTML for `app/page.tsx`.
2. Static assets are served from `public/`.
3. The resulting site is exported to the `out/` directory.

**State Management:**
- Standard React `useState` and `useEffect` hooks for local component state (health checks, scrolling, animations).

## Key Abstractions

**Platform Metadata:**
- Purpose: Represents a service in the SOFI ecosystem.
- Examples: `platforms` constant in `app/page.tsx`.
- Pattern: Configuration-driven UI.

**Reusable UI Sections:**
- Purpose: Wraps content in animated, intersection-aware containers.
- Examples: `Section` component in `app/page.tsx`.
- Pattern: Intersection Observer API with CSS transitions.

## Entry Points

**Web Entry:**
- Location: `app/page.tsx`
- Triggers: User navigation.
- Responsibilities: Main landing page with platform selection, features overview, and architecture layers visualization.

**Global Layout:**
- Location: `app/layout.tsx`
- Triggers: Wraps all pages.
- Responsibilities: Metadata configuration, font loading (Inter, JetBrains Mono), and global styles.

## Error Handling

**Strategy:** Defensive client-side error handling for external service availability.

**Patterns:**
- `try/catch` in health check fetches (`StatusDot`) to catch network errors.
- Fallback UI states (Offline/Online dots).

## Cross-Cutting Concerns

**Logging:** No dedicated logging framework detected; standard client-side logs during development.
**Validation:** Basic TypeScript type safety for component props and metadata.
**Authentication:** Not implemented in this portal layer; expected to be handled by individual platform services linked from the portal.

---

*Architecture analysis: 2025-05-15*
