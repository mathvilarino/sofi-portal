# Requirements: SOFI Data Ecosystem Portal

**Defined:** 2026-03-26
**Core Value:** O visitante entende o SOFI Data Ecosystem em segundos e sabe exatamente para qual plataforma navegar — com confiança e impacto visual que reflete a qualidade do produto.

## v1 Requirements

### Architecture (ARCH) — Refatoração da base

- [x] **ARCH-01**: Dados das plataformas extraídos para `app/data/platforms.ts` com interface TypeScript
- [x] **ARCH-02**: Dados de stats, ecosystemFeatures, howItWorks extraídos para arquivos `app/data/*.ts`
- [x] **ARCH-03**: Primitivas UI (`Section`, `StatusDot`, `AnimatedCounter`) extraídas para `components/ui/`
- [x] **ARCH-04**: Cada seção da página extraída para arquivo próprio em `components/sections/`
- [x] **ARCH-05**: Sub-componentes de plataforma (`PlatformCard`, mockups) extraídos para `components/platform/`
- [x] **ARCH-06**: `app/page.tsx` reduzido a composição pura (imports + JSX, sem data inline)
- [x] **ARCH-07**: `next build` passa sem erros após cada extração (gate obrigatório)
- [x] **ARCH-08**: Todas as classes Tailwind permanecem como strings literais completas (sem template literals dinâmicos)

### Brand (BRAND) — Identidade visual do ecossistema

- [ ] **BRAND-01**: Logo SVG do SOFI Data Ecosystem criado (conceito "S" / infinity, baseado em stroke para animação)
- [ ] **BRAND-02**: Logo animado com CSS `stroke-dashoffset` keyframe (sem hidration mismatch)
- [ ] **BRAND-03**: Logo renderiza corretamente em 3 tamanhos: navbar (24px), hero (80px), favicon
- [ ] **BRAND-04**: `LazyMotion` + `domAnimation` configurado antes de qualquer uso de `motion.*`

### Hero (HERO) — Seção principal redesenhada

- [x] **HERO-01**: Headline principal em Inter 800 com hierarquia de peso clara (hero > subtítulo > body)
- [x] **HERO-02**: Subtítulo com proof point objetivo (sem jargão genérico)
- [x] **HERO-03**: Dois CTAs visíveis no hero: um por plataforma com cores correspondentes (indigo/rose)
- [x] **HERO-04**: Logo do ecossistema presente e visualmente ancorado no hero
- [x] **HERO-05**: Layout responsivo preservado em mobile, tablet e desktop

### Polish (POLISH) — Refinamento visual e tipográfico

- [x] **POLISH-01**: Eyebrow labels adicionados às seções principais (`PLATAFORMAS`, `COMO FUNCIONA`, `ECOSSISTEMA`)
- [x] **POLISH-02**: Texto informacional usa no mínimo `text-gray-400` (WCAG AA em fundo escuro)
- [x] **POLISH-03**: Hover nos cards de plataforma: elevação + border glow com cor da plataforma (indigo/rose)
- [x] **POLISH-04**: Stats com micro-contexto: uma linha de referência abaixo de cada contador
- [ ] **POLISH-05**: `prefers-reduced-motion` implementado — animações contínuas pausam via `@media`
- [x] **POLISH-06**: `next build` produz output sem erros e static export funciona localmente

### Use Cases (UC) — Showcase de casos de uso por papel

- [ ] **UC-01**: SOFIX Engine apresenta 3 personas: QA Engineer, Data Engineer, Compliance Officer
- [ ] **UC-02**: SOFI Virtualization apresenta 3 personas: Analyst, Data Architect, BI Developer
- [ ] **UC-03**: Cada persona tem: ícone de papel, headline do problema, solução em 1 linha, 1–2 features da plataforma
- [ ] **UC-04**: Seletor de persona por aba com indicador animado via Framer Motion `layoutId`
- [ ] **UC-05**: Conteúdo das personas em `app/data/use-cases.ts` (separado do componente JSX)
- [ ] **UC-06**: Transição entre personas usa `AnimatePresence` (sem flash de conteúdo)
- [ ] **UC-07**: Cores das personas seguem identidade da plataforma (indigo para SOFIX, rose para Virtualization)

## v2 Requirements

### Ecosystem Visual

- **ECO-01**: Visual animado de "fluxo de dados" no hero (SVG/canvas abstrato do ecossistema)
- **ECO-02**: Elemento visual de "connective tissue" entre os dois cards de plataforma ("Use juntos ou separados")

### Connectors

- **CONN-01**: Grade amostral de logos de conectores (evidência visual para o stat "40+ conectores")

### Interactivity

- **INT-01**: Tour interativo do produto com screenshots/GIFs embutidos por plataforma

## Out of Scope

| Feature | Reason |
|---------|--------|
| Autenticação / login | Portal estático, sem backend |
| Formulário de contato | Aumenta fricção no fluxo de demo |
| Toggle dark/light mode | Dark mode é a identidade do produto |
| Toggle de idioma | Audiência é pt-BR |
| Vídeo autoplay no hero | Peso + distração em demo presencial |
| Cookie consent banner | Sem tracking, sem necessidade |
| Chatbot / chat ao vivo | Fora de escopo para portal estático |
| Upgrade para Next.js 15 / Tailwind v4 | Mudança de stack, risco sem benefício neste milestone |
| Mobile app | Web-first |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ARCH-01 | Phase 1 | Complete |
| ARCH-02 | Phase 1 | Complete |
| ARCH-03 | Phase 1 | Complete |
| ARCH-04 | Phase 1 | Complete |
| ARCH-05 | Phase 1 | Complete |
| ARCH-06 | Phase 1 | Complete |
| ARCH-07 | Phase 1 | Complete |
| ARCH-08 | Phase 1 | Complete |
| BRAND-01 | Phase 2 | Pending |
| BRAND-02 | Phase 2 | Pending |
| BRAND-03 | Phase 2 | Pending |
| BRAND-04 | Phase 2 | Pending |
| HERO-01 | Phase 2 | Complete |
| HERO-02 | Phase 2 | Complete |
| HERO-03 | Phase 2 | Complete |
| HERO-04 | Phase 2 | Complete |
| HERO-05 | Phase 2 | Complete |
| POLISH-01 | Phase 2 | Complete |
| POLISH-02 | Phase 2 | Complete |
| POLISH-03 | Phase 2 | Complete |
| POLISH-04 | Phase 2 | Complete |
| POLISH-05 | Phase 2 | Pending |
| POLISH-06 | Phase 2 | Complete |
| UC-01 | Phase 3 | Pending |
| UC-02 | Phase 3 | Pending |
| UC-03 | Phase 3 | Pending |
| UC-04 | Phase 3 | Pending |
| UC-05 | Phase 3 | Pending |
| UC-06 | Phase 3 | Pending |
| UC-07 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 after initial definition*
