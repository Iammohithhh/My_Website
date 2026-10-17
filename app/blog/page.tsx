import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Research notes, tutorials and essays by Mohith H.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-prose">
      <h1 className="text-3xl font-semibold">Blog</h1>
      {posts.length > 0 ? (
        <>
          <p className="meta mt-2">
            Research notes, tutorials and essays.{" "}
            <a href="/blog/rss.xml" className="link">
              RSS feed
            </a>
          </p>
          <div className="mt-10">
            <PostList posts={posts} />
          </div>
        </>
      ) : (
        <p className="mt-4 text-ink-muted">No posts yet.</p>
      )}
    </div>
  );
}
