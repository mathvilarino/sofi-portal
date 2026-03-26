# Feature Research

**Domain:** B2B SaaS data platform ecosystem portal (demo/sales presentation, multi-product navigation)
**Researched:** 2026-03-26
**Confidence:** MEDIUM-HIGH (multiple web sources verified; no Context7 applicable — this is UX/marketing research not library docs)

---

## Context: What This Portal Is

This is a static, internal-facing demo portal for the SOFI Data Ecosystem — two complementary platforms (SOFIX Engine and SOFI Virtualization) presented to prospects and customers. It is NOT a signup funnel or e-commerce portal. The goal is: visitor understands the ecosystem in seconds, knows which platform fits their need, and navigates with confidence. All feature decisions must serve this goal.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that visitors to a B2B data platform portal assume exist. Missing these makes the portal feel unfinished or untrustworthy to a technical audience.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear ecosystem-level headline (what is this?) | Technical buyers form first impression in under 5 seconds; no headline = no anchor | LOW | Must be outcome-focused, under 8 words. "O ecossistema de dados que não move dados" or equivalent |
| Ecosystem brand mark / logo | Every product has a visual identity; no logo signals incomplete brand or prototype | LOW | SVG inline preferred; "S" infinity concept already scoped. Must live in hero |
| Platform differentiation (what's each platform for?) | Two products exist; visitor must instantly know which to pick | LOW | Cards already exist; complement with a decisor signal in hero ("CDC? → SOFIX. Analytics? → Virtualization.") |
| Visual product identity per platform | Distinct colors/icons prevent confusion between SOFIX Engine and SOFI Virtualization | LOW | Butterfly + indigo/purple and cocker spaniel + rose/pink already defined |
| Live status indicators | Technical audiences expect real-time availability for internal tools | LOW | Already implemented (health check dots). Must remain visible and meaningful |
| How-it-works section | Buyers need a mental model before evaluating features; "what is the workflow?" | MEDIUM | Already exists (4 steps). Ensure it's architecturally accurate and sequenced correctly |
| Concrete metrics (quantified value) | Data teams are metric-driven; vague claims lose credibility | LOW | Stats section already exists (40+ connectors, 0% data copied, 10x faster, 100% API Ready). Keep and polish |
| Platform features list | Technical stakeholders validate feature coverage before a demo; no list = friction | LOW | Feature cards per platform already exist |
| Navigation / scroll anchors | Long pages need orientation so visitors can jump to relevant section | LOW | Simple in-page anchor links |
| Responsive layout | Demos may be presented on tablets or projected; degradation is visible to buyers | MEDIUM | Already implemented. Verify on common demo device sizes |
| Portuguese (pt-BR) throughout | Internal audience; language switching would be disorienting in a demo context | LOW | Currently pt-BR. Do not introduce English strings |

### Differentiators (Competitive Advantage)

Features that elevate the portal from "functional" to "impressive." These directly support the demo context where visual impact is part of the sale.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Role-based use case showcase (persona cards) | Different stakeholders attend demos — QA lead, Data Engineer, Compliance officer, Analyst, Architect, BI Developer. Each needs to recognize their own problem in seconds | MEDIUM | Tab switcher or card grid per platform. SOFIX: QA / Data Engineer / Compliance. Virtualization: Analyst / Architect / Engineer. Show role avatar/icon + problem statement + how platform solves it |
| Scenario-driven narrative (business problem → solution) | Feature lists do not sell; business outcomes do. "Before/After" framing converts skeptics | MEDIUM | Each use case card: Problem headline (e.g., "Seu ambiente de produção vaza para os testes") → Solution in 1 line → 1-2 platform features that solve it |
| Hero section with visual ecosystem identity | First 5 seconds determine engagement; a weak hero undermines everything below it | MEDIUM | Ecosystem logo + bold outcome headline + supporting subheadline with proof point + single CTA per platform. Animated background or particle/gradient that evokes data flow without being noisy |
| Animated ecosystem concept visual | Abstract data flow visualization (not a product screenshot) communicates sophistication and fits the "no data copying" narrative | HIGH | Framer Motion SVG animation or canvas-based; must be subtle and not block hero content. Risk: complexity vs. polish |
| Micro-interactions on platform cards | Hover states, elevation, subtle glow matching platform color (indigo/rose) signal quality craftsmanship to technical buyers | LOW | Already have Framer Motion. Add hover scale + border glow on platform cards |
| Ecosystem "connective tissue" visual | Show SOFIX Engine and SOFI Virtualization as complementary (not competing) platforms; buyer should feel "I might need both" | MEDIUM | Small ecosystem diagram or connecting arrow/bridge element between platform cards. Text: "Use juntos ou separados" |
| Stats section polish (animated counters + context) | Bare numbers without context ("10x mais rápido... do que quê?") are weaker than numbers with brief context anchors | LOW | Add micro-label under each stat: e.g., "10x mais rápido — comparado a queries diretas" |
| Section-level eyebrow labels | Small uppercase label above each section heading ("CASOS DE USO / COMO FUNCIONA / PLATAFORMAS") helps visitors scan and orient during demos | LOW | CSS-only. Common pattern in best-in-class B2B SaaS (Notion, Linear, Stripe) |
| Brand color gradient used as background texture | Data platforms with dark themes + subtle gradient backgrounds (deep navy/indigo to near-black) read as premium and technically sophisticated | LOW | Apply to hero background; keep body sections darker and cleaner to avoid fatigue |
| Accessibility — WCAG 2.1 AA contrast | Internal tools presented to prospects must not trigger "this looks broken on projectors" moments; WCAG ensures readable contrast in all lighting | LOW | Check contrast ratios on indigo/rose text-over-dark combinations |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good in brainstorming but create real problems for this specific portal.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Contact form / lead capture form | "Every landing page should have a form" | This is a demo tool, not a marketing site. Adding a form implies it's customer-facing and creates expectation of response. Maintenance burden with no backend | Use a direct platform CTA link ("Acessar SOFIX Engine") instead. If needed, a simple mailto: link |
| Authentication / login gate | "Protect demo content from competitors" | Static site constraint; also kills demo flow. The content is meant to be shown, not hidden | If security is needed, deploy behind VPN/network access control instead |
| Language toggle (pt-BR / en) | "International clients" | Doubles content maintenance; risk of untranslated strings; current audience is pt-BR. Out of scope | If multilingual is needed later, build as a separate deploy target |
| Full product screenshots / embedded app iframes | "Show the real product" | Heavy assets slow page load (must stay under 2.5s LCP); iframes are fragile over internal IPs; screenshots go stale | Use stylized mockup cards or abstract UI representations; link to live platform directly |
| Video autoplay in hero | "Video shows the product better" | Autoplaying video is distracting in demo context; mobile data heavy; increases LCP significantly; often muted = no value | Use a single compelling animation (Framer Motion) instead; if video is needed, make it explicitly user-triggered |
| Chatbot / live chat widget | "Prospects can ask questions" | Adds third-party JS weight; irrelevant for internal demo tool; creates confusion about who is responding | Human demo presenter is the "chatbot." Remove entirely |
| Dark/light mode toggle | "User preference" | Small team portal; inconsistent implementation risk; dark mode IS the brand here | Commit to dark mode only. Apply with intent |
| Infinite scroll / pagination within sections | "Show all 40+ connectors" | Connector logos add visual noise without adding value in demo context; decision makers don't need the full list | Keep the stat ("40+ conectores") and show 6-8 logos maximum as a sample grid |
| Cookie consent banner | "GDPR compliance" | Portal is served internally (no external tracking); cookie banner breaks demo-first experience | Do not add external analytics or tracking. If needed later, add privacy-respecting analytics (Plausible/Fathom) with no banner requirement |

---

## Feature Dependencies

```
[Ecosystem Brand Mark / Logo]
    └──required by──> [Hero Section Visual Identity]
                          └──enhances──> [Platform Visual Identity]

[Role-Based Use Case Personas]
    └──requires──> [Platform Differentiation (cards)]
    └──enhances──> [Scenario-Driven Narrative]

[Scenario-Driven Narrative]
    └──requires──> [Role-Based Use Case Personas]
    └──enhances──> [Platform Features List]

[Hero Section]
    └──requires──> [Ecosystem Brand Mark / Logo]
    └──requires──> [Clear Ecosystem Headline]
    └──enhanced by──> [Animated Ecosystem Visual]
    └──enhanced by──> [Brand Color Gradient Background]

[Animated Ecosystem Visual]
    └──conflicts──> [Video Autoplay in Hero] (both compete for hero attention)

[Stats Section Polish]
    └──enhances──> [Concrete Metrics]

[Ecosystem Connective Tissue Visual]
    └──enhances──> [Platform Differentiation]
    └──requires──> [Ecosystem Brand Mark / Logo]

[Live Status Indicators]
    └──independent (existing, keep)

[Responsive Layout]
    └──required by──> ALL sections (foundational)
```

### Dependency Notes

- **Hero requires brand mark:** The ecosystem logo is the anchor of the hero section; it cannot be designed without it. Logo must be done first.
- **Use case personas require platform cards:** Personas are a layer on top of the existing platform card structure; cards must remain stable before adding persona overlays.
- **Scenario narrative enhances personas:** Each persona card gains depth when it includes a concrete "before/after" business scenario; they can be built together but persona tab structure comes first.
- **Animated visual conflicts with video:** Do not attempt both in the hero — they compete for the same visual real estate and cognitive attention.

---

## MVP Definition

### Launch With (this milestone)

Minimum viable improvement — what the improvement milestone must deliver to be "done."

- [ ] Ecosystem brand mark / logo (SVG inline, animatable) — hero has no anchor without it
- [ ] Hero section redesign — outcome headline + subheadline with proof + dual platform CTAs + logo — first impression is currently generic
- [ ] Role-based use case showcase — at least 3 personas per platform with problem statement + solution — this is the explicit requirement in PROJECT.md
- [ ] Typography and visual hierarchy polish — eyebrow labels, consistent heading scale, improved spacing
- [ ] Micro-interactions on platform cards — hover states, color glow — low effort, high perceived quality signal
- [ ] Stats section micro-context labels — minimal effort, increases credibility of existing stats

### Add After Validation (v1.x)

Features to add once core improvement is deployed and seen in a demo context.

- [ ] Animated ecosystem concept visual in hero — validate that the hero without it is compelling enough first; animation adds complexity
- [ ] Ecosystem "connective tissue" visual between platform cards — useful if buyers express confusion about which platform to use
- [ ] Code refactor (extract components from page.tsx) — important for maintainability but invisible to end users; defer if timeline is tight

### Future Consideration (v2+)

- [ ] Connector logo sample grid — only if "40+ conectores" stat feels unbelievable without visual evidence
- [ ] Interactive product tour / embedded demo — needs stability of platform IPs and significant build effort; out of scope for static portal

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Ecosystem brand mark / logo | HIGH | LOW | P1 |
| Hero section redesign | HIGH | MEDIUM | P1 |
| Role-based use case personas | HIGH | MEDIUM | P1 |
| Typography and visual hierarchy | HIGH | LOW | P1 |
| Micro-interactions on platform cards | MEDIUM | LOW | P1 |
| Stats section micro-context labels | MEDIUM | LOW | P1 |
| Animated ecosystem visual (hero) | MEDIUM | HIGH | P2 |
| Ecosystem connective tissue visual | MEDIUM | MEDIUM | P2 |
| Code component extraction (refactor) | LOW (UX) / HIGH (DX) | MEDIUM | P2 |
| Connector logo sample grid | LOW | LOW | P3 |
| Interactive product tour | HIGH | HIGH | P3 |

**Priority key:**
- P1: Must have for this milestone
- P2: Should have, add when possible within milestone
- P3: Nice to have, future milestone

---

## Competitor / Reference Pattern Analysis

Research on best-in-class B2B data platform portals reveals these recurring patterns:

| Pattern | Who Uses It | How They Do It | Our Approach |
|---------|-------------|----------------|--------------|
| Persona-segmented use cases | Databricks, dbt, Fivetran, Snowflake | Separate landing pages per persona (DEs, Analysts, Architects) | Single-page tab/card switcher per platform; personas shown inline to keep demo flow intact |
| Story-driven hero with outcome headline | Linear, Notion, Stripe | Narrative headline (<8 words) + visual proof + single CTA | Ecosystem headline + "sem mover dados" proof point + dual CTA (one per platform) |
| Dark theme + gradient background | Vapi.ai, Glyphic, Tive, most 2025 data tools | Near-black base + soft mesh gradient in hero + color accents | Commit to dark (already done) + deepen hero gradient with brand indigo/purple ambient light |
| Animated stats with context | Most data SaaS (Airbyte, Fivetran, Hightouch) | Bold number + 1-line context below (what it compares to) | Add micro-label to existing counter stats |
| Eyebrow section labels | Stripe, Linear, Vercel, Notion | Small uppercase label above each section headline | Add to all major sections: ECOSSISTEMA / PLATAFORMAS / CASOS DE USO / COMO FUNCIONA |
| Social proof close to CTA | Flow Agency research, CXL, SaaSHero | Customer logos / specific metrics right above or below CTA button | Stats block placed near platform CTAs; health indicators as real-time proof |
| Micro-interactions on cards | Linear, Vercel, Raycast | Hover: subtle elevation + border glow matching brand color | Tailwind hover + Framer Motion on platform cards |
| "Which one is for me?" decision aid | Appcues, Intercom, HubSpot | Role selector or comparison table near top | Brief decisor callout in hero: "Virtualização de dados? → SOFIX. Analytics self-service? → SOFI Virtualization" |

---

## Sources

- [Top SaaS Landing Page Trends 2026 — SaaSFrame](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples) — MEDIUM confidence (direct page read)
- [B2B SaaS Landing Page Best Practices 2026 — Genesys Growth](https://genesysgrowth.com/blog/designing-b2b-saas-landing-pages) — MEDIUM confidence (direct page read)
- [SaaS Hero Section Best Practices — Tenet](https://www.wearetenet.com/blog/saas-hero-section-best-practices) — MEDIUM confidence (direct page read, 28-site study)
- [High-Performing B2B SaaS Landing Page — Flow Agency](https://www.flow-agency.com/blog/b2b-saas-landing-page-best-practices/) — MEDIUM confidence (direct page read)
- [Top Landing Page Design Trends for B2B SaaS 2026 — SaaS Hero](https://www.saashero.net/content/top-landing-page-design-trends/) — LOW-MEDIUM confidence (search result)
- [22 Best B2B Hero Sections — SaaS Websites](https://saaswebsites.com/22-best-b2b-hero-sections-on-saas-homepage/) — LOW confidence (403 error, citation from search summary)
- [Dark Mode Gradients 2025 — AtomicSocial](https://atomicsocial.com/dark-mode-gradients-and-color-trends-in-2025-web-design/) — MEDIUM confidence (direct page read)
- [Make Dark Mode Work for Your SaaS — SaaSFrame](https://www.saasframe.io/blog/make-dark-mode-work-for-your-saas) — LOW confidence (search result)
- [B2B SaaS Aesthetics 2025 — Influencers Time](https://www.influencers-time.com/aesthetics-a-key-lead-gen-lever-in-b2b-saas-2025/) — LOW confidence (search result)
- [Social Proof in B2B SaaS Ads — SaaS Hero](https://www.saashero.net/strategy/social-proof-b2b-saas-ads/) — LOW confidence (search result)
- [SaaS Landing Page Conversion System 2026 — Unicorn Platform](https://unicornplatform.com/blog/saas-landing-page-conversion-system-in-2026/) — LOW confidence (403 error, citation from search summary)
- [Interactive Demo Best Practices 2026 — Navattic](https://www.navattic.com/blog/interactive-demos) — LOW confidence (search result)

---

*Feature research for: SOFI Data Ecosystem Portal — visual and use case improvement milestone*
*Researched: 2026-03-26*
