import Link from "next/link";
import InlineLinks from "@/components/InlineLinks";
import ResearchEntry from "@/components/ResearchEntry";
import PostList from "@/components/PostList";
import { intro, interests, motto, personalInfo, research } from "@/lib/data";
import { profileLinks } from "@/lib/links";
import { getAllPosts } from "@/lib/writing";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="grid gap-8 md:grid-cols-[1fr_13rem] md:items-start">
        <img
          src="/profile.jpeg"
          alt={`Portrait of ${personalInfo.name}`}
          className="w-36 h-36 md:w-52 md:h-52 rounded-full object-cover border border-line md:order-2"
        />
        <div className="md:order-1">
          <h1 className="text-3xl md:text-4xl font-semibold">{personalInfo.name}</h1>
          <p className="meta mt-1">{personalInfo.role}</p>
          <div className="mt-5 space-y-4 max-w-prose">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-faint">{motto}</p>
          <InlineLinks links={profileLinks()} className="mt-5" />
        </div>
      </section>

      <section>
        <h2 className="section-title">Selected research</h2>
        <div className="space-y-10">
          {research.map((project) => (
            <ResearchEntry key={project.slug} project={project} />
          ))}
        </div>
        <p className="mt-8">
          <Link href="/research" className="link">
            Publications, software and other projects →
          </Link>
        </p>
      </section>

      {posts.length > 0 && (
        <section>
          <h2 className="section-title">Recent writing</h2>
          <PostList posts={posts} />
          <p className="mt-8">
            <Link href="/writing" className="link">
              All writing →
            </Link>
          </p>
        </section>
      )}

      <section>
        <h2 className="section-title">Outside the lab</h2>
        <p className="max-w-prose">
          {interests.summary}{" "}
          <Link href="/about#interests" className="link">
            More about me
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
