"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { name: string; href: string };

// Hobbies and Vibes are reached from About, so they highlight About.
function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href === "/about") return ["/about", "/hobbies", "/vibes"].some((p) => pathname.startsWith(p));
  return pathname.startsWith(href);
}

export default function NavLinks({ items }: { items: Item[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="-mx-1 min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex w-max gap-1 sm:ml-auto">
        {items.map((item) => {
          const active = isActive(item.href, pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-[0.9rem] transition-colors ${
                  active ? "bg-paper-dim font-medium text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
