/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove 'output: standalone' for Netlify deployment
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
      };
      // Suppress warnings for optional peer dependencies
      config.ignoreWarnings = [
        { module: /node_modules\/@metamask\/sdk/ },
        { module: /node_modules\/pino/ },
      ];
    }
    return config;
  },
};

module.exports = nextConfig;