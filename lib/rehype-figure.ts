import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

// Turns a paragraph containing only an image with a title into a captioned figure:
//   ![Alt text for screen readers](/writing/post/plot.png "Caption shown under the figure")
export default function rehypeFigure() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "p" || !parent || index === undefined) return;

      const children = node.children.filter(
        (child) => !(child.type === "text" && child.value.trim() === "")
      );
      if (children.length !== 1) return;

      const img = children[0];
      if (img.type !== "element" || img.tagName !== "img") return;

      const caption = img.properties?.title;
      if (typeof caption !== "string" || caption === "") return;

      const { title: _title, ...imgProps } = img.properties;
      parent.children[index] = {
        type: "element",
        tagName: "figure",
        properties: {},
        children: [
          { ...img, properties: imgProps },
          {
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: [{ type: "text", value: caption }],
          },
        ],
      };
    });
  };
}
