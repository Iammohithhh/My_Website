import type { Metadata } from "next";
import Link from "next/link";
import PublicationItem from "@/components/PublicationItem";
import ResearchEntry from "@/components/ResearchEntry";
import { projects, publications, research, type Project } from "@/lib/data";

export const metadata: Metadata = {
  title: "Research",
  description: "Publications, research projects and software by Mohith H.",
};

function ProjectList({ items }: { items: Project[] }) {
  return (
    <ul className="space-y-5">
      {items.map((project) => (
        <li key={project.slug}>
          <Link href={`/projects/${project.slug}`} className="font-medium hover:text-accent transition-colors">
            {project.title}
          </Link>
          <p className="meta">
            {project.context} · {project.date}
          </p>
          <p className="mt-0.5 text-ink-muted">{project.summary}</p>
        </li>
      ))}
    </ul>
  );
}

export default function ResearchPage() {
  const sortedPubs = [...publications].sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-16">
      <h1 className="text-3xl font-semibold">Research</h1>

      <section>
        <h2 className="section-title">Publications</h2>
        <ol className="space-y-6">
          {sortedPubs.map((pub) => (
            <li key={pub.id}>
              <PublicationItem pub={pub} />
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="section-title">Research projects</h2>
        <div className="space-y-10">
          {research.map((project) => (
            <ResearchEntry key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Software</h2>
        <ProjectList items={projects.filter((p) => p.kind === "software")} />
      </section>

      <section>
        <h2 className="section-title">Other projects</h2>
        <ProjectList items={projects.filter((p) => p.kind === "coursework")} />
      </section>
    </div>
  );
}
