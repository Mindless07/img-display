/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["unsplash.com", "images.unsplash.com"],
  },
  publicRuntimeConfig: {
    unsplashClientId: process.env.ACCESS_KEY,
  },
};

module.exports = nextConfig;
