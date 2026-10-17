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

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// Drafts are visible with `npm run dev` and never included in production builds or the feed.
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: Date;
  updated?: Date;
  tags: string[];
  draft: boolean;
}

function toDate(value: unknown, file: string, field: string): Date {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${file}: "${field}" must be a date like 2026-10-15`);
  }
  return date;
}

function readMeta(file: string): PostMeta & { content: string } {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  for (const field of ["title", "description", "date"]) {
    if (!data[field]) throw new Error(`${file}: missing "${field}" in front matter`);
  }

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    description: String(data.description),
    date: toDate(data.date, file, "date"),
    updated: data.updated ? toDate(data.updated, file, "updated") : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    content,
  };
}

function readAll() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map(readMeta)
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getAllPosts(): PostMeta[] {
  return readAll().map(({ content: _content, ...meta }) => meta);
}

export async function getPost(slug: string) {
  const post = readAll().find((p) => p.slug === slug);
  if (!post) return null;

  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeFigure)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(post.content);

  const { content: _content, ...meta } = post;
  return { meta, html: String(html) };
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
