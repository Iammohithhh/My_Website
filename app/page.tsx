import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NoteRow from "@/components/NoteRow";
import ProfileLinks from "@/components/ProfileLinks";
import { ResearchRow } from "@/components/ResearchEntry";
import { intro, interests, personalInfo, research, researchInterests } from "@/lib/data";
import { profileLinks } from "@/lib/links";
import { getAllNotes } from "@/lib/notes";

function HomeSection({
  title,
  more,
  children,
}: {
  title: string;
  more?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-2 flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <h2 className="font-serif text-2xl font-semibold">{title}</h2>
        {more && (
          <Link href={more.href} className="link text-sm">
            {more.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const notes = getAllNotes().slice(0, 3);
  const previewImages = [
    ...(interests.items.find((i) => i.icon === "sketch")?.images.slice(0, 2) ?? []),
    ...(interests.items.find((i) => i.icon === "camera")?.images.slice(0, 2) ?? []),
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-16">
      <section className="grid items-center gap-8 sm:grid-cols-[11rem_1fr] sm:gap-10">
        <img
          src="/profile.jpeg"
          alt={`Portrait of ${personalInfo.name}`}
          className="aspect-[4/5] w-36 rounded-3xl object-cover object-top shadow-card ring-1 ring-line sm:w-full"
        />
        <div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{personalInfo.name}</h1>
          <p className="mt-2 text-ink-muted">{personalInfo.role}</p>
          {intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="mt-5">
            <ProfileLinks />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-faint">{researchInterests.join(" · ")}</p>
        </div>
      </section>

      <HomeSection title="Research" more={{ label: "All research", href: "/research" }}>
        <ul className="divide-y divide-line">
          {research.map((project) => (
            <li key={project.slug}>
              <ResearchRow project={project} />
            </li>
          ))}
        </ul>
      </HomeSection>

      <HomeSection title="Recent notes" more={{ label: "All notes", href: "/notes" }}>
        {notes.length > 0 ? (
          <ul className="divide-y divide-line">
            {notes.map((note) => (
              <li key={note.slug}>
                <NoteRow note={note} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-5 text-ink-muted">No notes yet.</p>
        )}
      </HomeSection>

      <HomeSection title="Elsewhere">
        <Link
          href="/hobbies"
          className="group mt-5 grid items-center gap-5 rounded-2xl border border-line bg-white p-5 shadow-card transition hover:shadow-lift sm:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <h3 className="font-sans text-lg font-semibold">Hobbies</h3>
            <p className="mt-1 text-ink-muted">{interests.summary}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Sketches, sky photos and more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {previewImages.map((src) => (
              <img key={src} src={src} alt="" loading="lazy" className="aspect-[3/4] w-full rounded-lg object-cover" />
            ))}
          </div>
        </Link>
        <p className="mt-5 text-ink-muted">
          You can also find me on{" "}
          {profileLinks()
            .filter((link) => link.label !== "Email")
            .map((link, i, all) => (
              <span key={link.label}>
                <a href={link.href} className="link" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
                {i < all.length - 2 ? ", " : i === all.length - 2 ? " and " : ""}
              </span>
            ))}
          , or write to me at{" "}
          <a href={`mailto:${personalInfo.email}`} className="link">
            {personalInfo.email}
          </a>
          .
        </p>
      </HomeSection>
    </div>
  );
}
