# Multi-stage Dockerfile for Next.js 14 (standalone output)
# Optimized for low-memory build environments

# 1) Install dependencies
FROM node:18-slim AS deps
WORKDIR /app

# Avoid interactive prompts and telemetry
ENV NEXT_TELEMETRY_DISABLED=1 \
    CI=true

# If you have a package-lock.json, this ensures reproducible installs
COPY package.json package-lock.json* ./

# Faster/leaner installs and peer safety; fallback to npm i if lockfile missing
RUN if [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund --omit=optional --legacy-peer-deps; \
    else \
      npm i --no-audit --no-fund --omit=optional --legacy-peer-deps; \
    fi

# 2) Build with low-memory flags
FROM node:18-slim AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1 \
    LOW_MEM_BUILD=1 \
    UV_THREADPOOL_SIZE=1 \
    NODE_OPTIONS=--max-old-space-size=1024

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app (standalone output is set in next.config.js)
RUN npm run build:lowmem

# 3) Run the standalone server
FROM node:18-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Copy only the necessary artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

EXPOSE 3000

# Run Next.js standalone server
CMD ["node", "server.js"]
