FROM node:24-alpine AS base
RUN corepack enable
RUN corepack prepare pnpm@9 --activate
WORKDIR /app


FROM base AS installer

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/api/package.json                        ./apps/api/
COPY packages/typescript-config/package.json      ./packages/typescript-config/

RUN pnpm install \
      --filter=api... \
      --frozen-lockfile \
      --ignore-scripts


FROM base AS builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY --from=installer /app/node_modules                   ./node_modules
COPY --from=installer /app/apps/api/node_modules          ./apps/api/node_modules
COPY --from=installer /app/packages/typescript-config     ./packages/typescript-config

COPY apps/api/ ./apps/api/

RUN pnpm --filter=api build

RUN pnpm --filter=api deploy --prod --ignore-scripts /app/release


FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

LABEL org.opencontainers.image.title="github-profile-api"
LABEL org.opencontainers.image.description="NestJS + tRPC API for GitHub Profile Viewer"

COPY --from=builder /app/release/node_modules ./node_modules

COPY --from=builder /app/apps/api/dist        ./dist

COPY --from=builder /app/apps/api/package.json ./

EXPOSE 4000
ENV PORT=4000

CMD ["node", "dist/main"]
