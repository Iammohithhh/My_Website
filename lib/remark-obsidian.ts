import type { PhrasingContent, Root, Text } from "mdast";
import { SKIP, visit } from "unist-util-visit";

// Obsidian syntax: [[Note]], [[Note|label]], [[Note#Heading]], ![[image.png]], ![[image.png|alt]]
const WIKILINK = /(!?)\[\[([^\]|#^]+)(#[^\]|]*)?(?:\|([^\]]*))?\]\]/g;

export interface ObsidianResolvers {
  resolveNote: (target: string) => { slug: string } | null;
  resolveFile: (name: string) => string | null;
}

// Same rule rehype-slug uses for heading ids, close enough for links to headings.
export function headingId(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

export default function remarkObsidian({ resolveNote, resolveFile }: ObsidianResolvers) {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined || !node.value.includes("[[")) return;

      const out: PhrasingContent[] = [];
      let last = 0;
      WIKILINK.lastIndex = 0;
      for (let m = WIKILINK.exec(node.value); m; m = WIKILINK.exec(node.value)) {
        const [whole, bang, rawTarget, heading, alias] = m;
        const target = rawTarget.trim();
        if (m.index > last) out.push({ type: "text", value: node.value.slice(last, m.index) });
        last = m.index + whole.length;

        const file = bang ? resolveFile(target) : null;
        if (file) {
          // Obsidian uses ![[image.png|300]] for width; treat anything else after | as alt text.
          const alt = alias && !/^\d+(x\d+)?$/.test(alias.trim()) ? alias.trim() : "";
          out.push({ type: "image", url: file, alt, title: null });
          continue;
        }

        const label = alias?.trim() || (heading ? `${target} › ${heading.slice(1)}` : target);
        const note = resolveNote(target);
        if (note) {
          const anchor = heading && heading.length > 1 ? `#${headingId(heading.slice(1))}` : "";
          out.push({ type: "link", url: `/notes/${note.slug}${anchor}`, children: [{ type: "text", value: label }] });
        } else {
          // Links to notes that aren't published stay as plain text.
          out.push({ type: "text", value: label });
        }
      }
      if (out.length === 0) return;
      if (last < node.value.length) out.push({ type: "text", value: node.value.slice(last) });

      parent.children.splice(index, 1, ...out);
      return [SKIP, index + out.length];
    });
  };
}
