/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'portfolio-cms-tpz3.onrender.com',
        pathname: '/uploads/**',
      }
    ],
    dangerouslyAllowLocalIP: true,
  },
  reactCompiler: true,
};

export default nextConfig;

