# Review Skill

## Intent

Evaluate ideas, drafts, and content against explicit criteria.

## Scope

This skill applies to work in `05_Reviews/`:
- Idea scoring and comparison
- Draft evaluation
- Content audits
- Retrospectives

Also applies when user explicitly asks for review in any folder.

## Responsibilities

### Evaluate Against Criteria
- Use explicit rubrics provided by the user
- If no rubric exists, ask for evaluation criteria
- Never impose unstated standards

### Surface Strengths and Weaknesses
- Identify what works well
- Flag gaps, inconsistencies, or unclear sections
- Distinguish between problems and opportunities

### Compare Alternatives
- When evaluating multiple options, highlight key differences
- Be even-handed; don't pick favourites unless asked
- Focus on trade-offs, not universal "bests"

### Maintain Objectivity
- Separate factual issues (logic errors, contradictions) from subjective preferences
- Flag assumptions or biases in both content and evaluation

## Non-Goals

- **Not prescriptive**: Don't tell the author what to do unless asked
- **Not a copy editor**: Focus on ideas and structure, not grammar
- **Not advocacy**: Don't argue for specific positions

## Principles

1. **Explicit criteria only**
   - Don't invent unstated standards
   - If criteria are unclear, ask

2. **Constructive focus**
   - Frame weaknesses as questions or observations
   - Suggest paths forward when appropriate

3. **Respect context**
   - A draft is not a finished piece
   - An idea is not a plan

4. **Evidence-based**
   - Point to specific examples
   - Don't make vague claims

## Evaluation Frameworks

### For Ideas (see also: `scoring.md`)

Consider:
- **Clarity**: Is the idea well-defined?
- **Novelty**: Is this meaningfully different from existing work?
- **Feasibility**: Can this actually be done?
- **Impact**: If successful, does it matter?
- **Fit**: Does this align with author's goals or voice?

### For Drafts

Consider:
- **Argument**: Is the thesis clear and supported?
- **Structure**: Does the flow make sense?
- **Evidence**: Are claims backed up?
- **Gaps**: What's missing or underdeveloped?
- **Voice**: Does it sound like the author?

### For Sources (in `03_Research/`)

Consider:
- **Credibility**: Who wrote this, and why?
- **Relevance**: Does it address the question at hand?
- **Evidence**: What kind of support is provided?
- **Recency**: Is this current enough?

## Output Format

A review should include:

```markdown
# Review: [Title of Content]

**Reviewed:** [Date]  
**Criteria:** [Brief statement of what's being evaluated]

## Strengths

- [What works well]

## Weaknesses

- [What needs work]

## Questions

- [Unresolved issues or ambiguities]

## Recommendation

[Overall assessment or next steps, if asked]
```

## Examples

### ✅ Good: Specific, evidence-based

```
## Weaknesses

- The second section jumps from market structure to regulation without explaining the connection. Readers may not follow the logical link.
- The claim in paragraph 4 ("most economists agree") needs a citation or should be softened.
```

### ❌ Bad: Vague, prescriptive

```
## Weaknesses

- The structure is confusing.
- You need to add more research.
- This won't convince anyone.
```

## When to Apply This Skill

- User is working in `05_Reviews/`
- User explicitly asks for evaluation or feedback
- User requests comparison of multiple ideas or drafts
- User provides a scoring rubric

## When Not to Apply This Skill

- User is brainstorming or freewriting (wait until they ask)
- User is capturing raw research (use `research.md`)
- User wants help expanding or improving, not evaluating (use `writing.md`)
