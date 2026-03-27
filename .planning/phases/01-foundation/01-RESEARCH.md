# Phase 1: Foundation - Research

**Researched:** 2026-03-27
**Domain:** Next.js 14 App Router — monolith decomposition, component extraction, TypeScript data layer
**Confidence:** HIGH (direct codebase inspection; all findings grounded in source files)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** Extract only main sections as separate files: `HeroSection`, `PlatformsSection`, `HowItWorksSection`, `EcosystemFeaturesSection`, `StatsSection`, `NavBar`, `Footer` / CTA section.

**D-02:** Mockups (`SofixMockup`, `SofiMockup`) and `PlatformCard` go inside the section file or in `components/platform/` — no extra nesting level beyond what is needed for readability.

**D-03:** Rule: if an inline block is more than ~50 lines and is reusable or independent, it becomes its own file. If it is just local JSX of the section, it stays inline.

**D-04:** State placed close to its consumer — `page.tsx` has no state after extraction.

**D-05:** `hoveredCard` (glow state on cards) lives in `PlatformsSection.tsx`, not in `page.tsx`.

**D-06:** `scrolled` (NavBar background state) lives in `NavBar.tsx`, not in `page.tsx`.

**D-07:** `statsVisible` (trigger for AnimatedCounter) lives in `StatsSection.tsx` or `AnimatedCounter` uses IntersectionObserver internally.

**D-08:** Each file that uses hooks or browser APIs declares `"use client"` individually.

**D-09:** Files affected: `StatusDot`, `AnimatedCounter`, `NavBar`, `PlatformsSection` (hoveredCard), any section with useEffect/useState/IntersectionObserver.

**D-10:** `app/page.tsx` after extraction can be a Server Component (no `"use client"` at the top) — it only imports and composes sections.

**D-11:** Files in `app/data/*.ts` are pure TypeScript — zero JSX, zero hooks, zero `"use client"`.

**D-12:** Run `next build` after each complete layer, not after each file:
- Gate 1: after extracting all `app/data/*.ts` files
- Gate 2: after extracting all `components/ui/` primitives
- Gate 3: after extracting all `components/sections/` and `components/platform/`
- Gate 4: after cleaning `page.tsx` to pure composition

**D-13:** If the build fails at any gate, fix before continuing to the next layer.

**D-14:** All Tailwind classes in `app/data/*.ts` files must be full literal strings (e.g., `"bg-indigo-500/10"`) — never template literals or dynamic concatenation. Pattern already exists in `page.tsx` and must be preserved.

### Claude's Discretion

- Exact extraction order within each layer (e.g., which data file to create first)
- Internal naming of props interfaces (e.g., `PlatformCardProps` vs `PlatformProps`)
- Whether `Section` wrapper deserves its own file in `components/ui/` or stays inline in the sections that use it

### Deferred Ideas (OUT OF SCOPE)

None — the discussion stayed within Phase 1 boundaries.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ARCH-01 | Platform data extracted to `app/data/platforms.ts` with TypeScript interface | Platform object shape inventoried — see Data Inventory below |
| ARCH-02 | Stats, ecosystemFeatures, howItWorks data extracted to `app/data/*.ts` | All four data arrays inventoried — see Data Inventory below |
| ARCH-03 | UI primitives (`Section`, `StatusDot`, `AnimatedCounter`) extracted to `components/ui/` | All three identified in page.tsx with `"use client"` requirements |
| ARCH-04 | Each page section extracted to its own file in `components/sections/` | 8 sections identified in page.tsx structure map |
| ARCH-05 | Platform sub-components (`PlatformCard`, mockups) extracted to `components/platform/` | `SofixMockup` (~52 lines), `SofiMockup` (~48 lines) both exceed 50-line threshold |
| ARCH-06 | `app/page.tsx` reduced to pure composition (imports + JSX, no inline data) | Currently 957 lines; target is ~15–20 lines after extraction |
| ARCH-07 | `next build` passes without errors after each extraction (mandatory gate) | Static export config confirmed; build command verified |
| ARCH-08 | All Tailwind classes remain as full literal strings (no dynamic template literals) | Existing data objects already use correct pattern — must be preserved on move |
</phase_requirements>

