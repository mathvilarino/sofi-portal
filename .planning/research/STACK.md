# Stack Research

**Domain:** B2B SaaS data ecosystem portal / marketing landing page (Next.js static export)
**Researched:** 2026-03-26
**Confidence:** MEDIUM-HIGH (core stack verified via official docs; library versions verified via npm/GitHub; design patterns via multiple corroborating sources)

---

## Context: What This Is NOT

This is not a greenfield stack selection. The core stack is locked:

- Next.js 14.2.35 — static export (`output: 'export'`)
- Tailwind CSS 3.4.1
- Framer Motion 12.38.0 (published as `motion/react` but importable as `framer-motion`)
- Lucide React 1.0.1
- TypeScript 5.x
- Inter + JetBrains Mono via `next/font/google`

Research focus: **what to ADD** to improve visual polish, SVG logo animation, use case showcases, hero impact, and typography.

---

## Recommended Additions

### Animation Enhancement Layer

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| motion-primitives | latest (npx install) | Copy-paste animated components built on Framer Motion + Tailwind | Zero runtime overhead — components are copied into your codebase, not imported from a package. Built specifically for Next.js + Tailwind + Motion stack. Provides TextShimmer, Spotlight, AnimatedGroup, InView, BorderTrail, ProgressiveBlur. |
| framer-motion (already installed) | 12.38.0 | SVG path draw animation, whileInView triggers, layout animations | The `pathLength` prop on `motion.path` enables SVG logo draw-on effects. `whileInView` with `viewport={{ once: true }}` is the correct pattern for scroll-reveal. No additional library needed. |

**Why motion-primitives over Aceternity UI or Magic UI:**
- Aceternity UI couples copy-paste with `framer-motion` + `tailwind` — compatible — but has a heavy visual style (glows, spotlights, 3D cards) designed for AI/startup aesthetic, not enterprise data portals.
- Magic UI is optimized for dark-mode particle aesthetics, which conflicts with the SOFI portal's clean indigo/rose gradient identity.
- motion-primitives is minimal, composable, and ships no visual opinion — you style it.

**Confidence:** MEDIUM (verified motion-primitives works with framer-motion 12.x via official docs and GitHub)

---

### Typography Upgrade

| Change | Current | Recommended | Why |
|--------|---------|-------------|-----|
| Display/hero font | Inter (all weights) | Inter for body + add `font-feature-settings` for optical sizing | Inter is already the right call for a B2B data portal. The missing piece is enabling OpenType features and a heavier weight scale. No new font needed. |
| Heading weight | Unspecified | Use Inter 700 (Bold) or 800 (ExtraBold) at hero scale | B2B data SaaS (Linear, Vercel, Stripe) use weight contrast as primary hierarchy tool. Pair `text-5xl font-extrabold` hero with `text-xl font-normal` sub-copy. |
| Mono font | JetBrains Mono (already) | Keep — use for code snippets, connector names, API endpoints | Already correct for the data/engineering context. |

**Font loading note:** The project already uses `next/font/google` correctly (Inter + JetBrains Mono defined in `layout.tsx`). Do NOT add a second display font — it adds a network request for minimal gain. The Inter variable font already has weights 100–900.

**Confidence:** HIGH (verified via Next.js font docs, multiple B2B SaaS typography guides)

---

### Tailwind CSS Customisation (tailwind.config.ts additions)

No new packages. Add keyframes to `tailwind.config.ts` for:

| Animation | Purpose | How |
|-----------|---------|-----|
| `animate-gradient-x` | Hero headline gradient shimmer | Custom keyframe: `backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']` on a `bg-gradient-to-r` clipped to text |
| `animate-float` | Subtle platform card hover elevation | `translateY: ['0px', '-6px', '0px']` at 3s ease-in-out infinite |
| `animate-pulse-slow` | Ecosystem "live" indicator / health check dot | Extend existing Tailwind `pulse` at 3s instead of 2s |

No npm packages required. These are tailwind.config extend additions only.

**Confidence:** HIGH (standard Tailwind pattern, verified via multiple tutorials)

---

## SVG Logo Animation: Specific Guidance

The project already has SVG assets in `/public/` and plans an inline "S" infinity logo for the ecosystem brand.

**Recommended approach: inline SVG + Framer Motion `pathLength`**

Use `motion.path` from `framer-motion` (already installed). For a stroke-based SVG path (the "S"/infinity shape):

```tsx
import { motion } from 'framer-motion'

// In your component:
<motion.svg viewBox="0 0 100 50">
  <motion.path
    d="M10,25 C10,10 40,10 50,25 C60,40 90,40 90,25 C90,10 60,10 50,25 C40,40 10,40 10,25 Z"
    stroke="currentColor"
    strokeWidth="3"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 1.5, ease: "easeInOut" }}
  />
</motion.svg>
```

