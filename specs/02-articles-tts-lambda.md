# Articles TTS Lambda

## Goal

Create a Lambda that converts article markdown content to audio using AWS Polly, so articles can be listened to. Audio files are pre-generated and stored in S3.

## Non-Goals

- Audio player UI (separate spec)
- Multi-voice dialogue or podcast-style narration (single narrator)
- Real-time streaming TTS (pre-generated files only)
- Spanish audio versions (English only for MVP)
- Automatic generation on publish (manual trigger)

## Prerequisites

- Spec `01-articles-markdown-migration` must be completed first (articles exist as `.md` files)

## Background

The podcast infrastructure already exists in `podcast-infra/` with Polly TTS, S3 storage, and a CDK stack. This spec extends that infrastructure to generate single-narrator audio for articles.

Only the 4 markdown articles are candidates for TTS:
- `claude-managed-agents-vs-bedrock-agentcore`
- `serverless-migrations`
- `genai-ops`
- `observability-playbook`

## Architecture

```
Input:  public/articles/{slug}/en.md  (or fetched from deployed site / S3)
Output: s3://output-bucket/articles-audio/{slug}-en.mp3
Update: public/articles/articles.json  (add audioUrl field)
```

### Lambda Flow

1. Receives `{ articleSlug: "claude-vs-agentcore", language: "en" }`
2. Fetches markdown from the article source
3. Strips markdown formatting (headings, links, images, code blocks, tables)
4. Sends plain text to Polly (generative voice, single narrator)
5. Uploads MP3 to `s3://output-bucket/articles-audio/{slug}-{lang}.mp3`
6. Returns the S3 URL for manual manifest update

### Voice Selection

- English: `Matthew` (generative) — consistent with existing podcast host voice

### Manifest Update

After generation, `articles.json` entries for markdown articles gain an `audioUrl` field:

```json
{
  "slug": "claude-managed-agents-vs-bedrock-agentcore",
  "type": "markdown",
  "audioUrl": { "en": "https://...s3.../articles-audio/claude-managed-agents-vs-bedrock-agentcore-en.mp3" },
  ...
}
```

## Acceptance Criteria

- [ ] Lambda accepts `{ articleSlug, language }` and produces an MP3
- [ ] Markdown stripped correctly: no `#`, `[]()`, `![]()`, triple-backtick blocks, table syntax in audio
- [ ] Polly generative voice used (`Matthew` for English)
- [ ] MP3 uploaded to S3 at `articles-audio/{slug}-{lang}.mp3`
- [ ] Lambda added to CDK stack with correct IAM permissions (S3, Polly)
- [ ] Successfully generates audio for at least one article end-to-end

## Tasks

| # | Task | Agent |
|---|------|-------|
| 1 | Create `podcast-infra/lambda/article-tts/` with markdown-to-plaintext stripping | `typescript-pro` |
| 2 | Implement Polly TTS call (reuse existing podcast pattern) and S3 upload | `typescript-pro` |
| 3 | Add Lambda + IAM permissions to CDK stack | `cloud-architect` |
| 4 | Test with one article end-to-end | `test-automator` |

Tasks 1 and 2 can be combined if simpler. Task 3 can run in parallel with 1+2. Task 4 depends on all.

## Cost Estimate

- Polly Generative: ~$0.03 per 1,000 characters
- Average article: ~8,000 characters → ~$0.24 per article
- 4 articles (English only): ~$0.96 one-time
- Storage: negligible (~5MB total)

## Risks

| Risk | Mitigation |
|------|------------|
| Long articles hit Polly character limits | Chunk text into segments, concatenate audio |
| Markdown stripping misses edge cases (tables, nested formatting) | Test with all 4 articles before deploying |
| Audio quality varies with technical content (code terms, URLs) | Use generative engine; strip URLs and code blocks rather than reading them |