---

## Summary

`app/page.tsx` is a 957-line monolith containing all data constants, all UI components, and all page sections in a single `"use client"` file. Phase 1 decomposes this into four clean layers without any visual or behavioral change: (1) `app/data/*.ts` — pure TypeScript data constants with interfaces, (2) `components/ui/` — generic, domain-agnostic primitives, (3) `components/platform/` — platform-specific sub-components, and (4) `components/sections/` — one file per page section.

The extraction is mechanical — no logic changes, no new features, no style changes. The primary risk is the `"use client"` boundary: the current monolith has a single top-level directive that covers everything. When splitting, each extracted file that uses hooks or browser APIs must declare its own directive. The secondary risk is Tailwind class purging: all class strings in data objects must remain complete literals when moved to separate files.

The build verification gates (D-12) are the safety net. Because `next build` with `output: "export"` catches `"use client"` violations at compile time, running it after each layer catches regressions immediately rather than accumulating them.

**Primary recommendation:** Extract data layer first (`app/data/*.ts`), verify build passes Gate 1, then extract UI primitives, then platform sub-components, then sections, then clean `page.tsx`. Each gate is a working, shippable state.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 14.2.35 | App Router framework, static export | Already installed; `output: "export"` in `next.config.mjs` |
| React | 18.x | Component model | Already installed |
| TypeScript | 5.x | Type safety for data interfaces | Already installed; path alias `@/*` → `./` confirmed in tsconfig |
| Tailwind CSS | 3.4.1 | Utility-class styling | Already installed; `tailwind.config.ts` covers `./components/**/*.{tsx}` |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Lucide React | 1.0.1 | Icons used in data objects (`Database`, `Shield`, etc.) | Must be imported in data files that reference icon components |
| Framer Motion | 12.38.0 | Installed but unused in Phase 1 | Do not add any `motion.*` imports in Phase 1 — that is Phase 2+ scope |

**Installation:** No new packages required. All dependencies are present.

**Version verification:** Confirmed from `.planning/codebase/STACK.md` (2026-03-25) and `package.json`.

---

## Architecture Patterns

### Target Project Structure

```
app/
├── page.tsx                        # ~15 lines: imports + JSX composition only
├── layout.tsx                      # Unchanged
├── globals.css                     # Unchanged
│
├── data/                           # Pure TypeScript — zero JSX, zero hooks
│   ├── platforms.ts                # platforms[] + Platform interface
│   ├── stats.ts                    # stats[] + Stat interface
│   ├── ecosystem-features.ts       # ecosystemFeatures[] + EcosystemFeature interface
│   ├── how-it-works.ts             # howItWorks[] + HowItWorksStep interface
│   ├── architecture-layers.ts      # architectureLayers[] + ArchitectureLayer interface
│   └── comparison.ts               # comparisonData[] typed as [string, boolean, boolean][]
│
components/
├── sections/
│   ├── NavBar.tsx                  # "use client" — scroll state, platform links
│   ├── HeroSection.tsx             # "use client" — statsRef, statsVisible, AnimatedCounter
│   ├── TrustedBySection.tsx        # No "use client" — static JSX (inline data, ~25 lines)
│   ├── PlatformsSection.tsx        # "use client" — hoveredCard state
│   ├── HowItWorksSection.tsx       # No "use client" — uses Section primitive
│   ├── EcosystemFeaturesSection.tsx # No "use client" — uses Section primitive
│   ├── ArchitectureSection.tsx     # No "use client" — uses Section primitive
│   ├── ComparisonSection.tsx       # No "use client" — uses Section primitive
│   ├── CtaSection.tsx              # No "use client" — uses Section primitive
│   └── Footer.tsx                  # No "use client" — static JSX, imports platforms data
│
├── platform/
│   ├── SofixMockup.tsx             # No "use client" — static JSX (~52 lines)
│   ├── SofiMockup.tsx              # No "use client" — static JSX (~48 lines)
│   └── PlatformCard.tsx            # No "use client" — receives Platform props + callbacks
│
└── ui/
    ├── Section.tsx                 # "use client" — uses useInView (IntersectionObserver)
    ├── StatusDot.tsx               # "use client" — uses useState, useEffect, fetch
    └── AnimatedCounter.tsx         # "use client" — uses useState, useEffect
```

