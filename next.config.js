/** @type {import('next').NextConfig} */
const TerserPlugin = require('terser-webpack-plugin');

const nextConfig = {
  images: {
    domains: ['assets.shop.loblaws.ca'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Убирает все console.log
            },
          },
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
