# PHASE 2 -- INTENT-AWARE EXECUTION & RELIABILITY HARDENING

## Objective

Phase 2 upgrades the Phase 1 architecture by:

-   Making worker prompting intent-aware
-   Hardening classifier reliability
-   Enforcing deterministic behavior
-   Improving observability
-   Strengthening failure handling

This document is designed to be read as context by an LLM-powered coding
assistant.

------------------------------------------------------------------------

# Architectural Constraints (Must Remain True)

1.  Single entrypoint: `/ingest`
2.  Exactly two LLM calls per successful request:
    -   1 classifier call
    -   1 worker call
3.  Router remains pure Python (no LLM calls)
4.  No memory layer
5.  No tool execution
6.  No autonomous planning

------------------------------------------------------------------------

# Scope of Changes

## 1. Intent-Aware Worker Prompting

Worker behavior must differ based on intent:

### execution

-   Direct, concise answer
-   No planning structure

### decomposition

-   Structured output
-   Steps / phases clearly enumerated

### novel_reasoning

-   Creative exploration
-   Speculative or system-design style output

### ambiguous

-   No worker call
-   Return clarification question

Implementation requirement: - Worker receives both `input_text` and
`intent` - Worker selects prompt template based on intent

------------------------------------------------------------------------

## 2. Classifier Hardening

Classifier must:

-   Use temperature = 0
-   Use deterministic prompt
-   Require strict JSON output
-   Validate via Pydantic schema
-   Retry once if invalid
-   Return ambiguous if still invalid

Expected schema:

{ "intent": "execution \| decomposition \| novel_reasoning \|
ambiguous", "confidence": float }

------------------------------------------------------------------------

## 3. Observability

Log the following per request:

-   intent
-   confidence
-   classifier latency
-   worker latency
-   total latency

Logs must clearly show exactly two LLM calls.

------------------------------------------------------------------------

## 4. Failure Handling

System must gracefully handle:

-   Ollama unavailable
-   Model not found
-   Invalid classifier JSON
-   Empty input
-   Worker timeout

Failure result format:

{ "intent": "ambiguous", "confidence": 0.0, "response":
"`<polite clarification or failure message>`{=html}" }

System must not crash.

------------------------------------------------------------------------

# Non-Goals

-   No memory persistence
-   No conversation history
-   No external API calls
-   No tool execution
-   No autonomous loops

------------------------------------------------------------------------

# Completion Criteria

Phase 2 is complete when:

-   Worker output style changes by intent
-   Classifier intent is stable across repeated runs
-   Exactly 2 LLM calls per successful request
-   Ambiguous intent properly blocks worker call
-   System survives Ollama shutdown
-   Deterministic behavior confirmed

------------------------------------------------------------------------

# End of Phase 2 Plan

