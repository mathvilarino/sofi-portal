# Technology Stack

**Analysis Date:** 2026-03-25

## Languages

**Primary:**
- TypeScript 5.x - All application code
- JavaScript (JSX/TSX) - React components

**Secondary:**
- CSS - Styling via Tailwind CSS and global styles

## Runtime

**Environment:**
- Node.js 20.20.0

**Package Manager:**
- npm (inferred from standard npm workflow)
- Lockfile: Present (package-lock.json expected)

## Frameworks

**Core:**
- Next.js 14.2.35 - Full-stack React framework with App Router
- React 18.x - UI component library
- React DOM 18.x - DOM rendering

**Styling:**
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- PostCSS 8.x - CSS transformation and processing

**Animation:**
- Framer Motion 12.38.0 - React animation library

**UI Components:**
- Lucide React 1.0.1 - Icon library

**Build/Dev:**
- TypeScript 5.x - Type checking and compilation
- ESLint 8.x - Code linting
- ESLint Config Next 14.2.35 - Next.js specific linting rules

## Key Dependencies

**Critical:**
- next@14.2.35 - Full framework; static export configured
- react@18 - Core UI library
- tailwindcss@3.4.1 - Styling system

**UI & Animation:**
- framer-motion@12.38.0 - Complex animations and transitions
- lucide-react@1.0.1 - Icon set (~1000 icons)

**Development:**
- typescript@5 - Type safety
- @types/node@20 - Node.js type definitions
- @types/react@18 - React type definitions
- @types/react-dom@18 - React DOM type definitions
- eslint@8 - Code quality
- eslint-config-next@14.2.35 - Next.js linting config

## Configuration

**Environment:**
- No `.env` file required for development (no environment variables configured)
- All configuration hardcoded in source (suitable for static deployment)

**Build:**
- `next.config.mjs` - Next.js configuration
  - Output: `export` (static HTML export, no server runtime)
  - Images: Unoptimized (no Next.js Image Optimization)
- `tsconfig.json` - TypeScript configuration with path alias `@/*` → `./*`
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS with Tailwind plugin
- `.eslintrc.json` - ESLint configuration using `next/core-web-vitals` and `next/typescript` presets

## Platform Requirements

**Development:**
- Node.js 20.x or compatible
- npm package manager
- Git (for version control; .gitignore present)

**Production:**
- Static file serving (no Node.js required)
- Web server capable of serving HTML/CSS/JS (Apache, Nginx, S3, Vercel, Netlify, etc.)
- Language: Portuguese (pt-BR) with HTML metadata configured

---

*Stack analysis: 2026-03-25*
