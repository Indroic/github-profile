import path from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

// URL del API dentro de la red de Docker (en local, el API de desarrollo)
const apiInternalUrl =
  process.env.API_INTERNAL_URL ?? "http://localhost:4000";

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

  // El navegador llama a /api/trpc (mismo origen) y el servidor de Next
  // reenvía al API por la red interna: sin CORS ni dominio público para el
  // API. El destino se resuelve en build (queda fijado en routes-manifest).
  async rewrites() {
    return [
      {
        source: "/api/trpc/:path*",
        destination: `${apiInternalUrl}/trpc/:path*`,
      },
      {
        source: "/user/:username",
        destination: `${apiInternalUrl}/user/:username*`,
      }
    ];
  },

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
