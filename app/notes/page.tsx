import type { Metadata } from "next";
import NotesArchive from "@/components/NotesArchive";
import { getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Things Mohith H is learning, figuring out, building, and occasionally changing his mind about.",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight">Notes</h1>
      <p className="mt-3 text-lg text-ink-muted">
        Things I&apos;m learning, figuring out, building, and occasionally changing my mind about.
      </p>
      <div className="mt-10">
        <NotesArchive notes={notes} />
      </div>
      {notes.length > 0 && (
        <p className="mt-8 text-sm">
          <a href="/notes/rss.xml" className="link">
            RSS feed
          </a>
        </p>
      )}
    </div>
  );
}
