import Link from "next/link";
import InlineLinks from "./InlineLinks";
import TypeLabel from "./TypeLabel";
import { imageFor, publications, publicationLinks, type ResearchProject } from "@/lib/data";

export function researchLinks(project: ResearchProject) {
  const pub = publications.find((p) => p.id === project.publicationId);
  return [...(pub ? publicationLinks(pub) : []), ...project.links];
}

// Compact row for the homepage: small picture, status, title and one-line summary.
export function ResearchRow({ project }: { project: ResearchProject }) {
  return (
    <Link
      href={`/research/${project.slug}`}
      className="group grid grid-cols-[6rem_1fr] items-start gap-4 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
    >
      <img src={imageFor(project)} alt="" className="aspect-[3/2] w-full rounded-lg border border-line object-cover" />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <TypeLabel>{project.status}</TypeLabel>
        </div>
        <h3 className="mt-1.5 font-sans text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-1 text-ink-muted line-clamp-2">{project.summary}</p>
      </div>
    </Link>
  );
}

// Research card: picture on the left, summary on the right (stacked on phones).
export default function ResearchEntry({ project }: { project: ResearchProject }) {
  const href = `/research/${project.slug}`;

  return (
    <article className="group grid gap-5 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:shadow-lift sm:grid-cols-[15rem_1fr] sm:p-5">
      <Link href={href} className="block self-start overflow-hidden rounded-xl" tabIndex={-1} aria-hidden>
        <img
          src={imageFor(project)}
          alt=""
          className="aspect-[3/2] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <TypeLabel>{project.status}</TypeLabel>
          <span className="meta">{project.period}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold leading-snug">
          <Link href={href} className="hover:text-accent transition-colors">
            {project.title}
          </Link>
        </h3>
        <p className="meta mt-1">
          {project.place} · with {project.advisor}
        </p>
        <p className="mt-3 text-ink">{project.summary}</p>
        <InlineLinks links={[{ label: "Read more", href }, ...researchLinks(project)]} className="mt-3 text-sm" />
      </div>
    </article>
  );
}
