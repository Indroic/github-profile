FROM node:24-alpine AS base
RUN corepack enable
RUN corepack prepare pnpm@9 --activate
WORKDIR /app


FROM base AS installer

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/web/package.json                        ./apps/web/
COPY apps/api/package.json                        ./apps/api/
COPY packages/ui/package.json                     ./packages/ui/
COPY packages/api/package.json                    ./packages/api/
COPY packages/typescript-config/package.json      ./packages/typescript-config/
COPY packages/eslint-config/package.json          ./packages/eslint-config/

RUN pnpm install \
      --filter=web... \
      --frozen-lockfile \
      --ignore-scripts


FROM base AS builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

ARG NEXT_PUBLIC_API_URL=http://api:4000/trpc
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=installer /app/node_modules                    ./node_modules
COPY --from=installer /app/apps/web/node_modules           ./apps/web/node_modules
COPY --from=installer /app/apps/api/node_modules           ./apps/api/node_modules
COPY --from=installer /app/packages/ui/node_modules        ./packages/ui/node_modules
COPY --from=installer /app/packages/api/node_modules       ./packages/api/node_modules
COPY --from=installer /app/packages/typescript-config      ./packages/typescript-config
COPY --from=installer /app/packages/eslint-config          ./packages/eslint-config

COPY packages/typescript-config/ ./packages/typescript-config/
COPY packages/eslint-config/     ./packages/eslint-config/
COPY packages/ui/                ./packages/ui/
COPY packages/api/               ./packages/api/

COPY apps/api/ ./apps/api/
COPY apps/web/ ./apps/web/

COPY turbo.json ./

RUN pnpm --filter=web build


FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

LABEL org.opencontainers.image.title="github-profile-web"
LABEL org.opencontainers.image.description="Next.js frontend for GitHub Profile Viewer"

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static     ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public           ./apps/web/public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
