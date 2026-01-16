import fs from "fs/promises";
import path from "path";
import { minimatch } from "minimatch";
import { VAULT_DIR, IGNORE_FILE, DEFAULT_IGNORE_PATTERNS } from "./config.js";

/**
 * Load ignore patterns from file and default patterns
 */
export async function loadIgnorePatterns() {
  const patterns = [...DEFAULT_IGNORE_PATTERNS];

  try {
    const content = await fs.readFile(IGNORE_FILE, "utf-8");
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")); // Remove comments and empty lines

    patterns.push(...lines);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn(`Warning: Could not read ignore file: ${error.message}`);
    }
  }

  return patterns;
}

/**
 * Check if a file path matches any ignore pattern
 */
export function shouldIgnore(filePath, ignorePatterns) {
  // Normalize path to be relative to vault directory
  const relativePath = path.relative(VAULT_DIR, filePath).replace(/\\/g, "/");

  return ignorePatterns.some((pattern) => {
    // Support both file and directory patterns
    return (
      minimatch(relativePath, pattern) ||
      minimatch(relativePath, pattern + "/**") ||
      minimatch(path.dirname(relativePath), pattern)
    );
  });
}
