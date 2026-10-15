import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InlineLinks from "@/components/InlineLinks";
import TypeLabel, { toneForLabel } from "@/components/TypeLabel";
import { imageFor, projects } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

function isVideoFile(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-prose">
      <p className="text-sm">
        <Link href="/#projects" className="link">
          ← Projects
        </Link>
      </p>
      <div className="mt-5">
        <TypeLabel tone={toneForLabel(project.label)}>{project.label}</TypeLabel>
      </div>
      <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{project.title}</h1>
      <p className="meta mt-2">
        {project.context} · {project.date}
      </p>
      <InlineLinks links={project.links} className="mt-3" />

      <img
        src={imageFor(project)}
        alt={`Overview of ${project.title}`}
        className="mt-8 w-full rounded-2xl border border-line shadow-card"
      />

      <p className="mt-8 text-lg">{project.summary}</p>
      <ul className="mt-6 list-disc pl-5 space-y-2 marker:text-ink-faint">
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p className="meta mt-6">Methods: {project.methods.join(", ")}</p>

      {project.images.map((src, i) => (
        <img key={src} src={src} alt={`${project.title}, image ${i + 1}`} className="mt-8 w-full rounded border border-line" />
      ))}

      {project.videos.map((src) =>
        isVideoFile(src) ? (
          <video key={src} controls preload="metadata" className="mt-8 w-full rounded">
            <source src={src} />
          </video>
        ) : (
          <div key={src} className="mt-8 aspect-video">
            <iframe
              src={src}
              title={project.title}
              className="w-full h-full rounded"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      )}

      {project.pdfs.length > 0 && (
        <InlineLinks
          links={project.pdfs.map((src, i) => ({ label: `Document ${i + 1} (PDF)`, href: src }))}
          className="mt-8"
        />
      )}
    </article>
  );
}
