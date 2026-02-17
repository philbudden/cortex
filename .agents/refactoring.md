# Refactoring Skill

## Intent

Help the author transform messy, unstructured content into clear, atomic notes.

## Scope

This skill applies when:
- Triaging content from `00_Inbox/`
- Breaking up large, multi-topic notes
- Extracting evergreen notes from `01_Daily/`
- Reorganising content in `02_Notes/`

## Responsibilities

### Identify Atomic Ideas
- Find discrete, reusable concepts in messy content
- Each idea should stand alone
- Look for natural conceptual boundaries

### Propose Structure
- Suggest how to split content into separate notes
- Recommend titles and filenames
- Identify links between resulting notes

### Preserve Intent
- Don't rewrite or "improve" ideas during extraction
- Keep original phrasing unless clarity demands change
- Flag ambiguities rather than resolving them silently

### Suggest Destinations
- Recommend target folders (`02_Notes/`, `03_Research/`, `04_Writing/`)
- Propose connections to existing notes
- Identify content worth archiving vs. developing

## Non-Goals

- **Not rewriting**: Refactoring is about structure, not prose quality
- **Not pruning**: Don't delete content unless explicitly asked
- **Not forcing methodology**: Atomic notes are a suggestion, not a rule

## Principles

1. **One idea per note**
   - Each note should capture a single, coherent concept
   - If a note needs subsections, it's probably multiple notes

2. **Evergreen over ephemeral**
   - Extract ideas that have long-term value
   - Leave context-specific details in daily notes or inbox

3. **Progressive refinement**
   - First pass: identify what's worth keeping
   - Second pass: organise into notes
   - Third pass: link and integrate

4. **Reversibility**
   - Never delete source content during refactoring
   - Make it easy to undo or revise splits

## Process

### Step 1: Survey
- Read through the messy content
- Identify distinct topics or ideas
- Note potential overlaps with existing notes

### Step 2: Propose
- Suggest specific splits and titles
- Show where each piece would go
- Explain rationale

### Step 3: Execute (if approved)
- Create new notes in appropriate folders
- Add minimal front-matter
- Link related notes
- Leave breadcrumbs in original location

## Examples

### ✅ Good: Clean extraction

**Messy inbox note:**
```
Markets need trust to function. Information asymmetry breaks trust. 
Also: read Akerlof paper on lemons. 
Regulation might help but also creates compliance costs.
Thinking about how this applies to AI safety.
```

**Proposed refactoring:**
- **Note 1** (`02_Notes/trust-in-markets.md`): "Markets need trust to function. When trust breaks down, exchange becomes difficult or impossible."
- **Note 2** (`02_Notes/information-asymmetry.md`): "Information asymmetry breaks trust. When one party knows more than another, the disadvantaged party cannot verify claims."
- **Research task**: Capture Akerlof paper in `03_Research/`
- **Writing seed**: Note connection to AI safety in `00_Inbox/` for later development

### ❌ Bad: Over-rewriting

**Messy inbox note:**
```
Markets need trust to function. Information asymmetry breaks trust.
```

**Bad refactoring:**
```
# The Critical Role of Trust in Market Efficiency

Economic theory demonstrates that well-functioning markets require robust trust relationships between participants. In the absence of such trust, transaction costs increase exponentially, potentially leading to market failure...
```

*(The idea was rewritten into formal prose instead of extracted cleanly.)*

## Atomic Note Template

A good atomic note:
- Has a clear, descriptive title
- Captures one idea completely
- Can be understood on its own
- Links to related concepts
- Is reusable in multiple contexts

```markdown
# [Clear Concept Name]

[2-4 sentences explaining the idea]

[Optional: example or evidence]

## Related

- [[related-concept]]
- [[source-note]]
```

## When to Apply This Skill

- User asks to "clean up" or "organise" inbox or daily notes
- User wants to extract ideas from a long, multi-topic note
- User is building a note structure from scratch
- User explicitly requests refactoring

## When Not to Apply This Skill

- User is actively drafting (let them stay messy)
- User is doing initial capture (don't interrupt flow)
- Content is already well-structured
