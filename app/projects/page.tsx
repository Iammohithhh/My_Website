import type { Metadata } from "next";
import ProjectCard, { ProjectRow } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software, course and personal projects by Mohith H.",
};

export default function ProjectsPage() {
  // Newest first; projects from the same year keep their order in lib/data.ts.
  const sorted = [...projects].sort((a, b) => b.year - a.year);
  const highlighted = sorted.filter((p) => p.highlight);
  const others = sorted.filter((p) => !p.highlight);

  return (
    <div className="space-y-14">
      <header className="max-w-prose">
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-3 text-lg text-ink-muted">Things I&apos;ve built, from scientific software to course projects.</p>
      </header>

      <section>
        <h2 className="mb-6 border-b border-line pb-3 font-serif text-2xl font-semibold">Highlighted projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {highlighted.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 border-b border-line pb-3 font-serif text-2xl font-semibold">Academic &amp; other projects</h2>
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
          {others.map((project) => (
            <li key={project.slug}>
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
