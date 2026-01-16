import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, "..");
export const VAULT_DIR = path.join(ROOT_DIR, "vault");
export const OUTPUT_DIR = path.join(ROOT_DIR, "processed-notes");
export const IGNORE_FILE = path.join(ROOT_DIR, ".obsidian-sync-ignore");

export const DEFAULT_IGNORE_PATTERNS = [
  ".obsidian/**",
  "*.base",
  "Untitled*.md",
  "Untitled*.base",
  ".git/**",
  "node_modules/**",
  "processed-notes/**",
  "scripts/**",
  ".github/**",
];
