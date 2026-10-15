import Link from "next/link";
import TypeLabel, { toneForLabel } from "./TypeLabel";
import { imageFor, type Project } from "@/lib/data";

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
      <div className="flex flex-1 flex-col p-4">
        <TypeLabel tone={toneForLabel(project.label)}>{project.label}</TypeLabel>
        <h3 className="mt-2 font-sans text-[1.02rem] font-semibold leading-snug group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted line-clamp-3">{project.summary}</p>
      </div>
    </Link>
  );
}
