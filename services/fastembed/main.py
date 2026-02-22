"""
FastEmbed Service - Phase 0 Scaffold

This service provides embedding and search capabilities using FastEmbed.
Phase 0: Health endpoint only
Phase 2: Full implementation with embed, index, search, hybrid search
"""

from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI(
    title="Cortex FastEmbed Service",
    description="Embedding and search service for Cortex",
    version="0.1.0",
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {"service": "cortex-fastembed", "status": "running", "phase": "0"}


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "fastembed",
        "version": "0.1.0",
        "phase": "0-scaffold",
    }


@app.get("/ready")
async def ready():
    """Readiness check endpoint"""
    return {"ready": True, "message": "Service is ready (Phase 0 scaffold)"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        log_level="info",
        reload=True,
    )
