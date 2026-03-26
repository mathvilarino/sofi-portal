# Pitfalls Research

**Domain:** Next.js static-export landing page — visual refactor + SVG animation + component extraction
**Researched:** 2026-03-26
**Confidence:** HIGH (codebase directly inspected; findings grounded in official docs and verified patterns)

---

## Critical Pitfalls

### Pitfall 1: Tailwind Purges Dynamically Constructed Class Names

**What goes wrong:**
The project's `platforms` and `ecosystemFeatures` data objects construct Tailwind class names through string concatenation and template literals (e.g., `platform.accentBg`, `platform.gradient`, `platform.shadowColor`). Tailwind's content scanner reads source files as plain text — it cannot execute JavaScript or resolve runtime values. Any class whose full string never appears literally in a scanned file is silently omitted from the CSS bundle. In production the styles simply don't apply, while `next dev` with JIT works fine (classes are generated on demand), masking the bug until build time.

**Why it happens:**
The pattern looks reasonable — data-driven styling with object properties. Developers test in dev mode (no purging) and don't catch the build-time regression. The existing code already uses this pattern heavily (`platform.gradient`, `platform.accentColor`, `platform.glowColor` etc.), and any new color or utility class added to data objects will suffer the same fate.

**Concrete example in this codebase:**
```
// page.tsx — these class strings are never seen as literals by Tailwind
gradient: "from-indigo-500 via-purple-500 to-violet-600",   // works because static string IS the full class
accentBg:  "bg-indigo-500/10",                               // works — same reason
// BUT: any NEW class built by concatenation will fail:
`bg-${color}-500`  // Tailwind cannot see this
```
The existing data objects happen to use complete, literal class strings — which is why the site works today. This is the correct pattern; it must be preserved when refactoring.

**How to avoid:**
- Keep all Tailwind class strings as complete, unbroken literals in data objects or component props — never build them with concatenation or template expressions.
- When extracting components, pass full class name strings as props, not color tokens to be composed inside the component.
- Run `next build` (not just `next dev`) after every refactor that touches styling data.
- If dynamic classes are truly needed for new features, define a lookup table of complete strings rather than composing fragments.

**Warning signs:**
- Styles look correct in `next dev` but disappear after `next build && npx serve out`.
- New color variants added to data objects appear unstyled in production.
- `grep` for a class string in the built CSS finds it absent.

**Phase to address:** Component extraction phase — before extracting data to separate files, verify every class string is a complete literal. Add a build-time smoke test (`next build`) to CI or dev workflow.

---

### Pitfall 2: Framer Motion Bundle Size With No LazyMotion Boundary

**What goes wrong:**
`framer-motion@12` is listed in `package.json` but the current `page.tsx` uses zero Framer Motion imports — all animations are CSS-based (`animate-fade-in-up`, `animate-pulse-glow`, CSS transitions). If the improvement work introduces `motion.*` components for the new hero SVG logo or micro-interactions, importing the full `motion` component adds ~34 KB minified+gzipped to the client bundle. For a static portal serving demos over an internal network, this may be acceptable, but it compounds if multiple components independently import `motion`.

**Why it happens:**
Developers add `import { motion } from "framer-motion"` directly without setting up `LazyMotion` boundaries first, because it's the quickest path. Once the pattern is established in one component it proliferates. The library cannot be tree-shaken below ~34 KB without deliberately opting into `m` + `LazyMotion`.

**How to avoid:**
- Before adding any `motion.*` usage, decide: is Framer Motion the right tool, or can CSS transitions (`transition-all duration-500`) achieve the same result? The existing codebase shows that CSS-only animations are entirely workable.
- If Framer Motion is genuinely needed (e.g., SVG path drawing, `AnimatePresence` for conditional renders, complex spring physics), set up a `LazyMotion` wrapper at the layout level with `domAnimation` features (~15 KB) and use the `m` component throughout — never the full `motion` component.
- Enable `strict` mode on `LazyMotion` so a misplaced `motion.*` import throws during development rather than silently blowing up bundle size.
- Audit with `@next/bundle-analyzer` before and after adding Motion features.

