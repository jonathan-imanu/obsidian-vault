import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { VAULT_DIR } from "./config.js";
import { getNoteId, getNotePath } from "./utils.js";
import {
  convertWikilinks,
  convertImageEmbeds,
  extractImageReferences,
  extractInternalLinks,
} from "./markdown.js";
import { getFileDate } from "./file-utils.js";

/**
 * Process a single markdown file
 */
export async function processNote(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  const { data: frontmatter, content: body } = matter(content);

  // Extract and convert image references
  // ![[image.png]] -> <img src="/images/image.png" alt="image" />
  // For whatever reason, React Markdown isn't working with the image embeds but it is working with the img tags
  const images = extractImageReferences(body);

  let processedContent = convertImageEmbeds(body);
  processedContent = convertWikilinks(processedContent);

  // Extract metadata
  const noteId = getNoteId(filePath); // For filename (uses '--')
  const notePath = getNotePath(filePath); // For index (uses '/')
  const title = frontmatter.title || path.basename(filePath, ".md");
  const fileDate = await getFileDate(filePath);
  const date = frontmatter.date || frontmatter.created || fileDate;
  const updated = frontmatter.updated || date;

  const links = extractInternalLinks(processedContent);

  return {
    id: noteId, // For filename (uses '--')
    path: notePath, // For routing/display (uses '/')
    title,
    content: processedContent,
    metadata: {
      date,
      updated,
    },
    images: [...new Set(images)], // Remove duplicates
    links: [...new Set(links)], // Remove duplicates
  };
}
