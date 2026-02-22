FROM node:22-bookworm-slim@sha256:3cfe526ec8dd62013b8843e8e5d4877e297b886e5aace4a59fec25dc20736e45

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

# Optional: install browser dependencies for Playwright support
ARG OPENCLAW_INSTALL_BROWSER=false
USER root
RUN if [ "$OPENCLAW_INSTALL_BROWSER" = "true" ]; then \
      apt-get update && apt-get install -y --no-install-recommends xvfb && rm -rf /var/lib/apt/lists/* && \
      node /app/node_modules/playwright-core/cli.js install --with-deps chromium; \
    fi
USER node

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

