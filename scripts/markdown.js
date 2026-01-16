import path from "path";
import { slugify, escapeHtml } from "./utils.js";

/**
 * Convert Obsidian wikilinks to markdown links
 * [[note]] -> [note](/notes/note)
 * [[note|display]] -> [display](/notes/note)
 */
export function convertWikilinks(content) {
  // Match [[link]] or [[link|display]]
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, link) => {
    const [target, display] = link.split("|");
    const slug = slugify(target);
    const text = display || target;
    return `[${text}](/notes/${slug})`;
  });
}

/**
 * Convert Obsidian image embeds to HTML img tags
 * ![[image.png]] -> <img src="/images/image.png" alt="image" />
 */
export function convertImageEmbeds(content) {
  return content.replace(/!\[\[([^\]]+)\]\]/g, (match, imagePath) => {
    const imageName = path.basename(imagePath);
    const imagePathWithoutExt = path.basename(
      imagePath,
      path.extname(imagePath)
    );
    // Use image name without extension as alt text, replace dashes/underscores with spaces
    const altText = imagePathWithoutExt.replace(/[-_]/g, " ");
    // Escape HTML special characters in alt text (src doesn't need escaping)
    const safeAltText = escapeHtml(altText);
    return `<img src="/images/${imageName}" alt="${safeAltText}" />`;
  });
}

/**
 * Extract image references from markdown content
 * Returns array of image paths (e.g., ["/images/img1.png"])
 */
export function extractImageReferences(content) {
  const imageEmbedMatches = content.match(/!\[\[([^\]]+)\]\]/g) || [];
  return imageEmbedMatches
    .map((match) => {
      const imagePath = match.match(/!\[\[([^\]]+)\]\]/)[1];
      const imageName = path.basename(imagePath);
      return `/images/${imageName}`;
    })
    .filter(Boolean);
}

/**
 * Extract internal links from processed markdown content
 * Returns array of note slugs
 */
export function extractInternalLinks(content) {
  const linkMatches = content.match(/\[([^\]]+)\]\(\/notes\/([^)]+)\)/g) || [];
  return linkMatches
    .map((match) => {
      const matchResult = match.match(/\/notes\/([^)]+)/);
      return matchResult ? matchResult[1] : null;
    })
    .filter(Boolean);
}
