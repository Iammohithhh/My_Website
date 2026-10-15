import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Research notes, tutorials and essays by Mohith H.",
};

export default function WritingPage() {
  const posts = getAllPosts();
  if (posts.length === 0) notFound();

  return (
    <div className="max-w-prose">
      <h1 className="text-3xl font-semibold">Writing</h1>
      <p className="meta mt-2">
        Research notes, tutorials and essays.{" "}
        <a href="/writing/rss.xml" className="link">
          RSS feed
        </a>
      </p>
      <div className="mt-10">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
