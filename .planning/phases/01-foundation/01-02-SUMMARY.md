---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [typescript, next.js, tailwind, react-hooks, intersection-observer, use-client]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Data layer in app/data/ — provides typed arrays consumed by future section components"
provides:
  - "components/ui/Section.tsx — scroll-reveal section wrapper with colocated useInView hook (IntersectionObserver)"
  - "components/ui/StatusDot.tsx — health check dot with AbortController timeout and 30s polling"
  - "components/ui/AnimatedCounter.tsx — count-up animation via setInterval, receives visible prop from parent"
affects: [01-03, 01-04, phase-02, phase-03]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "UI primitive files in components/ui/ — all declare 'use client' as first line (D-08, D-09)"
    - "useInView hook colocated inside Section.tsx — not extracted to a hooks/ file (D-03)"
    - "Client components are self-contained and domain-agnostic — no knowledge of platform data or business logic"
    - "Verbatim copy from page.tsx — no logic changes, only file isolation"

key-files:
  created:
    - components/ui/Section.tsx
    - components/ui/StatusDot.tsx
    - components/ui/AnimatedCounter.tsx
  modified: []

key-decisions:
  - "useInView colocated in Section.tsx — only Section uses it, no need for a shared hooks/ file (D-03)"
  - "app/page.tsx left unchanged — primitives extracted but wiring deferred to Plan 03"
  - "Gate 2 (npm run build) passed — all three primitives compile independently as standalone client components"

patterns-established:
  - "Pattern: 'use client' as first line of every file that uses hooks or browser APIs"
  - "Pattern: colocate hooks with their sole consumer rather than creating shared hooks/ directory"

requirements-completed: [ARCH-03, ARCH-07]

# Metrics
duration: 8min
completed: 2026-03-27
---

# Phase 1 Plan 02: UI Primitives Extraction Summary

**Three standalone client components extracted from app/page.tsx into components/ui/ — Section (with colocated useInView), StatusDot (AbortController health polling), AnimatedCounter (setInterval count-up) — Gate 2 build passes.**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-27T02:00:00Z
- **Completed:** 2026-03-27T02:08:00Z
- **Tasks:** 2
- **Files modified:** 3 created, 0 modified

## Accomplishments

- Section.tsx: scroll-reveal wrapper component with IntersectionObserver-based useInView hook colocated in same file (not extracted)
- StatusDot.tsx: health check indicator with AbortController 3s timeout, 30s polling via setInterval, three visual states (checking/online/offline)
- AnimatedCounter.tsx: count-up animation via setInterval, receives `visible` boolean prop from parent (no own IntersectionObserver)
- Gate 2 (npm run build) passes with zero TypeScript errors — all three primitives compile as standalone modules

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Section.tsx and StatusDot.tsx** - `558db01` (feat)
2. **Task 2: Create AnimatedCounter.tsx and run Gate 2 build** - `024ab47` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `components/ui/Section.tsx` - Scroll-reveal section wrapper; includes colocated `useInView` hook (IntersectionObserver, threshold 0.15); `"use client"` first line
- `components/ui/StatusDot.tsx` - Health check dot; AbortController fetch with 3s timeout, setInterval 30s polling, three states; `"use client"` first line
- `components/ui/AnimatedCounter.tsx` - Count-up animation; setInterval step=floor(end/30), 30ms tick, stops at end; receives `visible` prop; `"use client"` first line

## Decisions Made

- Kept useInView colocated inside Section.tsx per D-03 — it is only used by Section and extracting it would add indirection with no benefit
- app/page.tsx was not modified — these files are ready to import but wiring is deferred to Plan 03
- Code copied verbatim from page.tsx with no logic changes — pure file isolation

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All three UI primitives exist in `components/ui/` and compile independently
- Gate 2 passed — safe to proceed to Plan 03 (section component extraction)
- app/page.tsx still contains inline copies of these primitives — Plan 03 will wire the imports and remove the inline definitions

---
*Phase: 01-foundation*
*Completed: 2026-03-27*
