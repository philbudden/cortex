# AI Integration Guide

This document explains how AI assistants can work with Cortex vaults.

---

## Core Philosophy

AI assistants in this vault are:
- **Opt-in**: Skills are applied when relevant, not automatically
- **Transparent**: Actions should be explainable and reversible
- **Human-subordinate**: The human owns intent, voice, and final decisions

The vault works perfectly without AI. AI makes it more powerful, but never required.

---

## How Skills Work

Skills are **behavioural contracts** written in plain Markdown in `.agents/`.

### For AI Assistants

1. **Read `.agents/` before operating in the vault**
   - Skills define how to approach specific tasks
   - Apply skills contextually based on folder and task type

2. **Match skills to context**
   - Working in `04_Writing/`? Apply `writing.md`
   - Organising `00_Inbox/`? Apply `refactoring.md`
   - Evaluating drafts? Apply `review.md` and optionally `scoring.md`

3. **Follow skill principles**
   - Propose changes, don't impose them
   - Preserve human voice and intent
   - Work incrementally

4. **Never assume global authority**
   - Skills are contextual, not mandatory
   - Humans can override any skill at any time

### For Humans

When working with an AI:

1. **Point the AI to relevant skills**
   - Example: "Read `.agents/writing.md` and help expand this section"
   - Example: "Using the refactoring skill, organise these inbox items"

2. **Provide explicit criteria when evaluating**
   - Example: "Score these ideas using: clarity, feasibility, impact"
   - See `.agents/scoring.md` for rubric templates

3. **Review AI suggestions before accepting**
   - Skills ensure proposals are transparent and reversible
   - You always have final say

---

## Model Agnosticism

These skills work with **any AI model** capable of:
- Reading Markdown
- Following written instructions
- Operating in a file-based environment

They do not assume:
- A specific LLM (GPT, Claude, Llama, Gemini, etc.)
- A specific interface (API, CLI, web chat, IDE plugin)
- A specific vendor or provider

If your AI can read this document, it can use these skills.

---

## Example: Terminal-Based Coding Assistants

Many developers use AI assistants that operate in the terminal or IDE. Here's how they can integrate with Cortex.

### Example Tool: GitHub Copilot CLI

GitHub Copilot can read files and follow instructions in Markdown.

#### Workflow

1. **Navigate to the vault**
   ```bash
   cd /path/to/cortex
   ```

2. **Ask the AI to load skills**
   ```
   "Read .agents/writing.md and .agents/voice.md, then help me expand 
   the outline in 04_Writing/trust-mechanisms-essay.md"
   ```

3. **The AI reads the skills and applies principles**
   - Matches your voice (from examples in the vault)
   - Expands incrementally (section by section)
   - Proposes changes as diffs

4. **You review and approve**

### Example Tool: Custom Automation

You can build simple automation using the skills:

**Script: `triage-inbox.sh`**
```bash
#!/bin/bash
# Asks AI to triage inbox items

AI_COMMAND="your-ai-cli-tool"

$AI_COMMAND "Read .agents/refactoring.md. For each file in 00_Inbox/, 
suggest where it should go and why. Don't make changes yet."
```

Run this periodically to get suggestions, then manually process.

---

## Contextual Skill Loading

AI assistants should load skills **based on context**:

| Context | Skills to Load |
|---------|----------------|
| Working in `04_Writing/` | `writing.md`, `voice.md` |
| Working in `03_Research/` | `research.md` |
| Organising `00_Inbox/` or `01_Daily/` | `refactoring.md` |
| Evaluating content in `05_Reviews/` | `review.md`, `scoring.md` |
| Any folder, when evaluating quality | `review.md` |
| Any folder, when editing prose | `voice.md` |

### Automatic Context Detection (Optional)

Advanced integrations might:
- Detect the current folder and auto-load skills
- Read existing notes to calibrate voice
- Suggest relevant templates from `06_Templates/`

This is optional. Explicit invocation works fine.

---

## Integration Patterns

### Pattern 1: Explicit Invocation

**Human:** "Read `.agents/writing.md` and expand the introduction of this essay."

**AI:** 
1. Reads `writing.md`
2. Reads the essay
3. Expands the introduction following skill principles
4. Proposes the change

### Pattern 2: Contextual Application

**Human:** "Help me organise these inbox items."

**AI:** 
1. Detects task involves `00_Inbox/`
2. Reads `refactoring.md`
3. Analyses items
4. Suggests destinations and splits

### Pattern 3: Multi-Skill Tasks

**Human:** "Review this draft and score it for clarity and impact."

**AI:** 
1. Reads `review.md` and `scoring.md`
2. Evaluates draft
3. Provides structured feedback with scores

---

## Non-Binding Examples

These examples show **one way** to integrate AI. They are not prescriptive.

### Example: Using Claude via API

```python
import anthropic

client = anthropic.Client(api_key="your-key")

# Load skills
with open('.agents/writing.md', 'r') as f:
    writing_skill = f.read()

with open('04_Writing/my-essay.md', 'r') as f:
    essay = f.read()

# Ask Claude to help
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    messages=[{
        "role": "user",
        "content": f"{writing_skill}\n\n{essay}\n\nExpand the introduction section."
    }]
)

print(response.content)
```

### Example: Using Local LLM

```bash
# Using llama.cpp or similar local model

cat .agents/writing.md 04_Writing/my-essay.md | \
  llama-cli --model models/llama-3.1-8b.gguf \
    --prompt "Following the writing skill above, expand the introduction."
```

---

## Building Your Own Integrations

To integrate a new AI tool:

1. **Ensure it can read files**
   - Skills and vault content are in Markdown
   - Tool must access `.agents/` and vault folders

2. **Pass skills as context**
   - Load relevant skill files before the task
   - Include them in the prompt or system message

3. **Make proposals, not automatic changes**
   - AI should suggest edits
   - Human reviews and applies

4. **Respect vault principles**
   - Human-first authorship
   - Reversibility
   - Transparency

---

## Advanced: Custom Skills for Your Workflow

You can add domain-specific skills:

**Example: `synthesis.md`**
```markdown
# Synthesis Skill

## Intent
Combine insights from multiple notes into a coherent argument.

## Principles
- Draw from existing notes only; don't invent claims
- Show connections explicitly
- Preserve source attributions
...
```

Add this to `.agents/`, and any AI can use it:

```
"Read .agents/synthesis.md and combine these three notes into 
a single argument for my essay."
```

---

## Security and Privacy

**Important:**
- Skills are local Markdown files
- No data is sent to external services unless you explicitly use an API-based AI
- Local models (llama.cpp, GPT4All, etc.) keep everything on your machine
- Review any integration's data handling before use

---

## Troubleshooting

### "The AI isn't following the skill"

- Check that the skill file was included in the prompt/context
- Some models need explicit instruction: "Follow the principles in this skill exactly"
- Smaller models may struggle with complex instructions

### "The AI is too aggressive with changes"

- Remind it: "Propose changes, don't make them directly"
- Check that `voice.md` and `writing.md` emphasise incremental work
- Review and reject overly broad suggestions

### "Skills feel too rigid"

- Skills are guidelines, not rules
- Override them anytime: "Ignore the skill for this task"
- Modify skills to match your preferences

---

## Further Reading

- **`AGENTS.md`**: Full vault specification and design principles
- **`.agents/README.md`**: How to create and use skills
- **Individual skill files**: See `.agents/` for detailed guidelines

---

**Remember: The vault works without AI. Integration is optional, not required.**