**Warning signs:**
- Bundle analysis shows `framer-motion` occupying >40 KB in a chunk.
- `motion` (full component) is imported anywhere alongside a `LazyMotion` wrapper — the `LazyMotion` savings are voided.
- Multiple client components independently importing from `framer-motion` with no shared feature wrapper.

**Phase to address:** Visual polish / animation phase — establish the `LazyMotion` boundary and `m` component pattern before writing any new Motion code.

---

### Pitfall 3: Breaking the Static Export With Browser-Only APIs During Component Extraction

**What goes wrong:**
The entire `page.tsx` is correctly marked `"use client"` at the top, which means all browser APIs (`window`, `IntersectionObserver`, `setInterval`, `fetch`) are safe. When components are extracted into separate files, it is tempting to omit `"use client"` if the component "looks" presentational — but any component that uses `useEffect`, `useState`, `useRef`, `IntersectionObserver`, or `fetch` must be a Client Component. If the directive is missing, Next.js treats the component as a Server Component and throws at build time (or worse, hydration mismatches at runtime in static export mode).

The components most at risk in this codebase:
- `StatusDot` — uses `useState`, `useEffect`, `fetch`
- `AnimatedCounter` — uses `useState`, `useEffect`
- `useInView` hook — uses `useRef`, `useEffect`, `IntersectionObserver`
- `Section` — uses `useInView` which uses the above

**Why it happens:**
When splitting a monolith with a top-level `"use client"`, all children automatically become client components. Once extracted to separate files, each file must declare its own directive. The build-time error message can be cryptic ("cannot read property of undefined" during SSR) and hard to trace back to the root cause.

**How to avoid:**
- Establish a rule: any extracted file that uses hooks or browser APIs gets `"use client"` as the first line, always.
- Extract in this order: data files first (pure JSON/constants — no directive needed), then utility hooks, then leaf components, then parent components. Verify `next build` passes at each step.
- Do not try to make `StatusDot` or `AnimatedCounter` into Server Components — they are inherently client-side by nature.

**Warning signs:**
- `next build` error: "You're importing a component that needs X. It only works in a Client Component but none of its parents are marked with 'use client'."
- Hydration errors in the browser console after extraction.
- A component renders on first load but is invisible/wrong on page refresh in the static output.

**Phase to address:** Component extraction phase — before and after each extraction step.

---

### Pitfall 4: SVG Logo Animation Breaking Static Export or Causing Hydration Mismatch

**What goes wrong:**
Adding an inline SVG logo (the proposed "S" infinity mark) with Framer Motion `motion.path` animations can cause hydration mismatches in Next.js static export. The root cause: `next build` pre-renders pages to HTML with the SVG in its initial state. If the SVG's animated properties (e.g., `pathLength`, `opacity`, `strokeDashoffset`) start at a value different from what the client JS sets on mount, React's hydration detects a mismatch and re-renders, causing a flash.

Additionally, SVG `<animate>` or SMIL animations are executed by the browser before JS hydrates — if the React component also controls the same properties, there's a conflict.

**Why it happens:**
SVG path draw-on animations typically use `initial={{ pathLength: 0 }}` + `animate={{ pathLength: 1 }}`. The server renders `pathLength: 0` into the static HTML but the browser may briefly display the default SVG path (fully drawn), creating a flash before hydration.

**How to avoid:**
- For decorative SVG animations (logo draw-on), use CSS animations (`stroke-dashoffset` keyframes) instead of Framer Motion. CSS animations start from the same static HTML state and avoid hydration entirely.
- If using Framer Motion for the SVG, add `suppressHydrationWarning` to the SVG root and wrap the animated variant in a `useEffect`-triggered state so the initial render is stable.
- Never use SMIL `<animate>` elements alongside React-controlled SVG props on the same element.
- Test the built static output (`next build && npx serve out`) explicitly — hydration mismatches only surface in production mode.

