import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date.toISOString(),
      modifiedTime: post.updated?.toISOString(),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { meta, html } = post;

  return (
    <article className="max-w-prose mx-auto">
      <p className="text-sm">
        <Link href="/blog" className="link">
          ← Blog
        </Link>
      </p>
      <header className="mt-4 mb-10">
        {meta.draft && (
          <p className="mb-2 text-xs uppercase tracking-wide text-ink-faint">Draft, not published</p>
        )}
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">{meta.title}</h1>
        <p className="meta mt-3">
          <time dateTime={meta.date.toISOString()}>{formatDate(meta.date)}</time>
          {meta.updated && (
            <>
              {" "}· updated <time dateTime={meta.updated.toISOString()}>{formatDate(meta.updated)}</time>
            </>
          )}
          {meta.tags.length > 0 && <> · {meta.tags.join(", ")}</>}
        </p>
      </header>
      <div
        className="prose prose-lg max-w-none font-serif prose-headings:font-serif prose-pre:border prose-pre:border-line"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
