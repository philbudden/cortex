# Agentic Platform — Architecture & Implementation Plan

**Document version**: 1.0  
**Status**: Draft — Source of truth for implementation  
**Intended audience**: LLM-based coding assistants, platform engineers

---

## 0. Executive Summary

This document describes a **personal AI assistant platform** — a variant of
[OpenClaw](https://github.com/n3ddu8/agentic-platform/openclaw) built around
two key substitutions:

1. **Agent runner**: [OpenCode](https://opencode.ai) replaces the Pi embedded runner
2. **Channel adaptor**: Matrix is the primary (and initially only) messaging channel

The platform must:

- Connect to Ollama running on a dedicated Mac Mini for all LLM inference
- Run agents remotely on a K3S cluster or a Podman host
- Be fully container-native (Docker, Podman, Kubernetes)
- Ship as a proper installed/deployed service — not operated from a git checkout
- Support hybrid vector + keyword memory search backed by SQLite + FastEmbed
- Expose skills via Python-based drop-in `SKILL.md` files

The platform is designed for **single-user personal use first** but must not
make architectural choices that prevent future multi-user expansion.

---

## 1. Relationship to OpenClaw

OpenClaw is a mature TypeScript/Node.js AI gateway with the following
subsystems:

| Subsystem                   | OpenClaw implementation                  | Decision for this platform                   |
| --------------------------- | ---------------------------------------- | -------------------------------------------- |
| Gateway server              | WebSocket/HTTP RPC, Node.js              | **Reuse** — fork, strip unused channels      |
| Agent runner                | Pi embedded runner (Mariozechner SDK)    | **Replace** — OpenCode runner                |
| Matrix channel              | `extensions/matrix` (`@openclaw/matrix`) | **Reuse as-is** — production-ready           |
| Memory files                | SOUL/USER/MEMORY/AGENTS/HEARTBEAT.md     | **Reuse** — identical structure              |
| Memory embeddings           | OpenAI / Voyage / Gemini                 | **Replace** — FastEmbed (local Python)       |
| Heartbeat                   | Cron + `HEARTBEAT.md` + channel delivery | **Reuse** — adapt Matrix as only target      |
| Hooks                       | Event-driven lifecycle hooks             | **Reuse** — keep bundled hooks               |
| Skills registry             | Bash/Node SKILL.md + tool generation     | **Adapt** — add Python skill executor        |
| Config schema               | Zod schema, JSON config file             | **Reuse** — slim down unused fields          |
| Deployment                  | Dockerfile + docker-compose              | **Extend** — add Helm chart, Podman quadlets |
| macOS menubar app           | Swift / macOS native                     | **Drop** — not in scope                      |
| Mobile apps                 | iOS / Android                            | **Drop** — Matrix is the mobile interface    |
| 38 other channel extensions | Slack, Discord, Telegram, etc.           | **Drop** — matrix only initially             |

### Reuse boundary summary

- **Keep unchanged**: `extensions/matrix/`, `src/cron/`, `src/memory/` (file
  ops and search interface), `src/hooks/`, `src/gateway/` (structure),
  `src/config/` (strip unused fields), `src/channels/` (routing layer,
  plugin loader)
- **Replace**: `src/agents/pi-embedded-runner/` → OpenCode runner adapter
- **Add**: FastEmbed service (Python), Helm chart, Podman quadlets, Python
  skills runtime

---

## 2. Architecture Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                     CONTROL PLANE (always-on)                      │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  Gateway Service (Node.js)                   │  │
│  │              fork of OpenClaw gateway                        │  │
│  │                                                              │  │
│  │  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐  │  │
│  │  │Matrix channel│  │ Cron/Heartbeat│  │  Memory (files + │  │  │
│  │  │(@openclaw/   │  │ (OpenClaw     │  │  FastEmbed API)  │  │  │
│  │  │ matrix ext)  │  │  cron module) │  │                  │  │  │
│  │  └──────┬───────┘  └───────┬───────┘  └────────┬─────────┘  │  │
│  │         │                  │                   │            │  │
│  │  ┌──────▼──────────────────▼───────────────────▼──────────┐ │  │
│  │  │             OpenCode Runner Adapter                     │ │  │
│  │  │    (replaces src/agents/pi-embedded-runner/)            │ │  │
│  │  │                                                         │ │  │
│  │  │  Mode A: call OpenCode Server via HTTP/WS API           │ │  │
│  │  │  Mode B: spawn ephemeral agent container via K3S/Podman │ │  │
│  │  └──────────────────────────────────────────────────────── ┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │            FastEmbed Service (Python / FastAPI)              │  │
│  │        /embed  /search  /index  — SQLite backend             │  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
              │                           │
              │ Matrix                    │ OpenCode API
              ▼                           ▼
┌─────────────────────┐    ┌───────────────────────────────────────┐
│  Matrix Homeserver  │    │        EXECUTION PLANE                │
│  (Synapse/Conduit)  │    │                                       │
│  Self-hosted        │    │  Option A: OpenCode Server Container  │
│  Tailscale-scoped   │    │  ┌─────────────────────────────────┐  │
└─────────────────────┘    │  │  opencode serve                 │  │
              ▲            │  │  Shared, long-lived             │  │
              │            │  │  Sessions managed per agent     │  │
              │            │  └───────────────┬─────────────────┘  │
  ┌───────────┴──────┐     │                  │                    │
  │  User (iPhone or │     │  Option B: Ephemeral Agent Pods       │
  │  desktop Matrix  │     │  ┌─────────────────────────────────┐  │
  │  client)         │     │  │  opencode serve (per-pod)       │  │
  └──────────────────┘     │  │  Ephemeral, one per task/session│  │
                           │  │  K3S Job / Podman --rm container│  │
                           │  └───────────────┬─────────────────┘  │
                           │                  │                    │
                           └─────────────────────────────────────  ┘
                                              │
                                              ▼
                           ┌───────────────────────────────────────┐
                           │       Ollama (Mac Mini)               │
                           │   http://mac-mini:11434               │
                           │   All model inference happens here    │
                           │   Accessible via Tailscale            │
                           └───────────────────────────────────────┘
```

---

## 3. OpenCode Runner — Two Modes

The central architectural choice is how OpenCode handles agent sessions.
Both modes must be implemented; the operator selects via config.

### Mode A — Shared OpenCode Server

```
Gateway → OpenCode HTTP API → OpenCode Server (container)
                                      ↓
                               Ollama (Mac Mini)
```

- One `opencode serve` container per platform instance
- Gateway creates/manages sessions via the OpenCode API
- Python agent workers (optional) can also call the same server
- Sessions identified by `sessionId` keyed to Matrix thread/room

**When to use**: Interactive conversations, low-latency responses, single user

**Pros**: Fast session resume, lower resource overhead  
**Cons**: All tool execution inside the server container; less isolation

### Mode B — Ephemeral Agent Containers

```
Gateway → spawn K3S Job or Podman container
               (opencode serve + Python agent worker)
                          ↓
                   Ollama (Mac Mini)
```

- Each task/conversation turn spawns a fresh container
- Container runs either:
  - `opencode serve` with a Python SDK worker inside it
  - Or just `opencode` in non-server mode with a task file
- Container is destroyed after the task completes

**When to use**: Isolated tasks, heartbeat checks, background agent work

**Pros**: Full isolation, reproducible, matches existing mobile-agentic-ai-workflow
design  
**Cons**: Cold start latency, session state must be externalised

### Recommended default

Start with **Mode A** for interactive Matrix sessions (low latency, session
continuity) and **Mode B** for heartbeat agents and background tasks (isolation,
no shared state).

The OpenCode Runner Adapter must present a single interface to the gateway
regardless of which mode is used.

---

## 4. Major Components

### 4.1 Gateway Service

**Language**: TypeScript (Node.js 22+)  
**Source base**: Fork of `openclaw/src/` and `openclaw/extensions/matrix/`  
**Role**: Always-on service; receives Matrix events, routes to agent runner,
delivers responses

**Changes from OpenClaw**:

- Remove all channel adapters except Matrix and Terminal (OpenCode CLI)
- Remove Pi embedded runner; add OpenCode Runner Adapter
- Remove mobile app node tracking (iOS/Android)
- Remove Pi-specific model catalog entries; add Ollama provider config
- Replace OpenAI/Voyage embedding calls with FastEmbed service HTTP calls
- Slim config schema to matrix + opencode + memory + heartbeat sections

**Key files** (relative to new project root):

```
src/
├── agents/
│   └── opencode-runner/
│       ├── index.ts           # Exports runOpencodeAgent() — public API
│       ├── server-mode.ts     # Mode A: HTTP/WS calls to OpenCode Server
│       ├── ephemeral-mode.ts  # Mode B: spawn K3S Job or Podman container
│       ├── session.ts         # Session state serialisation/deserialisation
│       ├── tools.ts           # Tool policy: map skills → OpenCode tool defs
│       └── types.ts           # OpencodeRunnerConfig, AgentRunResult, etc.
├── channels/
│   └── (matrix only — strip everything else)
├── memory/
│   ├── embeddings/
│   │   └── fastembed-client.ts  # HTTP client → FastEmbed service
│   └── (rest unchanged from OpenClaw)
├── cron/              # Unchanged from OpenClaw
├── hooks/             # Unchanged from OpenClaw
├── gateway/           # Unchanged from OpenClaw (structure)
└── config/            # Trimmed Zod schema
```

### 4.2 OpenCode Runner Adapter

**Language**: TypeScript  
**Interface** (must match OpenClaw runner contract):

```typescript
// src/agents/opencode-runner/index.ts

export interface OpencodeRunnerConfig {
  mode: "server" | "ephemeral";
  // Mode A
  serverUrl?: string; // e.g. http://opencode-server:4096
  // Mode B
  containerRuntime?: "k3s" | "podman" | "docker";
  k3sNamespace?: string;
  podmanSocket?: string; // unix:///run/user/1000/podman/podman.sock
  agentImage?: string; // image with opencode + Python SDK
  // Shared
  ollamaBaseUrl: string; // http://mac-mini:11434
  defaultModel: string; // e.g. qwen2.5-coder:7b
  sessionStorePath: string; // path to serialised session store
  resourceLimits?: {
    cpu?: string;
    memory?: string;
    timeoutSeconds?: number;
  };
}

export async function runOpencodeAgent(
  ctx: AgentRunContext, // message, session, memory, skills, hooks
  config: OpencodeRunnerConfig,
): Promise<AgentRunResult>; // text reply, tool calls, usage
```

**Session state**: Because ephemeral containers cannot maintain in-memory
state, all session data (transcript, memory context) is stored in the shared
workspace volume and referenced by `sessionId`. Mode A reads/writes this
same store so both modes are interchangeable for a given session.

### 4.3 FastEmbed Service

**Language**: Python 3.12+  
**Framework**: FastAPI + Uvicorn  
**Library**: `fastembed` (local inference, no external API required)  
**Storage**: SQLite with FTS5 (keyword) + `sqlite-vec` (vector)

**Purpose**: Replace OpenClaw's dependency on OpenAI/Voyage/Gemini embeddings
with a fully local embedding backend.

**API**:

```
POST /embed        { texts: string[] } → { embeddings: float[][] }
POST /index        { id, text, metadata } → { ok }
POST /search       { query, limit, mode: "vector"|"keyword"|"hybrid" }
                   → { results: [{ id, score, metadata }] }
DELETE /index/:id  → { ok }
GET  /health       → { ok, model }
```

**Model**: `BAAI/bge-small-en-v1.5` (default) — 33M params, fast on CPU,
good multilingual quality. Model is configurable via env var
`FASTEMBED_MODEL`.

**Data store schema** (SQLite):

```sql
CREATE TABLE memory_chunks (
  id          TEXT PRIMARY KEY,
  source_file TEXT NOT NULL,       -- e.g. "MEMORY.md", "daily/2026-01-15.md"
  chunk_index INTEGER NOT NULL,
  content     TEXT NOT NULL,
  metadata    TEXT,                -- JSON
  created_at  TEXT DEFAULT (datetime('now'))
);

CREATE VIRTUAL TABLE memory_fts USING fts5(
  id UNINDEXED,
  content,
  content='memory_chunks',
  content_rowid='rowid'
);

CREATE TABLE memory_vectors (
  id          TEXT PRIMARY KEY,
  embedding   BLOB NOT NULL        -- sqlite-vec float32 array
);
```

**Hybrid search**: Returns union of FTS5 BM25 results and cosine similarity
results, merged and re-ranked by reciprocal rank fusion (RRF).

**Deployment**: Sidecar container in same pod/compose stack as gateway.

### 4.4 Matrix Channel

**Source**: `openclaw/extensions/matrix/` — **reused with zero modification**

The `@openclaw/matrix` extension is production-ready:

- E2EE support (opt-in, `encryption: true`)
- Thread-per-conversation mapping (use `threadReplies: "always"`)
- Per-room config with tool policies
- DM routing, allowlist gating, mention-gating for group rooms
- Media upload, reactions, polls, typing indicators

**Thread mapping**: Each Matrix thread root event ID maps to a persistent
`sessionId`. This is the primary way to maintain conversation continuity
across multiple turns.

```
Matrix room message (in thread)
  → extract thread root ID
  → resolve/create sessionId = hash(roomId + threadRootId)
  → load session from workspace/agents/<sessionId>/
  → run agent
  → reply in same thread
```

DMs map to `sessionId = hash(roomId + userId)` for 1:1 continuity.

### 4.5 Memory System

**Structure** (identical to OpenClaw workspace):

```
~/.agentic/workspace/
├── SOUL.md          # Agent identity and personality (read-only by agent)
├── USER.md          # User profile — who you are, preferences, context
├── MEMORY.md        # Long-term facts — curated by agent, append/edit
├── AGENTS.md        # Agent behaviour definitions and configurations
├── HEARTBEAT.md     # Periodic check tasks
├── BOOT.md          # Optional: runs at gateway startup (hook)
├── daily/
│   └── YYYY-MM-DD.md  # Session logs — append only
└── skills/
    └── <name>/
        ├── SKILL.md
        └── skill.py   # (optional Python implementation)
```

**Search modes** (via FastEmbed service):

- `vector`: semantic similarity search across all chunked memory files
- `keyword`: BM25 full-text search (FTS5) for exact terms, names, dates
- `hybrid`: both, merged via RRF — default for agent memory recall

**Memory flush**: Preserve OpenClaw's pattern — when a session approaches
token limit, a silent pre-compaction agent turn is fired to flush durable
memories to `daily/YYYY-MM-DD.md` before compaction.

### 4.6 Heartbeat System

**Source**: `openclaw/src/cron/` — **reused with adaptation**

**Changes**:

- Delivery target hardcoded to Matrix (remove multi-channel dispatch)
- Target room configurable: `heartbeat.matrixRoomId`
- HEARTBEAT.md-driven checks — identical to OpenClaw behaviour
- Active hours window support via `heartbeat.activeHours`

**Behaviour**:

1. Cron fires at configured interval (default: `*/30 * * * *`)
2. Ephemeral agent turn (Mode B preferred for isolation)
3. Agent reads `HEARTBEAT.md`, performs checks, reports to Matrix
4. `HEARTBEAT_OK` → dropped if ≤300 chars; alert text → delivered to room

**Example HEARTBEAT.md**:

```markdown
# Heartbeat Tasks

## Every run

- Check Ollama is reachable at http://mac-mini:11434
- Report any models that have changed or gone missing

## Daily at 08:00

- Summarise anything notable from yesterday's daily log

## Weekly on Monday

- Review open tasks from MEMORY.md and flag stale items
```

### 4.7 Skills Registry

**Format**: Same as OpenClaw (`SKILL.md` with YAML frontmatter)  
**Runtime**: Python subprocess (or dedicated skills container)

**SKILL.md format** (adapted for Python):

```yaml
---
name: weather
description: "Get current weather and forecast for a location"
metadata:
  platform:
    emoji: "🌤️"
    requires:
      bins: ["python3"]
      pip: ["httpx"]
    language: python        # new field — "python" | "shell" | "node"
---
# Weather Skill

## When to Use
✅ Current weather, forecasts, temperature queries
❌ Historical climate data, air quality

## Implementation
See skill.py — exposes `get_weather(location: str) -> str`

## Example
\`\`\`python
from skill import get_weather
print(get_weather("London"))
\`\`\`
```

**Python skills runner** (`src/agents/skills/python-runner.ts`):

- Discovers `skill.py` alongside `SKILL.md`
- Generates an OpenCode tool definition wrapping the Python function
- Executes skill in a subprocess with a 30s timeout
- Optionally runs in an isolated container (sandboxed mode)

**Bundled skills to include** (keep relevant OpenClaw skills, adapt to Python):

| Skill          | Purpose                        | Keep?                             |
| -------------- | ------------------------------ | --------------------------------- |
| `weather`      | wttr.in weather query          | Yes — port to Python              |
| `github`       | GitHub API operations          | Yes — port to Python              |
| `healthcheck`  | Service availability checks    | Yes — essential for heartbeat     |
| `summarize`    | Document summarisation         | Yes — keep                        |
| `coding-agent` | Spawn sub-agent for code tasks | Yes — adapt for OpenCode          |
| `obsidian`     | Read/write Obsidian vault      | Yes — relevant to mobile workflow |

---

## 5. Data Flow

### 5.1 Interactive conversation via Matrix

```
1. User sends message in Matrix thread
2. Matrix homeserver delivers event to gateway (via bot SDK long-poll)
3. extensions/matrix: onMessage() fires
4. Channel router resolves sessionId = hash(roomId + threadRootId)
5. Load session from workspace/agents/<sessionId>/session.json
6. Load memory context:
   a. Always: SOUL.md, USER.md, MEMORY.md (summary), AGENTS.md
   b. Daily: daily/today.md + daily/yesterday.md
   c. Semantic recall: FastEmbed search(query, mode="hybrid", limit=10)
7. Resolve active skills for this room's tool policy
8. Build system prompt (SOUL + USER + memory context + skill descriptions)
9. opencode-runner/index.ts: runOpencodeAgent()
   a. Mode A: POST /api/session/{id}/message to OpenCode Server
      → OpenCode Server calls Ollama on Mac Mini
      → streams response tokens back
   b. Mode B: spawn agent container
      → container has opencode + Python SDK
      → task file injected via env/volume
      → container streams progress to stdout, gateway tails it
10. Stream response tokens back to Matrix via typing indicator + chunked messages
11. Persist session state (transcript append, token usage)
12. Memory flush if near context limit (silent pre-compaction turn)
```

### 5.2 Heartbeat execution

```
1. CronService fires at schedule
2. runCronIsolatedAgentTurn() called (Mode B preferred)
3. Ephemeral container spawned with:
   - SOUL.md, USER.md, HEARTBEAT.md mounted read-only
   - daily/today.md mounted read-write
   - Network access to Ollama + configured services
4. Agent reads HEARTBEAT.md, executes checks (using healthcheck skill, etc.)
5. Response:
   - "HEARTBEAT_OK" → ack, suppress if ≤300 chars
   - Alert text → gateway delivers to configured Matrix room
6. Container terminates (--rm)
```

### 5.3 Skill execution (Python skill)

```
1. OpenCode tool call: { name: "weather", args: { location: "London" } }
2. Gateway python-runner.ts intercepts tool call
3. Spawns: python3 ~/.agentic/workspace/skills/weather/skill.py '{"location":"London"}'
4. skill.py returns JSON result to stdout
5. Gateway injects result as tool response back into OpenCode session
6. OpenCode continues generation with tool result in context
```

---

## 6. Deployment Model

### 6.1 Container Images

| Image               | Base                                 | Contents                               | Tag      |
| ------------------- | ------------------------------------ | -------------------------------------- | -------- |
| `agentic-gateway`   | `node:22-bookworm-slim`              | TypeScript gateway + Matrix extension  | `latest` |
| `agentic-fastembed` | `python:3.12-slim`                   | FastEmbed service + SQLite             | `latest` |
| `agentic-agent`     | `python:3.12-slim` + opencode binary | OpenCode + Python SDK + bundled skills | `latest` |

All images published to a private container registry (Gitea, GHCR, or
internal). Images are the installation artefact — no git clone required.

### 6.2 Service Layout

```
┌─────────────────────────────────────────────────────────┐
│               Compute Host (K3S node or Podman host)    │
│                                                         │
│  Always-on services:                                    │
│  ┌─────────────────┐  ┌───────────────────────────────┐ │
│  │ agentic-gateway │  │   agentic-fastembed           │ │
│  │ (gateway svc)   │  │   (embedding sidecar)         │ │
│  │                 │  │   port: 8765 (internal only)  │ │
│  │ port: 18789     │  └───────────────────────────────┘ │
│  │ (Tailscale only)│                                    │
│  └─────────────────┘  ┌───────────────────────────────┐ │
│                       │  agentic-opencode-server       │ │
│  Shared volumes:      │  (Mode A only)                 │ │
│  - workspace/         │  port: 4096 (internal only)   │ │
│  - config/            └───────────────────────────────┘ │
│  - embeddings-db/                                       │
│                                                         │
│  Ephemeral (Mode B / Heartbeat):                        │
│  ┌─────────────────────────────────────────────────────┐│
│  │  agentic-agent container (K3S Job / podman --rm)    ││
│  │  Spawned per task, destroyed on completion          ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                        │
               Tailscale network
                        │
              ┌─────────────────┐
              │   Mac Mini      │
              │  Ollama :11434  │
              └─────────────────┘
```

### 6.3 Docker Compose (local dev / Podman host)

```yaml
# docker-compose.yml (also Podman-compatible)
services:
  gateway:
    image: ${REGISTRY}/agentic-gateway:${TAG:-latest}
    restart: unless-stopped
    ports:
      - "127.0.0.1:18789:18789" # Tailscale-exposed, not public
    volumes:
      - ${AGENTIC_CONFIG_DIR:-~/.agentic}:/home/node/.agentic
      - ${AGENTIC_WORKSPACE_DIR:-~/.agentic/workspace}:/home/node/.agentic/workspace
      - /run/podman/podman.sock:/run/podman/podman.sock:ro # for Mode B
    environment:
      - OLLAMA_BASE_URL=${OLLAMA_BASE_URL:-http://mac-mini:11434}
      - OPENCODE_RUNNER_MODE=${OPENCODE_RUNNER_MODE:-server}
      - FASTEMBED_URL=http://fastembed:8765
      - MATRIX_HOMESERVER=${MATRIX_HOMESERVER}
      - MATRIX_USER_ID=${MATRIX_USER_ID}
      - MATRIX_ACCESS_TOKEN=${MATRIX_ACCESS_TOKEN}
    depends_on:
      fastembed:
        condition: service_healthy
      opencode-server:
        condition: service_started

  fastembed:
    image: ${REGISTRY}/agentic-fastembed:${TAG:-latest}
    restart: unless-stopped
    volumes:
      - embeddings-db:/data
    environment:
      - FASTEMBED_MODEL=${FASTEMBED_MODEL:-BAAI/bge-small-en-v1.5}
      - DB_PATH=/data/embeddings.db
    healthcheck:
      test: ["CMD", "curl", "-sf", "http://localhost:8765/health"]
      interval: 10s

  opencode-server:
    image: ${REGISTRY}/agentic-agent:${TAG:-latest}
    restart: unless-stopped
    command: ["opencode", "serve", "--port", "4096"]
    environment:
      - OPENAI_BASE_URL=${OLLAMA_BASE_URL:-http://mac-mini:11434}/v1
      - OPENAI_API_KEY=ollama # Ollama doesn't validate keys
      - OPENCODE_DEFAULT_MODEL=${OPENCODE_DEFAULT_MODEL:-qwen2.5-coder:7b}
    profiles:
      - mode-a # Only started when using Mode A

volumes:
  embeddings-db:
```

### 6.4 Helm Chart (K3S)

Structure:

```
deploy/helm/agentic-platform/
├── Chart.yaml
├── values.yaml              # All tunables with defaults
├── values.production.yaml   # Operator override (not committed)
├── templates/
│   ├── gateway/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── pvc.yaml         # workspace + config volumes
│   ├── fastembed/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── pvc.yaml         # embeddings-db volume
│   ├── opencode-server/
│   │   ├── deployment.yaml  # Mode A only
│   │   └── service.yaml
│   ├── rbac/
│   │   ├── serviceaccount.yaml
│   │   └── role.yaml        # permission to spawn Jobs (Mode B)
│   └── configmap.yaml       # gateway config skeleton
└── README.md
```

**Key Helm values**:

```yaml
gateway:
  image: registry/agentic-gateway
  tag: latest
  replicaCount: 1 # StatefulSet for persistent workspace
  workspace:
    storageClass: local-path
    size: 5Gi

opencode:
  runner:
    mode: server # "server" | "ephemeral"
  server:
    enabled: true # only if mode=server
    image: registry/agentic-agent

ollama:
  baseUrl: http://mac-mini.tail-xxxx.ts.net:11434
  defaultModel: qwen2.5-coder:7b

matrix:
  homeserver: https://matrix.example.com
  userId: "@bot:example.com"
  encryption: false # enable after initial testing
  threadReplies: always

heartbeat:
  enabled: true
  schedule: "*/30 * * * *"
  matrixRoomId: "!heartbeat:example.com"
  activeHours:
    start: "07:00"
    end: "23:00"
    timezone: "Europe/London"

fastembed:
  enabled: true
  model: BAAI/bge-small-en-v1.5
  storage:
    storageClass: local-path
    size: 2Gi
```

### 6.5 Podman Quadlets (systemd-native Podman)

For Podman hosts that prefer systemd units over Compose:

```
deploy/podman/
├── agentic-gateway.container      # systemd quadlet
├── agentic-fastembed.container
├── agentic-opencode.container
├── agentic.network                # internal network
└── README.md
```

Example (`agentic-gateway.container`):

```ini
[Unit]
Description=Agentic Platform Gateway
After=network-online.target agentic-fastembed.service

[Container]
Image=registry/agentic-gateway:latest
PublishPort=127.0.0.1:18789:18789
Volume=%h/.agentic:/home/node/.agentic:Z
EnvironmentFile=%h/.config/agentic/env
Network=agentic.network
AutoUpdate=registry

[Service]
Restart=always

[Install]
WantedBy=default.target
```

### 6.6 Installation model

The platform is installed via one of:

**Option A — Container pull + compose**

```bash
curl -fsSL https://raw.githubusercontent.com/.../install.sh | sh
# - downloads docker-compose.yml + env template
# - pulls images
# - creates ~/.agentic/ workspace skeleton
# - starts services
```

**Option B — Helm install (K3S)**

```bash
helm install agentic-platform ./deploy/helm/agentic-platform \
  --namespace agentic-platform --create-namespace \
  -f values.production.yaml
```

**Option C — Podman quadlets**

```bash
./deploy/podman/install.sh
# - copies .container files to ~/.config/containers/systemd/
# - creates workspace skeleton
# - systemctl --user daemon-reload && systemctl --user start agentic-gateway
```

**There is no "run from git checkout" mode.** The `agentic` CLI is a thin
wrapper that communicates with the running gateway service. It is distributed
as a standalone binary or npm global package.

---

## 7. Project Repository Structure

```
agentic-platform/
├── src/                          # TypeScript source (gateway)
│   ├── agents/
│   │   ├── opencode-runner/      # NEW — OpenCode runner adapter
│   │   │   ├── index.ts
│   │   │   ├── server-mode.ts
│   │   │   ├── ephemeral-mode.ts
│   │   │   ├── session.ts
│   │   │   ├── tools.ts
│   │   │   └── types.ts
│   │   └── skills/
│   │       ├── python-runner.ts  # NEW — Python skill executor
│   │       └── loader.ts         # Adapted from OpenClaw
│   ├── channels/                 # Stripped to Matrix + Terminal only
│   ├── memory/
│   │   └── embeddings/
│   │       └── fastembed-client.ts  # NEW
│   ├── cron/                     # Unchanged from OpenClaw
│   ├── hooks/                    # Unchanged from OpenClaw
│   └── gateway/                  # Stripped / adapted from OpenClaw
├── extensions/
│   └── matrix/                   # Vendored from @openclaw/matrix (unchanged)
├── services/
│   └── fastembed/                # NEW — Python FastEmbed service
│       ├── main.py
│       ├── embeddings.py
│       ├── search.py
│       ├── requirements.txt
│       └── Dockerfile
├── skills/                       # Bundled Python skills
│   ├── weather/
│   │   ├── SKILL.md
│   │   └── skill.py
│   ├── healthcheck/
│   │   ├── SKILL.md
│   │   └── skill.py
│   └── ...
├── deploy/
│   ├── docker-compose.yml
│   ├── helm/
│   │   └── agentic-platform/
│   └── podman/
├── workspace-template/           # Default workspace skeleton
│   ├── SOUL.md                   # Default personality
│   ├── USER.md                   # Blank — user fills in
│   ├── MEMORY.md                 # Empty
│   ├── AGENTS.md                 # Default agent config
│   └── HEARTBEAT.md              # Default heartbeat tasks
├── Dockerfile                    # Gateway image
├── package.json
├── pnpm-workspace.yaml
└── PLAN.md                       # This file
```

---

## 8. Implementation Phases

### Phase 0 — Project scaffold

**Goal**: Runnable skeleton with no functionality, passing CI

- [ ] Fork OpenClaw into new repository; remove all unused channel extensions,
      mobile apps, macOS app, Pi runner
- [ ] Verify remaining TypeScript compiles with Matrix extension only
- [ ] Stub `opencode-runner/index.ts` returning a hardcoded response
- [ ] Add Python FastEmbed service scaffold (health endpoint only)
- [ ] Add `docker-compose.yml` (gateway + fastembed, no opencode yet)
- [ ] Set up CI (lint, typecheck, unit tests, container build)

**Exit criteria**: `docker compose up` → gateway starts, Matrix connects,
hardcoded reply arrives in Matrix DM

### Phase 1 — OpenCode Server integration (Mode A)

**Goal**: Real LLM responses via OpenCode → Ollama

- [ ] Add `opencode-server` container to compose stack
- [ ] Implement `server-mode.ts` (OpenCode HTTP/WS API client)
- [ ] Wire gateway → `runOpencodeAgent()` → OpenCode Server → Ollama
- [ ] Stream response tokens back to Matrix thread
- [ ] Session state serialisation (transcript persistence)
- [ ] Handle OpenCode session errors, retries, timeouts

**Exit criteria**: Interactive Matrix conversation with Ollama-backed responses,
session continuity across multiple turns in same thread

### Phase 2 — Memory system

**Goal**: Agent has long-term memory, semantic recall works

- [ ] Implement FastEmbed service fully (embed, index, search, hybrid)
- [ ] Implement `fastembed-client.ts` in gateway
- [ ] Wire memory search into system prompt construction
- [ ] Implement memory flush pre-compaction turn
- [ ] Test hybrid search (vector + keyword) against populated daily logs
- [ ] Add `workspace-template/` with all default Markdown files

**Exit criteria**: Agent recalls facts from previous conversations; hybrid
search returns relevant results; pre-compaction flush works

### Phase 3 — Heartbeat system

**Goal**: Proactive Matrix notifications on schedule

- [ ] Port OpenClaw cron/service.ts (adapt Matrix delivery target)
- [ ] Implement heartbeat agent run via Mode B (ephemeral container)
- [ ] HEARTBEAT.md-driven checks working
- [ ] Active hours window enforced
- [ ] Healthcheck skill (Python) for Ollama/service checks

**Exit criteria**: `HEARTBEAT.md` checks run on schedule; Matrix room receives
proactive alerts when Ollama is unreachable or models change

### Phase 4 — Ephemeral agent mode (Mode B)

**Goal**: Isolated tasks via K3S Jobs or Podman containers

- [ ] Implement `ephemeral-mode.ts` (spawn K3S Job or Podman container)
- [ ] Agent container (`agentic-agent` image): opencode + Python SDK + skills
- [ ] Session state externalised to shared workspace volume
- [ ] Heartbeat switched to Mode B
- [ ] Background task spawning from Matrix (`/task <description>`)
- [ ] Task lifecycle: Requested → Running → Completed/Failed, reported to Matrix thread

**Exit criteria**: `/task summarise my MEMORY.md` spawns ephemeral container,
runs task, reports result in Matrix thread, container destroys itself

### Phase 5 — Python skills runtime

**Goal**: Drop-in Python skills usable from both Matrix and heartbeat agents

- [ ] Implement `python-runner.ts` (subprocess execution with timeout)
- [ ] Bundle core skills: weather, healthcheck, github, summarize
- [ ] Skill sandbox mode (optional — run skill.py in isolated container)
- [ ] Skills discovery from workspace `skills/` directory
- [ ] Document SKILL.md format with Python extension

**Exit criteria**: Custom skill added to workspace/skills/ is immediately
available to agent without restart; skill called successfully from Matrix

### Phase 6 — Deployment hardening

**Goal**: Production-ready installation model

- [ ] Helm chart for K3S with all tunables
- [ ] Podman quadlet definitions
- [ ] Install script (`install.sh` for compose, readme for helm/podman)
- [ ] Workspace skeleton initialisation on first run
- [ ] Secret handling documentation (no secrets in images or charts)
- [ ] Health checks for all containers
- [ ] Graceful shutdown (drain active sessions before stop)
- [ ] Log aggregation via stdout/stderr (K3S: Loki; Podman: journald)

**Exit criteria**: Fresh install on K3S produces running system in <5 mins
from images already pulled; same for Podman host

---

## 9. Key Risks & Unknowns

| Risk                                                                                                                      | Severity | Mitigation                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCode server API stability** — opencode is actively developed; HTTP API may change between versions                  | High     | Pin opencode version in Dockerfile; wrap all API calls in a versioned adapter layer; add integration tests                         |
| **OpenCode session isolation (Mode A)** — shared server may leak context between sessions if not properly isolated        | High     | Audit OpenCode session API for isolation guarantees; if insufficient, default to Mode B for all cases                              |
| **Ollama network latency** — Mac Mini is on same LAN/Tailscale; round-trips for large context are slow                    | Medium   | Use Tailscale for sub-10ms LAN paths; configure Ollama context window and batch size for throughput; test with realistic workloads |
| **FastEmbed model quality** — bge-small-en-v1.5 is CPU-fast but lower quality than OpenAI embeddings for long-form recall | Medium   | Evaluate on real memory workloads; consider bge-base if quality insufficient; hybrid search (FTS5) compensates for semantic misses |
| **OpenClaw fork divergence** — upstream openclaw may fix bugs or add features we need                                     | Low      | Keep Matrix extension as vendored copy; track upstream releases; document what was changed vs original                             |
| **Matrix thread mapping correctness** — wrong sessionId → conversation cross-contamination                                | High     | Unit-test thread root ID resolution; add sessionId to every log line; expose session debug info via heartbeat skill                |
| **Mode B cold start latency** — container pull + start may take 2-10s per interactive message                             | Medium   | Pre-pull images on host; use Mode A for interactive, Mode B for background only; cache agent image locally                         |
| **K3S RBAC for job spawning** — gateway needs permission to create Jobs                                                   | Low      | Define minimal Role in Helm chart; document required permissions                                                                   |
| **Python skill subprocess escaping** — untrusted input in skill args could be dangerous                                   | Medium   | Always pass args as JSON via stdin, not shell arguments; skills run as non-root; add sandbox mode for untrusted skills             |
| **Encryption key management for Matrix E2EE** — crypto store tied to device identity                                      | Medium   | Store crypto DB on persistent volume; document key backup procedure; start with `encryption: false` and enable deliberately        |

---

## 10. Out of Scope (explicitly)

The following are **not** part of this platform and should not be added
without explicit re-scoping:

- Other messaging channels (Slack, Discord, Telegram, WhatsApp, etc.) — Matrix
  is the only channel initially
- macOS menubar app, iOS/Android apps — Matrix client is the mobile interface
- Public skills registry (ClawHub equivalent)
- Multi-user support in Phase 1-5 (single user only)
- Agent hierarchy frameworks or orchestration beyond task-per-container
- Web UI or HTTP dashboard
- Federation-facing Matrix server configuration
- OpenClaw upstream compatibility (this is a fork, not a plugin)

---

## 11. Naming Conventions

| Concept              | Convention                                  |
| -------------------- | ------------------------------------------- |
| Config directory     | `~/.agentic/`                               |
| Workspace directory  | `~/.agentic/workspace/`                     |
| Session store        | `~/.agentic/workspace/agents/<sessionId>/`  |
| Session ID format    | `sha256(roomId + ":" + threadRootId)[0:16]` |
| Container network    | `agentic`                                   |
| Helm release name    | `agentic-platform`                          |
| Kubernetes namespace | `agentic-platform`                          |
| Image prefix         | `registry/agentic-`                         |
| Env var prefix       | `AGENTIC_`                                  |

---

## 12. Reference: OpenClaw Modules Not Ported

The following OpenClaw modules are **deliberately excluded**. Do not
re-introduce them unless explicitly planned:

- `src/agents/pi-embedded-runner/` — replaced by `opencode-runner/`
- `src/channels/slack/`, `discord/`, `telegram/`, `signal/`, `imessage/`,
  `whatsapp/`, `web/`, `line/` — all removed; matrix only
- `extensions/` (all except `matrix/`) — not applicable
- `apps/ios/`, `apps/android/`, `apps/macos/` — removed
- `packages/clawdbot/`, `packages/moltbot/` — compatibility shims, not needed
- `src/memory/embeddings/` backends for OpenAI, Voyage, Gemini — removed;
  only FastEmbed client remains
- `ui/` — web control UI, not in scope
- `fly.toml`, `render.yaml` — cloud deployment configs, not in scope

---

_End of PLAN.md_
