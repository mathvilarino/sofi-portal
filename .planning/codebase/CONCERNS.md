# Codebase Concerns

**Analysis Date:** 2025-03-03

## Tech Debt

**Monolithic Page Component:**
- Issue: `app/page.tsx` is nearly 1000 lines long and contains multiple sub-components and large hardcoded data structures.
- Files: `app/page.tsx`
- Impact: Difficult to maintain, test, and reuse components. Increases cognitive load for developers.
- Fix approach: Extract sub-components (e.g., `StatusDot`, `Section`, `SofixMockup`) into a `components/` directory. Move static data into a `constants/` or `data/` directory.

**Hardcoded Environment Configurations:**
- Issue: URLs and IP addresses are hardcoded directly in the component data.
- Files: `app/page.tsx`
- Impact: Difficult to deploy to different environments (staging, production) without code changes.
- Fix approach: Use environment variables (e.g., `process.env.NEXT_PUBLIC_SOFIX_URL`) and a configuration management pattern.

**Lack of Modular Structure:**
- Issue: The project lacks standard directories for components, hooks, and utilities.
- Files: `app/`
- Impact: As the project grows, it will become increasingly disorganized.
- Fix approach: Create `src/components`, `src/hooks`, and `src/lib` (or equivalent in the root if not using `src`) to organize the code.

## Performance Bottlenecks

**Status Polling in Client Component:**
- Issue: `StatusDot` polls external URLs every 30 seconds using `fetch`.
- Files: `app/page.tsx`
- Cause: Client-side polling can impact performance and trigger excessive network requests if many instances are present.
- Improvement path: Consider a more robust health check mechanism or use a library like `swr` or `react-query` for better polling management and caching.

## Fragile Areas

**StatusDot Connectivity Checks:**
- Issue: Uses `mode: "no-cors"` in `fetch` to check status.
- Files: `app/page.tsx`
- Why fragile: `no-cors` mode makes it impossible to check the actual response status (it only knows if the request failed at the network level). This might report "Online" even if the service returns a 500 error.
- Safe modification: Implement a proper health check endpoint on the target services that supports CORS.
- Test coverage: None.

## Test Coverage Gaps

**Total Lack of Testing:**
- What's not tested: The entire application. There are no unit, integration, or E2E tests.
- Files: Entire repository.
- Risk: High. Any change can introduce regressions without being noticed. No validation of UI logic or connectivity checks.
- Priority: High.

---

*Concerns audit: 2025-03-03*
