#!/usr/bin/env node

/**
 * Staged Build Script
 * 
 * Builds the application in stages to reduce memory usage:
 * 1. Type check (if not on Vercel)
 * 2. Build with increased memory
 * 
 * This can help if the build still fails with memory errors.
 */

const { execSync } = require('child_process');
const path = require('path');

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV || process.env.VERCEL_URL;
const projectRoot = path.resolve(__dirname, '..');
process.chdir(projectRoot);

console.log('🚀 Starting staged build...');
console.log(`📦 Memory limit: 12GB (12288 MB)`);
console.log(`🌐 Environment: ${isVercel ? 'Vercel' : 'Local'}`);

try {
	// Stage 1: Type check (skip on Vercel - they handle it)
	if (!isVercel) {
		console.log('\n📝 Stage 1: Type checking...');
		try {
			execSync('pnpm type-check', {
				stdio: 'inherit',
				cwd: projectRoot,
				env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' },
			});
			console.log('✅ Type check passed');
		} catch (error) {
			console.warn('⚠️  Type check failed, but continuing build (ignoreBuildErrors: true)');
		}
	} else {
		console.log('⏭️  Skipping type check on Vercel');
	}

	// Stage 2: Build
	console.log('\n🔨 Stage 2: Building application...');
	execSync('NODE_OPTIONS="--max-old-space-size=12288" next build', {
		stdio: 'inherit',
		cwd: projectRoot,
		env: {
			...process.env,
			NODE_OPTIONS: '--max-old-space-size=12288',
		},
	});

	console.log('\n✅ Build completed successfully!');
	process.exit(0);
} catch (error) {
	console.error('\n❌ Build failed');
	console.error(error.message);
	process.exit(1);
}
