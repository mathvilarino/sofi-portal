# Project Research Summary

**Project:** SOFI Data Ecosystem Portal — Visual Enhancement Milestone
**Domain:** B2B SaaS static demo portal (Next.js 14 static export)
**Researched:** 2026-03-26
**Confidence:** MEDIUM-HIGH

## Executive Summary

The SOFI Data Ecosystem Portal is a static, internal-facing demo tool presenting two complementary platforms (SOFIX Engine and SOFI Virtualization) to technical prospects. Unlike typical greenfield projects, the stack is locked and working — the improvement milestone is about elevating visual polish, introducing a brand identity, and adding a role-based use case showcase. The research consensus is clear: the existing stack (Next.js 14, Tailwind 3.4.1, Framer Motion 12.38.0, Inter font) is sufficient for everything needed. No new runtime dependencies are required for the majority of improvements, and adding ones that introduce heavy design opinions (Aceternity UI, Magic UI, GSAP, Lottie) would conflict with the portal's professional B2B data aesthetic.

The recommended approach is a three-phase execution: first, refactor the monolithic `page.tsx` into a clean component and data-layer architecture (this unblocks all parallel feature work and avoids a growing technical debt trap); second, deliver the core visual improvements (hero redesign, ecosystem logo, micro-interactions, typography polish, stats context labels); third, add the role-based use case persona showcase — the explicit primary requirement from PROJECT.md. The persona feature is placed last because it layers on top of stable platform card infrastructure and benefits from the hero and visual identity being resolved first.

The central risks are not architectural complexity but build-time surprises: Tailwind class purging silently breaks dynamic styles in production (not caught in `next dev`), missing `"use client"` directives cause cryptic build failures after component extraction, SVG animations cause hydration mismatches in the static export, and Framer Motion bundle size bloats if not wrapped in `LazyMotion` from the start. All five critical pitfalls are preventable with a single discipline: run `next build` and serve the static output after every meaningful change, never only test in dev mode.

---

## Key Findings

### Recommended Stack

The stack requires no additions for core work. Framer Motion 12.38.0 already covers SVG `pathLength` animations, `AnimatePresence`, `layoutId` tab indicators, and `whileInView` scroll reveals. Tailwind handles all gradient text, custom keyframe animations, and responsive layout. The only optional addition is motion-primitives (copy-paste model, no runtime package), which provides pre-built TextShimmer, InView, and AnimatedGroup components that are composable and visually neutral — correct for a professional data portal.

**Core technologies:**
- **Next.js 14.2.35 (static export):** Locked. All architecture must respect `output: 'export'` constraints — no server components with async data fetching, no ISR.
- **Tailwind CSS 3.4.1:** Handles all layout, responsive design, and custom keyframe animations (`animate-gradient-x`, `animate-float`, `animate-pulse-slow`) via `theme.extend`. Do NOT upgrade to v4 — breaking rewrite, incompatible with current `tailwind.config.ts`.
- **Framer Motion 12.38.0:** SVG draw-on via `motion.path` + `pathLength`, scroll-triggered reveals via `whileInView`, tab indicator via `layoutId`, conditional renders via `AnimatePresence`. Must be wrapped in `LazyMotion` + `domAnimation` features from first use to cap bundle at ~15 KB instead of ~34 KB.
- **Inter (variable font, already configured):** No new fonts needed. Enable Inter 700/800 weights for hero headings. The variable font already has weights 100–900 via `next/font/google`.
- **Lucide React 1.0.1:** Icon library for persona cards, feature icons, UI primitives. No changes needed.
- **motion-primitives (optional, copy-paste):** TextShimmer, InView, AnimatedGroup — zero runtime overhead. Use if Tailwind keyframe approach feels heavy for a given component.

**What not to add:** Aceternity UI (wrong aesthetic register — AI/startup glow, not enterprise data), Magic UI (dark particle effects for consumer apps), GSAP (overkill + license), Lottie (payload weight, bundler config complexity), second Google font, Radix/shadcn tabs, react-spring.

See `.planning/research/STACK.md` for full rationale.

---

### Expected Features

The portal's goal is singular: a visitor understands the ecosystem in seconds, knows which platform fits their need, and navigates with confidence. Every feature decision maps to that goal.

