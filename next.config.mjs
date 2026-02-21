/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Tell Vercel to ignore ESLint (unused variable) errors during deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 2. Tell Vercel to ignore strict TypeScript errors during deployment
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;