**Warning signs:**
- SVG logo "flashes" — appears drawn then re-animates on page load.
- Browser console shows: "Warning: Prop `stroke-dashoffset` did not match. Server: '0' Client: '...'."
- Animation works in `next dev` but breaks in `next build` output.

**Phase to address:** Hero / brand identity phase where the new SVG logo is introduced.

---

### Pitfall 5: Contrast Failures on Dark Backgrounds With Gradient Text and Glows

**What goes wrong:**
The current design uses `bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent` for headings and a `#030712` background. The gradient causes portions of text to fall below the WCAG AA 4.5:1 contrast ratio — specifically where the gradient fades to `gray-600` (`#4B5563`), which has a contrast ratio of ~3.3:1 against the background. Any new gradient text, glowing badge, or dark-on-dark text added during the visual improvement phase will likely have the same issue if not explicitly checked.

Secondary concern: `text-gray-500` is used extensively for body copy and labels. Gray-500 (`#6B7280`) against `#030712` is approximately 3.9:1 — passing AA for large text (18px+) but failing for normal body text (4.5:1 required).

**Why it happens:**
Gradient text looks visually impressive and "passes" visual inspection — designers and developers rarely run contrast checks on gradient text because the bright end looks fine. The dark tail of the gradient is the failure point and it is easy to overlook.

**How to avoid:**
- Use a browser contrast checker or Figma plugin on every text element before finalizing colors. Pay special attention to gradient text — check the darkest portion of the gradient, not just the brightest.
- For decorative gradient text on hero headings, this is an acceptable WCAG exception if the text is purely ornamental and the content is conveyed elsewhere. Document the intentional choice.
- Use `text-gray-400` (`#9CA3AF`, ~5.7:1 against `#030712`) as the minimum for any body copy or label text that is informational.
- New badge/pill components (like the "Enterprise Data Platform" badge in the hero) should use at minimum `text-gray-400` not `text-gray-500`.

**Warning signs:**
- Running axe DevTools or Lighthouse accessibility audit flags contrast violations.
- Text in tag/badge components that uses `text-gray-500` or `text-gray-600` on dark backgrounds.
- Any text using `via-gray-600` or `to-gray-600` in gradient text patterns.

**Phase to address:** Typography / visual hierarchy phase and any phase adding new UI components.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Keeping everything in `page.tsx` during animation work | Avoids merge conflicts, less cognitive switching | 1000+ line file becomes 1400+ lines; harder to review diffs | Never — extraction is a pre-requisite for sustainable work |
| Using arbitrary Tailwind values (`bg-[#0a0e1a]`) for brand colors | Precise color matching | Duplicated magic strings across many components; hard to theme or update | Acceptable for one-off values, not for brand colors used in 5+ places — move to CSS variables |
| Importing full `motion` component instead of `m` + `LazyMotion` | Simpler code | ~30 KB extra JS in client bundle for every user | Never — use `LazyMotion` from the start |
| Omitting `aria-label` on icon-only buttons and SVG logos | Faster to write | Screen readers announce nothing or raw SVG content | Never — always label interactive elements and informational SVGs |
| `mode: "no-cors"` for health checks (existing) | Avoids CORS errors | Cannot detect 4xx/5xx responses — always reports "online" for reachable servers | Acceptable for this internal demo tool; not acceptable if status accuracy matters |
| CSS custom animation classes in `globals.css` instead of Tailwind `theme.extend` | Rapid iteration | Class names undiscoverable via Tailwind tooling, no IDE autocomplete | Acceptable in MVP; refactor into Tailwind `keyframes` extension when stabilizing |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Framer Motion + Next.js App Router | Importing `motion` in a file without `"use client"` | Every file using Framer Motion must have `"use client"` as line 1 |
| Framer Motion `LazyMotion` | Including one `motion.*` component anywhere negates savings | Use `strict` prop on `LazyMotion`; import only `m.*` components |
| Inline SVG + Next.js `next/image` | Trying to use `next/image` for inline SVG that needs animation | Inline SVG directly in JSX; use `next/image` only for raster assets or non-animated SVGs |
| `fetch` with `mode: "no-cors"` (StatusDot) | Treating any non-thrown response as "online" | For accurate health checks, the target service needs a CORS-enabled `/health` endpoint; document this as a known limitation in demos |
| Tailwind `content` paths (tailwind.config.ts) | Extracting components to a new path not covered by the glob | Current config covers `./components/**/*.{tsx}` — any new directory (e.g., `src/components`) must be added |