**Note on `useInView`:** Currently defined as a standalone function in `page.tsx` (lines 288–298). It uses `useRef`, `useEffect`, and `IntersectionObserver`. Because `Section` depends on it, the cleanest approach is to either (a) colocate `useInView` inside `Section.tsx` since only Section uses it, or (b) extract to `hooks/useInView.ts`. Given D-03 (no extra files beyond necessity), option (a) is preferred.

### Pattern 1: Data Layer First — Pure TypeScript Constants

**What:** Each `app/data/*.ts` file exports one typed interface and one constant array. Zero JSX, zero hooks, zero imports from React or Next.js (except `import type { LucideIcon }` from lucide-react where needed for icon typing).

**When to use:** Every constant array that currently lives at the top of `page.tsx` becomes one data file.

**Example (from existing codebase + target interface):**

```typescript
// app/data/platforms.ts
import type { LucideIcon } from "lucide-react";

export interface PlatformFeature {
  icon: LucideIcon;
  label: string;
}

export interface PlatformHighlight {
  icon: LucideIcon;
  label: string;
  color: string;
}

export interface Platform {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  url: string;
  apiUrl: string;
  logo: string;
  gradient: string;
  gradientBtn: string;
  glowColor: string;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  shadowColor: string;
  features: PlatformFeature[];
  highlights: PlatformHighlight[];
}

export const platforms: Platform[] = [
  {
    id: "sofix",
    // ... all fields preserved verbatim as complete literal strings
  },
];
```

**Critical rule (D-14):** Every Tailwind class value must be a full literal string. `gradient: "from-indigo-500 via-purple-500 to-violet-600"` is correct. `gradient: \`from-${color}-500\`` is forbidden.

### Pattern 2: `"use client"` Per File

**What:** Each extracted file that uses React hooks or browser APIs declares `"use client"` as its first line.

**Decision tree for each extracted file:**

| File | Hooks/Browser APIs | Needs `"use client"` |
|------|-------------------|----------------------|
| `app/data/*.ts` | None | No |
| `components/ui/Section.tsx` | `useRef`, `useEffect`, `IntersectionObserver` | Yes |
| `components/ui/StatusDot.tsx` | `useState`, `useEffect`, `fetch` | Yes |
| `components/ui/AnimatedCounter.tsx` | `useState`, `useEffect` | Yes |
| `components/platform/SofixMockup.tsx` | None | No |
| `components/platform/SofiMockup.tsx` | None | No |
| `components/platform/PlatformCard.tsx` | Receives callback props only, no own hooks | No |
| `components/sections/NavBar.tsx` | `useState`, `useEffect` (scroll) | Yes |
| `components/sections/HeroSection.tsx` | `useRef`, `useEffect`, `useState` (statsVisible) | Yes |
| `components/sections/PlatformsSection.tsx` | `useState` (hoveredCard) | Yes |
| `components/sections/TrustedBySection.tsx` | None | No |
| `components/sections/HowItWorksSection.tsx` | None (Section primitive handles IntersectionObserver) | No |
| `components/sections/EcosystemFeaturesSection.tsx` | None | No |
| `components/sections/ArchitectureSection.tsx` | None | No |
| `components/sections/ComparisonSection.tsx` | None | No |
| `components/sections/CtaSection.tsx` | None | No |
| `components/sections/Footer.tsx` | None | No |
| `app/page.tsx` (after extraction) | None | No — becomes Server Component |

