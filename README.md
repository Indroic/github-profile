# GitHub Profile Viewer

Monorepo con **NestJS + tRPC** (API) y **Next.js 16 + HeroUI v3** (Web) para visualizar perfiles públicos de GitHub.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16, HeroUI v3, Tailwind CSS v4 |
| Backend  | NestJS 11, nestjs-trpc, Axios |
| Tipos compartidos | tRPC, Zod |
| Monorepo | Turborepo + pnpm workspaces |
| Contenedores | Docker + Docker Compose |

## Estructura

```
apps/
  api/   → NestJS + tRPC  (puerto 4000)
  web/   → Next.js 16     (puerto 3000)
packages/
  api/   → Tipos tRPC compartidos (@repo/api)
  ui/    → Wrapper de HeroUI (@repo/ui)
  typescript-config/
  eslint-config/
```

---

## Despliegue con Docker

### Inicio rápido

```bash
# Construye y levanta ambos servicios
docker compose up --build

# En segundo plano
docker compose up --build -d
```

Acceso:
- **Web** → http://localhost:3000
- **API** → http://localhost:4000/trpc

### URL del API personalizada

Por defecto, `NEXT_PUBLIC_API_URL` apunta a `http://localhost:4000/trpc`. Para producción con un dominio real:

```bash
docker compose build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.tudominio.com/trpc

docker compose up -d
```

O edita `docker-compose.yml` → sección `web.build.args`.

### Comandos útiles

```bash
# Ver logs en tiempo real
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f api
docker compose logs -f web

# Detener y eliminar contenedores
docker compose down

# Reconstruir solo un servicio
docker compose up --build api
docker compose up --build web

# Inspeccionar estado de salud
docker compose ps
```

---

## Desarrollo local

```bash
# Instalar dependencias
pnpm install

# Terminal 1 — API (puerto 4000)
cd apps/api && PORT=4000 pnpm start:dev

# Terminal 2 — Web (puerto 3000)
cd apps/web && pnpm dev
```

O con Turborepo:

```bash
turbo dev
```

---

## Variables de entorno

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/trpc
```

### `apps/api` (variables de entorno)

| Variable | Por defecto | Descripción |
|----------|-------------|-------------|
| `PORT`   | `3000`      | Puerto del servidor NestJS |
| `NODE_ENV` | `development` | Entorno de ejecución |

---

## Recursos

- [HeroUI v3 Docs](https://heroui.com/docs/react)
- [nestjs-trpc](https://nestjs-trpc.io)
- [Turborepo Docs](https://turborepo.dev/docs)


## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
pnpm dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
pnpm exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
pnpm exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
pnpm exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
pnpm exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
pnpm exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
