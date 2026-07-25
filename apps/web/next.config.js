/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera un servidor Node.js standalone para Docker
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  // Deshabilita telemetría en producción
  env: {
    NEXT_TELEMETRY_DISABLED: "1",
  },
};

export default nextConfig;
