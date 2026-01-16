import fs from "fs/promises";
import path from "path";
import { OUTPUT_DIR } from "./config.js";
import { getNoteIdAndPathFromPath } from "./utils.js";

/**
 * Load existing index if it exists
 */
export async function loadExistingIndex() {
  const indexPath = path.join(OUTPUT_DIR, "index.json");
  try {
    const content = await fs.readFile(indexPath, "utf-8");
    return JSON.parse(content);
  } catch {
    return {
      version: "1.0.0",
      lastSync: null,
      notes: {},
    };
  }
}

/**
 * Parse git diff output to separate added/modified from deleted files
 * Format: A\tpath/to/file.md (Added), M\tpath/to/file.md (Modified), D\tpath/to/file.md (Deleted)
 */
export async function parseDiffFile(diffFilePath) {
  try {
    const content = await fs.readFile(diffFilePath, "utf-8");
    const modified = [];
    const deleted = [];

    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.endsWith(".md")) continue;

      const parts = trimmed.split("\t");
      if (parts.length < 2) continue;

      const status = parts[0];
      let filePath = parts[1];

      // Strip 'vault/' prefix if present (git diff outputs paths relative to repo root)
      if (filePath.startsWith("vault/")) {
        filePath = filePath.substring(6); // Remove "vault/" prefix
      }

      if (status === "A" || status === "M") {
        // If a file is added or modified, we need to process it
        modified.push(filePath);
      } else if (status === "D") {
        // If a file is deleted, we need to remove it from the index
        deleted.push(filePath);
      }
    }

    return {
      modified,
      deleted,
    };
  } catch {
    return null;
  }
}

/**
 * Delete a note from the index and remove its JSON file
 */
export async function deleteNote(noteId) {
  const notesDir = path.join(OUTPUT_DIR, "notes");
  const notePath = path.join(notesDir, `${noteId}.json`);

  try {
    await fs.unlink(notePath);
  } catch (error) {
    // File might not exist, that's okay
    if (error.code !== "ENOENT") {
      console.warn(`Warning: Could not delete ${notePath}: ${error.message}`);
    }
  }
}

/**
 * Generate index from notes object
 */
export function generateIndex(notes) {
  return {
    version: "1.0.0",
    lastSync: new Date().toISOString(),
    notes: Object.fromEntries(
      Object.entries(notes).map(([id, note]) => [
        note.path, // Use path with '/' as key
        {
          id: note.id, // Keep '--' version for file loading
          path: note.path, // Keep '/' version for routing
          title: note.title,
          metadata: note.metadata,
        },
      ])
    ),
  };
}

/**
 * Save index to file
 */
export async function saveIndex(index) {
  const indexPath = path.join(OUTPUT_DIR, "index.json");
  await fs.writeFile(indexPath, JSON.stringify(index, null, 2));
  return indexPath;
}
