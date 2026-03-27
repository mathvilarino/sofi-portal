# SOFI Data Ecosystem Portal

## What This Is

Portal de entrada do SOFI Data Ecosystem — uma página estática (Next.js) voltada para demos e apresentações a clientes. Apresenta as duas plataformas do ecossistema (SOFIX Engine e SOFI Virtualization), permite ao usuário entender o ecossistema e navegar para a plataforma desejada. A página atual já está bem estruturada; este projeto foca em melhorias visuais, identidade de marca e adição de casos de uso concretos.

## Core Value

O visitante deve entender o SOFI Data Ecosystem em segundos e saber exatamente para qual plataforma navegar — com confiança e impacto visual que reflete a qualidade do produto.

## Requirements

### Validated

- ✓ Cards das duas plataformas com features e highlights — existing
- ✓ Seção "Como funciona" (how it works) com 4 passos — existing
- ✓ Seção de ecosystem features (6 cards) — existing
- ✓ Stats animados (40+ conectores, 0% data copied, 10x mais rápido, 100% API Ready) — existing
- ✓ Health check em tempo real das plataformas — existing
- ✓ Animações com Framer Motion, layout responsivo — existing
- ✓ Logo SOFIX Engine (borboleta) e SOFI Virtualization (cocker spaniel) — existing

### Active

- [x] Hero section mais impactante com identidade visual do ecossistema — Validated in Phase 2: Identidade Visual
- [x] Logo / marca para SOFI Data Ecosystem — Validated in Phase 2: Identidade Visual
- [ ] Casos de uso por plataforma: perfis de usuário + cenários de negócio
- [x] Tipografia e hierarquia visual melhoradas — Validated in Phase 2
- [x] Animações e micro-interações mais polidas — Validated in Phase 2
- [x] Refatoração da estrutura de código (componentes e dados separados) — Validated in Phase 1: Foundation

### Out of Scope

- Backend / autenticação — portal é estático, sem login
- Mobile app — web-first
- Mudança de stack — manter Next.js + Tailwind + Framer Motion
- Redesign dos cards de plataforma — estrutura atual está boa

## Context

**Codebase atual (Phase 1 complete — 2026-03-27):**
- `app/page.tsx` 27 linhas — Server Component puro, apenas imports e JSX de composição
- Arquitetura em 4 camadas: `app/data/` (6 arquivos), `components/ui/` (3 primitivas), `components/platform/` (3 sub-componentes), `components/sections/` (10 seções)
- Stack: Next.js 14 static export, Tailwind CSS, Framer Motion, Lucide React
- URLs das plataformas hardcoded (IPs internos: 172.16.10.14)
- Idioma: Português (pt-BR)

**Identidade visual das plataformas:**
- SOFIX Engine: borboleta, gradiente indigo/purple
- SOFI Virtualization: cocker spaniel, gradiente rose/pink
- SOFI Data Ecosystem: sem logo definido — usuário considera "S" estilo infinity; sugestão alternativa a ser proposta

**Audiência:** Clientes e prospects (demos/apresentações comerciais)

**Casos de uso a cobrir (baseado nas features existentes):**
- SOFIX Engine: times de QA (ambientes de teste isolados), Data Engineers (CDC real-time, snapshots), Compliance/Legal (LGPD/GDPR masking)
- SOFI Virtualization: Analistas (self-service via NLQ), Arquitetos de dados (semantic layer, lineage), Engenheiros (API REST/OData/SQL)

## Constraints

- **Tech stack**: Next.js 14 + Tailwind + Framer Motion — não trocar
- **Deploy**: Exportação estática (sem servidor), servido internamente
- **Idioma**: Português (pt-BR)
- **Assets existentes**: Logos SVG/PNG já em `/public/`
- **URLs**: Hardcoded para IPs internos — não é bloqueio para este projeto

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Manter estrutura de cards | Usuário confirmou que já está bem feita | — Pending |
| Logo ecossistema como SVG inline | Sem dependência externa, fácil de animar | — Pending |
| Extrair componentes de page.tsx | Técnica debt identificada, facilita manutenção | — Pending |

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-26 after initialization*
