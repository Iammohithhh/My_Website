import Link from "next/link";
import NavLinks from "./NavLinks";
import { personalInfo } from "@/lib/data";

const ITEMS = [
  { name: "Home", href: "/" },
  { name: "Research", href: "/research" },
  { name: "Notes", href: "/notes" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0 font-serif text-lg font-semibold text-ink transition-colors hover:text-accent">
          {personalInfo.name}
        </Link>
        <NavLinks items={ITEMS} />
      </div>
    </header>
  );
}
