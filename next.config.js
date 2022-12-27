/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
    SITE_URL: process.env.SITE_URL,
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
};

module.exports = nextConfig;
