import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Trophy } from "lucide-react";
import ProfileLinks from "@/components/ProfileLinks";
import { about, experiences, interests, news } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience and interests of Mohith H.",
};

function AboutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-6 border-b border-line pb-3 font-serif text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-14">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight">About</h1>
        <div className="mt-5 space-y-4 text-lg leading-relaxed">
          {about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6">
          <ProfileLinks />
        </div>
      </header>

      <AboutSection title="Experience">
        <ol className="relative ml-1.5 border-l border-line">
          {experiences.map((exp) => (
            <li key={exp.title + exp.organization} className="relative pb-8 pl-7 last:pb-0">
              <span aria-hidden className="absolute -left-[6px] top-2 h-3 w-3 rounded-full bg-ink-faint ring-4 ring-paper" />
              <p className="text-sm tabular-nums text-ink-faint">{exp.date}</p>
              <p className="mt-0.5 font-semibold">
                {exp.title} <span className="font-normal text-ink-muted">· {exp.organization}</span>
              </p>
              {exp.advisor && <p className="meta">with {exp.advisor}</p>}
              <p className="mt-1">
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
      </AboutSection>

      <AboutSection title="Education & awards">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <GraduationCap className="h-6 w-6 text-ink-muted" aria-hidden />
            {about.education.map((item) => (
              <div key={item.degree} className="mt-3">
                <p className="font-semibold">{item.institution}</p>
                <p className="mt-0.5">{item.degree}</p>
                <p className="meta mt-1">{item.year}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <Trophy className="h-6 w-6 text-ink-muted" aria-hidden />
            <ul className="mt-3 space-y-2">
              {[...about.awards, ...about.earlierAchievements].map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>
        </div>
      </AboutSection>

      <AboutSection title="News">
        <ul className="divide-y divide-line">
          {news.map((item) => (
            <li key={item.text} className="grid gap-1 py-3 sm:grid-cols-[6rem_1fr] sm:gap-4">
              <span className="text-sm tabular-nums text-ink-faint">{item.date}</span>
              <span>
                {item.href ? (
                  <a href={item.href} className="transition-colors hover:text-accent">
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </span>
            </li>
          ))}
        </ul>
      </AboutSection>

      <AboutSection title="Outside research">
        <p className="text-ink-muted">{interests.summary}</p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/hobbies" className="link inline-flex items-center gap-1">
            Hobbies: sketches, sky photos and more <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/vibes" className="link inline-flex items-center gap-1">
            What I&apos;m listening to <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </AboutSection>
    </div>
  );
}
