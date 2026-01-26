/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Build should fail on TypeScript errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Build should fail on ESLint errors
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig