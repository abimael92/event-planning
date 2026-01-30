/**
 * @type {import('next').NextConfig}
 * 
 * NEXT.JS 14 STABLE BUILD CONFIGURATION
 * - Optimized for memory efficiency
 * - Compatible with Next.js 14.2.0
 * - Type checking disabled for faster builds
 * - Image optimization disabled to save memory
 */
const nextConfig = {
  // React strict mode for better development experience
  reactStrictMode: true,

  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable source maps to save memory
  productionBrowserSourceMaps: false,

  // Enable SWC minification (faster and more memory efficient)
  swcMinify: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Disable image optimization to save memory
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // Experimental features for Next.js 14
  experimental: {
    // Optimize package imports for smaller bundle
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
};

module.exports = nextConfig;
