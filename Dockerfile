FROM node:22-bookworm-slim

RUN corepack enable

WORKDIR /app
RUN chown node:node /app

# Copy package files
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY --chown=node:node patches ./patches
COPY --chown=node:node scripts ./scripts

# Install dependencies
USER node
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --chown=node:node . .

# Build the application
RUN pnpm build

ENV NODE_ENV=production

# Run as non-root user for security
USER node

# Start gateway server
# Phase 0: Hardcoded response mode
CMD ["node", "dist/index.js", "gateway"]

