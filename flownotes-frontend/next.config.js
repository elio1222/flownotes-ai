/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
  // Enable webpack5 for better Web Worker support
  future: {
    webpack5: true,
  },
};

module.exports = nextConfig;
