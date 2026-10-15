import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InlineLinks from "@/components/InlineLinks";
import PublicationItem from "@/components/PublicationItem";
import { researchLinks } from "@/components/ResearchEntry";
import TypeLabel from "@/components/TypeLabel";
import { imageFor, publications, research } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return research.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = research.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2 marker:text-ink-faint">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function ResearchProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = research.find((p) => p.slug === slug);
  if (!project) notFound();

  const pub = publications.find((p) => p.id === project.publicationId);
  const links = researchLinks(project);

  return (
    <article className="mx-auto max-w-prose">
      <p className="text-sm">
        <Link href="/#research" className="link">
          ← Research
        </Link>
      </p>
      <div className="mt-5">
        <TypeLabel>{project.status}</TypeLabel>
      </div>
      <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{project.title}</h1>
      <p className="meta mt-2">
        {project.place} · with {project.advisor} · {project.period}
      </p>
      <InlineLinks links={links} className="mt-3" />

      <figure className="mt-8">
        <img
          src={imageFor(project)}
          alt={`Overview of ${project.title}`}
          className="w-full rounded-2xl border border-line shadow-card"
        />
        <figcaption className="meta mt-2 text-center">{project.imageCaption ?? "Schematic overview"}</figcaption>
      </figure>

      <p className="mt-8 text-lg">{project.summary}</p>

      <Section title="The problem">
        <p>{project.problem}</p>
      </Section>

      <Section title="What I did">
        <Bullets items={project.contribution} />
      </Section>

      {project.evidence.length > 0 && (
        <Section title="Results">
          <Bullets items={project.evidence} />
        </Section>
      )}

      {project.limitations.length > 0 && (
        <Section title="Limitations and open questions">
          <Bullets items={project.limitations} />
        </Section>
      )}

      {pub && (
        <Section title="Publication">
          <PublicationItem pub={pub} />
        </Section>
      )}

      <p className="meta mt-10">Methods: {project.methods.join(", ")}</p>
    </article>
  );
}
