import { site } from "@/lib/data";
import { getAllNotes } from "@/lib/notes";

export const dynamic = "force-static";

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = getAllNotes()
    .filter((note) => !note.draft)
    .map((note) => {
      const url = `${site.url}/notes/${note.slug}`;
      return `    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(note.date).toUTCString()}</pubDate>
      <description>${escapeXml(note.summary)}</description>
${note.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Notes</title>
    <link>${site.url}/notes</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <atom:link href="${site.url}/notes/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
