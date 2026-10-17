import Link from "next/link";
import { ArrowRight, GraduationCap, Trophy } from "lucide-react";
import ProfileLinks from "@/components/ProfileLinks";
import ResearchEntry from "@/components/ResearchEntry";
import ProjectCard, { ProjectRow } from "@/components/ProjectCard";
import PublicationItem from "@/components/PublicationItem";
import PostList from "@/components/PostList";
import Section from "@/components/Section";
import {
  about,
  experiences,
  imageFor,
  interests,
  intro,
  news,
  personalInfo,
  projects,
  publications,
  research,
  researchInterests,
} from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

function groupByYear<T extends { year: number }>(items: T[]) {
  const years = [...new Set(items.map((i) => i.year))].sort((a, b) => b - a);
  return years.map((year) => ({ year, items: items.filter((i) => i.year === year) }));
}

function YearLabel({ year }: { year: number }) {
  return <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-ink-faint">{year}</h3>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-ink-faint">{children}</h3>;
}

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  // Newest first; projects from the same year keep their order in lib/data.ts.
  const sortedProjects = [...projects].sort((a, b) => b.year - a.year);
  const highlighted = sortedProjects.filter((p) => p.highlight);
  const otherProjects = sortedProjects.filter((p) => !p.highlight);
  const previewImages = [
    ...(interests.items.find((i) => i.icon === "sketch")?.images.slice(0, 2) ?? []),
    ...(interests.items.find((i) => i.icon === "camera")?.images.slice(0, 2) ?? []),
  ];

  return (
    <div className="space-y-20">
      {/* Intro */}
      <section id="about" className="relative scroll-mt-24">
        <div aria-hidden className="pointer-events-none absolute -top-16 left-1/3 -z-10 h-72 w-72 rounded-full bg-accent-pale blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute top-24 -right-10 -z-10 h-56 w-56 rounded-full bg-iris-pale blur-3xl" />

        <div className="grid items-start gap-8 md:grid-cols-[16rem_1fr] md:gap-12">
          <img
            src="/profile.jpeg"
            alt={`Portrait of ${personalInfo.name}`}
            className="aspect-[4/5] w-48 rounded-3xl object-cover object-top shadow-lift ring-1 ring-line sm:w-56 md:w-full"
          />
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1 text-sm text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              {personalInfo.role}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{personalInfo.name}</h1>
            <div className="mt-5 max-w-prose space-y-4">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6">
              <ProfileLinks />
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">Research interests</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {researchInterests.map((topic) => (
                  <li key={topic} className="rounded-full bg-accent-pale px-3 py-1 text-sm text-accent-dark">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Section id="news" title="News">
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
          {news.map((item) => (
            <li key={item.text} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[6rem_1fr] sm:gap-4">
              <span className="text-sm font-medium tabular-nums text-accent">{item.date}</span>
              <span>
                {item.href ? (
                  <a href={item.href} className="hover:text-accent transition-colors">
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="research" title="Research">
        <div className="space-y-6">
          {research.map((project) => (
            <ResearchEntry key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section id="publications" title="Publications">
        <div className="space-y-8">
          {groupByYear(publications).map(({ year, items }) => (
            <div key={year}>
              <YearLabel year={year} />
              <ol className="space-y-6">
                {items.map((pub) => {
                  const project = research.find((r) => r.publicationId === pub.id);
                  return (
                    <li key={pub.id}>
                      <PublicationItem pub={pub} image={project ? imageFor(project) : undefined} />
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience">
        <ol className="relative ml-1.5 border-l border-line">
          {experiences.map((exp) => (
            <li key={exp.title + exp.organization} className="relative pb-8 pl-7 last:pb-0">
              <span aria-hidden className="absolute -left-[6px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-paper" />
              <p className="text-sm tabular-nums text-ink-faint">{exp.date}</p>
              <p className="mt-0.5 font-semibold">
                {exp.title} <span className="font-normal text-ink-muted">· {exp.organization}</span>
              </p>
              {exp.advisor && <p className="meta">with {exp.advisor}</p>}
              <p className="mt-1 max-w-prose">
                {exp.description}
                {exp.link && (
                  <>
                    {" "}
                    <Link href={exp.link} className="link">
                      More
                    </Link>
                  </>
                )}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="projects" title="Projects">
        <div className="space-y-12">
          <div>
            <SubHeading>Highlighted projects</SubHeading>
            <div className="grid gap-6 md:grid-cols-2">
              {highlighted.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
          <div>
            <SubHeading>Academic &amp; other projects</SubHeading>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
              {otherProjects.map((project) => (
                <li key={project.slug}>
                  <ProjectRow project={project} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="blog"
        title="Blog"
        action={
          posts.length > 0 && (
            <Link href="/blog" className="link text-sm">
              All posts
            </Link>
          )
        }
      >
        {posts.length > 0 ? <PostList posts={posts} /> : <p className="text-ink-muted">No posts yet.</p>}
      </Section>

      <Section id="education" title="Education & awards">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <GraduationCap className="h-6 w-6 text-accent" aria-hidden />
            {about.education.map((item) => (
              <div key={item.degree} className="mt-3">
                <p className="font-semibold">{item.institution}</p>
                <p className="mt-0.5">{item.degree}</p>
                <p className="meta mt-1">{item.year}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <Trophy className="h-6 w-6 text-ochre" aria-hidden />
            <ul className="mt-3 space-y-2">
              {[...about.awards, ...about.earlierAchievements].map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Link
        href="/hobbies"
        className="group grid items-center gap-6 rounded-3xl border border-line bg-white p-5 shadow-card transition hover:shadow-lift md:grid-cols-[1fr_1.1fr] md:p-7"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">Beyond research</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">Sketches, skies, quizzes and music</h2>
          <p className="mt-2 text-ink-muted">{interests.summary}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-accent">
            See my hobbies <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {previewImages.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" className="aspect-[3/4] w-full rounded-xl object-cover" />
          ))}
        </div>
      </Link>
    </div>
  );
}
