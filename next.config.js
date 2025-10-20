/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    // Avoid using sharp/image-optimizer on servers with low resources
    unoptimized: true,
  },
  // Minification is CPU/memory heavy; allow disabling for low-memory builds
  swcMinify: process.env.LOW_MEM_BUILD !== '1',
  // Disable production source maps to reduce memory & build time
  productionBrowserSourceMaps: false,
  // Produce a smaller, self-contained server build
  output: 'standalone',
  // Skip TypeScript type checking during build to reduce memory/CPU usage
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during build
  },
}
 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 
module.exports = withBundleAnalyzer(nextConfig)
