// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // For static export
  images: {
    unoptimized: true,
  },
  trailingSlash: true, 
}

module.exports = nextConfig