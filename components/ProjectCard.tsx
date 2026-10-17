import Link from "next/link";
import TypeLabel, { toneForLabel } from "./TypeLabel";
import { imageFor, type Project } from "@/lib/data";

// Large card for highlighted projects: image, summary and the first few CV points.
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="overflow-hidden">
        <img
          src={imageFor(project)}
          alt=""
          loading="lazy"
          className="aspect-[3/2] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <TypeLabel tone={toneForLabel(project.label)}>{project.label}</TypeLabel>
          <span className="meta">{project.date}</span>
        </div>
        <h3 className="mt-2 font-sans text-lg font-semibold leading-snug group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-ink-muted">{project.summary}</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed marker:text-ink-faint">
          {project.points.slice(0, 3).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

// Compact row for academic and other projects.
export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid grid-cols-[5.5rem_1fr] items-center gap-4 p-4 transition-colors hover:bg-paper sm:grid-cols-[7rem_1fr_auto]"
    >
      <img
        src={imageFor(project)}
        alt=""
        loading="lazy"
        className="aspect-[3/2] w-full rounded-lg border border-line object-cover"
      />
      <div className="min-w-0">
        <TypeLabel tone={toneForLabel(project.label)}>{project.label}</TypeLabel>
        <h3 className="mt-1 font-sans font-semibold leading-snug group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-0.5 text-sm text-ink-muted line-clamp-2">{project.summary}</p>
        <p className="meta mt-1 sm:hidden">{project.date}</p>
      </div>
      <p className="meta hidden whitespace-nowrap sm:block">{project.date}</p>
    </Link>
  );
}
