# AGENTS.md  
**Obsidian Second Brain & Writing Workspace**

---

## Purpose of This Document

This file defines **how this Obsidian vault is designed, structured, and operated** by a human author working *with* an AI assistant.

It is written for:
- A **human writer** who owns intent, voice, and judgment
- An **AI assistant** that helps with thinking, drafting, organising, and refinement

The vault is:
- **AI-assistant friendly**
- **Model- and vendor-agnostic**
- **Future-proof**
- **Human-first**

The AI is an *assistant*, not an author of record.

---

## Core Intent of the Vault

This vault functions as:

- A **Second Brain** for thinking, learning, and sense-making
- A **Writing Workspace** for essays, articles, and long-form projects
- A **Daily journal** for reflection and capture
- A **refinement pipeline** from raw ideas → structured knowledge → polished output

The vault must support:
- Messy input
- Gradual improvement
- Reversibility
- Long-term accumulation of insight

---

## Foundational Design Principles

All actions by humans or AI must respect the following:

### 1. Human-First Authorship
- The human owns intent, voice, and final decisions
- AI suggestions must never silently replace original thinking

### 2. Incremental Refinement
- Ideas evolve over time
- Prefer small improvements over large rewrites
- Preserve intermediate states whenever possible

### 3. Transparency & Reversibility
- Changes should be explainable
- Original content should be recoverable
- Edits should be proposed, not imposed

### 4. Low Cognitive Overhead
- Simple folder structure
- Minimal required metadata
- Predictable conventions

### 5. Longevity
- Plain Markdown
- No dependency on plugins, APIs, or proprietary formats
- Readable without Obsidian

---

## Vault Structure

The vault uses a **small number of purpose-driven folders**.
```code
/
├── .agents/
├── 00_Inbox/
├── 01_Daily/
├── 02_Notes/
├── 03_Research/
├── 04_Writing/
├── 05_Reviews/
├── 06_Templates/
└── 99_Archive/
```

### Folder Responsibilities

#### `.agents/` — **AI Skills & Operating Doctrine**

This folder defines **AI assistant skills** as first-class, human-readable Markdown documents.

- Skills are **behavioural contracts**, not configuration
- They are versioned, reviewable, and portable
- They are **agent-agnostic** and tool-independent

Typical contents:
```code
.agents/
├── README.md
├── writing.md
├── research.md
├── review.md
├── refactoring.md
├── voice.md
└── scoring.md

Rules:
- Skills must be explicit and scoped
- Skills are opt-in and contextual
- If a human can’t understand it, it’s not a skill

AI assistants must:
- Read this folder before operating
- Apply only relevant skills based on task and location
- Never assume global authority

---

#### `00_Inbox/`
- Raw, unprocessed content
- Quick capture
- Messy thoughts, fragments, clippings
- No expectation of structure

AI role:
- Triage content
- Summarise or clarify
- Suggest destinations for processing
- Propose refactoring, never enforce it

---

#### `01_Daily/`
- Daily notes and journaling
- Date-based filenames: `YYYY-MM-DD.md`
- Reflection, events, idea seeds

AI role:
- Summarise days or weeks
- Identify patterns or recurring themes
- Extract ideas worth promoting elsewhere

---

#### `02_Notes/`
- Atomic, evergreen notes
- One idea per note
- Designed for linking and reuse

AI role:
- Extract atomic notes from messy sources
- Improve clarity without changing meaning
- Suggest links to related notes

---

#### `03_Research/`
- Sources, references, reading notes
- Summaries of articles, books, talks, papers

AI role:
- Summarise sources
- Extract arguments and evidence
- Rate sources against user-defined criteria
- Link findings to Notes and Writing

---

#### `04_Writing/`
- Long-form work:
  - Essays
  - Articles
  - Book drafts
- Files may be incomplete or exploratory

AI role:
- Expand outlines into prose
- Improve structure and flow
- Maintain consistent author voice
- Work section-by-section by default

---

#### `05_Reviews/`
- Evaluations and reflections
- Content reviews
- Idea scoring
- Retrospectives

AI role:
- Apply explicit scoring rubrics
- Compare drafts or ideas
- Surface strengths, weaknesses, and risks

---

#### `06_Templates/`
- Note templates
- Front-matter examples
- Reusable structures

AI role:
- Follow templates strictly
- Suggest improvements cautiously

---

#### `99_Archive/`
- Deprecated or completed material
- Read-only by default
- Preserved for historical context

AI role:
- Do not modify unless explicitly instructed

---

## File Naming Conventions

- Use **descriptive, human-readable titles**
- Avoid IDs or opaque codes
- Prefer:
  - `clear-concept-name.md`
  - `essay-working-title.md`

Daily notes are the only exception:
- `YYYY-MM-DD.md`

---

## Front-Matter Standards

Front-matter is **optional but encouraged** for Notes, Research, and Writing.

### Minimal Recommended Fields

```yaml
---
type: note | research | writing | journal | review
status: draft | active | revised | finished
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [optional, minimal]
---
```