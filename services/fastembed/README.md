# Cortex FastEmbed Service - Phase 0

FastAPI service for embedding and search capabilities.

## Phase 0 - Scaffold Only

Currently provides only health check endpoints:
- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /ready` - Readiness check

## Running Locally

```bash
pip install -r requirements.txt
python main.py
```

Service runs on http://localhost:8000

## Phase 2 Endpoints (Not Yet Implemented)

- `POST /embed` - Generate embeddings
- `POST /index` - Index documents
- `POST /search` - Search with hybrid vector + keyword
