import path from "path";
import { VAULT_DIR } from "./config.js";

/**
 * Generate URL-friendly slug from filename
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Extract note ID from file path (for filenames, uses '--')
 * Example: school/cscc69/ostep/18. Introduction to Paging.md
 *          -> school--cscc69--ostep--18-introduction-to-paging
 */
export function getNoteId(filePath) {
  const relativePath = path.relative(VAULT_DIR, filePath);
  const pathWithoutExt = relativePath.replace(/\.md$/, "").replace(/\\/g, "/");

  // Replace path separators with delimiter, then slugify each segment
  const segments = pathWithoutExt.split("/");
  return segments.map((segment) => slugify(segment)).join("--");
}

/**
 * Get note path for index (uses '/' for readability)
 * Example: school/cscc69/ostep/18. Introduction to Paging.md
 *          -> school/cscc69/ostep/18-introduction-to-paging
 */
export function getNotePath(filePath) {
  const relativePath = path.relative(VAULT_DIR, filePath);
  const pathWithoutExt = relativePath.replace(/\.md$/, "").replace(/\\/g, "/");

  // Slugify each segment but keep '/' separators
  const segments = pathWithoutExt.split("/");
  return segments.map((segment) => slugify(segment)).join("/");
}

/**
 * Get note ID and path from file path (relative to vault)
 * Returns both '--' version (for filename) and '/' version (for index)
 */
export function getNoteIdAndPathFromPath(filePath) {
  // filePath is relative to vault directory
  const pathWithoutExt = filePath.replace(/\.md$/, "").replace(/\\/g, "/");
  const segments = pathWithoutExt.split("/");

  return {
    id: segments.map((segment) => slugify(segment)).join("--"),
    path: segments.map((segment) => slugify(segment)).join("/"),
  };
}
