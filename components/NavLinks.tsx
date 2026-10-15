"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { name: string; href: string };

// Highlights the homepage section currently on screen, or the page you're on.
function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, enabled]);

  return active;
}

export default function NavLinks({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [sectionIds] = useState(() => items.filter((i) => i.href.startsWith("/#")).map((i) => i.href.slice(2)));
  const activeSection = useActiveSection(sectionIds, onHome);

  return (
    <nav aria-label="Main" className="-mx-1 min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex w-max gap-1 sm:ml-auto">
        {items.map((item) => {
          const active = item.href.startsWith("/#")
            ? onHome && activeSection === item.href.slice(2)
            : pathname.startsWith(item.href) || (item.href === "/hobbies" && pathname.startsWith("/vibes"));
          const className = `block whitespace-nowrap rounded-full px-3 py-1.5 text-[0.9rem] transition-colors ${
            active ? "bg-accent-pale text-accent-dark font-medium" : "text-ink-muted hover:text-accent"
          }`;
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
