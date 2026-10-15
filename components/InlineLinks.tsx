// A row of plain text links separated by middots, e.g. "Paper · arXiv · Code".
export default function InlineLinks({
  links,
  className = "",
}: {
  links: { label: string; href: string }[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-y-1 ${className}`}>
      {links.map((link, i) => {
        const external = /^https?:/.test(link.href);
        return (
          <li key={link.href} className="flex items-baseline">
            {i > 0 && <span aria-hidden className="mx-2 text-ink-faint">·</span>}
            <a
              href={link.href}
              className="link"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
