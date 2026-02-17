# Research Skill

## Intent

Help the author capture, summarise, and synthesise external sources.

## Scope

This skill applies to work in `03_Research/`:
- Reading notes
- Source summaries
- Literature reviews
- Bibliographies and citation capture

## Responsibilities

### Summarise Sources
- Extract the main argument or thesis
- Identify key supporting points
- Note methodology or evidence type
- Preserve author's original terminology

### Extract Evidence
- Pull out specific claims, data, or examples
- Maintain source context (who said it, when, why)
- Quote precisely when needed
- Paraphrase accurately when summarising

### Build Bibliographies
- Format citations consistently
- Include enough metadata for retrieval (author, title, date, URL/DOI)
- Use simple, human-readable formats (not LaTeX or formal citation styles unless asked)

### Link to Vault
- Suggest relevant notes in `02_Notes/` that connect to research findings
- Flag ideas worth promoting to standalone notes
- Identify themes or patterns across multiple sources

### Rate Sources (Optional)
- Apply scoring criteria if user provides a rubric
- See `scoring.md` for rating methodology
- Never rate based on agreement/disagreement with author's views

## Non-Goals

- **Not a fact-checker**: Assume sources are cited accurately
- **Not a critic**: Don't evaluate quality unless explicitly asked
- **Not a search engine**: Don't retrieve sources; work with what the user provides

## Principles

1. **Faithful capture**
   - Represent sources accurately, even when wrong or controversial
   - Flag ambiguity or unclear claims

2. **Conciseness**
   - Summaries should be shorter than the original
   - Focus on ideas, not filler

3. **Citability**
   - Always include enough information to find the source again
   - Use direct quotes sparingly but precisely

4. **Incremental synthesis**
   - Connect new research to existing notes when relevant
   - Don't force connections where none exist

## Structure for Research Notes

A good research note typically includes:

```markdown
# [Title of Source]

**Author:** [Name]  
**Date:** [Publication date]  
**Type:** [Article | Book | Paper | Talk | etc.]  
**URL/DOI:** [Link if available]

## Summary

[2-4 sentence overview of main argument]

## Key Points

- [Main claim 1]
- [Main claim 2]
- [Supporting evidence or example]

## Quotes

> "[Exact quote if particularly important]" (p. [page])

## Relevance

[Why this matters to your work, optional]

## Related

- [[Link to related note]]
- [[Link to writing project]]
```

Adjust based on source type and needs.

## Examples

### ✅ Good: Concise summary

```
**Summary**

Kahneman argues that human judgment relies on two systems: fast, intuitive thinking (System 1) and slow, deliberate reasoning (System 2). System 1 is efficient but prone to biases. Most decisions happen in System 1, even when we think we're being rational.
```

### ❌ Bad: Editorialising

```
**Summary**

Kahneman's brilliant theory explains why people make irrational decisions. His framework proves that intuition can't be trusted and we should always use System 2 thinking. This is essential for understanding modern politics and economics.
```

*(Added evaluations and claims not in the source.)*

## When to Apply This Skill

- User is working in `03_Research/`
- User provides a source to summarise
- User asks to extract evidence or arguments
- User is building a bibliography

## When Not to Apply This Skill

- User is developing original ideas (use `writing.md`)
- User is organising existing notes (use `refactoring.md`)
- User is evaluating their own work (use `review.md`)
