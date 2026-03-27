# Codebase Structure

**Analysis Date:** 2025-05-15

## Directory Layout

```
portal/
├── app/                # Main application logic (Next.js App Router)
│   ├── fonts/          # Local font assets
│   ├── globals.css     # Global Tailwind styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main landing page & portal logic
├── out/                # Build output (Static Export)
├── public/             # Static assets (logos, icons)
├── next.config.mjs     # Next.js configuration
├── tailwind.config.ts  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## Directory Purposes

**app/:**
- Purpose: Root of the Next.js App Router.
- Contains: Layouts, pages, components, and styling.
- Key files: `app/page.tsx` (the entire landing page), `app/layout.tsx`.

**public/:**
- Purpose: Stores static assets.
- Contains: SVG icons, PNG logos, and other publicly accessible files.
- Key files: `public/logo-sofix.svg`, `public/logo-sofi.png`.

**out/:**
- Purpose: Result of the static build process (`npm run build`).
- Contains: Static HTML, CSS, and JS files.
- Key files: `out/index.html`.

## Key File Locations

**Entry Points:**
- `app/page.tsx`: Main entry point for the portal's UI.

**Configuration:**
- `next.config.mjs`: Next.js export settings (`output: "export"`).
- `tailwind.config.ts`: Visual configuration and theme extensions.
- `tsconfig.json`: TypeScript compiler rules.

**Core Logic:**
- `app/page.tsx`: Contains all UI components and platform metadata.

**Testing:**
- Not detected in the current structure.

## Naming Conventions

**Files:**
- Kebab-case for configuration: `next.config.mjs`, `tailwind.config.ts`.
- Standard Next.js patterns: `layout.tsx`, `page.tsx`, `globals.css`.

**Directories:**
- Kebab-case or standard Next.js: `app/`, `public/`, `out/`.

## Where to Add New Code

**New Feature/Section:**
- Primary code: `app/page.tsx` (or extract to `app/components/` for scalability).
- Shared styles: `app/globals.css`.

**New Platform/Service:**
- Data: Add to `platforms` constant in `app/page.tsx`.
- Assets: Place logos in `public/`.

**Utilities/Helpers:**
- Shared logic: Create a `lib/` directory under `app/` (e.g., `app/lib/utils.ts`).

## Special Directories

**out/:**
- Purpose: Contains the production-ready static site.
- Generated: Yes
- Committed: No (typically excluded in `.gitignore`).

**node_modules/:**
- Purpose: Third-party dependencies.
- Generated: Yes (via `npm install`)
- Committed: No

---

*Structure analysis: 2025-05-15*