### Pattern 3: Import Path Convention

**What:** All imports use the `@/*` path alias configured in `tsconfig.json` (`@/*` → `./`).

**Examples:**
```typescript
// In components/sections/PlatformsSection.tsx
import { platforms } from "@/app/data/platforms";
import { PlatformCard } from "@/components/platform/PlatformCard";
import { Section } from "@/components/ui/Section";
```

**Why important:** Relative paths like `../../../app/data/platforms` break when files are reorganized. The alias is stable.

### Pattern 4: State Ownership — Collocate with Closest Consumer

**Specific ownership assignments from CONTEXT.md decisions:**

| State | Current location | Target location | Why |
|-------|-----------------|-----------------|-----|
| `hoveredCard` | `page.tsx` (Portal component, line 441) | `PlatformsSection.tsx` | Only PlatformsSection uses this |
| `scrolled` | `page.tsx` (Portal component, line 442) | `NavBar.tsx` | Only NavBar uses this |
| `statsRef` + `statsVisible` | `page.tsx` (Portal component, lines 443–458) | `HeroSection.tsx` | Stats bar lives in hero section |

### Anti-Patterns to Avoid

- **Copy `"use client"` to every file by default:** Only add it when the file actually uses hooks or browser APIs. See decision table above.
- **Keep data arrays inside component files for "locality":** All data arrays go in `app/data/`. Components import from there.
- **Add state to `page.tsx` after cleanup:** After Gate 4, `page.tsx` must have zero `useState`/`useEffect`. Any state belongs in the component that consumes it.
- **Use template literals to build Tailwind classes:** `bg-${color}-500` is invisible to the Tailwind scanner. Always use complete strings.
- **Forget to verify with `next build`:** `next dev` masks missing `"use client"` directives and Tailwind purging issues. Only `next build` catches them.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-aware NavBar | Custom scroll hook | Inline `useEffect` in `NavBar.tsx` (already in page.tsx, just move it) | Pattern already exists and works |
| Intersection Observer scroll-reveal | Custom visibility hook | Move existing `useInView` into `Section.tsx` | Already implemented correctly with disconnect-on-unmount |
| Count-up animation | Animation library integration | Move existing `AnimatedCounter` to `components/ui/` | Already implemented correctly |
| Health check polling | SWR / React Query | Move existing `StatusDot` to `components/ui/` | Polling pattern already works; adding a library is out of scope for this refactor phase |
| Tailwind class safety | Dynamic class lookup object | Complete literal strings in data objects | Pattern already exists; just preserve it |

**Key insight:** Every complex pattern already exists in `page.tsx`. The work is moving code, not writing new code.

---

## Data Inventory

Complete inventory of what exists in `page.tsx` that must be extracted to `app/data/`:

### `platforms` (lines 38–101)
Two objects with fields: `id`, `name`, `subtitle`, `description`, `url`, `apiUrl`, `logo`, `gradient`, `gradientBtn`, `glowColor`, `accentColor`, `accentBorder`, `accentBg`, `shadowColor`, `features[]` (icon + label), `highlights[]` (icon + label + color).

Icons used: `Database`, `Shield`, `GitBranch`, `Lock`, `Server`, `Layers`, `Zap`, `Activity`, `Network`, `Search`, `Eye`, `BarChart3`, `Sparkles`.

Target file: `app/data/platforms.ts` — must `import type { LucideIcon } from "lucide-react"` for icon typing.

### `stats` (lines 103–108)
Four objects with fields: `end`, `suffix`, `label`, `sublabel`.

Target file: `app/data/stats.ts`

