import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NoteTypeLabel } from "@/components/NoteRow";
import { getAllNotes, getNote } from "@/lib/notes";
import { formatDate } from "@/lib/note-types";
import type { TocItem } from "@/lib/rehype-notes";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getAllNotes().find((n) => n.slug === slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    openGraph: {
      type: "article",
      title: note.title,
      description: note.summary,
      publishedTime: note.date,
      modifiedTime: note.updated,
    },
  };
}

function Toc({ items }: { items: TocItem[] }) {
  return (
    <ul className="space-y-1.5 text-sm">
      {items.map((item) => (
        <li key={item.id} className={item.depth === 3 ? "pl-3" : ""}>
          <a href={`#${item.id}`} className="text-ink-muted transition-colors hover:text-accent">
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();
  const { meta, html, toc, backlinks } = note;
  const showToc = toc.length >= 3;

  return (
    <div className={showToc ? "lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-12" : ""}>
      <article className="mx-auto max-w-prose">
        <p className="text-sm">
          <Link href="/notes" className="link">
            ← Notes
          </Link>
        </p>
        <header className="mb-10 mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <NoteTypeLabel type={meta.type} />
            {meta.draft && <span className="text-xs uppercase tracking-wide text-ink-faint">Draft, not published</span>}
          </div>
          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{meta.title}</h1>
          {meta.summary && <p className="mt-3 text-lg text-ink-muted">{meta.summary}</p>}
          <p className="meta mt-4">
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            {meta.updated && (
              <>
                {" "}· Last updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
              </>
            )}
            {meta.tags.length > 0 && <> · {meta.tags.join(", ")}</>}
          </p>
        </header>

        {showToc && (
          <details className="mb-8 rounded-xl border border-line bg-white px-4 py-3 lg:hidden">
            <summary className="cursor-pointer text-sm font-medium">On this page</summary>
            <div className="mt-3">
              <Toc items={toc} />
            </div>
          </details>
        )}

        <div
          className="prose prose-lg max-w-none font-serif prose-headings:scroll-mt-24 prose-headings:font-serif prose-pre:border prose-pre:border-line"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {backlinks.length > 0 && (
          <section className="mt-14 border-t border-line pt-6">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-widest text-ink-faint">Linked from</h2>
            <ul className="mt-3 space-y-2">
              {backlinks.map((b) => (
                <li key={b.slug}>
                  <Link href={`/notes/${b.slug}`} className="link">
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {showToc && (
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-ink-faint">On this page</p>
            <Toc items={toc} />
          </div>
        </aside>
      )}
    </div>
  );
}
