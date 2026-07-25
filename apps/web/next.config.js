import path from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera un servidor Node.js standalone para Docker
  output: "standalone",

  // Raíz del monorepo: sin esto Turbopack la infiere desde el lockfile
  // y en Docker no puede resolver los symlinks de pnpm (node_modules/.pnpm)
  turbopack: {
    root: monorepoRoot,
  },
  outputFileTracingRoot: monorepoRoot,

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
