# Articles Markdown Migration + TTS Feature

## Goal

Refactor the articles system to use external markdown files and add text-to-speech (TTS) audio generation powered by AWS Polly, allowing users to listen to articles.

## Non-Goals

- Multi-voice dialogue for articles (single narrator voice only)
- Real-time streaming TTS (pre-generated audio files)
- Automatic generation on publish (manual trigger for now)
- Spanish audio versions (English only for MVP)

## Background

Currently, articles are hardcoded in `ArticlesPage.tsx` as inline strings. This makes editing cumbersome and prevents reuse. The podcast infrastructure already exists (Polly TTS, S3 storage, manifest pattern) and can be extended for articles.

## Architecture

```
/public/articles/
  articles.json              # Manifest with metadata
  claude-vs-agentcore/
    en.md                    # English content
    es.md                    # Spanish content
  serverless-migrations/
    en.md
    es.md
  ...

S3 Output Bucket (existing):
  articles-audio/
    claude-vs-agentcore-en.mp3
    serverless-migrations-en.mp3
```

### Manifest Schema (`articles.json`)

```json
{
  "articles": [
    {
      "slug": "claude-vs-agentcore",
      "date": "2026-04-13",
      "readTime": { "en": "6 min", "es": "6 min" },
      "title": { "en": "Claude Managed Agents vs Amazon Bedrock AgentCore", "es": "..." },
      "summary": { "en": "A comparison of...", "es": "..." },
      "audioUrl": { "en": "https://...s3.../articles-audio/claude-vs-agentcore-en.mp3" },
      "thumbnail": "/claude-vs-agentcore.png",
      "externalUrl": null,
      "source": null
    }
  ]
}
```

### Article TTS Lambda

Extend or create new Lambda that:
1. Receives `{ articleSlug: "claude-vs-agentcore", language: "en" }`
2. Fetches markdown from `/public/articles/{slug}/{lang}.md` or S3
3. Strips markdown formatting (headings, links, images, code blocks)
4. Sends plain text to Polly (generative voice, single narrator)
5. Uploads MP3 to `s3://output-bucket/articles-audio/{slug}-{lang}.mp3`
6. Updates `articles.json` manifest with `audioUrl`

### Voice Selection

Single narrator voice for articles:
- English: `Matthew` (generative) - same as podcast host Alex
- Spanish: `Sergio` (generative) - for future Spanish audio

## Acceptance Criteria

### Phase 1: Markdown Migration
- [ ] Articles loaded from `/public/articles/{slug}/{lang}.md` files
- [ ] `articles.json` manifest contains metadata for all articles
- [ ] ArticlesPage fetches manifest and renders list
- [ ] Individual article view fetches and renders markdown
- [ ] Existing articles migrated (10 articles)
- [ ] Build passes, site works locally

### Phase 2: TTS Generation
- [ ] New Lambda or orchestrator extension for article TTS
- [ ] Markdown → plain text conversion (strip formatting)
- [ ] Polly generates audio with generative voice
- [ ] Audio uploaded to S3 with correct path
- [ ] Manifest updated with `audioUrl`

### Phase 3: Player UI
- [ ] "Listen" button appears on articles with audio
- [ ] Audio player component (play/pause, progress, duration)
- [ ] Player styled consistent with site (amber accents, dark theme)

## Tasks

### Phase 1: Markdown Migration
1. Create `/public/articles/` directory structure
2. Create `articles.json` manifest schema
3. Extract existing articles to markdown files
4. Update `ArticlesPage.tsx` to fetch manifest
5. Update article detail view to fetch markdown content
6. Test all existing articles render correctly

### Phase 2: TTS Lambda
1. Create `article-tts/` Lambda in `podcast-infra/lambda/`
2. Implement markdown stripping (remove `#`, `[]()`, `![]()`, ``` blocks)
3. Implement Polly TTS call (reuse existing pattern)
4. Implement S3 upload for audio
5. Implement manifest update
6. Add Lambda to CDK stack
7. Create IAM permissions (S3, Polly)
8. Test with one article

### Phase 3: Player UI
1. Create `AudioPlayer` component
2. Add "Listen" button to article view (conditional on `audioUrl`)
3. Style player to match site theme
4. Test playback

## Cost Estimate

- Polly Generative: $0.03 per 1,000 characters
- Average article: ~8,000 characters = ~$0.24 per article
- 10 articles (English only): ~$2.40 one-time
- Storage: negligible (~10MB total)

## Risks

| Risk | Mitigation |
|------|------------|
| Long articles hit Polly limits | Chunk text into segments, concatenate audio |
| Markdown stripping misses edge cases | Test with all existing articles before deploy |
| Audio quality varies with content | Use generative engine, test with technical content |

## Open Questions

1. Should audio be generated on-demand or pre-generated?
   - Recommendation: Pre-generate for MVP, on-demand later if needed

2. Should we support Spanish audio?
   - Recommendation: English only for MVP, add Spanish later

3. Where to store markdown files - `/public/` or S3?
   - Recommendation: `/public/` for simplicity, same deploy as site
