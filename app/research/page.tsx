import type { Metadata } from "next";
import PublicationItem from "@/components/PublicationItem";
import ResearchEntry from "@/components/ResearchEntry";
import { imageFor, publications, research } from "@/lib/data";

export const metadata: Metadata = {
  title: "Research",
  description: "Research and publications by Mohith H.",
};

export default function ResearchPage() {
  const sortedPubs = [...publications].sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-16">
      <header className="max-w-prose">
        <h1 className="text-4xl font-semibold tracking-tight">Research</h1>
        <p className="mt-3 text-lg text-ink-muted">
          Machine learning interatomic potentials, long-range electrostatics and differentiable scientific computing.
        </p>
      </header>

      <section>
        <div className="space-y-6">
          {research.map((project) => (
            <ResearchEntry key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 border-b border-line pb-3 font-serif text-2xl font-semibold">Publications</h2>
        <ol className="space-y-8">
          {sortedPubs.map((pub) => {
            const project = research.find((r) => r.publicationId === pub.id);
            return (
              <li key={pub.id}>
                <PublicationItem pub={pub} image={project ? imageFor(project) : undefined} />
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
