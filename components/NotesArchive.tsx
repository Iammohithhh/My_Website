"use client";

import { useMemo, useState } from "react";
import NoteRow from "./NoteRow";
import { NOTE_TYPES, type NoteSummary, type NoteType } from "@/lib/note-types";

type Filter = "all" | NoteType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.entries(NOTE_TYPES) as [NoteType, string][]).map(([value, label]) => ({ value, label })),
];

export default function NotesArchive({ notes }: { notes: NoteSummary[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter(
      (note) =>
        (filter === "all" || note.type === filter) &&
        (!q || [note.title, note.summary, ...note.tags].some((field) => field.toLowerCase().includes(q)))
    );
  }, [notes, filter, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by type">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                filter === f.value ? "bg-ink text-paper" : "text-ink-muted hover:bg-paper-dim hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes"
          aria-label="Search notes"
          className="w-full rounded-full border border-line bg-white px-4 py-2 text-sm outline-none transition focus:border-ink-faint sm:w-64"
        />
      </div>

      {shown.length > 0 ? (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {shown.map((note) => (
            <li key={note.slug}>
              <NoteRow note={note} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-ink-muted">{notes.length === 0 ? "No notes yet." : "No notes match."}</p>
      )}
    </div>
  );
}
