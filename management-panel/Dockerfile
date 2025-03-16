# Build stage
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package*.json ./
COPY bun.lock* ./
RUN bun install
COPY . .
RUN bun run build

# Production stage
FROM oven/bun:1-slim AS runner
WORKDIR /app
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock* ./
RUN bun install --production
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4321/ || exit 1
EXPOSE 4321
CMD ["bun", "./dist/server/entry.mjs"]