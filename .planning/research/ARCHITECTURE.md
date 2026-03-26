# Architecture Research

**Domain:** Next.js 14 static portal — monolith refactor to component architecture
**Researched:** 2026-03-26
**Confidence:** HIGH (based on direct codebase analysis + Next.js App Router conventions)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Page Layer                               │
│  app/page.tsx  — composes sections, owns scroll/hover state     │
├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┤
│  Navbar  │  Hero    │Platforms │HowItWorks│Features  │ Compare  │
│ Section  │ Section  │ Section  │ Section  │ Section  │ Section  │
├──────────┴──────────┴──────────┴──────────┴──────────┴──────────┤
│                     UI Primitives Layer                         │
│  Section  │  AnimatedCounter  │  StatusDot  │  PlatformCard     │
│  (scroll  │  (count-up anim)  │  (health    │  (platform tile)  │
│  reveal)  │                   │   check)    │                   │
├───────────────────────────────────────────────────────────────── ┤
│                       Data / Constants Layer                    │
│  platforms.ts  │  stats.ts  │  ecosystem-features.ts           │
│  how-it-works.ts  │  architecture-layers.ts  │  comparison.ts   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| `app/page.tsx` | Page composition, scroll state, hovered card state | All section components (passes state down) |
| `HeroSection` | Animated headline, CTA buttons, stats bar | `AnimatedCounter` (via statsVisible prop) |
| `PlatformsSection` | Renders both platform cards with hover glow | `PlatformCard`, `StatusDot`, `SofixMockup`, `SofiMockup` |
| `PlatformCard` | Single platform tile: features, highlights, CTA | `StatusDot`, platform mockup component |
| `HowItWorksSection` | 4-step process grid | `Section` (scroll reveal wrapper) |
| `EcosystemFeaturesSection` | 6-feature grid | `Section` |
| `ArchitectureSection` | Layer stack diagram | `Section` |
| `ComparisonSection` | Feature comparison table | `Section` |
| `CtaSection` | Final call-to-action | `Section` |
| `NavBar` | Fixed nav, scroll-aware bg, platform links | none (reads scroll state from parent or own hook) |
| `Footer` | Links, credits | none |
| `StatusDot` | Health check indicator, polls platform URL | none (owns its own state) |
| `AnimatedCounter` | Count-up animation | none (driven by `visible` prop) |
| `Section` | Intersection Observer scroll-reveal wrapper | none (generic container) |
| `SofixMockup` | Static UI mockup for SOFIX Engine card | none |
| `SofiMockup` | Static UI mockup for SOFI Virtualization card | none |

## Recommended Project Structure

```
app/
├── page.tsx                    # Composition root only — imports sections, minimal state
├── layout.tsx                  # Root layout (unchanged)
├── globals.css                 # Global styles (unchanged)
│
├── components/
│   ├── sections/               # Full-page sections, one file each
│   │   ├── NavBar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── PlatformsSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── EcosystemFeaturesSection.tsx
│   │   ├── ArchitectureSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── CtaSection.tsx
│   │   └── Footer.tsx
│   │
│   ├── platform/               # Platform-specific sub-components
│   │   ├── PlatformCard.tsx    # Renders a single platform (receives platform data as prop)
│   │   ├── SofixMockup.tsx     # SOFIX UI screenshot mockup
│   │   └── SofiMockup.tsx      # SOFI UI screenshot mockup
│   │
│   └── ui/                     # Generic primitives, no domain knowledge
│       ├── Section.tsx         # Scroll-reveal intersection wrapper
│       ├── StatusDot.tsx       # Health check dot
│       └── AnimatedCounter.tsx # Count-up number animation
│
└── data/                       # Pure data constants, no JSX
    ├── platforms.ts            # platforms[] array with all metadata
    ├── stats.ts                # stats[] array
    ├── ecosystem-features.ts   # ecosystemFeatures[] array
    ├── how-it-works.ts         # howItWorks[] array
    ├── architecture-layers.ts  # architectureLayers[] array
    └── comparison.ts           # comparisonData[] array
```

### Structure Rationale

