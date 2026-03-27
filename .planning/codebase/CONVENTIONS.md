# Coding Conventions

**Analysis Date:** 2026-03-25

## Naming Patterns

**Files:**
- Component/page files: `PascalCase` (e.g., `layout.tsx`, `page.tsx`)
- Configuration files: lowercase with hyphens (e.g., `next.config.mjs`, `tailwind.config.ts`)
- CSS files: lowercase with hyphens (e.g., `globals.css`)

**Functions:**
- Component functions: `PascalCase` (e.g., `Portal`, `StatusDot`, `SofixMockup`)
- Custom hooks: `camelCase` with `use` prefix (e.g., `useInView`)
- Helper/utility functions: `camelCase` (e.g., `check`, `onScroll`)
- Callback handlers: `camelCase` prefixed with `on` (e.g., `onScroll`, `onIntersecting`)

**Variables:**
- React state: `camelCase` (e.g., `status`, `visible`, `hoveredCard`, `scrolled`)
- Data arrays: `camelCase` plural (e.g., `platforms`, `stats`, `ecosystemFeatures`, `howItWorks`, `architectureLayers`, `comparisonData`)
- Constants: `camelCase` when assigned to const (e.g., `colors`, `labels`, `inter`, `jetbrainsMono`)
- Type union variables: `camelCase` with status values in strings (e.g., `status: "checking" | "online" | "offline"`)

**Types:**
- React component props: `PascalCase` with `Props` suffix or inline destructured types
- Type aliases: `camelCase` when describing arrays/objects used in data (e.g., `comparisonData: [string, boolean, boolean][]`)
- Metadata exports: `camelCase` (e.g., `metadata`)

## Code Style

**Formatting:**
- No explicit formatter configured (Prettier not present)
- Uses TypeScript with strict mode enabled
- JSX preserved (not transformed)
- Post-CSS with Tailwind CSS for styling

**Linting:**
- ESLint configured via `.eslintrc.json`
- Extends `next/core-web-vitals` and `next/typescript`
- Run with: `npm run lint` (runs `next lint`)

**Key settings from tsconfig.json:**
- `strict: true` - Strict type checking enabled
- `moduleResolution: "bundler"` - Modern module resolution
- Path aliases: `@/*` maps to project root
- Module system: `esnext`
- JSX: `preserve` (Next.js handles JSX compilation)

## Import Organization

**Order:**
1. React/Next.js imports (e.g., `import { useState, useEffect } from "react"`)
2. Next.js specific imports (e.g., `import Image from "next/image"`)
3. Icon library imports (e.g., `import { Database, Shield, ... } from "lucide-react"`)
4. Relative CSS imports (e.g., `import "./globals.css"`)

**Path Aliases:**
- `@/*` - Resolves to project root, used in `tsconfig.json` (defined but not currently used in source code)

**Example from `/home/vault-app/portal/app/page.tsx`:**
```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Database,
  Shield,
  Layers,
  // ... more icon imports
} from "lucide-react";
```

## Error Handling

**Patterns:**
- Try-catch blocks used in async operations (e.g., status checking in `StatusDot` component)
- Silent error handling with status fallback (catch blocks set error states without throwing)
- Example from `StatusDot`:
```typescript
try {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  await fetch(url, { mode: "no-cors", signal: controller.signal });
  clearTimeout(timeout);
  setStatus("online");
} catch {
  setStatus("offline");
}
```

## Logging

**Framework:** `console` (built-in JavaScript logging)

**Patterns:**
- No explicit logging statements found in source code
- Uses React component state to track status (`"checking"` → `"online"` → `"offline"`)
- Status updates handled via state setters, not console output

## Comments

**When to Comment:**
- Section headers using box drawing characters (e.g., `/* ═══════════════════════════════════════════════ DATA ═══════════════════════════════════════════════ */`)
- Organize major sections: DATA, COMPONENTS, PAGE, FEATURES, etc.
- Inline comments rare; code intended to be self-documenting

**JSDoc/TSDoc:**
- Not used in current codebase
- Type information relies on TypeScript inline annotations

## Function Design

**Size:**
- Components range from small (e.g., `StatusDot` ~40 lines) to large (e.g., `Portal` ~500 lines)
- Inline render logic preferred in main components
- Extracted smaller components for UI mockups (e.g., `SofixMockup`, `SofiMockup`)

**Parameters:**
- React components use destructured props: `function StatusDot({ url }: { url: string })`
- Custom hooks take optional parameters: `function useInView(threshold = 0.15)`
- Props typed inline rather than via separate interface

**Return Values:**
- Components return JSX elements
- Custom hooks return objects or arrays: `return { ref, visible }`
- Functions return JSX wrapped in fragments: `return <>{count}{suffix}</>`

## Module Design

**Exports:**
- Default export for page components: `export default function Portal()`
- Default export for metadata: `export const metadata: Metadata = { ... }`
- All components defined in same file (no separate component files)

**Barrel Files:**
- Not used (no `/index.ts` or `/index.tsx` files)
- Each file contains complete, self-contained functionality

## Component Patterns

**React Client Components:**
- Use `"use client"` directive at top of file (e.g., `app/page.tsx`)
- Server components used for layout (e.g., `app/layout.tsx`)

**React Hooks:**
- `useState` for state management (component-level only)
- `useEffect` for side effects (data fetching, observers, listeners)
- `useRef` for DOM access and non-state values
- Custom hook pattern: `function useInView()` to encapsulate logic

**Tailwind CSS:**
- Inline class composition using template literals: `` `flex items-center gap-1.5 text-[11px] ${colors[status].text}` ``
- Conditional classes via ternary operators or object mapping
- Color utilities: `text-indigo-400`, `bg-rose-500/10`, `border-white/[0.06]`
- Opacity modifiers: `/10`, `/20`, `/[0.04]`, `/[0.06]`
- Spacing: `gap-1.5`, `px-6`, `py-3`, `mb-4`

**Data-Driven Rendering:**
- Large data arrays at top of file (platforms, stats, features)
- `.map()` to render list items
- Type annotations for array shapes: `comparisonData: [string, boolean, boolean][]`

---

*Convention analysis: 2026-03-25*