**Must have (table stakes) — this milestone:**
- Ecosystem brand mark / SVG logo — hero has no visual anchor without it; required before hero redesign
- Hero section redesign — outcome headline + subheadline with proof point + dual platform CTAs; first impression is currently generic
- Role-based use case showcase — 3 personas per platform with problem statement + solution; the explicit requirement from PROJECT.md
- Typography and visual hierarchy polish — eyebrow section labels (`PLATAFORMAS / CASOS DE USO / COMO FUNCIONA`), consistent heading scale, Inter 700/800 at hero scale
- Micro-interactions on platform cards — hover elevation + border glow matching platform color (indigo/rose); low effort, high perceived quality signal
- Stats section micro-context labels — add one-line context below each counter ("comparado a queries diretas"); minimal effort, increases credibility

**Should have (competitive differentiators) — add within milestone if time permits:**
- Animated ecosystem concept visual in hero — SVG/canvas data flow abstraction; validates that hero works without it first
- Ecosystem "connective tissue" visual between platform cards — "Use juntos ou separados" bridge element
- Code component extraction refactor — invisible to users but required for sustainable editing velocity

**Defer (v2+):**
- Connector logo sample grid — only if "40+ conectores" stat feels unbelievable without evidence
- Interactive product tour / embedded demo — needs platform IP stability and significant build effort

**Anti-features to reject:** Contact form, auth gate, language toggle, video autoplay in hero, chatbot, dark/light mode toggle, infinite connector scroll, cookie consent banner.

See `.planning/research/FEATURES.md` for full feature dependency graph and prioritization matrix.

---

### Architecture Approach

The codebase currently has a monolithic `page.tsx` (~1000 lines) containing all sections, data constants, and state. The architectural task is decomposing this into three clean layers: a `data/` layer of pure TypeScript constants (no JSX), a `components/ui/` layer of zero-domain-knowledge primitives (`Section`, `StatusDot`, `AnimatedCounter`), and a `components/sections/` layer of one-file-per-section components. This is not over-engineering — it is the prerequisite that makes persona cards, hero redesign, and SVG logo addition feasible without merge conflicts and scroll-hunting in a 1400-line file.

**Major components:**
1. `app/data/*.ts` — Pure content constants with TypeScript interfaces; zero JSX; the contract between content and rendering
2. `components/ui/` — Generic primitives: `Section` (scroll-reveal wrapper), `StatusDot` (health check), `AnimatedCounter` (count-up); no domain knowledge, fully reusable
3. `components/sections/` — One file per page section (NavBar, HeroSection, PlatformsSection, HowItWorksSection, etc.); imports from data layer, uses UI primitives
4. `components/platform/` — Domain-specific sub-components: `PlatformCard`, `SofixMockup`, `SofiMockup`; receive `Platform` type from data layer
5. `app/page.tsx` — Composition root only after refactor; imports sections, holds minimal shared state (`scrolled`, `statsVisible`)

**Key patterns:**
- Data-driven components: every section imports from `data/`, never hardcodes content in JSX
- State collocated with its closest consumer: `NavBar` owns scroll state internally; `StatusDot` owns its own fetch lifecycle; only truly shared state (`statsVisible`) lives in `page.tsx`
- TypeScript interface per data shape: defined in `data/*.ts`, used as component prop types

**Build order:** `data/` files first (unblocks all other work) → `components/ui/` primitives → `components/platform/` → `components/sections/` bottom-up → `page.tsx` cleanup.

See `.planning/research/ARCHITECTURE.md` for full component responsibility table and anti-pattern documentation.

---

### Critical Pitfalls

1. **Tailwind class purging in production** — Dynamic Tailwind classes built via string concatenation or template literals are silently omitted from production CSS bundles. The existing codebase avoids this by using complete literal strings in data objects (e.g., `"bg-indigo-500/10"` not `\`bg-${color}-500\``). This pattern must be preserved when extracting data to separate files and adding new color variants. Prevention: run `next build && npx serve out` after every change touching styling data — never only test in `next dev`.

2. **Framer Motion bundle bloat** — The current codebase uses zero Framer Motion imports (all animations are CSS-based). Introducing `motion.*` components without first establishing a `LazyMotion` wrapper adds ~34 KB to the client bundle. Prevention: set up `LazyMotion` with `domAnimation` features and use `m.*` components (not `motion.*`) from the very first Motion usage; enable `strict` mode so misplaced imports throw during development.