---

## Performance Traps

Patterns that work at small scale but degrade with added complexity.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Multiple `blur-3xl` elements with `backdrop-filter` | Janky scroll, GPU spike on mobile, Safari lag | Limit to 2-3 decorative blur elements per viewport; use `will-change: transform` sparingly | Already near the limit with 2 hero blobs; adding more sections with backdrop blur may tip over |
| Unbounded `IntersectionObserver` instances | Memory creep on long pages; each `Section` component creates one observer | Current `useInView` correctly disconnects on unmount — preserve this pattern during extraction | Safe with ~10 sections; would need pooling above 50+ |
| `setInterval` in `StatusDot` × 2 cards | Two 30-second polling timers running in parallel for the lifetime of the page | Acceptable for 2 cards; do not add more status dots without considering a shared polling hook | Breaks if expanded to 10+ platform cards |
| Large inline SVG + repeated renders | SVG DOM bloat, repaint cost during animations | Keep SVG logo path count low; use `<use>` for repeated SVG symbols instead of duplicating markup | Irrelevant at 1 SVG logo; matters if SVG is used in list items |
| CSS `animate-pulse-glow` on large `blur-3xl` divs | Continuous GPU compositing even when off-screen | Set `animation-play-state: paused` when element is not in viewport | Performance is acceptable now; becomes an issue if many such elements are added |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No `prefers-reduced-motion` handling | Users with vestibular disorders or epilepsy see continuous blob pulsing, bouncing chevron, fade-in animations — all without any opt-out | Add `@media (prefers-reduced-motion: reduce)` to `globals.css` disabling `animate-pulse-glow`, `animate-float`, `animate-bounce`, and transition durations |
| Gradient text on the hero (`from-white to-gray-600`) inaccessible in forced-colors / Windows High Contrast mode | Text becomes invisible in high-contrast mode because `bg-clip-text text-transparent` renders as transparent | Add `@media (forced-colors: active) { .gradient-text { color: ButtonText; background: none; -webkit-text-fill-color: unset; } }` |
| Platform card links have no visible focus indicator | Keyboard-only users cannot determine which card is focused | Add `focus-visible:ring-2 focus-visible:ring-indigo-400` (or equivalent) to card `<a>` elements; the current `glass` class only handles hover |
| Animated stats counter (`AnimatedCounter`) runs on every re-render if `statsVisible` resets | Disorienting number flash for users who scroll past the stats section | Current implementation guards with `if (!visible) return` — preserve this; do not add a toggle that resets `statsVisible` to `false` |
| SVG logo (planned) missing accessible label | Screen readers announce raw path data or nothing | Inline SVG logos need `role="img"` + `aria-label="SOFI Data Ecosystem"` and a `<title>` element as first SVG child |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Component extraction:** Components are split into files but `"use client"` directives are missing — verify `next build` passes (not just `next dev`)
- [ ] **Tailwind purge:** Styles look correct in dev but run `next build` and serve the static output to confirm no classes are missing
- [ ] **SVG logo animation:** Plays correctly in browser but flash/mismatch exists on hard reload of static export — test with `npx serve out` after build
- [ ] **`prefers-reduced-motion`:** Animations are added but the media query override is forgotten — test with Chrome DevTools > Rendering > Emulate prefers-reduced-motion
- [ ] **Accessible SVG:** SVG logo has visual identity but `role="img"` and `aria-label` are absent — run axe DevTools before marking complete
- [ ] **Focus indicators:** Hover states look good but focus-visible states are absent — tab through the page in all major browsers before marking complete
- [ ] **LazyMotion strict mode:** `LazyMotion` wrapper is set up but `strict` prop is omitted — one mistaken `motion.*` import silently inflates the bundle

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Tailwind class purging in production | LOW | Add missing complete class strings to data objects; run `next build` to confirm; no code logic changes needed |
| Framer Motion bundle bloat after wide `motion.*` adoption | HIGH | Requires replacing every `motion.X` with `m.X`, setting up `LazyMotion` wrapper, and auditing all animation feature usage — the earlier this is done, the cheaper |
| Missing `"use client"` after extraction | LOW | Add directive to the extracted file; verify build passes |
| SVG hydration flash after logo introduction | MEDIUM | Switch SVG animation from Framer Motion to CSS keyframes, or add `suppressHydrationWarning` and a deferred state — requires retesting animation behavior |
| Contrast failures flagged by accessibility audit | LOW-MEDIUM | Update gray scale values in the affected component; no architectural changes needed |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Tailwind class purging | Component extraction phase (before moving data objects to separate files) | Run `next build && npx serve out` and visually verify all colors render |
| Framer Motion bundle size | First phase that introduces any `motion.*` component | Bundle analyzer before/after; `LazyMotion strict` throws if misconfigured |
| Missing `"use client"` | Component extraction phase | `next build` fails loudly if directive is missing |
| SVG hydration mismatch | Hero / brand identity phase (SVG logo introduction) | Test on `next build` output, not `next dev` |
| Contrast failures | Typography / visual hierarchy phase | Run Lighthouse accessibility audit before phase sign-off |
| Missing `prefers-reduced-motion` | Visual polish / animation phase | DevTools emulation + manual OS setting test |
| Missing focus indicators | Any phase touching interactive elements | Tab-through test on built output |

