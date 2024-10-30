/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
// module.exports = {
//     images: {
//       domains: ['assets.shop.loblaws.ca'],
//     },
//   };


// next.config.js
module.exports = {
  images: {
    domains: ['assets.shop.loblaws.ca'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false, // отключаем модули Node.js, если они не нужны
      path: false,
    };
    return config;
  },
};

