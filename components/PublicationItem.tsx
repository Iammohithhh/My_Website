import InlineLinks from "./InlineLinks";
import TypeLabel from "./TypeLabel";
import { personalInfo, publicationLinks, type Publication } from "@/lib/data";

export default function PublicationItem({ pub, image }: { pub: Publication; image?: string }) {
  return (
    <div className={image ? "grid gap-4 sm:grid-cols-[9rem_1fr]" : ""}>
      {image && <img src={image} alt="" className="aspect-[3/2] w-full rounded-lg border border-line object-cover" />}
      <div>
        <TypeLabel>Journal article</TypeLabel>
        <p className="mt-2 font-medium text-ink">{pub.title}</p>
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
        <InlineLinks links={publicationLinks(pub)} className="mt-1.5 text-sm" />
      </div>
    </div>
  );
}
