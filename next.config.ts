import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	typescript: {
		// Build should fail on TypeScript errors
		ignoreBuildErrors: false,
	},
	// Note: ESLint is now configured via next lint command
	// To fail builds on ESLint errors, run: pnpm lint before build
	// Or add to CI/CD pipeline
	// Vercel doesn't use standalone output - it has its own deployment system
	// output: 'standalone' is only for self-hosting
	experimental: {
		optimizePackageImports: [
			'@radix-ui/react-accordion',
			'@radix-ui/react-alert-dialog',
			'@radix-ui/react-avatar',
			'@radix-ui/react-dialog',
			'@radix-ui/react-dropdown-menu',
			'@radix-ui/react-select',
			'@radix-ui/react-tabs',
			'@radix-ui/react-toast',
			'recharts',
			'framer-motion',
			'lucide-react',
		],
	},
	images: {
		// Vercel handles image optimization automatically
		// These settings work with Vercel's image optimization
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		// Enable image optimization (Vercel will handle this)
		unoptimized: false,
	},
	// Vercel-specific optimizations
	compress: true,
	poweredByHeader: false,
	// Webpack optimizations to reduce memory usage
	webpack: (config, { isServer }) => {
		// Reduce memory usage during build
		if (!isServer) {
			config.optimization = {
				...config.optimization,
				// Reduce chunk size to lower memory usage
				splitChunks: {
					chunks: 'all',
					cacheGroups: {
						default: false,
						vendors: false,
						// Separate vendor chunks
						vendor: {
							name: 'vendor',
							chunks: 'all',
							test: /node_modules/,
							priority: 20,
						},
						// Separate common chunks
						common: {
							name: 'common',
							minChunks: 2,
							chunks: 'all',
							priority: 10,
							reuseExistingChunk: true,
							enforce: true,
						},
					},
				},
			};
		}
		return config;
	},
};

export default nextConfig;