3. **Missing `"use client"` after component extraction** — The monolith `page.tsx` is marked `"use client"` at the top level, making all its children implicitly client components. Extracted files must each declare their own `"use client"` if they use any hooks or browser APIs. Affected components: `StatusDot`, `AnimatedCounter`, `Section` (uses IntersectionObserver), `NavBar` (uses scroll listener). Prevention: extract in dependency order (`data/` first), verify `next build` passes after each extraction step.

4. **SVG logo hydration mismatch** — An inline SVG logo with Framer Motion `pathLength` animation causes a hydration flash in static export: the server pre-renders `pathLength: 0` but the browser briefly shows the default fully-drawn path before JS hydrates. Prevention: use CSS `stroke-dashoffset` keyframe animation for the logo draw-on effect instead of Framer Motion, or add `suppressHydrationWarning` and defer the initial animation state via `useEffect`. Test with `npx serve out` on the built output.

5. **Contrast failures on dark backgrounds** — The current gradient text (`from-white to-gray-600`) fails WCAG AA where the gradient fades to `gray-600` (~3.3:1 contrast ratio). `text-gray-500` body copy also falls below 4.5:1 for normal text. Prevention: use `text-gray-400` as the minimum for all informational text; run Lighthouse accessibility audit before signing off on any visual polish phase.

**Additional pitfalls to track:** missing `prefers-reduced-motion` handling (continuous GPU compositing on animations without opt-out), missing focus-visible indicators on platform card links, `backdrop-filter blur-3xl` GPU cost if more blur elements are added beyond the current two hero blobs.

See `.planning/research/PITFALLS.md` for full pitfall-to-phase mapping and recovery strategies.

---

## Implications for Roadmap

Based on combined research, three phases are suggested. The ordering is driven by dependency chains from FEATURES.md (logo before hero, cards stable before personas) and the build-order recommendation from ARCHITECTURE.md (data layer before components).

### Phase 1: Foundation — Component Architecture Refactor

**Rationale:** The monolithic `page.tsx` is the single biggest risk multiplier for all subsequent work. Every new feature (hero redesign, SVG logo, persona cards) added to a 1000-line monolith creates harder diffs, harder debugging, and higher risk of breaking existing functionality. This phase is infrastructure, not visible to end users, but it is the prerequisite that makes Phases 2 and 3 safe to execute.

**Delivers:** A clean, navigable codebase with `data/`, `components/ui/`, `components/sections/`, and `components/platform/` layers; `page.tsx` reduced to composition only; TypeScript interfaces for all data shapes.

**Addresses:** Component extraction (P2 in FEATURES.md prioritization matrix), maintainability prerequisite for all P1 features.

**Avoids:**
- Pitfall 3 (missing `"use client"` directives) — extraction done deliberately with build verification at each step
- Anti-pattern 1 (keep everything in `page.tsx`) — explicitly resolved in this phase
- Tailwind purging risk — all complete class literal strings verified before data objects move to separate files

**Research flags:** Standard, well-documented Next.js App Router pattern. Skip `/gsd:research-phase` — architecture is fully mapped in ARCHITECTURE.md.

---

### Phase 2: Core Visual Identity — Hero, Logo, and Polish

**Rationale:** Hero redesign and SVG logo are the highest-impact visible improvements and have no dependency on persona cards. They must come before personas because the logo is required by the hero (FEATURES.md dependency: "Hero requires brand mark"), and the visual identity established here (gradient language, typography scale, animation register) must be consistent with the persona cards built in Phase 3.

**Delivers:** Ecosystem SVG "S" infinity logo (inline, animatable via CSS `stroke-dashoffset`), hero section redesign (outcome headline + subheadline + dual CTAs + logo), typography hierarchy polish (Inter 700/800 hero scale, eyebrow section labels, `text-gray-400` minimum for body copy), micro-interactions on platform cards (hover elevation + border glow), stats section micro-context labels.

**Uses:**
- Framer Motion `pathLength` or CSS keyframe for SVG logo animation
- `LazyMotion` + `domAnimation` wrapper established here before any `motion.*` usage
- Tailwind `theme.extend.keyframes` for `animate-gradient-x`, `animate-float` (no new packages)
- Inter ExtraBold (weight 800, already available via variable font)

**Avoids:**
- Pitfall 2 (Framer Motion bundle bloat) — `LazyMotion` boundary set up first
- Pitfall 4 (SVG hydration mismatch) — CSS animation preferred; if Motion used, `suppressHydrationWarning` + deferred state
- Pitfall 5 (contrast failures) — `text-gray-400` minimum enforced; Lighthouse audit at phase end

