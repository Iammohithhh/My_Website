import fs from "node:fs";
import { contentTypeOf, noteFiles } from "@/lib/notes";

// Serves images pasted into the Obsidian vault (e.g. ![[plot.png]]) at /notes/files/<name>.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...noteFiles().keys()].map((name) => ({ name }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const file = noteFiles().get(decodeURIComponent(name));
  if (!file) return new Response("Not found", { status: 404 });

  return new Response(fs.readFileSync(file), {
    headers: {
      "Content-Type": contentTypeOf(file),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
