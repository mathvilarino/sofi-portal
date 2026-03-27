# External Integrations

**Analysis Date:** 2026-03-25

## APIs & External Services

**SOFIX Engine Platform:**
- UI URL: `http://172.16.10.14:3000`
- API URL: `http://172.16.10.14:8000`
- Status: Health check via CORS-enabled fetch request
- Purpose: Data virtualization with VDBs, snapshots, CDC, data masking
- Location: `app/page.tsx` (hardcoded platform configuration)

**SOFI Virtualization Platform:**
- UI URL: `http://172.16.10.14:3010`
- API URL: `http://172.16.10.14:8010`
- Status: Health check via CORS-enabled fetch request
- Purpose: Semantic catalog layer with Design Studio, lineage tracking, data quality
- Location: `app/page.tsx` (hardcoded platform configuration)

## Data Storage

**Databases:**
- Not detected - This is a static portal interface only

**File Storage:**
- Local filesystem only - Static assets served from `public/` directory
  - Logos: `public/logo-sofi.png`, `public/logo-sofix.svg`
  - Favicon: `public/favicon.svg`
  - Icons: `public/icon-sofix.svg`

**Caching:**
- None configured - Static export mode

## Authentication & Identity

**Auth Provider:**
- Not implemented - Portal is public/unauthenticated
- No login or access control

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Browser console only (development tracking via custom hooks in `.claude/hooks/`)

## CI/CD & Deployment

**Hosting:**
- Static file hosting (Next.js `output: "export"` configuration)
- Compatible with: Vercel, Netlify, GitHub Pages, S3, or any static file server

**CI Pipeline:**
- Not detected (no GitHub Actions, GitLab CI, etc. workflows)

## Environment Configuration

**Required env vars:**
- None - All configuration is hardcoded or derived from defaults

**Secrets location:**
- No secrets required for this application

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Health check polls via fetch to SOFIX and SOFI platforms
  - Method: `fetch(url, { mode: "no-cors", signal: controller.signal })`
  - CORS mode: enabled (allows cross-origin requests)
  - Location: `app/page.tsx` - `StatusIndicator` component checks `platform.url`
  - Timeout: 3-second abort controller signal

## Networking

**Internal Services:**
- Portal acts as discovery/routing interface to two backend platforms
- Platforms accessible on local network at `172.16.10.14` with different ports
- No inter-service communication (portal → backend only)

## External Dependencies

**Google Fonts:**
- Inter (sans serif) - From `next/font/google`
- JetBrains Mono (monospace) - From `next/font/google`
- Location: `app/layout.tsx`
- Implementation: Next.js built-in font optimization (inlined, no external calls for production)

---

*Integration audit: 2026-03-25*