### `ecosystemFeatures` (lines 110–159)
Six objects with fields: `icon`, `title`, `description`, `color`, `bg`.

Icons used: `Database`, `ShieldCheck`, `Brain`, `Workflow`, `RefreshCw`, `Globe`.

Target file: `app/data/ecosystem-features.ts`

### `howItWorks` (lines 161–198)
Four objects with fields: `step`, `icon`, `title`, `description`, `color`, `bg`, `border`.

Icons used: `Cable`, `ScanEye`, `Workflow`, `MonitorSmartphone`.

Target file: `app/data/how-it-works.ts`

### `architectureLayers` (lines 200–229)
Four objects with fields: `label`, `items[]`, `color`, `dot`, `arrow`.

Target file: `app/data/architecture-layers.ts`

### `comparisonData` (lines 231–242)
Ten tuples typed as `[string, boolean, boolean][]`.

Target file: `app/data/comparison.ts`

### Inline data (NOT extracted to `app/data/`)

The `TrustedBySection` contains an inline array of `{ label, icon }` database logos (~8 items, defined inline in JSX at lines 567–580). Per D-03, this is local JSX data (not reused elsewhere), so it stays inline in `TrustedBySection.tsx` rather than becoming a data file.

---

## Page Structure Map

Complete section inventory for `components/sections/` extraction:

| Section | Lines (approx) | State needed | `"use client"` |
|---------|---------------|--------------|----------------|
| NavBar | 462–493 | `scrolled` (move to NavBar) | Yes |
| HeroSection | 495–558 | `statsRef`, `statsVisible` (move to Hero) | Yes |
| TrustedBySection | 560–584 | None | No |
| PlatformsSection | 586–670 | `hoveredCard` (move here) | Yes |
| HowItWorksSection | 672–709 | None | No |
| EcosystemFeaturesSection | 711–737 | None | No |
| ArchitectureSection | 739–781 | None | No |
| ComparisonSection | 783–855 | None | No |
| CtaSection | 858–893 | None | No |
| Footer | 897–954 | None | No |

**Note on `TrustedBySection`:** This section is currently inside `page.tsx` but has no dedicated comment header (it is nested between HERO and PLATFORMS). It is ~25 lines of static JSX. It should become `TrustedBySection.tsx` in `components/sections/`.

---

## Common Pitfalls

### Pitfall 1: Missing `"use client"` After Extraction

**What goes wrong:** Extracting a component that uses hooks without adding the `"use client"` directive. `next build` throws at compile time. Error message: "You're importing a component that needs X. It only works in a Client Component but none of its parents are marked with 'use client'."

**Why it happens:** The monolith has a single top-level `"use client"` at line 1 — all children are implicitly client components. Once extracted to separate files, each file is evaluated independently.

**How to avoid:** Use the decision table in Pattern 2 above. Add `"use client"` as the first line of any file containing `useState`, `useEffect`, `useRef`, `IntersectionObserver`, `fetch`, `window`, `addEventListener`.

**Warning signs:** `next build` fails immediately after Gate 2 or Gate 3 with a "hooks" error.

### Pitfall 2: Tailwind Class Purging in Production

**What goes wrong:** Moving data objects to `app/data/*.ts` is safe only because the existing class strings are already full literals. If during the move any string is accidentally split, templates-interpolated, or concatenated, Tailwind will not include that class in the production CSS bundle. The page will look correct in `next dev` (JIT generates on demand) but broken after `next build`.

**Why it happens:** Developer refactors a string like `"from-indigo-500 via-purple-500 to-violet-600"` into `\`from-${platform.color}-500\`` for "DRY" reasons.

**How to avoid:** Copy data objects verbatim from `page.tsx` to data files. Do not restructure or parameterize class names. Run `next build && npx serve out` after Gate 1 to visually confirm all colors render correctly.

**Warning signs:** Colors look correct in `next dev` but disappear after build. `grep` for a class string in `out/` CSS returns no results.

