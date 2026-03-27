# Testing Patterns

**Analysis Date:** 2026-03-25

## Test Framework

**Status:** No testing framework configured

**Current State:**
- No Jest, Vitest, or other test runner found
- No test configuration files present (`jest.config.js`, `vitest.config.ts`, etc.)
- No test dependencies in `package.json`
- No test files (`*.test.ts`, `*.spec.ts`) in the codebase

**Dependencies for testing would be:**
- Test runner: Jest or Vitest (not installed)
- Assertion library: Would typically use Jest's built-in assertions or external library
- React testing: Would need `@testing-library/react` (not installed)

**Run Commands (not currently available):**
```bash
# Would run tests (no test framework installed)
npm test              # Not configured
npm run test:watch   # Not configured
npm run test:coverage # Not configured
```

## Test File Organization

**Current Organization:**
- No test files present in project
- Source files located in `app/` directory:
  - `app/layout.tsx` - Root layout (server component)
  - `app/page.tsx` - Home page (client component with interactive elements)

**Recommended Pattern (if testing added):**
- Co-locate tests with source: `app/page.test.tsx` next to `app/page.tsx`
- Test files would use `.test.tsx` extension for TypeScript React

## Test Structure

No test files exist to demonstrate patterns.

**If tests were to be written, expected structure would be:**

```typescript
import { render, screen } from '@testing-library/react';
import Portal from './page';

describe('Portal Component', () => {
  it('should render navigation', () => {
    render(<Portal />);
    expect(screen.getByText('SOFI')).toBeInTheDocument();
  });

  it('should display platform cards', () => {
    render(<Portal />);
    expect(screen.getByText('SOFIX Engine')).toBeInTheDocument();
    expect(screen.getByText('SOFI Virtualization')).toBeInTheDocument();
  });
});
```

## Test Types

### Unit Tests (would test):
- **StatusDot component** (`app/page.tsx:248-286`)
  - Fetches status from URL
  - Sets status state to "checking", "online", or "offline"
  - Re-checks every 30 seconds
  - Cleans up interval on unmount

- **useInView hook** (`app/page.tsx:288-299`)
  - Creates IntersectionObserver
  - Sets visible state when element enters viewport
  - Accepts threshold parameter
  - Cleans up observer on unmount

- **AnimatedCounter component** (`app/page.tsx:314-328`)
  - Animates from 0 to target number
  - Stops at target value (60ms intervals)
  - Handles `end: 0` special case
  - Returns formatted count with suffix

- **Section wrapper** (`app/page.tsx:301-309`)
  - Applies fade-in animation based on visibility
  - Supports delay parameter
  - Integrates with useInView hook

### Integration Tests (would test):
- **Portal page** (`app/page.tsx:440-956`)
  - Scroll listener registration/cleanup
  - Navigation bar appears/disappears on scroll
  - Platform cards hover state
  - Stats counter animation trigger on scroll
  - Link navigation to platform URLs

- **Layout wrapper** (`app/layout.tsx:21-35`)
  - Font loading (Inter, JetBrains Mono)
  - Metadata application
  - Children rendering

### E2E Tests (not currently used):
- Would test user workflows:
  - Navigating to platforms via CTA buttons
  - Scrolling and animations triggering
  - Platform status indicators updating
  - Responsive layout on mobile/desktop

## Mocking

**No mocking patterns currently in use** (no tests present)

**If tests existed, would need to mock:**
- `fetch` API calls (StatusDot component makes requests to platform URLs)
- `IntersectionObserver` (useInView hook uses it)
- `Next.js Image` component
- `lucide-react` icons

**Example mocking pattern (hypothetical):**
```typescript
// Mock fetch for StatusDot tests
global.fetch = jest.fn(() => Promise.resolve({ ok: true }));

// Mock IntersectionObserver for useInView tests
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
```

## Fixtures and Factories

**No test fixtures or factories present**

**Would need for testing:**
- Mock platform data structure (matches `/home/vault-app/portal/app/page.tsx:38-100`)
- Mock stats data
- Mock ecosystem features
- Mock comparison data

**Example fixture pattern:**
```typescript
// fixtures/platforms.ts
export const mockPlatforms = [
  {
    id: "sofix",
    name: "SOFIX Engine",
    url: "http://localhost:3000",
    // ... other properties
  },
  // ...
];
```

## Coverage

**Requirements:** None enforced (no testing framework configured)

**Would measure:**
- Line coverage: Currently ~0% (no tests)
- Branch coverage: Currently ~0%
- Function coverage: Currently ~0%

**Testable code locations:**
- `app/page.tsx`: 957 lines, contains 6 functions/components
  - `StatusDot` - fetch & state management, good test candidate
  - `useInView` - hook logic, good test candidate
  - `Section` - wrapper component
  - `AnimatedCounter` - animation logic
  - `SofixMockup` - UI render
  - `SofiMockup` - UI render
  - `Portal` - main page (integration test candidate)

## Async Testing

**Patterns in code:**
- `StatusDot` uses async fetch with AbortController
- `useInView` uses async IntersectionObserver callback

**No test utilities for async testing currently configured**

**Pattern used in code:**
```typescript
// From StatusDot component (lines 251-266)
useEffect(() => {
  const check = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      await fetch(url, { mode: "no-cors", signal: controller.signal });
      clearTimeout(timeout);
      setStatus("online");
    } catch {
      setStatus("offline");
    }
  };
  check();
  const interval = setInterval(check, 30000);
  return () => clearInterval(interval);
}, [url]);
```

## Error Testing

**Error scenarios in code:**
- Network request fails in `StatusDot` (lines 251-266)
  - Uses catch block to set error state
  - No error logging or re-throwing

**No error testing utilities configured**

**Pattern found:**
- Silent failure with state fallback (status → "offline")
- 3000ms timeout for fetch requests
- Catch-all error handling (catch block takes no parameter)

---

## Recommendations for Testing Implementation

**To add testing to this project:**

1. **Install test dependencies:**
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   npm install --save-dev @types/jest
   ```

2. **Create test configuration** (`jest.config.js`):
   ```javascript
   const nextJest = require('next/jest')
   const createJestConfig = nextJest({
     dir: './',
   })
   module.exports = createJestConfig({
     testEnvironment: 'jest-environment-jsdom',
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
   })
   ```

3. **Add test script to `package.json`:**
   ```json
   "test": "jest",
   "test:watch": "jest --watch",
   "test:coverage": "jest --coverage"
   ```

4. **Create test files:**
   - `app/page.test.tsx` - Test Portal page components
   - `app/layout.test.tsx` - Test layout
   - Add unit tests for hooks and components

---

*Testing analysis: 2026-03-25*
