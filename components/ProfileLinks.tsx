import { FileText, Github, GraduationCap, Linkedin, Mail } from "lucide-react";
import { profileLinks } from "@/lib/links";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Email: Mail,
  CV: FileText,
  "Google Scholar": GraduationCap,
  GitHub: Github,
  LinkedIn: Linkedin,
};

// Icon buttons for email, CV, Scholar, GitHub and LinkedIn.
export default function ProfileLinks() {
  return (
    <ul className="flex flex-wrap gap-2">
      {profileLinks().map((link) => {
        const Icon = ICONS[link.label];
        const external = /^https?:/.test(link.href);
        return (
          <li key={link.label}>
            <a
              href={link.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-ink transition hover:border-accent hover:text-accent hover:shadow-card"
            >
              {Icon && <Icon className="h-4 w-4" aria-hidden />}
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