### Pitfall 3: `useInView` Hook Left Orphaned

**What goes wrong:** `useInView` is defined as a standalone function in `page.tsx` (lines 288–298). It is only used by `Section`. If `Section` is extracted to `components/ui/Section.tsx` but `useInView` is not moved with it, the build will fail with "useInView is not defined."

**How to avoid:** Move `useInView` into `Section.tsx` (colocate it above the `Section` component definition, since it is only used there). Do not extract `useInView` to a separate hooks file — that adds unnecessary indirection for a hook used in exactly one place.

### Pitfall 4: `statsVisible` State Remains in `page.tsx`

**What goes wrong:** `statsVisible` is set by an IntersectionObserver in `page.tsx` (lines 452–458) and passed as a prop to `AnimatedCounter`. When HeroSection is extracted, the `statsRef` and observer must go with it. If forgotten, `page.tsx` after cleanup will still have `useState`, `useEffect`, and `useRef` — failing the "pure composition" requirement.

**How to avoid:** When extracting `HeroSection`, move `statsRef`, `statsVisible` state, and the IntersectionObserver `useEffect` into `HeroSection.tsx`. The `AnimatedCounter` receives `visible` as a prop from `HeroSection` directly.

### Pitfall 5: Footer Hardcodes `platforms[0].url` and `platforms[1].url`

**What goes wrong:** The Footer section (lines 897–954) directly accesses `platforms[0].url`, `platforms[1].url`, and `platforms[0].apiUrl`, `platforms[1].apiUrl` via array index. After extraction, `Footer.tsx` must import from `@/app/data/platforms`.

**How to avoid:** In `Footer.tsx`, add `import { platforms } from "@/app/data/platforms"` at the top and use the same index access pattern. Do not pass URLs as props from `page.tsx` — that would leak data concerns into `page.tsx`.

### Pitfall 6: NavBar Also Uses `platforms` Data

**What goes wrong:** `NavBar` renders platform links using `platforms[0].url` and `platforms[1].url` (lines 483–490). After extraction, `NavBar.tsx` must import from `@/app/data/platforms`.

**How to avoid:** Same as Footer — import directly in `NavBar.tsx`.

---

## Build Gates — Exact Commands

```bash
# After each gate:
cd /home/vault-app/portal
npm run build

# After Gate 4 (final verification that static export works):
npm run build && npx serve out
```

`npm run build` maps to `next build` which with `output: "export"` in `next.config.mjs` generates the static `out/` directory. TypeScript errors, missing directives, and missing imports all fail at this step.

---

## Code Examples

### Gate 1 Target: Minimal Data File

```typescript
// app/data/stats.ts

export interface Stat {
  end: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export const stats: Stat[] = [
  { end: 40, suffix: "+", label: "Conectores", sublabel: "SQL, NoSQL, Cloud & SaaS" },
  { end: 0, suffix: "%", label: "Data Copied", sublabel: "Zero-copy architecture" },
  { end: 10, suffix: "x", label: "Mais rápido", sublabel: "vs ETL tradicional" },
  { end: 100, suffix: "%", label: "API Ready", sublabel: "REST, OData, SQL & NLQ" },
];
```

### Gate 4 Target: Pure Composition `page.tsx`

```typescript
// app/page.tsx — after extraction (no "use client", no data, no state)

import { NavBar } from "@/components/sections/NavBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { EcosystemFeaturesSection } from "@/components/sections/EcosystemFeaturesSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Footer } from "@/components/sections/Footer";

export default function Portal() {
  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 relative">
      <NavBar />
      <HeroSection />
      <TrustedBySection />
      <PlatformsSection />
      <HowItWorksSection />
      <EcosystemFeaturesSection />
      <ArchitectureSection />
      <ComparisonSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
```

### `Section` Component with Colocated `useInView`

