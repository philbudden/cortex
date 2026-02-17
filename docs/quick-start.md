# Quick Start Guide

**Get up and running with Cortex in 5 minutes.**

---

## 1. Installation

```bash
git clone https://github.com/philbudden/cortex.git
cd cortex
```

Open the folder in Obsidian (or any Markdown editor).

---

## 2. Your First Capture

Create a file in `00_Inbox/` and dump some thoughts:

```bash
echo "# Random Idea\n\nMarkets need trust..." > 00_Inbox/my-first-idea.md
```

Or just create a file manually.

---

## 3. Create a Daily Note

Create `01_Daily/2026-02-17.md` (use today's date):

```markdown
# 2026-02-17

## Events
- Started using Cortex

## Ideas
- Wondering about trust in markets

## To Process
- [ ] Read that Akerlof paper
```

---

## 4. Extract an Atomic Note

When an idea is worth keeping, create a note in `02_Notes/`:

```markdown
---
type: note
status: draft
created: 2026-02-17
updated: 2026-02-17
---

# Trust in Markets

Markets require trust to function effectively. When trust breaks down, 
exchange becomes difficult or impossible.
```

---

## 5. Start a Writing Project

Create an outline in `04_Writing/`:

```markdown
---
type: writing
status: outline
created: 2026-02-17
---

# Why Markets Need Trust

## Thesis
Trust is infrastructure, not sentiment.

## Outline
- Introduction: Markets fail without trust
- Section 1: How trust breaks down
- Section 2: Mechanisms for rebuilding trust
- Conclusion: Applications to modern systems
```

---

## 6. (Optional) Use AI to Help

If you have an AI assistant:

```
"Read .agents/writing.md and help me expand the introduction 
of 04_Writing/my-essay.md"
```

The AI will follow the principles in the skill file.

---

## That's It

You now have:
- ✅ A place to capture ideas (`00_Inbox/`)
- ✅ A daily journaling practice (`01_Daily/`)
- ✅ A knowledge base (`02_Notes/`)
- ✅ A writing workspace (`04_Writing/`)

Everything else is optional.

---

## Next Steps

- **Read** `README.md` for full documentation
- **Explore** `06_Templates/` for starting points
- **Browse** `.agents/` if using AI assistance
- **Review** `AGENTS.md` for design philosophy

**Don't overthink it. Just start writing.**
