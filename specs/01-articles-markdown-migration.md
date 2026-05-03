# Articles Markdown Migration

## Goal

Extract article content from the hardcoded 68KB `ArticlesPage.tsx` into external markdown files and a JSON manifest, so articles are editable without touching component code.

## Non-Goals

- Text-to-speech / audio generation (separate spec)
- Audio player UI (separate spec)
- Adding new articles
- Changing the visual design or layout
- Changing the routing scheme (`#/article`, `#/article/{slug}`)

## Background

All 10 articles are currently hardcoded as inline strings inside `components/ArticlesPage.tsx`. This makes the file enormous (68KB), editing cumbersome, and content tightly coupled to the component. The component already uses `react-markdown` + `remark-gfm` to render markdown strings — the rendering pipeline stays the same, only the data source changes.

## Article Inventory

### Markdown articles (have inline body content in en + es)
| Slug | Thumbnail |
|------|-----------|
| `claude-managed-agents-vs-bedrock-agentcore` | `/claude-vs-agentcore.png` |
| `serverless-migrations` | — |
| `genai-ops` | — |
| `observability-playbook` | — |

### PDF article (rendered via iframe, no markdown body)
| Slug | Assets |
|------|--------|
| `kiro-context-engineering` | `pdfUrl`, `downloadUrl`, thumbnail |

### External articles (link out, no body content)
| Slug | Source |
|------|--------|
| `aws-builders-como-sacar-maximo-partido-kiro` | Dev.to |
| `aws-builders-nova-agent-manager` | AWS Community |
| `devto-kiro-cli-raspberry-pi-400` | Dev.to |
| `devto-stop-vibecoding-ai-monoliths` | Dev.to |
| `devto-posthog-observability` | Dev.to |
| `devto-no-vibe-no-code` | Dev.to |

## Architecture

```
public/articles/
  articles.json                                    # Manifest with metadata for all 10 articles
  claude-managed-agents-vs-bedrock-agentcore/
    en.md
    es.md
  serverless-migrations/
    en.md
    es.md
  genai-ops/
    en.md
    es.md
  observability-playbook/
    en.md
    es.md
```

Only the 4 markdown articles get `.md` files. External and PDF articles have all their data in the manifest.

### Manifest Schema (`articles.json`)

```json
{
  "articles": [
    {
      "slug": "claude-managed-agents-vs-bedrock-agentcore",
      "type": "markdown",
      "date": { "en": "Apr 13, 2026", "es": "13 Abr 2026" },
      "readTime": { "en": "6 min", "es": "6 min" },
      "title": { "en": "Claude Managed Agents vs Amazon Bedrock AgentCore", "es": "..." },
      "summary": { "en": "A comparison of...", "es": "..." },
      "thumbnail": "/claude-vs-agentcore.png"
    },
    {
      "slug": "kiro-context-engineering",
      "type": "pdf",
      "date": { "en": "Mar 19, 2026", "es": "19 Mar 2026" },
      "readTime": { "en": "Slides", "es": "Diapositivas" },
      "title": { "en": "Kiro Context Engineering", "es": "Kiro Context Engineering" },
      "summary": { "en": "A presentation on context engineering with Kiro...", "es": "..." },
      "thumbnail": "/kiro-context-engineering-preview.png",
      "pdfUrl": "/kiro-context-engineering.pdf",
      "downloadUrl": "/kiro-context-engineering.pptx",
      "source": { "en": "Presentation", "es": "Presentación" }
    },
    {
      "slug": "devto-stop-vibecoding-ai-monoliths",
      "type": "external",
      "date": { "en": "Jan 5, 2026", "es": "5 Ene 2026" },
      "readTime": { "en": "4 min", "es": "4 min" },
      "title": { "en": "Stop Vibecoding AI Monoliths", "es": "..." },
      "summary": { "en": "A practical take on...", "es": "..." },
      "externalUrl": "https://dev.to/llamojha/stop-vibecoding-ai-monoliths-295g",
      "source": { "en": "Dev.to", "es": "Dev.to" }
    }
  ]
}
```

### Data Flow

1. `ArticlesPage` fetches `/articles/articles.json` on mount
2. List view renders from manifest metadata (no `.md` fetch needed)
3. Detail view for `type: "markdown"` fetches `/articles/{slug}/{lang}.md`
4. Detail view for `type: "pdf"` renders iframe from `pdfUrl` (same as current)
5. List view for `type: "external"` links out to `externalUrl` (same as current)

## Acceptance Criteria

- [ ] `articles.json` manifest contains metadata for all 10 articles
- [ ] 4 markdown articles extracted to `public/articles/{slug}/en.md` and `es.md`
- [ ] `ArticlesPage` fetches manifest on mount and renders the article list
- [ ] Individual markdown article view fetches and renders the correct `.md` file
- [ ] PDF article renders identically (iframe + download link)
- [ ] External articles link out identically
- [ ] i18n works: switching language shows correct title/summary/body
- [ ] 404 handling preserved for unknown slugs
- [ ] `ArticlesPage.tsx` reduced from ~68KB to a reasonable size
- [ ] Build passes, site works locally

## Tasks

| # | Task | Agent |
|---|------|-------|
| 1 | Create `public/articles/articles.json` with all 10 article entries | `typescript-pro` |
| 2 | Extract 4 markdown articles to `public/articles/{slug}/en.md` and `es.md` (8 files) | `typescript-pro` |
| 3 | Update `ArticlesPage.tsx`: fetch manifest, render list from JSON, fetch `.md` on detail view | `typescript-pro` |
| 4 | Verify all 10 articles render identically (markdown, PDF, external) | `test-automator` |

Tasks 1 and 2 can run in parallel. Task 3 depends on both. Task 4 depends on 3.

## Risks

| Risk | Mitigation |
|------|------------|
| Markdown content has subtle formatting differences after extraction | Diff rendered output before/after for each article |
| Fetch latency on article detail view | Markdown files are small (<20KB each); add loading state |
| Manifest fetch fails | Show error state; manifest is served from same origin as the site |
