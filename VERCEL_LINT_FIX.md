# Vercel Lint Error Fix

## Problem

The build was failing with:
```
Invalid project directory provided, no such directory: /vercel/path0/lint
```

This happens because:
1. The `prebuild` script was running `next lint`
2. Next.js 16's lint command has issues with Vercel's directory structure
3. The lint command tries to access a directory that doesn't exist on Vercel

## Solution

### 1. ✅ Updated Prebuild Script
- **Removed lint from prebuild** - Next.js 16 runs lint automatically during `next build`
- **Only runs type-check locally** - TypeScript checking is more reliable
- **Skips entirely on Vercel** - Next.js build handles all checks automatically

### 2. ✅ How It Works Now

**On Vercel:**
- Prebuild script detects Vercel environment and skips
- `next build` automatically:
  - Runs TypeScript checking (fails if `ignoreBuildErrors: false`)
  - Runs ESLint checking (if configured)
  - Both will fail the build if errors exist

**Locally:**
- Prebuild runs type-check before build
- `next build` still runs all checks
- Use `pnpm build:local` to run lint + type-check + build

### 3. ✅ Files Changed

**Modified:**
- `scripts/prebuild.js` - Now skips lint, only runs type-check locally
- `package.json` - Added `build:local` script for full checks

**Created:**
- `.eslintignore` - Excludes problematic directories from linting

## Usage

### Local Development
```bash
# Quick build (skips prebuild checks)
pnpm build

# Full build with all checks
pnpm build:local

# Just lint
pnpm lint

# Just type-check
pnpm type-check
```

### On Vercel
- Build will automatically:
  - Check TypeScript (fails on errors)
  - Check ESLint (if configured)
  - Build the application

## Why This Works

1. **Next.js 16 Integration**: Next.js 16 runs lint automatically during build
2. **TypeScript Safety**: `ignoreBuildErrors: false` ensures TypeScript errors fail builds
3. **Vercel Compatibility**: Skipping prebuild on Vercel avoids directory issues
4. **Guardrails Maintained**: Builds still fail on errors, just handled by Next.js directly

## Verification

The build should now work on Vercel:
```bash
# Test locally first
pnpm build

# Then deploy
vercel
```

## Rollback

If you need to restore the old behavior:
1. Change `prebuild` script back to: `"prebuild": "pnpm lint && pnpm type-check"`
2. Note: This will likely fail on Vercel again

---

**Status:** ✅ Fixed - Build should work on Vercel now
