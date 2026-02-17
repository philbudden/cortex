# Contributing to Cortex

Cortex is designed to be **forked, modified, and personalised**. This guide is for those who want to contribute improvements back to the reference implementation.

---

## Philosophy

Contributions should:
- **Reduce complexity**, not add it
- **Preserve simplicity** and human-readability
- **Remain model-agnostic** (no vendor lock-in)
- **Work without AI** as well as with it

If a contribution feels clever or requires explanation, reconsider.

---

## What We Welcome

### New Skills
- Domain-specific skills (e.g., `synthesis.md`, `editing.md`)
- Skills that solve real workflow problems
- Skills readable by humans and any AI model

**Requirements:**
- Clear intent and scope
- Concrete examples
- No tool or model dependencies

### Improved Templates
- Better starting points for common note types
- Clearer front-matter conventions
- Streamlined structures

**Requirements:**
- Minimal but sufficient
- Optional, not prescriptive
- Documented with inline comments

### Documentation Improvements
- Clearer explanations
- Better examples
- Additional integration guides

**Requirements:**
- Practical, not theoretical
- Calm, non-marketing tone
- Assumes technical literacy

### Bug Fixes
- Broken links
- Typos or unclear instructions
- Structural inconsistencies

---

## What We Don't Welcome

### Added Dependencies
- Plugins, APIs, or external services
- Runtime requirements beyond Markdown and a text editor
- Platform-specific features

**Rationale:** Longevity and portability.

### Methodology Enforcement
- Rigid workflows (GTD, Zettelkasten, etc.)
- Required metadata or structure
- Prescriptive processes

**Rationale:** Low cognitive overhead.

### AI-Specific Features
- Skills that assume a specific model (GPT, Claude, etc.)
- Integration with proprietary APIs
- Vendor-specific tooling

**Rationale:** Model and vendor agnosticism.

### Over-Engineering
- Complex folder hierarchies
- Elaborate tagging systems
- Automation scripts or services

**Rationale:** Boring by design.

---

## Contribution Process

### 1. Fork and Experiment

Fork the repository and try your changes in your own vault first.

```bash
git clone https://github.com/yourusername/cortex.git
cd cortex
# make changes
# use it for a while
```

### 2. Test with AI (Optional)

If your contribution involves skills:
- Test with multiple AI models if possible
- Ensure instructions are clear and model-agnostic
- Verify the skill works as intended

### 3. Document Your Changes

- Update relevant README files
- Add examples if introducing new features
- Explain the rationale in your commit message

### 4. Submit a Pull Request

**Title format:**
- `Add [feature]` (e.g., "Add synthesis skill")
- `Fix [issue]` (e.g., "Fix broken link in research template")
- `Improve [area]` (e.g., "Improve voice skill examples")

**Description should include:**
- What you changed and why
- How you tested it
- Any trade-offs or considerations

### 5. Review and Iteration

Maintainers will review for:
- Alignment with design principles
- Simplicity and readability
- Human-first focus

Be prepared for requests to simplify or remove features.

---

## Contribution Guidelines

### Writing Style

- **Concise**: No fluff or filler
- **Practical**: Focus on what works
- **Calm**: Avoid hype or marketing language
- **Explicit**: Don't make readers infer

### Code (If Any)

- **Minimal**: Prefer Markdown over code
- **Boring**: Use simple, standard tools
- **Documented**: Explain what it does and why

### Markdown Conventions

- Use `#` for headings (not `===` underlines)
- Use `---` for horizontal rules
- Use fenced code blocks with language tags
- Use `**bold**` for emphasis, `*italic*` for nuance

---

## Skill Contribution Checklist

If submitting a new skill, ensure it includes:

- [ ] **Clear intent statement** (What is this skill for?)
- [ ] **Defined scope** (What it covers and doesn't cover)
- [ ] **Explicit principles** (How to do the work)
- [ ] **Concrete examples** (✅ Good / ❌ Bad)
- [ ] **When to apply** (Contextual triggers)
- [ ] **When not to apply** (Edge cases)
- [ ] **No model-specific assumptions**
- [ ] **Human-readable first**

---

## Template Contribution Checklist

If submitting a new template, ensure it:

- [ ] Uses minimal front-matter
- [ ] Includes inline instructions
- [ ] Is optional and adaptable
- [ ] Provides a clear starting point without being prescriptive
- [ ] Follows existing naming conventions

---

## Testing Your Contribution

### For Skills
1. Test with a human reader (is it clear?)
2. Test with an AI assistant (does it work?)
3. Test with different models if possible

### For Templates
1. Use it yourself for real work
2. Confirm it's easy to adapt
3. Verify it doesn't enforce methodology

### For Documentation
1. Read it out loud
2. Give it to someone unfamiliar with the project
3. Check for broken links or unclear references

---

## Questions or Discussion

**Before contributing:**
- Open an issue to discuss major changes
- Check existing issues/PRs for related work
- Ask if unsure whether something fits

**After contributing:**
- Respond to review feedback
- Be open to simplification requests
- Don't take rejection personally—some ideas don't fit

---

## Recognition

Contributors will be acknowledged in release notes and documentation.

Significant contributions may be credited in the main README.

---

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

## Final Note

**Cortex is infrastructure for thinking.**

The best contributions make it simpler, clearer, or more durable.

If something feels like adding features for features' sake, it probably doesn't belong.

When in doubt: **delete, don't add.**

---

Thank you for contributing to boring, durable infrastructure.
