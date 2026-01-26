#!/usr/bin/env node

/**
 * Prebuild script that runs type-check
 * Skips on Vercel (Next.js build handles TypeScript checking automatically)
 * 
 * Note: We skip lint here because:
 * - Next.js 16 runs lint automatically during `next build`
 * - Running `next lint` in prebuild causes issues on Vercel
 * - TypeScript errors are caught by `next build` with ignoreBuildErrors: false
 */

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV || process.env.VERCEL_URL;

// Skip on Vercel - Next.js build will handle TypeScript checking automatically
// and will fail if ignoreBuildErrors: false (which we have set)
if (isVercel) {
  console.log('⏭️  Skipping prebuild checks on Vercel (Next.js handles checks during build)');
  process.exit(0);
}

// Run type-check locally (lint is handled by Next.js during build)
const { execSync } = require('child_process');
const path = require('path');

// Ensure we're in the project root
const projectRoot = path.resolve(__dirname, '..');
process.chdir(projectRoot);

try {
  console.log('🔍 Running type check...');
  execSync('pnpm type-check', { 
    stdio: 'inherit',
    cwd: projectRoot,
  });
  
  console.log('✅ Prebuild checks passed');
  process.exit(0);
} catch (error) {
  console.error('❌ Prebuild checks failed');
  process.exit(1);
}
