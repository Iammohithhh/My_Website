import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import InlineLinks from "@/components/InlineLinks";
import { about, experiences, interests } from "@/lib/data";
import { profileLinks } from "@/lib/links";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience and interests of Mohith H.",
};

export default function AboutPage() {
  return (
    <div className="space-y-14">
      <section className="max-w-prose">
        <h1 className="text-3xl font-semibold">About</h1>
        <div className="mt-5 space-y-4">
          {about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <InlineLinks links={profileLinks()} className="mt-5" />
      </section>

      <section className="max-w-prose">
        <h2 className="section-title">Education</h2>
        {about.education.map((item) => (
          <div key={item.degree}>
            <p className="font-medium">{item.degree}</p>
            <p className="meta">
              {item.institution} · {item.year}
            </p>
          </div>
        ))}
      </section>

      <section className="max-w-prose">
        <h2 className="section-title">Experience</h2>
        <ul className="space-y-6">
          {experiences.map((exp) => (
            <li key={exp.title + exp.organization}>
              <p className="font-medium">
                {exp.title}, {exp.organization}
              </p>
              <p className="meta">
                {exp.date}
                {exp.advisor && <> · with {exp.advisor}</>}
              </p>
              <p className="mt-1">
                {exp.description}
                {exp.link && (
                  <>
                    {" "}
                    <Link href={exp.link} className="link">
                      Details
                    </Link>
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-prose">
        <h2 className="section-title">Awards</h2>
        <ul className="list-disc pl-5 space-y-1 marker:text-ink-faint">
          {about.awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
        <h3 className="mt-6 mb-2 font-sans text-sm font-medium uppercase tracking-wide text-ink-faint">Before IIT</h3>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted marker:text-ink-faint">
          {about.earlierAchievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="interests" className="scroll-mt-8">
        <h2 className="section-title">Outside the lab</h2>
        <div className="space-y-8">
          {interests.items.map((item) => (
            <div key={item.title}>
              <h3 className="font-sans font-medium">{item.title}</h3>
              <p className="text-ink-muted max-w-prose">{item.description}</p>
              {item.images.length > 0 && <Gallery title={item.title} images={item.images} />}
            </div>
          ))}
          <div>
            <h3 className="font-sans font-medium">Music</h3>
            <p className="text-ink-muted">
              <Link href="/vibes" className="link">
                What I&apos;ve been listening to on Spotify
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
