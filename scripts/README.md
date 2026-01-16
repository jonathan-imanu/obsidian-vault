# Processing Scripts

## Overview

Scripts to process Obsidian notes for website sync.

## Usage

### Process all notes

```bash
npm run process
```

### Process diffs (for GitHub Actions)

```bash
node scripts/process-notes.js --diff-file=changed-files.txt
```

The diff file should contain git diff output in the format:

```
A\tpath/to/added.md
M\tpath/to/modified.md
D\tpath/to/deleted.md
```

### Test run

```bash
npm test
```

## Ignore List

Create a `.obsidian-sync-ignore` file in the root directory to exclude files from processing.

**Pattern examples:**

- `interviews/` - Exclude entire directory
- `*.base` - Exclude all files with `.base` extension
- `**/private/**` - Exclude all files in any `private` directory
- `TODO.md` - Exclude specific file

## Output

Processed files are written to `processed-notes/`:

- `processed-notes/notes/*.json` - Individual note JSON files
- `processed-notes/index.json` - Index with all note metadata
- `processed-notes/images/*` - Copied images

## Features

- Incremental processing (only changed files via diff)
- Ignore list support
- Obsidian syntax conversion (wikilinks, image embeds)
- Frontmatter extraction
- Image copying
- Link extraction
- Handles file deletions (removes from index and deletes JSON files)
