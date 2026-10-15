// A homepage section with an anchor id the header links to.
export default function Section({
  id,
  title,
  action,
  children,
}: {
  id: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-7 flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <h2 className="font-serif text-2xl md:text-[1.7rem] font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
