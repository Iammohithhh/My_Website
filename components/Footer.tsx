import { personalInfo } from "@/lib/data";
import { getAllNotes } from "@/lib/notes";

export default function Footer() {
  const hasNotes = getAllNotes().some((note) => !note.draft);

  return (
    <footer className="border-t border-line">
      <div className="max-w-page mx-auto px-4 sm:px-6 py-6 flex flex-wrap justify-between gap-3 text-sm text-ink-faint">
        <p>© {new Date().getFullYear()} {personalInfo.name}</p>
        <p className="flex flex-wrap gap-x-4">
          <a className="hover:text-accent" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          <a className="hover:text-accent" href={personalInfo.github}>GitHub</a>
          {hasNotes && <a className="hover:text-accent" href="/notes/rss.xml">RSS</a>}
        </p>
      </div>
    </footer>
  );
}