---

## Sources

- [Motion docs — Reduce bundle size (LazyMotion)](https://motion.dev/docs/react-reduce-bundle-size)
- [Tailwind CSS — Detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files)
- [Tailwind dynamic class names pitfalls — Tailkits](https://tailkits.com/blog/tailwind-dynamic-classes/)
- [Tailwind safelist and purging troubleshooting — Mindful Chase](https://www.mindfulchase.com/explore/troubleshooting-tips/front-end-frameworks/troubleshooting-tailwind-css-class-purging-in-production-builds.html)
- [Framer Motion + Next.js 14 — `use client` workaround](https://medium.com/@dolce-emmy/resolving-framer-motion-compatibility-in-next-js-14-the-use-client-workaround-1ec82e5a0c75)
- [Next.js hydration mismatch causes and fixes — OneUptime](https://oneuptime.com/blog/post/2026-01-24-fix-hydration-mismatch-errors-nextjs/view)
- [CSS backdrop-filter performance — shadcn/ui issue thread](https://github.com/shadcn-ui/ui/issues/327)
- [Glassmorphism implementation and performance guide 2025](https://playground.halfaccessible.com/blog/glassmorphism-design-trend-implementation-guide)
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [WCAG 2.3.3 Animation from Interactions — W3C WAI](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Accessible SVGs — Deque](https://www.deque.com/blog/creating-accessible-svgs/)
- [SVG Animation Encyclopedia 2025 — SVG AI](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide)
- Codebase inspection: `/home/vault-app/portal/app/page.tsx`, `globals.css`, `tailwind.config.ts`, `next.config.mjs`, `package.json`

---
*Pitfalls research for: Next.js static portal refactor + SVG animation + component extraction*
*Researched: 2026-03-26*