**Research flags:** Hero pattern and animation approach are well-documented. SVG animation approach has one nuance (CSS vs Motion, static export constraint) — documented in PITFALLS.md Pitfall 4. No additional research needed; pattern is clear.

---

### Phase 3: Use Case Showcase — Role-Based Persona Cards

**Rationale:** This is the explicit primary requirement from PROJECT.md and the highest-value differentiator (FEATURES.md P1). It is placed third because persona cards are a layer on top of stable platform card infrastructure (Phase 1 establishes that infrastructure) and their visual language must be consistent with the hero and platform identity established in Phase 2. Building personas on top of an unstable monolith would risk regressions in both the cards and the new persona overlay.

**Delivers:** Role-based use case showcase for both platforms — 3 personas per platform (SOFIX: QA Engineer / Data Engineer / Compliance Officer; Virtualization: Analyst / Architect / BI Developer). Each persona: role icon, problem headline (e.g., "Seu ambiente de produção vaza para os testes"), one-line solution, 1-2 platform features that address it. Tab switcher using Framer Motion `AnimatePresence` + `layoutId` for the active indicator.

**Uses:**
- `AnimatePresence` + `motion.div` with `layoutId` for the tab underline pattern (no Radix/shadcn needed)
- `data/use-cases.ts` data file (persona content separated from component JSX per architecture pattern)
- Platform visual identity (indigo/rose per platform) already established in Phase 2

**Avoids:**
- Pitfall 1 (Tailwind purging) — persona card color classes stored as complete literal strings in `data/use-cases.ts`
- Radix/shadcn Tabs dependency — Framer Motion `layoutId` achieves same result, zero new dependencies

**Research flags:** Persona tab pattern is well-established community pattern (documented in STACK.md). The content decisions (which 3 personas per platform, what the problem statements are) require input from the product/domain owner and cannot be purely researched — flag for stakeholder validation during planning.

---

### Phase Ordering Rationale

- **Architecture before features:** ARCHITECTURE.md build-order recommendation is explicit: `data/` layer first, then primitives, then sections. Attempting Phase 2 or 3 on the monolith creates compounding debt.
- **Logo before hero:** FEATURES.md dependency graph is unambiguous — hero visual identity requires the brand mark as its anchor.
- **Hero before personas:** The visual identity language (gradient register, spacing, color application) must be established before persona cards are designed so they feel like part of the same system.
- **Data layer as prerequisite for Phase 3:** `data/use-cases.ts` is the persona content file; it follows the same architecture pattern as all data files and only makes sense once the pattern is established in Phase 1.
- **All phases avoid Framer Motion before `LazyMotion` is set up:** Phase 2 establishes the `LazyMotion` wrapper; Phase 3 inherits it.

---

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 2 (SVG Logo animation):** The CSS vs. Framer Motion decision for the logo draw-on depends on whether the SVG is stroke-based or fill-based — a design decision not yet made. If fill-based, switch to `scale` + `opacity` entrance instead of `pathLength`. Verify final SVG design before committing to animation approach.
- **Phase 3 (Persona content):** The problem statements and solution framings for each persona role are domain-specific and require product/stakeholder input. The tab component pattern is clear; the content is not researchable.

**Phases with standard patterns (skip `/gsd:research-phase`):**
- **Phase 1 (Component extraction):** Fully mapped in ARCHITECTURE.md. Next.js App Router file-based component extraction is a standard documented pattern with no ambiguity.
- **Phase 2 (Hero, typography, micro-interactions):** Pattern is well-established across multiple B2B SaaS sources; STACK.md and FEATURES.md provide sufficient implementation guidance.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | Core stack is locked and verified. Animation library decisions (Framer Motion `pathLength`, `LazyMotion`) verified via official motion.dev docs. motion-primitives compatibility at MEDIUM — no direct API doc verification of latest version. |
| Features | MEDIUM | Multiple B2B SaaS sources corroborate feature priorities; no single authoritative spec. Several sources were LOW confidence (403 errors, search summaries). Feature dependency graph and MVP definition are sound. |
| Architecture | HIGH | Based on direct codebase inspection (`app/page.tsx`) + Next.js App Router official conventions. Component boundaries, data flow, and build order are unambiguous. |
| Pitfalls | HIGH | Codebase directly inspected; findings grounded in official docs (Tailwind, motion.dev, Next.js, MDN, W3C WAI). All five critical pitfalls verified against actual code patterns in the repo. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **SVG logo design not finalized:** The animation approach (CSS `stroke-dashoffset` vs Framer Motion `pathLength`) depends on whether the final "S" infinity logo is stroke-based or fill-based. This is a design decision, not a research gap. Confirm before Phase 2 begins.
- **Persona content is domain knowledge:** Research can provide the component pattern and data structure for persona cards; it cannot provide the actual problem statements, business scenarios, and feature mappings for each role. Stakeholder input required before Phase 3 content work begins.
- **Internal network URLs:** `data/platforms.ts` will contain hardcoded internal IP addresses (`172.16.10.14:3000`, `:3010`, `:8000`, `:8010`). These are correct per current ARCHITECTURE.md but will break in any non-internal network context. Acceptable for the demo tool; document as a known constraint.
- **B2B SaaS hero conversion patterns:** Several FEATURES.md sources were LOW confidence (403 errors, unverified search citations). The hero structure recommendation is corroborated by multiple sources but the specific conversion hierarchy claims should be validated against actual demo feedback rather than treated as gospel.

