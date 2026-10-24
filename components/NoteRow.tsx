import Link from "next/link";
import TypeLabel, { type Tone } from "./TypeLabel";
import { NOTE_TYPES, formatDate, type NoteSummary, type NoteType } from "@/lib/note-types";

const TONE: Record<NoteType, Tone> = { technical: "research", reading: "software", thoughts: "course" };

export function NoteTypeLabel({ type }: { type?: NoteType }) {
  if (!type) return null;
  return <TypeLabel tone={TONE[type]}>{NOTE_TYPES[type]}</TypeLabel>;
}

// One note in a list: date on the left, type, title and summary on the right.
export default function NoteRow({ note }: { note: NoteSummary }) {
  return (
    <Link href={`/notes/${note.slug}`} className="group grid gap-1 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
      <time dateTime={note.date} className="pt-0.5 text-sm tabular-nums text-ink-faint">
        {formatDate(note.date, "month")}
      </time>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <NoteTypeLabel type={note.type} />
          {note.draft && <span className="text-xs uppercase tracking-wide text-ink-faint">Draft</span>}
        </div>
        <h3 className="mt-1.5 font-sans text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
          {note.title}
        </h3>
        {note.summary && <p className="mt-1 text-ink-muted">{note.summary}</p>}
      </div>
    </Link>
  );
}
