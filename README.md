# Obsidian Vault

My personal vault and a minimal pipeline to sync Obsidian notes to my personal portfolio website. Built for my specific Obsidian usage and portfolio setup.

## How It Works

![pipeline-arch-simple](/pipeline-arch.png)

1. GitHub Actions triggers on changes to `vault/**/*.md` or image files. The workflow runs `node scripts/p   --diff-file=changed-files.txt` with a generated `changed-files.txt`.
2. `process-notes.js` processes changed files:
   - Converts Obsidian syntax (wikilinks, image embeds) to standard markdown/HTML
   - Extracts frontmatter (title, date, etc.)
   - Copies referenced images to `processed-notes/images/`
   - Outputs individual note JSON files (`notes/*.json`) with processed content
   - Builds a metadata index (`index.json`) containing all note metadata
3. Commits processed files to portfolio repo: `src/data/notes/*.json`, `src/data/notes-index.json`, and `public/images/*`
4. Portfolio loads `notes-index.json` for note listings (metadata only), then lazy-loads individual note JSON files and renders content with `react-markdown`. MathJax is rendered client-side.

## Output Format

### Individual Note JSON

Each processed note is saved as `notes/{note-id}.json`:

```json
{
  "id": "note-slug",
  "path": "category/note-slug",
  "title": "Note Title",
  "content": "processed markdown...",
  "metadata": {
    "date": "2024-01-01",
    "updated": "2024-01-02"
  },
  "images": ["/images/img1.png"],
  "links": ["other-note-slug"]
}
```

### Index JSON

The `index.json` file contains metadata for all notes (no content):

```json
{
  "version": "1.0.0",
  "lastSync": "2024-01-01T00:00:00Z",
  "notes": {
    "category/note-slug": {
      "id": "note-slug",
      "path": "category/note-slug",
      "title": "Note Title",
      "metadata": {
        "date": "2024-01-01",
        "updated": "2024-01-02"
      }
    }
  }
}
```

## Setup

Fork this repository (or clone the `scripts/` and `.github/` folders). Your Obsidian vault must be named `vault` and located at the repository root (same level as `scripts/`).

### 1. Configure GitHub Actions Secrets

In your repository, navigate to **Settings -> Secrets and variables -> Actions -> Secrets** and create:

- `PORTFOLIO_REPO`: `username/name-of-website-repo`
- `PORTFOLIO_REPO_TOKEN`: A Personal Access Token with `repo` scope

### 2. Configure Ignore Patterns

Edit `.obsidian-sync-ignore` to exclude files from processing:

```
**/private/**
TODO.md
*.base
```

### 3. Update Workflow Paths

Edit `.github/workflows/sync-notes.yml` to match your portfolio structure:

- Update `src/data/notes/` path if different
- Update `public/images/` path if different

## Portfolio Integration

The processed JSON files are synced to your portfolio repository. On the client side (assuming you use a React SPA):

```typescript
// Load index for listings
import notesIndex from "../data/notes-index.json";

// Lazy load individual note
const noteData = await import(`../data/notes/${noteId}.json`);
import ReactMarkdown from "react-markdown";

// Render
<ReactMarkdown>{noteData.default.content}</ReactMarkdown>;
```

The `content` field contains processed markdown (wikilinks converted to links, images as HTML tags) ready for `react-markdown`.
