import InlineLinks from "./InlineLinks";
import { personalInfo, publicationLinks, type Publication } from "@/lib/data";

export default function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <div>
      <p className="font-medium text-ink">{pub.title}</p>
      <p className="meta mt-1">
        {pub.authors.map((author, i) => (
          <span key={author}>
            {i > 0 && ", "}
            {author === personalInfo.name ? <strong className="font-semibold text-ink">{author}</strong> : author}
          </span>
        ))}
      </p>
      <p className="meta">
        <em>{pub.venue}</em>
        {pub.details && `, ${pub.details}`} ({pub.year})
      </p>
      <InlineLinks links={publicationLinks(pub)} className="mt-1 text-sm" />
    </div>
  );
}
