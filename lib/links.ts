import fs from "node:fs";
import path from "node:path";
import { personalInfo } from "./data";

// The CV link only appears once the PDF actually exists in public/.
export function cvHref(): string | null {
  const file = path.join(process.cwd(), "public", personalInfo.cv.replace(/^\//, ""));
  return fs.existsSync(file) ? personalInfo.cv : null;
}

export function profileLinks() {
  const links: { label: string; href: string }[] = [
    { label: "Email", href: `mailto:${personalInfo.email}` },
  ];
  const cv = cvHref();
  if (cv) links.push({ label: "CV", href: cv });
  if (personalInfo.scholar) links.push({ label: "Google Scholar", href: personalInfo.scholar });
  links.push({ label: "GitHub", href: personalInfo.github });
  links.push({ label: "LinkedIn", href: personalInfo.linkedin });
  return links;
}
