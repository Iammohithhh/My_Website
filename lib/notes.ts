import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeFigure from "./rehype-figure";
import remarkObsidian from "./remark-obsidian";
import { rehypeCollectToc, rehypeNotePaths, type TocItem } from "./rehype-notes";
import { NOTE_TYPES, type NoteSummary, type NoteType } from "./note-types";

// The Obsidian vault. Folders starting with "_" or "." (_drafts, _templates, .obsidian) are not published.
const NOTES_DIR = path.join(process.cwd(), "content", "notes");
const DRAFTS_DIR = path.join(NOTES_DIR, "_drafts");

// Drafts show up with `npm run dev` only. _drafts is also git-ignored, so drafts never reach GitHub.
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

const FILE_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
};

interface RawNote extends NoteSummary {
  file: string;
  content: string;
}

function walk(dir: string, includeHidden = false): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (!includeHidden && (entry.name.startsWith("_") || entry.name.startsWith("."))) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

export function slugify(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toIsoDate(value: unknown, where: string, field: string) {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${where}: "${field}" must be a date like 2026-10-25`);
  }
  return date.toISOString();
}

function readNote(file: string, draft: boolean): RawNote {
  const where = path.relative(NOTES_DIR, file);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const name = path.basename(file, ".md");

  if (!data.date) throw new Error(`${where}: add a "date" (like 2026-10-25) to the note's properties`);
  const type = typeof data.type === "string" ? data.type.toLowerCase() : undefined;
  if (type && !(type in NOTE_TYPES)) {
    throw new Error(`${where}: "type" must be one of ${Object.keys(NOTE_TYPES).join(", ")}`);
  }

  return {
    file,
    content,
    slug: slugify(typeof data.slug === "string" ? data.slug : name),
    title: typeof data.title === "string" && data.title.trim() ? data.title.trim() : name,
    summary: String(data.summary ?? data.description ?? ""),
    date: toIsoDate(data.date, where, "date"),
    updated: data.updated ? toIsoDate(data.updated, where, "updated") : undefined,
    type: type as NoteType | undefined,
    tags: (Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : []).map((t: unknown) =>
      String(t).replace(/^#/, "")
    ),
    draft: draft || data.draft === true,
  };
}

function readAll(): RawNote[] {
  const published = walk(NOTES_DIR).filter((f) => f.endsWith(".md")).map((f) => readNote(f, false));
  const drafts = SHOW_DRAFTS
    ? walk(DRAFTS_DIR).filter((f) => f.endsWith(".md")).map((f) => readNote(f, true))
    : [];
  const notes = [...published, ...drafts].filter((n) => SHOW_DRAFTS || !n.draft);

  const seen = new Map<string, string>();
  for (const note of notes) {
    const other = seen.get(note.slug);
    if (other) throw new Error(`Two notes have the same URL (/notes/${note.slug}): ${other} and ${note.file}`);
    seen.set(note.slug, note.file);
  }
  return notes.sort((a, b) => b.date.localeCompare(a.date));
}

function summaryOf({ file: _file, content: _content, ...summary }: RawNote): NoteSummary {
  return summary;
}

export function getAllNotes(): NoteSummary[] {
  return readAll().map(summaryOf);
}

// Images and other files anywhere in the vault, found by file name the way Obsidian does.
export function noteFiles(): Map<string, string> {
  const files = new Map<string, string>();
  for (const file of walk(NOTES_DIR)) {
    if (FILE_TYPES[path.extname(file).toLowerCase()]) files.set(path.basename(file), file);
  }
  return files;
}

export function contentTypeOf(file: string) {
  return FILE_TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream";
}

function makeResolvers(notes: RawNote[]) {
  const byKey = new Map<string, RawNote>();
  for (const note of notes) {
    byKey.set(path.basename(note.file, ".md").toLowerCase(), note);
    byKey.set(note.title.toLowerCase(), note);
    byKey.set(note.slug, note);
  }
  const files = noteFiles();
  return {
    resolveNote: (target: string) => {
      const key = target.replace(/\.md$/i, "").split("/").pop()!.trim().toLowerCase();
      return byKey.get(key) ?? byKey.get(slugify(key)) ?? null;
    },
    resolveFile: (name: string) => {
      const base = name.split("/").pop()!.trim();
      return files.has(base) ? `/notes/files/${encodeURIComponent(base)}` : null;
    },
  };
}

const WIKILINK_TARGET = /\[\[([^\]|#^]+)/g;

export async function getNote(slug: string) {
  const notes = readAll();
  const note = notes.find((n) => n.slug === slug);
  if (!note) return null;
  const resolvers = makeResolvers(notes);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkObsidian, resolvers)
    .use(remarkRehype)
    .use(rehypeFigure)
    .use(rehypeSlug)
    .use(rehypeNotePaths, resolvers)
    .use(rehypeCollectToc)
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(note.content);

  const backlinks = notes
    .filter((other) => other.slug !== slug)
    .filter((other) =>
      [...other.content.matchAll(WIKILINK_TARGET)].some((m) => resolvers.resolveNote(m[1])?.slug === slug)
    )
    .map(summaryOf);

  return {
    meta: summaryOf(note),
    html: String(file),
    toc: (file.data as { toc?: TocItem[] }).toc ?? [],
    backlinks,
  };
}
