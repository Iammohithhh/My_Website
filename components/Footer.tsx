import { personalInfo } from "@/lib/data";
import { getAllPosts } from "@/lib/writing";

export default function Footer() {
  const hasPosts = getAllPosts().length > 0;

  return (
    <footer className="border-t border-line">
      <div className="max-w-page mx-auto px-4 sm:px-6 py-6 flex flex-wrap justify-between gap-3 text-sm text-ink-faint">
        <p>© {new Date().getFullYear()} {personalInfo.name}</p>
        <p className="flex flex-wrap gap-x-4">
          <a className="hover:text-accent" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          <a className="hover:text-accent" href={personalInfo.github}>GitHub</a>
          {hasPosts && <a className="hover:text-accent" href="/writing/rss.xml">RSS</a>}
        </p>
      </div>
    </footer>
  );
}
