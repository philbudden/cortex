# Vault Structure

Visual overview of the Cortex vault organization.

---

## Directory Tree

```
cortex/
│
├── .agents/                    # AI assistant skills
│   ├── README.md               # How skills work
│   ├── writing.md              # Long-form writing assistance
│   ├── research.md             # Source summarization
│   ├── review.md               # Content evaluation
│   ├── refactoring.md          # Content organization
│   ├── voice.md                # Voice matching principles
│   └── scoring.md              # Rubric-based evaluation
│
├── 00_Inbox/                   # Raw, unprocessed content
│   ├── README.md               # Folder purpose
│   └── example-messy-capture.md
│
├── 01_Daily/                   # Daily notes and journaling
│   ├── README.md
│   └── YYYY-MM-DD.md           # Date-based files
│
├── 02_Notes/                   # Atomic, evergreen notes
│   ├── README.md
│   └── [concept-name].md       # One idea per note
│
├── 03_Research/                # Source summaries
│   ├── README.md
│   └── [source-title].md       # Books, articles, papers
│
├── 04_Writing/                 # Long-form drafts
│   ├── README.md
│   └── [working-title].md      # Essays, articles, chapters
│
├── 05_Reviews/                 # Evaluations and reflections
│   ├── README.md
│   └── [review-title].md       # Idea scoring, retrospectives
│
├── 06_Templates/               # Reusable note templates
│   ├── README.md
│   ├── daily-note.md
│   ├── atomic-note.md
│   ├── research-note.md
│   ├── writing-draft.md
│   └── review.md
│
├── 99_Archive/                 # Completed or deprecated
│   └── README.md
│
├── docs/                       # Documentation
│   ├── ai-integration.md       # AI integration guide
│   └── quick-start.md          # 5-minute setup guide
│
├── AGENTS.md                   # Full vault specification
├── README.md                   # User documentation
└── LICENSE                     # MIT License
```

---

## Information Flow

```
Raw Ideas
    ↓
00_Inbox/
    ↓
    ├──→ 01_Daily/          (dated reflections)
    ├──→ 02_Notes/          (evergreen concepts)
    ├──→ 03_Research/       (source capture)
    └──→ 04_Writing/        (long-form drafts)
            ↓
        05_Reviews/         (evaluation)
            ↓
        [Publish]
            ↓
        99_Archive/         (preservation)
```

---

## File Naming Conventions

| Folder | Convention | Example |
|--------|------------|---------|
| `01_Daily/` | `YYYY-MM-DD.md` | `2026-02-17.md` |
| `02_Notes/` | `concept-name.md` | `information-asymmetry.md` |
| `03_Research/` | `author-title-year.md` | `akerlof-lemons-1970.md` |
| `04_Writing/` | `working-title.md` | `trust-mechanisms-essay.md` |
| `05_Reviews/` | `descriptive-name.md` | `q1-2026-retrospective.md` |

---

## Folder Purposes at a Glance

| Folder | Input | Output | Permanence |
|--------|-------|--------|------------|
| `00_Inbox/` | Messy, raw | Anything | Temporary |
| `01_Daily/` | Daily events/ideas | Extracts to Notes | Semi-permanent |
| `02_Notes/` | Atomic concepts | Links, reuse | Permanent |
| `03_Research/` | External sources | Writing support | Permanent |
| `04_Writing/` | Outlines, drafts | Published work | Work-in-progress |
| `05_Reviews/` | Evaluations | Decisions | Permanent |
| `99_Archive/` | Completed work | Reference | Permanent |

---

## Skill-to-Folder Mapping

| Task | Relevant Skills | Primary Folders |
|------|----------------|-----------------|
| Capture ideas | — | `00_Inbox/`, `01_Daily/` |
| Organize content | `refactoring.md` | `00_Inbox/` → `02_Notes/` |
| Summarize sources | `research.md` | `03_Research/` |
| Draft essays | `writing.md`, `voice.md` | `04_Writing/` |
| Evaluate ideas | `review.md`, `scoring.md` | `05_Reviews/` |

---

## Minimal Viable Workflow

1. **Capture** → `00_Inbox/`
2. **Refine** → `02_Notes/`
3. **Write** → `04_Writing/`
4. **Publish** → `99_Archive/`

Everything else is optional enhancement.
