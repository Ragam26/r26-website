/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  unoptimized: true,
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**.ragam.co.in",
    },
  ],
},
};

export default nextConfig;
