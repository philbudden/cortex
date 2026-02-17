# Scoring Skill

## Intent

Rate and compare ideas, sources, or drafts using explicit, author-defined criteria.

## Scope

This skill applies when:
- User provides a specific rubric or scoring system
- User asks to compare multiple options
- User is working in `05_Reviews/`
- User wants to prioritise ideas or projects

## Responsibilities

### Apply Explicit Rubrics
- Use only the criteria the user provides
- If no rubric exists, ask for one
- Don't invent evaluation dimensions

### Score Consistently
- Apply the same standards to all items
- Explain the reasoning for each score
- Distinguish between subjective and objective measures

### Compare and Rank
- When evaluating multiple items, surface key differences
- Explain trade-offs clearly
- Avoid false precision (don't use decimals unless meaningful)

### Document Results
- Create a review file in `05_Reviews/` with scores
- Make it easy to revisit and revise later

## Non-Goals

- **Not a judgment of worth**: Scoring is a tool, not a verdict
- **Not prescriptive**: A low score doesn't mean "don't do this"
- **Not universal**: Different rubrics serve different purposes

## Principles

1. **Rubrics are explicit**
   - Every dimension must be defined
   - Scoring levels must be clear
   - No hidden criteria

2. **Consistency matters**
   - Same standards for all items
   - Avoid recency bias or ordering effects

3. **Scores are tools, not truths**
   - A rubric highlights one perspective
   - The author decides what matters most

## Common Rubric Dimensions

*(Examples—use what the author specifies.)*

### For Ideas
- **Clarity**: How well-defined is this?
- **Novelty**: How different from existing work?
- **Feasibility**: Can this be done with available resources?
- **Impact**: If successful, how much does it matter?
- **Fit**: How well does this align with goals or voice?

### For Sources
- **Relevance**: Does it address the question?
- **Credibility**: How trustworthy is the source?
- **Evidence**: What kind of support is provided?
- **Recency**: Is it current enough?
- **Accessibility**: Can I understand and use it?

### For Drafts
- **Argument strength**: Is the thesis supported?
- **Clarity**: Is it easy to follow?
- **Completeness**: Are there major gaps?
- **Voice**: Does it sound like the author?

## Scoring Scales

Use simple, interpretable scales:

### 3-point scale (recommended)
- **1 = Weak**: Fails to meet criterion
- **2 = Adequate**: Meets criterion with reservations
- **3 = Strong**: Clearly meets criterion

### 5-point scale (if more granularity needed)
- **1 = Poor**
- **2 = Fair**
- **3 = Good**
- **4 = Very Good**
- **5 = Excellent**

Avoid scales with more than 5 points—distinctions become arbitrary.

## Output Format

```markdown
# Scoring: [Title]

**Date:** [YYYY-MM-DD]  
**Rubric:** [Brief description or link]

## Items Evaluated

1. [Item 1]
2. [Item 2]
3. [Item 3]

## Scores

| Item | Criterion 1 | Criterion 2 | Criterion 3 | Total |
|------|-------------|-------------|-------------|-------|
| Item 1 | 2 | 3 | 1 | 6 |
| Item 2 | 3 | 2 | 3 | 8 |
| Item 3 | 1 | 2 | 2 | 5 |

## Notes

**Item 1:**
- Criterion 1 (2): [Brief explanation]
- Criterion 2 (3): [Brief explanation]
- Criterion 3 (1): [Brief explanation]

**Item 2:**
[etc.]

## Summary

[Overall observations, patterns, or recommendations]
```

## Examples

### ✅ Good: Explicit, evidence-based scoring

```
**Essay Idea: "Why Markets Fail"**

- Clarity (3): Thesis is well-defined and specific
- Novelty (2): Builds on existing economic theory; adds a new angle on trust
- Feasibility (3): Research exists; I can write this
- Impact (2): Relevant but not groundbreaking
- Fit (3): Matches my interest in institutional economics

**Total: 13/15**
```

### ❌ Bad: Vague, unjustified scoring

```
**Essay Idea: "Why Markets Fail"**

- Clarity (3): Good
- Novelty (2): Okay
- Feasibility (3): Sure
- Impact (2): Maybe
- Fit (3): Yes

**Total: 13/15**
```

*(No explanation, no evidence for scores.)*

## When to Apply This Skill

- User provides a scoring rubric
- User asks to compare multiple ideas, sources, or drafts
- User is prioritising work and wants systematic evaluation
- User explicitly invokes this skill

## When Not to Apply This Skill

- User hasn't defined criteria (ask first)
- User is brainstorming (premature evaluation kills ideas)
- User wants qualitative feedback, not quantitative (use `review.md`)

## Combining with Other Skills

- Use `review.md` for general evaluation
- Use this skill when structured comparison is needed
- Use `research.md` for rating sources
- Use `writing.md` and `voice.md` when scoring drafts
