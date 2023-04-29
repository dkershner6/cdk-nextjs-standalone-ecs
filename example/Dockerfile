FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm ci


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# We use curl to run the health check on the container
RUN apk add --update curl

ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Additions from NextjsStandaloneEcsSite
# We use curl to run the health check on the container
RUN apk add --update curl
# Copy our scripts to the root of the container
COPY --from=builder --chown=nextjs:nodejs app/docker ./
# Move the build out of the way of our .next folder shared across containers
RUN mv ./.next ./.next.currentBuild
RUN mkdir -p ./.next
RUN chown nextjs:nodejs ./.next
# End additions from NextjsStandaloneEcsSite

USER nextjs

EXPOSE 3000

ENTRYPOINT ["sh","./startup.sh"]
