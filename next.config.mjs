/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**.ragam.co.in",
    },
  ],
},
};

export default nextConfig;