---

## Sources

### Primary (HIGH confidence — official docs or direct codebase inspection)
- [motion.dev SVG Animation docs](https://motion.dev/docs/react-svg-animation) — `pathLength`, draw animation API verified at Framer Motion 12.37.0+
- [motion.dev scroll animations](https://motion.dev/docs/react-scroll-animations) — `whileInView`, `viewport` options
- [Motion — Reduce bundle size (LazyMotion)](https://motion.dev/docs/react-reduce-bundle-size) — `domAnimation` feature set, `strict` mode
- [Tailwind CSS — Detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files) — purging behavior for dynamic class names
- [Next.js font optimization](https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts) — `next/font/google` with variable fonts
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — media query for animation accessibility
- [Accessible SVGs — Deque](https://www.deque.com/blog/creating-accessible-svgs/) — `role="img"`, `aria-label`, `<title>` element pattern
- Direct codebase inspection: `/home/vault-app/portal/app/page.tsx`, `globals.css`, `tailwind.config.ts`, `next.config.mjs`, `package.json`
- `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`, `.planning/PROJECT.md` — project constraints confirmed

### Secondary (MEDIUM confidence — multiple corroborating sources)
- [motion-primitives component list](https://motion-primitives.com/docs) — TextShimmer, InView, AnimatedGroup verified
- [motion-primitives GitHub](https://github.com/ibelick/motion-primitives) — Framer Motion 12.x compatibility confirmed
- [Next.js hydration mismatch — OneUptime](https://oneuptime.com/blog/post/2026-01-24-fix-hydration-mismatch-errors-nextjs/view) — hydration mismatch causes and static export behavior
- [Tailwind dynamic class names pitfalls — Tailkits](https://tailkits.com/blog/tailwind-dynamic-classes/) — purging troubleshooting
- [B2B SaaS Landing Page Best Practices — Genesys Growth](https://genesysgrowth.com/blog/designing-b2b-saas-landing-pages) — hero structure, conversion hierarchy
- [SaaS Hero Section Best Practices — Tenet](https://www.wearetenet.com/blog/saas-hero-section-best-practices) — 28-site study
- [Top SaaS Landing Page Trends 2026 — SaaSFrame](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples) — 2026 visual patterns
- [Tailwind gradient text pattern — Cruip](https://cruip.com/create-an-animated-gradient-text-with-tailwind-css/) — keyframe approach for gradient text
- [Typography for SaaS — Beetle Beetle](https://beetlebeetle.com/post/best-fonts-marketing-websites-guide) — B2B font recommendations

### Tertiary (LOW confidence — single source or inferred)
- [SaaS Landing Page Conversion System 2026 — Unicorn Platform](https://unicornplatform.com/blog/saas-landing-page-conversion-system-in-2026/) — 403 error, citation from search summary only
- [22 Best B2B Hero Sections — SaaS Websites](https://saaswebsites.com/22-best-b2b-hero-sections-on-saas-homepage/) — 403 error, citation from search summary only
- [Framer Motion + Next.js 14 `use client` — Medium](https://medium.com/@dolce-emmy/resolving-framer-motion-compatibility-in-next-js-14-the-use-client-workaround-1ec82e5a0c75) — single community post, pattern verified by official docs independently

---

*Research completed: 2026-03-26*
*Ready for roadmap: yes*