- **`components/sections/`:** One file per visual section mirrors the navbar anchors (#platforms, #how-it-works, etc.). Each section is independently editable without touching others. New sections = new file, zero refactoring.
- **`components/platform/`:** Platform-specific components are grouped separately from generic UI because they contain domain knowledge (SOFIX vs SOFI visual language, brand colors). They will be touched when adding use cases; generic UI components will not.
- **`components/ui/`:** Zero domain knowledge. `Section`, `StatusDot`, `AnimatedCounter` are reusable across any section. Keeping them isolated prevents accidental coupling and makes them easy to test individually.
- **`data/`:** Separating data from components is the single highest-value refactor. Content editors can update platform features, stats, and comparison rows without reading JSX. TypeScript interfaces defined here become the contract between data and components.

## Architectural Patterns

### Pattern 1: Data-Driven Section Components

**What:** Section components accept no hardcoded content — they import from `data/` and render via map. The component owns layout and animation; the data file owns content.

**When to use:** Every section that renders a list of items (platforms, features, steps, stats). This is all sections in this portal.

**Trade-offs:** Adds one import per section file. Pays back immediately when content changes (edit data file, never touch JSX).

**Example:**
```typescript
// app/data/ecosystem-features.ts
export const ecosystemFeatures = [
  { icon: Database, title: "Data Virtualization", description: "...", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  // ...
];

// app/components/sections/EcosystemFeaturesSection.tsx
import { ecosystemFeatures } from "@/app/data/ecosystem-features";

export function EcosystemFeaturesSection() {
  return (
    <Section id="features">
      <div className="grid grid-cols-3 gap-6">
        {ecosystemFeatures.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </Section>
  );
}
```

### Pattern 2: Collocate State with Its Closest Consumer

**What:** State that only one component needs lives inside that component. State needed by a parent and passed down is owned by the lowest common ancestor.

**When to use:** Always. This codebase has two kinds of state: (a) `StatusDot` health check — owned entirely inside `StatusDot`, (b) `hoveredCard` + `scrolled` — needed by `NavBar` and `PlatformsSection`, owned by `page.tsx` and passed as props.

**Trade-offs:** For this portal (no global state library), this is correct. Avoid lifting state to `page.tsx` for state that only one section needs — that creates unnecessary re-renders of the whole page on each interaction.

**Example:**
```typescript
// Scrolled state: NavBar owns it internally via its own useEffect
// hoveredCard state: PlatformsSection owns it — page.tsx does NOT need to know

// app/components/sections/NavBar.tsx
export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // ...
}
```

### Pattern 3: TypeScript Interface per Data Shape

**What:** Each `data/*.ts` file exports a typed interface for its data shape. Components use those types in props.

**When to use:** From day one of the refactor. This is the bridge between data files and components.

**Trade-offs:** Small upfront cost, eliminates the "what props does PlatformCard take?" question during every future edit.

**Example:**
```typescript
// app/data/platforms.ts
import type { LucideIcon } from "lucide-react";

export interface PlatformFeature {
  icon: LucideIcon;
  label: string;
}

export interface PlatformHighlight extends PlatformFeature {
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

export const platforms: Platform[] = [ /* ... */ ];
```

## Data Flow

### Static Data Flow (build time)

```
app/data/*.ts
    ↓ (imported at module load)
app/components/sections/*.tsx
    ↓ (rendered to static HTML by Next.js)
out/index.html  (no server, no API)
```

### Runtime State Flow

```
Scroll event (window)
    ↓
NavBar.tsx (own useEffect) → scrolled state → className change

Intersection Observer (platform card enters viewport)
    ↓
PlatformsSection.tsx → statsVisible state → AnimatedCounter visible prop → count-up animation

User hovers platform card
    ↓
PlatformCard.tsx → onMouseEnter/Leave → hoveredCard state → glow intensity on sibling card

Interval timer (30s)
    ↓
StatusDot.tsx (own useEffect) → fetch(platform.url) → status state → dot color/label
```

### Key Data Flows

1. **Platform metadata to card rendering:** `data/platforms.ts` → `PlatformsSection` → `PlatformCard` → `StatusDot` (receives `platform.apiUrl`)
2. **Stats animation:** `data/stats.ts` → `HeroSection` → `AnimatedCounter` (receives `visible` from Intersection Observer on stats container)
3. **Health check:** `PlatformCard` passes `platform.apiUrl` to `StatusDot`; `StatusDot` owns the fetch lifecycle entirely

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (1 static page) | The structure above is the ceiling needed — no routing, no state management library |
| Adding a second page (e.g. `/sofix`) | Add `app/sofix/page.tsx`, reuse section components and data — no structural change needed |
| Adding a CMS for content | Replace `data/*.ts` with fetch calls in `page.tsx` using `async` Server Components — data layer boundary is already clean |
| Adding auth/backend | Out of scope per PROJECT.md constraints |

### Scaling Priorities

1. **First bottleneck (if it occurs):** Framer Motion bundle size if adding many animated components — use dynamic imports with `ssr: false` for heavy motion components
2. **Second bottleneck:** Static export limitation means no ISR or server components with data fetching — only relevant if content update frequency increases beyond manual deploys

## Anti-Patterns

### Anti-Pattern 1: Keep Everything in page.tsx

**What people do:** Add new sections and components directly in `page.tsx` because it already works.

**Why it's wrong:** The file is already ~1000 lines. Each new feature (use cases per platform, new hero) adds 50-150 lines. At 1500+ lines, finding and editing any section requires scrolling past unrelated code. Git diffs for a one-line copy change touch a file with JSX, data, and 5 other components.

**Do this instead:** Extract sections immediately during the first refactor phase. Never let `page.tsx` grow beyond composition + page-level state (scrolled, statsVisible).

### Anti-Pattern 2: Collocate Data Constants with Components

**What people do:** Keep `platforms`, `stats`, `ecosystemFeatures` arrays inside their section component files for "locality."

**Why it's wrong:** When a product manager updates platform descriptions or adds a use case, they must open a JSX file, navigate past JSX markup, and edit a TypeScript object — all without accidentally touching the rendering logic. The separation is primarily for non-developer edits and focused diffs.

**Do this instead:** Put all content arrays in `app/data/`. Components import from there. A content change is a one-file diff in a `.ts` file with no JSX.

### Anti-Pattern 3: Smart UI Primitive Components

**What people do:** Add platform-specific logic (SOFIX vs SOFI color selection) inside `Section.tsx` or `AnimatedCounter.tsx` as a "convenience."

**Why it's wrong:** UI primitives lose their reusability. They become harder to reason about and refactor. Testing them requires knowing domain context.

**Do this instead:** UI primitives in `components/ui/` receive only generic props (children, className, visible, end/suffix). Domain-specific logic belongs in `components/sections/` or `components/platform/`.

### Anti-Pattern 4: Hardcode `"use client"` on Every Component

**What people do:** Copy the `"use client"` directive from `page.tsx` to every extracted component by default.

**Why it's wrong:** In Next.js App Router, `"use client"` marks the boundary where server-to-client hydration begins. Adding it to every component pushes the client bundle boundary to the outermost level, preventing any future Server Component optimization.

**Do this instead:** Only `StatusDot`, `AnimatedCounter`, `Section` (Intersection Observer), and `NavBar` (scroll listener) genuinely need `"use client"`. Section components that only render static markup can omit it. For the static export target (`output: "export"`), all components effectively run client-side anyway, but keeping the directive minimal is correct discipline.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| SOFIX Engine (`172.16.10.14:3000`) | Outbound link from `PlatformCard` CTA | Hardcoded URL in `data/platforms.ts` after refactor |
| SOFI Virtualization (`172.16.10.14:3010`) | Outbound link from `PlatformCard` CTA | Same |
| Platform health APIs (`:8000`, `:8010`) | `StatusDot` polls via `fetch` with `no-cors` + AbortController timeout | Lives entirely inside `StatusDot.tsx` — no changes needed to refactor |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `data/` to `components/` | ES module import (typed) | One-way: data has no knowledge of components |
| `components/ui/` to `components/sections/` | Props (children, primitives) | Primitives accept generic props, sections supply domain values |
| `components/platform/` to `components/sections/` | Props (Platform type from `data/platforms.ts`) | `PlatformCard` receives a `Platform` object; section passes it from the data array |
| `page.tsx` to sections | Props for shared state only | Only `scrolled` (if NavBar doesn't own it) and `statsVisible` need crossing this boundary; prefer moving them down |

## Suggested Build Order

Dependencies drive this order — extract what others depend on first.

1. **`app/data/*.ts`** — No dependencies. Extracting data first unblocks all component work and provides TypeScript interfaces.
2. **`components/ui/` primitives** — `Section`, `StatusDot`, `AnimatedCounter` have no section dependencies. Extract these second so sections can import them immediately.
3. **`components/platform/`** — `SofixMockup`, `SofiMockup`, then `PlatformCard`. These depend on `data/platforms.ts` types and `StatusDot`.
4. **`components/sections/` — bottom-up by section** — Start with simpler sections first (Footer, CtaSection), then HowItWorksSection, EcosystemFeaturesSection, ArchitectureSection, ComparisonSection, HeroSection, PlatformsSection, NavBar.
5. **`page.tsx` cleanup** — Once all sections are extracted, reduce `page.tsx` to pure composition: imports + return JSX of section components.

## Sources

- Direct analysis of `/home/vault-app/portal/app/page.tsx` (lines 1-560, sections map via grep)
- `/home/vault-app/portal/.planning/codebase/ARCHITECTURE.md` — confirmed static export pattern, health check flow
- `/home/vault-app/portal/.planning/codebase/STRUCTURE.md` — confirmed current flat structure
- `/home/vault-app/portal/.planning/PROJECT.md` — confirmed constraints (no stack change, static export, refactor requirement)
- Next.js App Router file-system conventions (HIGH confidence — stable since Next.js 13)

---
*Architecture research for: Next.js 14 static portal component refactor*
*Researched: 2026-03-26*
