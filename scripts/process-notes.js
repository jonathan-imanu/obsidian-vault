#!/usr/bin/env node

/**
 * Process Obsidian notes for website sync
 *
 * Features:
 * - Incremental processing (only changed files)
 * - Ignore list support
 * - Obsidian syntax conversion
 * - Image handling
 * - JSON output generation
 */

import fs from "fs/promises";
import path from "path";
import { OUTPUT_DIR, VAULT_DIR } from "./config.js";
import { loadIgnorePatterns } from "./ignore.js";
import { findMarkdownFiles } from "./file-utils.js";
import { copyImages } from "./file-utils.js";
import { processNote } from "./note-processor.js";
import {
  parseDiffFile,
  loadExistingIndex,
  deleteNote,
  generateIndex,
  saveIndex,
} from "./index.js";
import { getNoteIdAndPathFromPath } from "./utils.js";
import { shouldIgnore } from "./ignore.js";

/**
 * Process notes in incremental mode (based on git diff)
 */
async function processIncremental(diffFilePath, ignorePatterns, notes) {
  console.log("Parsing diff file...");
  const diff = await parseDiffFile(diffFilePath);

  if (!diff) {
    console.log("No diff file found or could not parse");
    return false;
  }

  let hasChanges = false;

  // Process added/modified files
  if (diff.modified.length > 0) {
    console.log(`Processing ${diff.modified.length} added/modified file(s)...`);
    hasChanges = true;

    const notesDir = path.join(OUTPUT_DIR, "notes");

    for (const relativePath of diff.modified) {
      // Check if file should be ignored
      const fullPath = path.join(VAULT_DIR, relativePath);
      if (shouldIgnore(fullPath, ignorePatterns)) {
        console.log(`Skipping ignored file: ${relativePath}`);
        continue;
      }

      try {
        const note = await processNote(fullPath);
        notes[note.path] = note;

        await copyImages(note, fullPath);

        const noteFilePath = path.join(notesDir, `${note.id}.json`);
        await fs.writeFile(noteFilePath, JSON.stringify(note, null, 2));

        console.log(`Processed: ${note.id}`);
      } catch (error) {
        console.error(`Error processing ${relativePath}: ${error.message}`);
      }
    }
  }

  // Handle deleted files
  if (diff.deleted.length > 0) {
    console.log(`Removing ${diff.deleted.length} deleted file(s)...`);
    hasChanges = true;

    for (const relativePath of diff.deleted) {
      const { id: noteId, path: notePath } =
        getNoteIdAndPathFromPath(relativePath);

      // Remove from index (check both id and path keys for backwards compatibility)
      let removed = false;
      if (notes[noteId]) {
        delete notes[noteId];
        removed = true;
      }
      if (notes[notePath]) {
        delete notes[notePath];
        removed = true;
      }
      if (removed) {
        console.log(`Removed from index: ${notePath}`);
      }

      // Delete JSON file (use id for filename)
      await deleteNote(noteId);
    }
  }

  if (!hasChanges) {
    console.log("No changes to process");
    return false;
  }

  return true;
}

/**
 * Process all notes
 * This is used when there is no diff file, so we need to process all notes
 */
async function processFullSync(ignorePatterns, notes) {
  console.log("Finding all markdown files...");
  const files = await findMarkdownFiles(ignorePatterns, null);
  console.log(`Found ${files.length} file(s) to process`);

  if (files.length === 0) {
    console.log("No files to process");
    return false;
  }

  const notesDir = path.join(OUTPUT_DIR, "notes");

  for (const filePath of files) {
    try {
      const note = await processNote(filePath);
      notes[note.path] = note;

      await copyImages(note, filePath);

      const noteFilePath = path.join(notesDir, `${note.id}.json`);
      await fs.writeFile(noteFilePath, JSON.stringify(note, null, 2));

      console.log(`Processed: ${note.id}`);
    } catch (error) {
      console.error(`Error processing ${filePath}: ${error.message}`);
    }
  }

  return true;
}

function printSummary(notes) {
  console.log("\nSummary:");
  console.log(`Total notes: ${Object.keys(notes).length}`);
  console.log(
    `Notes with images: ${
      Object.values(notes).filter((n) => n.images.length > 0).length
    }`
  );
  console.log(
    `Notes with links: ${
      Object.values(notes).filter((n) => n.links.length > 0).length
    }`
  );
}

async function main() {
  const args = process.argv.slice(2);
  const diffFilePath = args
    .find((arg) => arg.startsWith("--diff-file="))
    ?.split("=")[1];
  const isTest = args.includes("--test");

  console.log("Loading ignore patterns...");
  const ignorePatterns = await loadIgnorePatterns();
  console.log(`Loaded ${ignorePatterns.length} ignore patterns`);

  const existingIndex = await loadExistingIndex();
  const notes = { ...existingIndex.notes };

  const notesDir = path.join(OUTPUT_DIR, "notes");
  await fs.mkdir(notesDir, { recursive: true });
  await fs.mkdir(path.join(OUTPUT_DIR, "images"), { recursive: true });

  let processed = false;
  if (diffFilePath) {
    processed = await processIncremental(diffFilePath, ignorePatterns, notes);
  } else {
    processed = await processFullSync(ignorePatterns, notes);
  }

  if (!processed) {
    return;
  }

  const index = generateIndex(notes);
  const indexPath = await saveIndex(index);

  console.log(`\nProcessed ${Object.keys(notes).length} note(s) total`);
  console.log(`Index: ${indexPath}`);
  console.log(`Notes: ${notesDir}`);
  console.log(`Images: ${path.join(OUTPUT_DIR, "images")}`);

  if (isTest) {
    printSummary(notes);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export {
  processNote,
  findMarkdownFiles,
  loadIgnorePatterns,
  parseDiffFile,
  loadExistingIndex,
};
