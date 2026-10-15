import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Camera, HandHeart, Headphones, Music, Pencil, Sparkles } from "lucide-react";
import Gallery from "@/components/Gallery";
import { interests, type InterestIcon } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hobbies",
  description: "Sketches, sky photographs, quizzing, dance and music — Mohith H outside research.",
};

const ICONS: Record<InterestIcon, React.ComponentType<{ className?: string }>> = {
  quiz: Brain,
  dance: Sparkles,
  volunteer: HandHeart,
  sketch: Pencil,
  camera: Camera,
  music: Music,
};

export default function HobbiesPage() {
  const galleries = interests.items.filter((item) => item.images.length > 0);
  const others = interests.items.filter((item) => item.images.length === 0);

  return (
    <div className="space-y-16">
      <header className="max-w-prose">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">Beyond research</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Hobbies</h1>
        <p className="mt-3 text-lg text-ink-muted">{interests.summary}</p>
      </header>

      {galleries.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <section key={item.title} id={item.icon} className="scroll-mt-24">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ochre-pale text-ochre">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-serif text-2xl font-semibold">{item.title}</h2>
                <p className="text-sm text-ink-muted">{item.description}</p>
              </div>
            </div>
            <Gallery title={item.title} images={item.images} />
          </section>
        );
      })}

      <section>
        <h2 className="mb-5 font-serif text-2xl font-semibold">Also</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div key={item.title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-iris-pale text-iris">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-sans font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            );
          })}
          <Link
            href="/vibes"
            className="group rounded-2xl border border-line bg-white p-5 shadow-card transition hover:shadow-lift"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-pale text-accent">
              <Headphones className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-3 font-sans font-semibold">Music</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">What I&apos;ve been listening to on Spotify.</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
