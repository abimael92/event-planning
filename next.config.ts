import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: false,
	},

	// For React 19 compatibility
	// Remove all deprecated options

	experimental: {
		// Keep only essential optimizations
		optimizePackageImports: ['lucide-react', 'framer-motion'],

		// Disable features that use more memory
		scrollRestoration: false,
		workerThreads: false,
	},

	// Minimal image configuration
	images: {
		formats: ['image/webp'],
		deviceSizes: [640, 750, 828, 1080],
		imageSizes: [16, 32, 64, 96],
	},

	compress: true,
	poweredByHeader: false,
};

export default nextConfig;
