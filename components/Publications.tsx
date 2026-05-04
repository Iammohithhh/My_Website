"use client";

import { motion } from "framer-motion";
import { FileText, ExternalLink, BookOpen, Users } from "lucide-react";
import { publications } from "@/lib/data";

export default function Publications() {
  if (!publications || publications.length === 0) return null;

  return (
    <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="tag-mono text-indigo/70 uppercase tracking-widest mb-2">Academic</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink">
            <span className="text-gradient">Publications</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-indigo to-science mx-auto mt-4" />
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PaperCard pub={pub} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaperCard({ pub }: { pub: typeof publications[0] }) {
  return (
    <div className="paper-card rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-indigo/8 transition-shadow duration-300">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-indigo via-science to-amber" />

      <div className="p-7">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Paper icon */}
          <div className="shrink-0">
            <div className="w-12 h-12 bg-indigo-pale rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-indigo" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="tag-mono text-xs bg-amber-pale text-amber-dark px-2.5 py-0.5 rounded-full border border-amber/20">
                arXiv:{pub.arxivId}
              </span>
              <span className="tag-mono text-xs bg-parchment-dark text-ink/50 px-2.5 py-0.5 rounded-full">
                {pub.venue} · {pub.year}
              </span>
              {pub.institute && (
                <span className="tag-mono text-xs text-ink/40">{pub.institute}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-ink leading-snug mb-2 group-hover:text-indigo transition-colors duration-200">
              {pub.title}
            </h3>

            {/* Authors */}
            <div className="flex items-center gap-1.5 mb-4">
              <Users className="w-3.5 h-3.5 text-ink/35" />
              <p className="text-sm text-ink/55 italic">{pub.authors}</p>
            </div>

            {/* Abstract */}
            <p className="text-sm text-ink/60 leading-relaxed mb-5 line-clamp-4">
              {pub.abstract}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {pub.tags.map((tag, i) => (
                <span key={i} className="tag-mono text-xs bg-parchment-dark text-ink/55 px-2 py-0.5 rounded border border-parchment-darker">
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-lg text-xs font-semibold hover:bg-indigo-dark transition-colors duration-200 shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                View on arXiv
              </a>
              <a
                href={pub.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-parchment-darker text-ink/70 rounded-lg text-xs font-semibold hover:border-indigo/40 hover:text-indigo transition-colors duration-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
