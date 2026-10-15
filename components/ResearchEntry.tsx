import Link from "next/link";
import InlineLinks from "./InlineLinks";
import { publications, publicationLinks, type ResearchProject } from "@/lib/data";

export function researchLinks(project: ResearchProject) {
  const pub = publications.find((p) => p.id === project.publicationId);
  return [...(pub ? publicationLinks(pub) : []), ...project.links];
}

// Compact research summary used on the homepage and the Research page.
export default function ResearchEntry({ project }: { project: ResearchProject }) {
  const href = `/research/${project.slug}`;

  return (
    <article className="grid gap-5 sm:grid-cols-[11rem_1fr]">
      {project.figure && (
        <Link href={href} className="block self-start">
          <img
            src={project.figure.src}
            alt={project.figure.alt}
            className="w-full rounded border border-line bg-white"
          />
        </Link>
      )}
      <div className={project.figure ? "" : "sm:col-span-2"}>
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={href} className="hover:text-accent transition-colors">
            {project.title}
          </Link>
        </h3>
        <p className="meta mt-1">
          {project.place} · {project.status}
        </p>
        <p className="mt-2 text-ink">{project.summary}</p>
        <InlineLinks
          links={[{ label: "Details", href }, ...researchLinks(project)]}
          className="mt-2 text-sm"
        />
      </div>
    </article>
  );
}
