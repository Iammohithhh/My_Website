"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ items }: { items: { name: string; href: string }[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem]">
        {items.map((item) => {
          const active = item.href !== "/" && pathname.startsWith(item.href);
          const className = active
            ? "text-accent font-medium"
            : "text-ink-muted hover:text-accent transition-colors";
          return (
            <li key={item.href}>
              {item.href.endsWith(".pdf") ? (
                <a href={item.href} className={className}>
                  {item.name}
                </a>
              ) : (
                <Link href={item.href} aria-current={active ? "page" : undefined} className={className}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
