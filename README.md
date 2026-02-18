# Cortex

**An Obsidian vault for thinking and writing, designed to work with or without AI assistance.**

---

## What This Is

Cortex is a **Second Brain and Writing Workspace** built on plain Markdown files.

It provides:
- A simple folder structure for capturing ideas, organising knowledge, and developing long-form writing
- Templates for daily notes, atomic notes, research capture, and drafts
- A **skills system** that allows AI assistants to help without taking over

This vault works perfectly **without AI**. If you choose to use an AI assistant, it becomes more powerful—but you stay in control.

## What This Is Not

- **Not a productivity system**: No GTD, no Zettelkasten dogma, no methodology enforcement
- **Not a plugin or app**: Just Markdown files in folders
- **Not AI-dependent**: The vault is designed for humans first
- **Not vendor-locked**: Works with any text editor, any AI model, any workflow

---

## Getting Started

### 1. Clone This Repository

```bash
git clone https://github.com/philbudden/cortex.git
cd cortex
```

### 2. Open as an Obsidian Vault

- Open Obsidian
- Select "Open folder as vault"
- Choose the `cortex` directory

You can also use any Markdown editor. Obsidian is optional.

### 3. Start Writing

- **Capture ideas**: Drop thoughts into `00_Inbox/`
- **Journal**: Create daily notes in `01_Daily/` (use format `YYYY-MM-DD.md`)
- **Build knowledge**: Extract atomic notes into `02_Notes/`
- **Research**: Summarise sources in `03_Research/`
- **Write**: Draft essays or articles in `04_Writing/`

See `06_Templates/` for starting points.

---

## Folder Structure

```
/
├── .agents/         # AI assistant skills (optional)
├── 00_Inbox/        # Raw, unprocessed content
├── 01_Daily/        # Daily notes and journaling
├── 02_Notes/        # Atomic, evergreen notes
├── 03_Research/     # Source summaries and references
├── 04_Writing/      # Long-form drafts and essays
├── 05_Reviews/      # Evaluations and retrospectives
├── 06_Templates/    # Note templates
└── 99_Archive/      # Completed or deprecated content (move here after publishing)
```

Each folder contains a README explaining its purpose.

**Typical workflow:**
1. Capture ideas in `00_Inbox/` or `01_Daily/`
2. Refine into atomic notes in `02_Notes/`
3. Develop long-form writing in `04_Writing/`
4. Archive finished work in `99_Archive/` (optional)

---

## Working with AI Assistants (Optional)

If you use an AI assistant (like GitHub Copilot, Claude, ChatGPT, or any other model), this vault is designed to make collaboration smooth and safe.

### How Skills Work

The `.agents/` folder contains **skill definitions**—plain Markdown files that describe how an AI should approach specific tasks.

Available skills:
- **`writing.md`**: Expanding outlines, improving prose, maintaining your voice
- **`research.md`**: Summarising sources, extracting evidence
- **`review.md`**: Evaluating ideas and drafts
- **`refactoring.md`**: Organising messy content into atomic notes
- **`voice.md`**: Matching your writing style
- **`scoring.md`**: Rating ideas or sources with explicit criteria
- **`content-rubric.md`**: Customizable criteria for evaluating content quality (reference file)

### How to Use Skills

1. **Ask the AI to read the relevant skill** before starting a task
   - Example: "Read `.agents/writing.md` and help me expand this outline."

2. **The AI follows the skill's principles** without you having to re-explain your preferences

3. **You stay in control**: Skills propose, they don't impose

### Adding Your Own Skills

To create a new skill:

1. Create a `.md` file in `.agents/`
2. Use a descriptive name (e.g., `editing.md`, `synthesis.md`)
3. Follow the structure of existing skills:
   - **Intent**: What this skill is for
   - **Scope**: What it covers
   - **Principles**: How to do the work
   - **Examples**: Concrete illustrations

Skills are **model-agnostic**. Any AI that can read Markdown can use them.

See `.agents/README.md` for details.

### Customizing Content Evaluation

The `.agents/content-rubric.md` file defines criteria for judging what content is worth keeping.

**To customize it:**

1. Open `.agents/content-rubric.md`
2. Adjust the 5 core dimensions (Clarity, Durability, Reusability, Actionability, Uniqueness)
3. Add custom criteria in the "Custom Criteria" section
4. Define domain-specific filters for your areas of interest
5. Update scoring thresholds to match your curation intensity

The rubric is used by `review.md` and `scoring.md` skills when evaluating content. Customize it to match your interests and standards.

---

## Using Without AI

Everything in this vault works without AI:

- Templates provide structure for common note types
- Folder conventions keep content organised
- Plain Markdown means no lock-in
- `AGENTS.md` and `.agents/` can be ignored entirely

If you never use an AI assistant, you lose nothing.

---

## Design Principles

This vault is built on five principles (defined in `AGENTS.md`):

1. **Human-First Authorship**: You own your voice and decisions
2. **Incremental Refinement**: Ideas improve gradually over time
3. **Transparency & Reversibility**: Changes are explainable and recoverable
4. **Low Cognitive Overhead**: Simple structure, minimal required metadata
5. **Longevity**: Plain Markdown, no dependencies, readable forever

---

## File Naming

- Use **descriptive, human-readable titles**
- Avoid IDs or codes: `information-asymmetry.md`, not `note-001.md`
- Exception: Daily notes use `YYYY-MM-DD.md`

---

## Front-Matter (Optional)

Front-matter is encouraged but not required.

Minimal recommended fields:

```yaml
---
type: note | research | writing | journal | review
status: draft | active | revised | finished
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [1-3 tags max, only if useful for filtering]
---
```

Use what's helpful. Ignore the rest.

**Tags:** Optional. Use 1-3 tags maximum, only when filtering would be useful. Prefer descriptive filenames and wiki-links `[[note-name]]` over extensive tagging.

---

## Integration Examples

### With Obsidian
- Use Community Plugins for features like daily note automation, graph view, or backlinks
- This vault works with default Obsidian (no plugins required)

### With AI Coding Assistants
- See `docs/ai-integration.md` for examples using terminal-based assistants
- Skills can be loaded contextually based on the task

### With Git
- Version control your knowledge base
- Collaborate with others on shared vaults
- Sync across devices

---

## Philosophy

This vault is **infrastructure for thinking**.

It should:
- Get out of your way
- Support messy exploration
- Enable gradual refinement
- Last decades, not months

If something feels clever or complicated, it probably doesn't belong here.

---

## Contributing

This is a reference implementation. Fork it. Modify it. Make it yours.

If you develop skills or templates that might be useful to others, consider contributing them back.

---

## License

MIT License. See `LICENSE` for details.

---

## Further Reading

- **`AGENTS.md`**: Full specification of vault design and AI collaboration principles
- **`.agents/README.md`**: How the skills system works
- **`docs/ai-integration.md`**: Examples of AI assistant integration

---

**This vault is boring by design. That's a feature, not a bug.**