```typescript
// components/ui/Section.tsx
"use client";

import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView();
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}
```

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies — this phase is a pure code reorganization with no new tools, services, or runtimes required beyond the already-installed project dependencies).

Build toolchain availability confirmed:

| Dependency | Available | Version | Notes |
|------------|-----------|---------|-------|
| Node.js | Yes | 20.20.0 | Confirmed in STACK.md |
| npm | Yes | Inferred | package-lock.json present |
| Next.js build | Yes | 14.2.35 | `npm run build` = `next build` |
| TypeScript | Yes | 5.x | tsconfig.json present |
| Tailwind CSS | Yes | 3.4.1 | tailwind.config.ts present |

---

## Validation Architecture

`nyquist_validation` is explicitly `false` in `.planning/config.json`. This section is SKIPPED.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single `"use client"` covers all children | Per-file `"use client"` directives | Next.js App Router (13+) | Each extracted file must declare its own boundary |
| Data collocated with components | Data in `app/data/` layer | Phase 1 target | Content changes become zero-JSX diffs |
| All state in page root | State at closest consumer | Phase 1 target | `page.tsx` becomes a Server Component |

---

## Open Questions

1. **`TrustedBySection` naming**
   - What we know: The section has no comment-header name in `page.tsx` — it appears between HERO and PLATFORMS sections with no `id` attribute.
   - What's unclear: Whether it should be called `TrustedBySection`, `SocialProofSection`, or kept inline in `HeroSection` (it is only ~25 lines).
   - Recommendation: Extract as `TrustedBySection.tsx` per D-03 (it is a distinct visual section even if small, and keeping it separate makes future edits cleaner). Add an `id="trusted-by"` anchor.

2. **`PlatformCard` as separate file vs inline in `PlatformsSection`**
   - What we know: D-02 says PlatformCard "stays inside the section file or in `components/platform/`." D-03 says blocks over ~50 lines that are reusable get their own file. The platform card rendering is ~70 lines of JSX within the `platforms.map()` call.
   - What's unclear: Whether to extract it to `components/platform/PlatformCard.tsx` or leave it inline in `PlatformsSection.tsx`.
   - Recommendation: Extract to `components/platform/PlatformCard.tsx` — it is over 50 lines, it is independently testable, and it is the logical sibling of the mockup files that clearly belong in `components/platform/`. The "or in `components/platform/`" option from D-02 applies here.

---

## Sources

### Primary (HIGH confidence)
- Direct inspection of `/home/vault-app/portal/app/page.tsx` (all 957 lines)
- `.planning/codebase/STACK.md` — exact dependency versions
- `.planning/codebase/ARCHITECTURE.md` — static export pattern, health check flow
- `.planning/research/ARCHITECTURE.md` — component responsibilities, suggested build order, data flow
- `.planning/research/PITFALLS.md` — `"use client"` boundary, Tailwind purging, hydration
- `.planning/phases/01-foundation/01-CONTEXT.md` — all locked decisions (D-01 through D-14)
- `next.config.mjs` — `output: "export"` confirmed
- `tailwind.config.ts` — content paths confirmed (`./components/**/*.{tsx}`, `./app/**/*.{tsx}`)
- `tsconfig.json` — `@/*` path alias confirmed

### Secondary (MEDIUM confidence)
- `.planning/codebase/CONCERNS.md` — tech debt analysis and fragile areas

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions confirmed from installed `package.json`
- Architecture: HIGH — target structure derived directly from codebase inspection + prior research
- Data inventory: HIGH — all data constants directly read from `page.tsx` lines 38–242
- Pitfalls: HIGH — all pitfalls grounded in direct codebase inspection + prior pitfalls research
- Build gates: HIGH — `next.config.mjs` confirms static export; `npm run build` is the standard command

**Research date:** 2026-03-27
**Valid until:** 2026-04-27 (stable stack — Next.js 14, Tailwind 3, no planned upgrades per REQUIREMENTS.md out-of-scope list)
