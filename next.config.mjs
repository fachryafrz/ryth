/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    staleTimes: {
      dynamic: 1800, // 30 minutes in seconds
    },
  },
};

export default nextConfig;
