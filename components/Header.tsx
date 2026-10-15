import Link from "next/link";
import NavLinks from "./NavLinks";
import { personalInfo } from "@/lib/data";
import { getAllPosts } from "@/lib/writing";
import { cvHref } from "@/lib/links";

export default function Header() {
  const items = [{ name: "Research", href: "/research" }];
  // Writing only appears in the menu once there is at least one published post.
  if (getAllPosts().length > 0) items.push({ name: "Writing", href: "/writing" });
  items.push({ name: "About", href: "/about" });
  const cv = cvHref();
  if (cv) items.push({ name: "CV", href: cv });

  return (
    <header className="border-b border-line">
      <div className="max-w-page mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <Link href="/" className="font-serif text-xl font-semibold text-ink hover:text-accent transition-colors">
          {personalInfo.name}
        </Link>
        <NavLinks items={items} />
      </div>
    </header>
  );
}
