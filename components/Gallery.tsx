"use client";

import { useEffect, useState } from "react";

// Thumbnail grid that opens a simple full-size viewer. Arrow keys move, Escape closes.
export default function Gallery({ title, images }: { title: string; images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-white shadow-card"
              aria-label={`Open ${title} ${i + 1} of ${images.length}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} ${open + 1} of ${images.length}`}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 bg-ink/85 flex flex-col items-center justify-center p-4"
        >
          <img
            src={images[open]}
            alt={`${title} ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-full rounded"
          />
          <div className="mt-4 flex items-center gap-6 text-paper text-sm" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen((open - 1 + images.length) % images.length)}>
              ← Previous
            </button>
            <span>
              {open + 1} / {images.length}
            </span>
            <button type="button" onClick={() => setOpen((open + 1) % images.length)}>
              Next →
            </button>
            <button type="button" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
