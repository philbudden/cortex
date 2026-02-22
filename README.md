# Cortex

Personal AI assistant platform with Matrix integration and Ollama backend.

## Overview

Cortex is a variant of [OpenClaw](https://github.com/openclaw/openclaw) designed for personal use with the following key features:

- **Matrix Integration**: Primary messaging channel for user interaction
- **Ollama Backend**: All LLM inference runs locally on a dedicated Mac Mini
- **OpenCode Agent Runner**: Remote agent execution via OpenCode
- **Local-First**: Privacy-focused, runs entirely on your infrastructure
- **Container-Native**: Docker/Podman/Kubernetes deployment

## Architecture

```
Matrix Client ←→ Cortex Gateway ←→ OpenCode ←→ Ollama (Mac Mini)
                       ↓
                  FastEmbed (Python)
```

## Current Status: Phase 0 - Scaffold

**Phase 0 Goal**: Runnable skeleton with no functionality, passing CI

### Completed

- ✅ Copied OpenClaw source and removed unused components
- ✅ Created `opencode-runner` stub (hardcoded responses)
- ✅ Added Python FastEmbed service scaffold (health endpoint only)
- ✅ Created `docker-compose.yml` for gateway + fastembed
- ✅ Set up CI (lint, typecheck, unit tests, container build)

### TODO

- [ ] Verify TypeScript compiles with Matrix extension only
- [ ] Test `docker compose up` → gateway starts
- [ ] Verify Matrix connects
- [ ] Confirm hardcoded reply arrives in Matrix DM

## Quick Start (Phase 0)

**Not yet functional** - This is a Phase 0 scaffold.

```bash
# Copy and configure environment
cp .env.example .env
# Edit .env with your configuration

# Start services
docker compose up -d

# Check logs
docker compose logs -f
```

## Development

### Prerequisites

- Node.js 22+
- pnpm (via corepack)
- Python 3.12+ (for FastEmbed service)
- Docker or Podman

### Commands

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Lint and format
pnpm check

# Run tests
pnpm test

# Development mode
pnpm dev
```

## Project Structure

```
cortex/
 src/                    # TypeScript source (Gateway)
   ├── agents/
   │   └── opencode-runner/  # OpenCode integration (stub)
   ├── gateway/            # Gateway server
   └── ...
 extensions/
   └── matrix/             # Matrix channel adapter
 services/
   └── fastembed/          # Python FastEmbed service
 docker-compose.yml      # Compose stack
 Dockerfile             # Gateway container
```

## Roadmap

- **Phase 0** (Current): Project scaffold
- **Phase 1**: OpenCode Server integration (Mode A)
- **Phase 2**: Memory system with FastEmbed
- **Phase 3**: Heartbeat system
- **Phase 4**: Ephemeral agent mode (Mode B)
- **Phase 5**: Python skills runtime
- **Phase 6**: Deployment hardening

See [PLAN.md](PLAN.md) for detailed implementation plan.

## License

MIT

## Acknowledgments

Based on [OpenClaw](https://github.com/openclaw/openclaw) - A multi-channel AI gateway platform.
