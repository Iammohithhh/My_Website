// Shared by server code and the client-side notes archive (no Node imports here).

export const NOTE_TYPES = {
  technical: "Technical",
  reading: "Reading",
  thoughts: "Thoughts",
} as const;

export type NoteType = keyof typeof NOTE_TYPES;

export interface NoteSummary {
  slug: string;
  title: string;
  summary: string;
  // ISO date strings, so they can be passed to client components.
  date: string;
  updated?: string;
  type?: NoteType;
  tags: string[];
  draft: boolean;
}

export function formatDate(iso: string, style: "long" | "month" = "long") {
  // en-GB gives "25 October 2026"; en-US gives "Sep 2026" rather than "Sept 2026".
  return new Date(iso).toLocaleDateString(style === "long" ? "en-GB" : "en-US", {
    ...(style === "long" ? { day: "numeric" } : {}),
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
