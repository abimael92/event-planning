# Guardrails Documentation

This document describes the guardrails established before refactoring to ensure code quality, error handling, and maintainability.

## Overview

The following infrastructure has been added to provide safety and observability:

1. **Testing Framework** - Vitest for unit testing
2. **Global Error Boundary** - Catches and handles React errors
3. **Central Logger** - Unified logging abstraction
4. **Feature Flags** - Safe feature toggling (all disabled by default)
5. **Strict Build Configuration** - Build fails on TypeScript/ESLint errors

## Testing Framework (Vitest)

### Setup
- **Framework**: Vitest (fast, Vite-based)
- **Testing Library**: @testing-library/react
- **Configuration**: `vitest.config.ts`
- **Setup File**: `vitest.setup.ts`

### Usage

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

Create test files with `.test.ts` or `.spec.ts` extension:

```typescript
import { describe, it, expect } from 'vitest'

describe('MyComponent', () => {
  it('should render correctly', () => {
    expect(true).toBe(true)
  })
})
```

### Test Location
- Unit tests: Co-located with source files in `__tests__` folders
- Example: `app/shared/lib/__tests__/logger.test.ts`

## Global Error Boundary

### Location
`components/error-boundary.tsx`

### Integration
The error boundary is integrated into the root layout (`app/layout.tsx`) and wraps the entire application.

### Features
- Catches JavaScript errors in component tree
- Logs errors using centralized logger
- Displays user-friendly error UI
- Shows error details in development mode
- Provides "Try Again" and "Refresh Page" options

### Customization
You can provide a custom fallback UI:

```tsx
<ErrorBoundary fallback={<CustomErrorUI />}>
  <App />
</ErrorBoundary>
```

## Central Logger

### Location
`app/shared/lib/logger.ts`

### Usage

```typescript
import { logger } from '@/app/shared/lib/logger'

// Log messages
logger.debug('Debug message', { context: 'value' })
logger.info('Info message', { userId: 123 })
logger.warn('Warning message', { issue: 'something' })
logger.error('Error message', error, { context: 'value' })
```

### Features
- Unified logging interface
- Context support for additional data
- Error object handling
- Swappable implementation (can replace with Sentry, LogRocket, etc.)

### Custom Logger Implementation

```typescript
import { setLogger, type Logger } from '@/app/shared/lib/logger'

const customLogger: Logger = {
  debug: (msg, ctx) => { /* custom implementation */ },
  info: (msg, ctx) => { /* custom implementation */ },
  warn: (msg, ctx) => { /* custom implementation */ },
  error: (msg, err, ctx) => { /* custom implementation */ },
}

setLogger(customLogger)
```

## Feature Flags

### Location
`app/shared/lib/feature-flags.ts`

### Philosophy
**All features are disabled by default** for safety. Features must be explicitly enabled.

### Usage

```typescript
import { isFeatureEnabled } from '@/app/shared/lib/feature-flags'

if (isFeatureEnabled('newCheckoutFlow')) {
  // Feature code
}
```

### Enabling Features

1. **Via Environment Variable** (recommended for production):
   ```bash
   NEXT_PUBLIC_FEATURE_NEW_CHECKOUT_FLOW=true
   ```

2. **In Code** (for testing):
   ```typescript
   import { registerFeatureFlag } from '@/app/shared/lib/feature-flags'
   
   registerFeatureFlag('newCheckoutFlow', true)
   ```

### Adding New Features

Edit `app/shared/lib/feature-flags.ts`:

```typescript
const FEATURE_FLAGS: Record<FeatureFlag, boolean> = {
  newCheckoutFlow: false, // Add here, always false by default
}
```

## Build Configuration

### Changes Made

Both `next.config.mjs` and `next.config.ts` have been updated to:

- **Fail on TypeScript errors**: `ignoreBuildErrors: false`
- **Fail on ESLint errors**: `ignoreDuringBuilds: false`

### Impact

- Builds will now fail if there are TypeScript or ESLint errors
- Forces fixing errors before deployment
- Improves code quality

### Note on Duplicate Config Files

Both `next.config.mjs` and `next.config.ts` exist. Next.js will use the `.mjs` file if both exist. Consider removing one to avoid confusion.

## File Structure

```
.
├── app/
│   └── shared/
│       └── lib/
│           ├── logger.ts              # Central logger
│           ├── feature-flags.ts       # Feature flag utility
│           └── __tests__/             # Unit tests
│               ├── logger.test.ts
│               └── feature-flags.test.ts
├── components/
│   └── error-boundary.tsx             # Global error boundary
├── vitest.config.ts                   # Vitest configuration
├── vitest.setup.ts                    # Test setup file
└── package.json                       # Updated with test scripts
```

## Rollback

All changes are designed to be rolled back in a single commit. The guardrails are additive and don't modify existing business logic.

To rollback:
```bash
git revert <commit-hash>
```

## Next Steps

1. Install dependencies: `pnpm install`
2. Run tests: `pnpm test:run`
3. Verify build: `pnpm build`
4. Start using logger in existing code
5. Add feature flags for new features

## Best Practices

### Using the Logger
- Use appropriate log levels (debug, info, warn, error)
- Include context for better debugging
- Log errors with Error objects when available

### Using Feature Flags
- Always default to `false`
- Use environment variables for production toggles
- Remove feature flags after feature is stable

### Error Handling
- Let the error boundary catch unexpected errors
- Use try/catch for expected errors
- Log errors using the centralized logger

## Testing

Example test files are provided:
- `app/shared/lib/__tests__/logger.test.ts`
- `app/shared/lib/__tests__/feature-flags.test.ts`

Run tests to verify everything works:
```bash
pnpm test:run
```
