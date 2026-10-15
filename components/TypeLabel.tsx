// Small coloured label naming what kind of work an item is (paper, thesis, course project...).
const TONES = {
  research: "bg-accent-pale text-accent-dark",
  software: "bg-iris-pale text-iris",
  course: "bg-ochre-pale text-ochre",
} as const;

export type Tone = keyof typeof TONES;

export function toneForLabel(label: string): Tone {
  if (label === "Internship" || label === "Self project") return "software";
  if (label.endsWith("project")) return "course";
  return "research";
}

export default function TypeLabel({ children, tone = "research" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide ${TONES[tone]}`}>
      {children}
    </span>
  );
}
