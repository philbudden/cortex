# AI Skills

This folder contains **skill definitions** for AI assistants working in this vault.

## What Skills Are

Skills are **behavioural contracts** written in plain Markdown. They describe:

- What an AI should do when asked to perform a specific type of task
- How to approach the work
- What to avoid
- What success looks like

Skills are **not**:
- Code or configuration
- Prompts or templates
- Instructions for a specific model or vendor

## How Skills Work

When you ask an AI assistant to help with a task, it should:

1. **Read the relevant skill file(s)** from this folder
2. **Follow the principles and constraints** described
3. **Apply the skill to your specific request**

The AI determines which skills apply based on:
- The task you describe
- The folder you're working in
- The type of content being created or modified

## Available Skills

- **`writing.md`** — Expanding outlines, improving prose, maintaining voice
- **`research.md`** — Summarising sources, extracting evidence, building bibliographies
- **`review.md`** — Evaluating ideas and drafts
- **`refactoring.md`** — Restructuring messy content into atomic notes
- **`voice.md`** — Principles for matching author voice and tone
- **`scoring.md`** — Rating and comparing ideas or sources

## Reference Files

In addition to skills, this folder contains:

- **`content-rubric.md`**: Customizable criteria for evaluating content quality
  - Used by `review.md` and `scoring.md` skills
  - Defines what makes content worth keeping
  - Meant to be personalized to your interests

## Adding Your Own Skills

To create a new skill:

1. Create a `.md` file in this folder
2. Use a clear, descriptive name (e.g., `editing.md`, `synthesis.md`)
3. Structure it like the existing skills:
   - **Intent**: What this skill is for
   - **Scope**: What it covers and doesn't cover
   - **Principles**: How to do the work
   - **Examples**: Concrete illustrations (optional)

Skills should be:
- **Human-readable first**
- **Explicit about constraints**
- **Independent of tools or models**

## Important Rules

- Skills are **opt-in**, not automatic
- Skills are **contextual**, not global
- Skills should **propose, not impose**
- The human always has final authority

## Model Agnosticism

These skills are designed to work with **any** AI assistant capable of reading Markdown and following written instructions.

They do not assume:
- A specific LLM (GPT, Claude, Llama, etc.)
- A specific interface (API, CLI, IDE plugin)
- A specific vendor or provider

If you can read this file, you can use these skills.
