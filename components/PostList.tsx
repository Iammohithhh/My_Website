import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="text-lg font-medium hover:text-accent transition-colors">
            {post.title}
          </Link>
          {post.draft && <span className="ml-2 text-xs uppercase tracking-wide text-ink-faint">Draft</span>}
          <p className="meta mt-0.5">
            <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
            {post.tags.length > 0 && <> · {post.tags.join(", ")}</>}
          </p>
          <p className="mt-1 text-ink">{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
