import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	typescript: {
		// Build should fail on TypeScript errors
		ignoreBuildErrors: false,
	},
	eslint: {
		// Build should fail on ESLint errors
		ignoreDuringBuilds: false,
	},
};

export default nextConfig;
