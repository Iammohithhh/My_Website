import path from "node:path";
import type { Element, ElementContent, Root } from "hast";
import type { VFile } from "vfile";
import { visit } from "unist-util-visit";

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

const EXTERNAL = /^(https?:|mailto:|data:|\/|#)/;

function textOf(node: ElementContent | Element): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(textOf).join("");
  return "";
}

// Fixes up links written with Obsidian's "relative path" setting:
// images point at the note attachments, and links to other .md files point at their note pages.
export function rehypeNotePaths({
  resolveNote,
  resolveFile,
}: {
  resolveNote: (target: string) => { slug: string } | null;
  resolveFile: (name: string) => string | null;
}) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img") {
        const src = String(node.properties.src ?? "");
        if (src && !EXTERNAL.test(src)) {
          const file = resolveFile(decodeURIComponent(path.posix.basename(src)));
          if (file) node.properties.src = file;
        }
        node.properties.loading = "lazy";
      }
      if (node.tagName === "a") {
        const href = String(node.properties.href ?? "");
        const match = href.match(/^([^#]+)\.md(#.*)?$/);
        if (match && !EXTERNAL.test(href)) {
          const note = resolveNote(decodeURIComponent(path.posix.basename(match[1])));
          if (note) node.properties.href = `/notes/${note.slug}${match[2] ?? ""}`;
        }
      }
    });
  };
}

// Collects h2/h3 headings (after rehype-slug has added ids) for the table of contents.
export function rehypeCollectToc() {
  return (tree: Root, file: VFile) => {
    const toc: TocItem[] = [];
    visit(tree, "element", (node: Element) => {
      // Skip the hidden "Footnotes" heading that remark-gfm adds.
      if ((node.tagName === "h2" || node.tagName === "h3") && node.properties.id && node.properties.id !== "footnote-label") {
        toc.push({ id: String(node.properties.id), text: textOf(node).trim(), depth: node.tagName === "h2" ? 2 : 3 });
      }
    });
    (file.data as { toc?: TocItem[] }).toc = toc;
  };
}
