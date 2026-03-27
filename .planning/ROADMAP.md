# Roadmap: SOFI Data Ecosystem Portal

## Overview

Three phases that transform a monolithic Next.js page into a polished, brand-anchored demo portal. Phase 1 eliminates the technical debt that would otherwise slow every subsequent change. Phase 2 delivers the visual identity — ecosystem logo, redesigned hero, typography hierarchy, and micro-interactions — that makes the first impression match product quality. Phase 3 adds the highest-value differentiator: a role-based use case showcase that tells each persona exactly why the ecosystem matters to them.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Extrair page.tsx monolítico em camadas data/, components/ui/, components/sections/, components/platform/
- [ ] **Phase 2: Identidade Visual** - Logo SVG do ecossistema, redesign do hero, hierarquia tipográfica e micro-interações polidas
- [ ] **Phase 3: Casos de Uso** - Showcase de personas por plataforma com framing problema/solução e tab switcher animado

## Phase Details

### Phase 1: Foundation
**Goal**: Codebase decomposta em camadas limpas — data, primitivas UI, seções e componentes de plataforma — com page.tsx reduzido a composição pura e next build passando após cada extração
**Depends on**: Nothing (first phase)
**Requirements**: ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05, ARCH-06, ARCH-07, ARCH-08
**Success Criteria** (what must be TRUE):
  1. `app/page.tsx` contém apenas imports e JSX de composição — sem dados inline, sem lógica de componente
  2. Todos os dados de conteúdo existem em arquivos `app/data/*.ts` com interfaces TypeScript explícitas
  3. Primitivas UI (`Section`, `StatusDot`, `AnimatedCounter`) existem em `components/ui/` sem conhecimento de domínio
  4. Cada seção da página existe como arquivo próprio em `components/sections/`; sub-componentes de plataforma em `components/platform/`
  5. `next build` passa sem erros e o static export funciona localmente — verificado após cada passo de extração
**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md — Extract data layer (app/data/*.ts) and run Gate 1 build
- [x] 01-02-PLAN.md — Extract UI primitives (components/ui/) and run Gate 2 build
- [x] 01-03-PLAN.md — Extract platform sub-components (components/platform/) and run Gate 3 build
- [x] 01-04-PLAN.md — Extract all sections (components/sections/), reduce page.tsx, run Gate 4 build

**UI hint**: yes

### Phase 2: Identidade Visual
**Goal**: Portal apresenta identidade visual coesa do SOFI Data Ecosystem — logo animado, hero com impacto imediato, hierarquia tipográfica clara e micro-interações que refletem qualidade do produto
**Depends on**: Phase 1
**Requirements**: BRAND-01, BRAND-02, BRAND-03, BRAND-04, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, POLISH-01, POLISH-02, POLISH-03, POLISH-04, POLISH-05, POLISH-06
**Success Criteria** (what must be TRUE):
  1. Logo SVG do ecossistema ("S" / infinity) renderiza em navbar, hero e favicon; animação de draw-on via CSS `stroke-dashoffset` funciona sem hydration mismatch no static export
  2. Hero apresenta headline em Inter 800, subtítulo com proof point objetivo e dois CTAs visíveis — um por plataforma com cores correspondentes (indigo/rose)
  3. Seções principais têm eyebrow labels (`PLATAFORMAS`, `COMO FUNCIONA`, `ECOSSISTEMA`); todo texto informacional usa no mínimo `text-gray-400`
  4. Cards de plataforma exibem elevação + border glow na cor da plataforma ao hover; stats exibem uma linha de micro-contexto abaixo de cada contador
  5. `prefers-reduced-motion` pausa animações contínuas; `next build` produz static export sem erros; Lighthouse não reporta falhas de contraste WCAG AA
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md — Create EcosystemLogo SVG component, LazyMotionProvider, favicon, and reduced-motion CSS
- [x] 02-02-PLAN.md — Add eyebrow labels to sections, fix text contrast, verify card hover glow and stat sublabels
- [x] 02-03-PLAN.md — Redesign hero with logo, dual CTAs, proof-point subtitle; integrate logo into navbar; final build gate

**UI hint**: yes

### Phase 3: Casos de Uso
**Goal**: Visitante consegue se identificar com um perfil de usuário concreto em cada plataforma — entende o problema específico do seu papel e como a plataforma o resolve, com transições de persona fluidas e sem dependência de estado externo
**Depends on**: Phase 2
**Requirements**: UC-01, UC-02, UC-03, UC-04, UC-05, UC-06, UC-07
**Success Criteria** (what must be TRUE):
  1. SOFIX Engine exibe 3 personas (QA Engineer, Data Engineer, Compliance Officer) e SOFI Virtualization exibe 3 personas (Analyst, Data Architect, BI Developer) — cada uma com ícone de papel, headline de problema, solução em 1 linha e 1-2 features da plataforma
  2. Seletor de aba com indicador animado via Framer Motion `layoutId` permite trocar personas sem flash de conteúdo — transição usa `AnimatePresence`
  3. Todo o conteúdo de personas está em `app/data/use-cases.ts`; o componente JSX não contém dados inline
  4. Cores das personas seguem identidade da plataforma — indigo para SOFIX, rose para Virtualization — usando strings literais completas de Tailwind
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 4/4 | Complete |  |
| 2. Identidade Visual | 0/3 | Not started | - |
| 3. Casos de Uso | 0/TBD | Not started | - |
