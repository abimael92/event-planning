# Vercel Deployment Fixes

## Issues Fixed

### 1. ❌ Removed `output: 'standalone'`
**Problem:** Vercel doesn't use standalone output - it has its own deployment system. This was causing build conflicts.

**Fix:** Removed the `output: 'standalone'` line. Vercel automatically handles Next.js deployments.

### 2. ✅ Fixed ESLint Configuration
**Problem:** 
- ESLint config in `next.config.ts` is deprecated in Next.js 16
- ESLint is now configured via `next lint` command

**Fix:** 
- Removed `eslint` config from `next.config.ts`
- Added `prebuild` script to run lint and type-check before build
- ESLint will still fail builds if errors exist (via prebuild hook)

### 3. ❌ Removed NODE_OPTIONS from Build Script
**Problem:** 
- Vercel has its own memory management
- NODE_OPTIONS in package.json scripts may not work correctly on Vercel
- Vercel sets memory limits automatically

**Fix:** Removed `NODE_OPTIONS` from build/dev scripts. If you need more memory, configure it in Vercel dashboard under Project Settings → General → Node.js Version.

### 4. ✅ Fixed Package Import Optimization
**Problem:** Wildcard patterns like `@radix-ui/react-*` may not work correctly.

**Fix:** Listed specific packages explicitly for better compatibility.

### 5. ✅ Image Optimization
**Problem:** Images were set to `unoptimized: true` in old config.

**Fix:** Set `unoptimized: false` to enable Vercel's automatic image optimization.

### 6. ✅ Added Vercel Configuration
**Created:**
- `vercel.json` - Vercel-specific configuration
- `.vercelignore` - Files to exclude from deployment
- `.github/workflows/vercel-build-check.yml` - CI/CD for build checks

## Configuration Files

### `vercel.json`
- Sets build command to `pnpm build`
- Configures function timeout (30s)
- Sets default region (iad1 - US East)
- Removed `env.NODE_ENV` (Vercel sets this automatically)

### `.vercelignore`
- Excludes test files, docs, and dev configs from deployment
- Reduces deployment size

### `package.json` Scripts
- Added `prebuild` hook to run lint and type-check before build
- Added `lint:fix` for auto-fixing ESLint errors
- Added `type-check` for TypeScript checking

## Next Steps

1. **Deploy to Vercel:**
   ```bash
   vercel
   ```

2. **If Build Fails:**
   - Check Vercel build logs for specific errors
   - Common issues:
     - TypeScript errors (will fail in prebuild)
     - ESLint errors (will fail in prebuild)
     - Missing environment variables
     - Memory issues (configure in Vercel dashboard)

3. **Environment Variables:**
   - Set in Vercel Dashboard → Project Settings → Environment Variables
   - Add any required env vars (API keys, database URLs, etc.)

4. **Memory Issues:**
   - If builds fail due to memory:
     - Go to Vercel Dashboard → Project Settings → General
     - Increase Node.js memory limit
     - Or upgrade to a higher Vercel plan

## Vercel-Specific Optimizations

The config now includes:
- ✅ Image optimization enabled
- ✅ Compression enabled
- ✅ Powered-by header removed (security)
- ✅ Package import optimization
- ✅ React strict mode
- ✅ Pre-build checks (lint + type-check)

## Testing Locally

Before deploying, test the build locally:
```bash
# Run lint and type-check
pnpm lint
pnpm type-check

# Build
pnpm build
```

If local build succeeds, Vercel build should also succeed.

## Common Vercel Build Issues

### Issue: "Module not found"
**Solution:** Check that all imports use correct paths. Vercel is stricter about path resolution.

### Issue: "Out of memory"
**Solution:** 
1. Check Vercel dashboard for memory settings
2. Consider code splitting
3. Remove unused dependencies

### Issue: "Build timeout"
**Solution:**
- Increase timeout in `vercel.json` (max 60s for Hobby plan)
- Optimize build process
- Consider upgrading plan

### Issue: "TypeScript/ESLint errors"
**Solution:** 
- Fix the errors - prebuild hook will catch them
- Run `pnpm lint:fix` to auto-fix some issues
- Run `pnpm type-check` to see TypeScript errors

### Issue: "Font loading errors"
**Solution:**
- These are usually network issues during build
- Vercel has better network access, should work fine
- If persistent, consider using local fonts or font hosting service

## CI/CD Integration

A GitHub Actions workflow is included (`.github/workflows/vercel-build-check.yml`) that:
- Runs on pull requests and pushes
- Checks ESLint
- Checks TypeScript
- Runs tests
- Builds the application

This ensures builds will work on Vercel before merging.

## Rollback

If deployment still fails, you can temporarily:
1. Remove `prebuild` script from `package.json` (not recommended)
2. Set `ignoreBuildErrors: true` in `next.config.ts` (not recommended)
3. Check Vercel build logs for specific error messages

---

**Status:** ✅ Configuration fixed for Vercel deployment  
**Ready for:** Deploy to Vercel
