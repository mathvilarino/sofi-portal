# Phase 1: Foundation - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Decompor o monolito `app/page.tsx` (~1000 linhas) em camadas limpas sem nenhuma mudança visual ou comportamental. A página deve renderizar identicamente antes e depois. `next build` deve passar após cada camada extraída.

Escopo fixo: data, primitivas UI, seções, sub-componentes de plataforma. Nenhuma feature nova, nenhuma mudança de estilo.
</domain>

<decisions>
## Implementation Decisions

### Granularidade dos componentes
- **D-01:** Extrair apenas seções principais como arquivos separados: `HeroSection`, `PlatformsSection`, `HowItWorksSection`, `EcosystemFeaturesSection`, `StatsSection`, `NavBar`, `Footer` / CTA section.
- **D-02:** Mockups (`SofixMockup`, `SofiMockup`) e `PlatformCard` ficam dentro do arquivo da seção ou em `components/platform/` — não criam nível extra de arquivos além do necessário para a seção ficar legível.
- **D-03:** Regra: se um bloco inline tem mais de ~50 linhas e é reutilizável ou independente, vira arquivo próprio. Se é só JSX local da seção, fica inline.

### Ownership do estado
- **D-04:** Estado colocado próximo ao consumidor — `page.tsx` não tem estado após extração.
- **D-05:** `hoveredCard` (state de glow nos cards) fica em `PlatformsSection.tsx`, não em `page.tsx`.
- **D-06:** `scrolled` (state de fundo do NavBar) fica em `NavBar.tsx`, não em `page.tsx`.
- **D-07:** `statsVisible` (trigger para AnimatedCounter) fica em `StatsSection.tsx` ou `AnimatedCounter` usa IntersectionObserver internamente.

### Estratégia de "use client"
- **D-08:** Cada arquivo que usa hooks ou browser APIs declara `"use client"` individualmente.
- **D-09:** Arquivos afetados: `StatusDot`, `AnimatedCounter`, `NavBar`, `PlatformsSection` (hoveredCard), qualquer seção com useEffect/useState/IntersectionObserver.
- **D-10:** `app/page.tsx` após extração pode ser Server Component (sem `"use client"` no topo) — apenas importa e compõe seções.
- **D-11:** Arquivos em `app/data/*.ts` são pure TypeScript — zero JSX, zero hooks, zero `"use client"`.

### Gate de verificação (build)
- **D-12:** Rodar `next build` após cada camada completa, não após cada arquivo:
  - Gate 1: após extrair todos os arquivos `app/data/*.ts`
  - Gate 2: após extrair todos os `components/ui/` primitivos
  - Gate 3: após extrair todos os `components/sections/` e `components/platform/`
  - Gate 4: após limpar `page.tsx` para composição pura
- **D-13:** Se o build falhar em qualquer gate, corrigir antes de continuar para a próxima camada.

### Tailwind class safety
- **D-14:** Todas as classes Tailwind nos arquivos `app/data/*.ts` devem ser strings literais completas (ex: `"bg-indigo-500/10"`) — nunca template literals ou concatenação dinâmica. Padrão já existe em `page.tsx` e deve ser preservado.

### Claude's Discretion
- Ordem exata de extração dentro de cada camada (ex: qual data file criar primeiro)
- Naming interno de props interfaces (ex: `PlatformCardProps` vs `PlatformProps`)
- Se `Section` wrapper merece arquivo próprio em `components/ui/` ou fica inline nas seções que o usam
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos da fase
- `.planning/REQUIREMENTS.md` — ARCH-01 a ARCH-08: requisitos específicos desta fase
- `.planning/ROADMAP.md` — Phase 1 success criteria e boundaries

### Codebase existente (ler antes de planejar)
- `app/page.tsx` — fonte da verdade: todos os componentes, dados e estado a serem extraídos
- `.planning/codebase/ARCHITECTURE.md` — mapa de componentes identificados
- `.planning/codebase/CONCERNS.md` — lista de tech debt e armadilhas conhecidas
- `.planning/research/ARCHITECTURE.md` — estrutura de destino detalhada (componentes, data flow, build order)
- `.planning/research/PITFALLS.md` — armadilhas específicas: Tailwind purging, "use client", SVG hydration

### Stack
- `.planning/codebase/STACK.md` — versões exatas das dependências
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/page.tsx`: contém todos os componentes inline — `StatusDot`, `AnimatedCounter`, `Section` wrapper, `SofixMockup`, `SofiMockup`, `PlatformCard` (não é componente separado ainda)
- `/public/logo-sofix.svg`, `/public/logo-sofi.png` — assets existentes não movidos nesta fase
- `app/globals.css` — estilos globais com animações custom (`animate-pulse-glow`, etc.)
- `tailwind.config.ts` — configuração de cores e keyframes

### Established Patterns
- Dados como arrays de objetos com classes Tailwind completas (ex: `platforms`, `ecosystemFeatures`, `howItWorks`, `stats`)
- `"use client"` no topo do `page.tsx` atual — toda a página é client component agora
- Framer Motion importado mas **não usado** ainda (todas as animações são CSS)
- TypeScript com path alias `@/*` → `./`

### Integration Points
- `app/layout.tsx` — não muda nesta fase
- `app/page.tsx` após extração: só importa e renderiza seções
- Componentes extraídos importam de `app/data/*.ts` para os dados
</code_context>

<specifics>
## Specific Ideas

- Extrair dados primeiro (camada `app/data/`) — desbloqueia todo o restante e é a mudança de menor risco
- Mockups do SOFIX e SOFI são complexos (~100 linhas cada) — merecem arquivos em `components/platform/` apesar da regra geral
</specifics>

<deferred>
## Deferred Ideas

Nenhuma ideia de escopo extra surgiu — discussão ficou dentro dos limites da Fase 1.
</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-27*
