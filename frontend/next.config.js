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
      config.externals = {
        ...config.externals,
        '@react-native-async-storage/async-storage': 'commonjs @react-native-async-storage/async-storage',
      };
    }
    return config;
  },
};

module.exports = nextConfig;