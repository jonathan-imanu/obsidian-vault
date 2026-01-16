import fs from "fs/promises";
import path from "path";
import { VAULT_DIR, OUTPUT_DIR } from "./config.js";
import { shouldIgnore } from "./ignore.js";

/**
 * Find all markdown files in vault
 */
export async function findMarkdownFiles(ignorePatterns, changedFiles = null) {
  const files = [];

  async function walkDir(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (shouldIgnore(fullPath, ignorePatterns)) {
        continue;
      }

      if (entry.isDirectory()) {
        await walkDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        // If changedFiles is provided, only process those files
        if (changedFiles) {
          const relativePath = path
            .relative(VAULT_DIR, fullPath)
            .replace(/\\/g, "/");
          if (!changedFiles.includes(relativePath)) {
            continue;
          }
        }
        files.push(fullPath);
      }
    }
  }

  await walkDir(VAULT_DIR);
  return files;
}

/**
 * Get file modification date
 */
export async function getFileDate(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtime.toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

/**
 * Find image file in vault directory
 * Searches in note directory, then recursively in vault
 */
export async function findImageFile(imageName, noteDir) {
  // First try same directory as note
  const sameDirPath = path.join(noteDir, imageName);
  try {
    await fs.access(sameDirPath);
    return sameDirPath;
  } catch {
    // Not found, search recursively in vault
    async function searchDir(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const found = await searchDir(fullPath);
          if (found) return found;
        } else if (entry.isFile() && entry.name === imageName) {
          return fullPath;
        }
      }
      return null;
    }
    return await searchDir(VAULT_DIR);
  }
}

/**
 * Copy images to output directory
 */
export async function copyImages(note, filePath) {
  const imagesDir = path.join(OUTPUT_DIR, "images");
  await fs.mkdir(imagesDir, { recursive: true });

  const noteDir = path.dirname(filePath);
  const copiedImages = [];

  for (const imagePath of note.images) {
    const imageName = path.basename(imagePath);

    try {
      // Find the image file in the vault
      const sourcePath = await findImageFile(imageName, noteDir);
      if (!sourcePath) {
        console.warn(
          `Warning: Image not found: ${imageName} (from ${filePath})`
        );
        continue;
      }

      // Copy to output directory
      const destPath = path.join(imagesDir, imageName);
      await fs.copyFile(sourcePath, destPath);
      copiedImages.push(imagePath);
    } catch (error) {
      console.warn(`Warning: Could not copy ${imageName}: ${error.message}`);
    }
  }

  return copiedImages;
}
