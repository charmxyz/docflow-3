/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // disables linting in production build
  },
  images: {
    unoptimized: true, // This can help with static asset rendering in some deployment environments
  },
}

module.exports = nextConfig 