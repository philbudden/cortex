# AGENTS.md

## Purpose

This document defines **authoritative, enforceable rules** for all contributors — **human or LLM-based** — working in this repository.

**PLAN.md is the single source of truth.**  
All design, sequencing, constraints, and scope decisions MUST align with PLAN.md.  
Deviation is **not permitted** unless explicitly documented, justified, and approved.

This file is written to be **machine-enforceable** by automated coding agents.

---

## Source of Truth

- `PLAN.md` is **canonical**
- This repository implements **exactly what PLAN.md specifies**
- If ambiguity exists:
  1. STOP
  2. Document the ambiguity
  3. Request clarification
  4. Do NOT invent behaviour

---

## Relationship to OpenClaw

The upstream **openclaw** repository is treated as:

- **Architectural reference only**
- A source of:
  - Control-plane patterns
  - Agent lifecycle concepts
  - Gateway semantics

Strict rules:

- ❌ No assumptions beyond what PLAN.md explicitly authorises
- ✅ Components may be:
  - Reimplemented
  - Simplified
  - Replaced
  - Omitted  
  **only if PLAN.md says so**

---

## Phase-Based Execution Model

Work MUST follow the phases defined in PLAN.md.

### Hard Rules

- Work on **exactly ONE phase at a time**
- Do NOT:
  - Start a later phase early
  - Stub future-phase functionality
  - Add "helpful" abstractions for later use
- Each phase must end with:
  - A clear completion checklist
  - Explicit validation criteria
  - Documentation of outcomes

### Phase Completion Gate

A phase is complete ONLY when:

- All PLAN.md requirements for the phase are implemented
- Validation steps pass
- No TODOs or placeholders remain for that phase
- The system state matches the PLAN.md description

---

## Local-First & Security Constraints

All work MUST respect these invariants:

- Local-first operation is mandatory
- Ollama is the inference backend
- No cloud dependencies unless PLAN.md explicitly allows them
- Secrets MUST:
  - Never be committed
  - Never be logged
  - Never be hard-coded
- Configuration via files or environment variables only

---

## Git & Contribution Rules

These rules are **non-negotiable**.

### Branching

- ❌ Never commit directly to `main`
- ✅ Use:
  - `phase-<n>-<description>`
  - or `feature-<description>`

### Commits

- Make **frequent, semantic commits**
- Each commit must:
  - Do one thing
  - Have a clear message
- Avoid large, sweeping commits

### Pushing Code

- ❌ NEVER push unless explicitly instructed
- ❌ NEVER push secrets, credentials, tokens
- ❌ NEVER push any part of a locally cloned openclaw repo

LLM agents MUST assume:
> "Local work only unless told otherwise."

---

## Scope Control

LLM contributors MUST:

- Implement ONLY what PLAN.md requests
- Avoid:
  - Overengineering
  - Premature optimisation
  - Speculative abstractions
- If an improvement is tempting but not specified:
  - Document it
  - Defer it
  - Do NOT implement it

---

## Error Handling & Uncertainty

When uncertain:

1. STOP
2. Record the uncertainty
3. Ask for clarification
4. Wait

Guessing is considered a failure.

---

## Enforcement Note

This file is intended for:

- Human contributors
- Automated CI enforcement
- LLM coding agents operating autonomously

Violations of this document invalidate the work.

---

## Acknowledgement

By contributing to this repository, you agree to follow **AGENTS.md** and treat **PLAN.md as law**.

