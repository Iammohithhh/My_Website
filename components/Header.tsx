import Link from "next/link";
import NavLinks from "./NavLinks";
import { personalInfo } from "@/lib/data";
import { cvHref } from "@/lib/links";

export default function Header() {
  const items = [
    { name: "About", href: "/#about" },
    { name: "Research", href: "/#research" },
    { name: "Publications", href: "/#publications" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/#blog" },
    { name: "Hobbies", href: "/hobbies" },
  ];
  const cv = cvHref();
  if (cv) items.push({ name: "CV", href: cv });

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0 font-serif text-lg font-semibold text-ink hover:text-accent transition-colors">
          {personalInfo.name}
        </Link>
        <NavLinks items={items} />
      </div>
    </header>
  );
}
