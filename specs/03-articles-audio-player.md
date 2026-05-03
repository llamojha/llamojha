# Articles Audio Player

## Goal

Add an audio player to article detail pages so users can listen to articles that have pre-generated audio.

## Non-Goals

- Audio generation (handled by spec `02-articles-tts-lambda`)
- Playback speed controls (keep it simple for MVP)
- Download audio button
- Offline playback

## Prerequisites

- Spec `01-articles-markdown-migration` must be completed (manifest with `audioUrl` field)
- Spec `02-articles-tts-lambda` must be completed (audio files exist in S3)

## Background

After specs 01 and 02, markdown articles in `articles.json` will have an `audioUrl` field pointing to an S3-hosted MP3. This spec adds a UI component to play that audio on the article detail page.

## Design

### Behavior

- A "Listen" button appears on article detail pages where `audioUrl` exists for the current language
- Clicking "Listen" expands an inline audio player below the article header
- Player controls: play/pause, progress bar, current time / duration
- Player is styled to match the site theme (dark background, amber accents)

### Component

A single `AudioPlayer` component that receives a URL and renders the player. The `ArticlesPage` detail view conditionally renders it when `audioUrl` is present.

```tsx
// Usage in article detail view
{article.audioUrl?.[language] && (
  <AudioPlayer src={article.audioUrl[language]} />
)}
```

## Acceptance Criteria

- [ ] "Listen" button appears only on articles with `audioUrl` for the active language
- [ ] Audio player shows play/pause, progress bar, and time display
- [ ] Player styled with dark theme and amber accents (consistent with site)
- [ ] Player does not appear on external or PDF articles
- [ ] Playback works on desktop and mobile browsers

## Tasks

| # | Task | Agent |
|---|------|-------|
| 1 | Create `AudioPlayer` component with play/pause, progress bar, time display | `typescript-pro` |
| 2 | Add conditional "Listen" button + player to article detail view in `ArticlesPage` | `typescript-pro` |
| 3 | Style player to match site theme | `typescript-pro` |
| 4 | Test playback on desktop and mobile | `test-automator` |

Tasks 1–3 are sequential. Task 4 depends on all.

## Risks

| Risk | Mitigation |
|------|------------|
| S3 CORS blocks audio fetch from the site | Configure CORS on the S3 bucket to allow the site origin |
| Mobile browsers auto-pause or restrict autoplay | Use user-initiated play only (click to start); no autoplay |
