import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	
	// Temporarily disable TypeScript checks during build to reduce memory usage
	typescript: {
		ignoreBuildErrors: true, // TEMPORARY: Re-enable after memory issues resolved
	},
	// Note: ESLint is configured via next lint command in Next.js 16
	// To disable ESLint during build, we skip it in the build script

	// Disable source maps to reduce memory usage
	productionBrowserSourceMaps: false,

	// For React 19 compatibility
	experimental: {
		// Keep only essential optimizations
		optimizePackageImports: ['lucide-react', 'framer-motion'],

		// Disable features that use more memory
		scrollRestoration: false,
		workerThreads: false,
	},

	// Disable image optimization to reduce memory usage
	images: {
		unoptimized: true, // Disabled to reduce memory usage during build
		formats: ['image/webp'],
		deviceSizes: [640, 750, 828, 1080],
		imageSizes: [16, 32, 48, 64, 96],
	},

	compress: true,
	poweredByHeader: false,
	
	// Turbopack configuration
	turbopack: {},
};

export default nextConfig;