**Critical constraint:** The SVG path MUST be stroke-based (not fill-based) for `pathLength` to work visually. If the logo is fill-based (solid shape), use `scale` + `opacity` entrance animation instead.

**Confidence:** HIGH (verified via motion.dev official docs, https://motion.dev/docs/react-svg-animation)

---

## Use Case Showcase: Recommended Pattern

**Pattern: Animated persona tab switcher using Framer Motion layout animations**

Do NOT reach for a component library for this. Use:

1. Framer Motion `AnimatePresence` + `motion.div` with `layoutId` for the active tab indicator
2. Tailwind grid for the persona grid layout
3. `whileInView={{ opacity: 1, y: 0 }}` for section entrance

```
Structure:
  <PersonaSection>
    <TabBar>   // 3 tabs per platform: QA / Data Engineers / Compliance (SOFIX) or Analysts / Architects / Engineers (Virtualization)
    <AnimatePresence mode="wait">
      <motion.div key={activeTab} ...>  // scenario card with icon, title, description
    </AnimatePresence>
  </PersonaSection>
```

**Why not shadcn/ui Tabs:** shadcn requires Radix UI dependency. For a static portal with no design system, adding Radix for one tab component is unnecessary weight. The Framer Motion `layoutId` underline animation achieves the same visual result with zero new dependencies.

**Confidence:** MEDIUM (pattern well-established in community, no official benchmark)

---

## Hero Section: Recommended Pattern

Based on multiple B2B SaaS landing page analyses, the SOFI hero should follow:

1. **Badge** — Small chip with ecosystem name + version/status (draws eye, signals novelty)
2. **H1 with gradient clip** — 1–2 lines max, outcome-focused, `bg-clip-text text-transparent bg-gradient-to-r`
3. **Sub-headline** — 1 sentence, `text-muted` color, no more than 18 words
4. **Two CTAs** — Primary (filled) → SOFIX Engine, Secondary (outlined) → SOFI Virtualization
5. **Animated stat row** — The existing counter animation (40+ connectors, 0% data copied) positioned below the CTAs is correct and should remain
6. **No background hero image** — Gradient mesh or subtle SVG pattern instead (static export constraint makes large images non-optimal)

**Framer Motion hero entrance pattern:**
```tsx
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}
```

**Confidence:** HIGH (verified via multiple B2B SaaS conversion pattern sources)

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@radix-ui/react-tabs` / shadcn Tabs | Adds Radix dependency for a single component; static portal has no auth/form needs that justify full shadcn install | Framer Motion `layoutId` tab underline pattern |
| Aceternity UI | Heavy visual style (neon glows, 3D perspective cards) designed for AI startup aesthetic — clashes with SOFI's professional data brand | motion-primitives (neutral, composable) |
| Magic UI | Particle/sparkle effects, designed for dark consumer apps — wrong register for B2B data portal | Framer Motion + Tailwind animations directly |
| GSAP | Requires license for premium features; overkill when Framer Motion 12 already covers all needed SVG/scroll animations | Framer Motion (already installed) |
| Lottie animations | JSON animation files add payload weight; incompatible with static export without bundler config; requires `@lottiefiles/react-lottie-player` | Inline SVG + Framer Motion `pathLength` |
| Second Google Font (display font) | Extra network request; layout shift risk; Inter at 700–800 weight is sufficient for hero scale | Inter ExtraBold (already available via variable font) |
| Tailwind CSS v4 | Project uses v3.4.1; v4 is a full rewrite with breaking CSS-first config, incompatible with current `tailwind.config.ts` approach | Stay on Tailwind 3.4.1 |
| `react-spring` | Redundant with Framer Motion; two animation libraries creates bundle bloat and conflict risk | Framer Motion (already installed) |

---

## Alternatives Considered

| Category | Recommended | Alternative | When to Use Alternative |
|----------|-------------|-------------|------------------------|
| Component animations | motion-primitives (copy-paste) | Aceternity UI | Only if you want dramatic AI/startup visual identity |
| Tab/switcher pattern | Framer Motion layoutId | shadcn/ui Tabs | If project already has shadcn installed for other components |
| SVG animation | Framer Motion pathLength | CSS stroke-dasharray/dashoffset | For non-React contexts or when bundle size is paramount |
| Typography | Inter (current) | Geist Sans | If upgrading to Next.js 15+ where Geist is the default; Geist has marginally better small-size rendering for dense data UI |
| Gradient text | Tailwind + custom keyframe | motion-primitives TextShimmer | TextShimmer is the easier copy-paste option if Tailwind keyframe config is undesirable |

---

## Installation

```bash
# No new runtime dependencies needed for core improvements.
# Framer Motion, Tailwind, and Next.js already handle everything.

# OPTIONAL: motion-primitives components (copy individual components, no package install)
npx motion-primitives@latest add text-shimmer
npx motion-primitives@latest add in-view
npx motion-primitives@latest add animated-group

# These copy component files into your project — they are NOT installed as packages.
# Requires: framer-motion (already installed), tailwindcss (already installed)
```

---

## Version Compatibility

| Package | Version in Use | Compatible With | Notes |
|---------|---------------|-----------------|-------|
| framer-motion | 12.38.0 | React 18 | Full SVG animation support; `pathLength`, `whileInView`, `AnimatePresence`, `layoutId` all available |
| motion-primitives components | latest (2025) | framer-motion 12.x, Tailwind 3.x | Copy-paste model means version pinning is not an issue |
| next/font | built-in to Next.js 14.2.35 | Inter variable font | Already configured correctly in layout.tsx |
| tailwindcss | 3.4.1 | PostCSS 8.x | Custom keyframes added via `theme.extend.keyframes` in tailwind.config.ts |
| lucide-react | 1.0.1 | React 18 | No changes needed; use for persona/feature icons |

---

## Patterns by Goal

**If building the SVG ecosystem logo ("S" infinity):**
- Create as inline JSX SVG in a dedicated component
- Use stroke-based path, NOT fill
- Animate with `motion.path` + `pathLength` on mount
- Export from `components/EcosystemLogo.tsx`

**If building the persona/use case tabs:**
- Use Framer Motion `AnimatePresence` + `layoutId` for the active indicator
- Store persona data in a separate `data/use-cases.ts` file (not inline in the component)
- Animate tab content with `initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}`

**If building the hero section:**
- Use `motion.div` with `variants` + `staggerChildren` on the container
- Apply gradient text via Tailwind `bg-clip-text` with custom `animate-gradient-x` keyframe
- Keep the existing `CountUp` stat animation — it is already correct

**If improving scroll-reveal throughout the page:**
- Use `whileInView={{ opacity: 1, y: 0 }}` + `viewport={{ once: true }}` directly on section wrappers
- Do NOT use `useInView` hook unless you need the boolean for imperative control
- `once: true` prevents re-animation on scroll-up, which is standard for landing pages

---

## Sources

- [motion.dev SVG Animation docs](https://motion.dev/docs/react-svg-animation) — pathLength, morphing, draw animation API (version 12.37.0+ confirmed)
- [motion.dev scroll animations](https://motion.dev/docs/react-scroll-animations) — whileInView, useInView, viewport options
- [motion-primitives component list](https://motion-primitives.com/docs) — TextShimmer, InView, AnimatedGroup, Spotlight, BorderTrail verified
- [Next.js font optimization](https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts) — next/font/google usage with variable fonts
- [B2B SaaS landing page patterns](https://dev.to/huangyongshan46a11y/saas-landing-page-that-converts-nextjs-tailwind-css-with-full-code-33ae) — hero structure and conversion hierarchy (LOW confidence — single source)
- [Typography for SaaS](https://beetlebeetle.com/post/best-fonts-marketing-websites-guide) — B2B font recommendations, Inter/Merriweather pairing rationale (MEDIUM confidence)
- [Geist vs Inter comparison](https://vercel.com/font) — Geist for data portals rationale (MEDIUM confidence — vendor source)
- [Tailwind gradient text pattern](https://cruip.com/create-an-animated-gradient-text-with-tailwind-css/) — keyframe approach verified (MEDIUM confidence)
- [motion-primitives GitHub](https://github.com/ibelick/motion-primitives) — framer-motion 12.x compatibility confirmed

---

## Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| SVG animation with Framer Motion | HIGH | Official motion.dev docs confirm pathLength API at 12.37.0+ |
| motion-primitives as animation layer | MEDIUM | Multiple sources confirm compatibility; no direct API doc verification of latest version |
| Typography (keep Inter) | HIGH | Inter already configured; official Next.js font docs confirm correct usage |
| Hero section pattern | MEDIUM | Multiple B2B SaaS sources corroborate; no single authoritative spec |
| Tailwind custom keyframes | HIGH | Documented pattern; no library changes needed |
| Persona tab pattern (no Radix) | MEDIUM | Well-established community pattern; no official benchmark against alternatives |

---

*Stack research for: SOFI Data Ecosystem Portal — visual enhancement milestone*
*Researched: 2026-03-26*
