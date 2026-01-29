import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	
	// Temporarily disable TypeScript checks during build to reduce memory usage
	typescript: {
		ignoreBuildErrors: true, // TEMPORARY: Re-enable after memory issues resolved
	},

	// Disable source maps to reduce memory usage
	productionBrowserSourceMaps: false,

	// For React 19 compatibility and memory optimization
	experimental: {
		// Optimize package imports to reduce bundle size and memory
		optimizePackageImports: [
			'lucide-react',
			'framer-motion',
			'recharts',
			'@radix-ui/react-accordion',
			'@radix-ui/react-alert-dialog',
			'@radix-ui/react-dialog',
			'@radix-ui/react-dropdown-menu',
			'@radix-ui/react-popover',
			'@radix-ui/react-select',
			'@radix-ui/react-tabs',
			'@radix-ui/react-toast',
		],

		// Disable features that use more memory
		scrollRestoration: false,
		workerThreads: false,
		
		// Reduce memory usage during compilation
		memoryBasedWorkersCount: true,
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
