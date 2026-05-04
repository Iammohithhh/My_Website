"use client";

import { motion } from "framer-motion";
import { Microscope, Wrench, BookOpen, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { useState } from "react";
import Link from "next/link";

const researchProjects = projects.filter((p) => p.type === "research");
const personalProjects = projects.filter((p) => p.type === "personal");
const courseworkProjects = projects.filter((p) => p.type === "coursework");

const cwCategories = ["All", ...Array.from(new Set(courseworkProjects.map((p) => p.category)))];

export default function Projects() {
  const [cwFilter, setCwFilter] = useState("All");

  const filteredCW = cwFilter === "All"
    ? courseworkProjects
    : courseworkProjects.filter((p) => p.category === cwFilter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 section-alt">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="tag-mono text-indigo/70 uppercase tracking-widest mb-2">Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink">
            Projects & <span className="text-gradient">Research</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-indigo to-science mx-auto mt-4" />
        </motion.div>

        {/* ── 1. Research Track ── */}
        <TrackSection
          icon={<Microscope className="w-4 h-4" />}
          label="Research"
          color="text-indigo"
          badge="bg-indigo-pale text-indigo border border-indigo/20"
          description="Ongoing research work at IIT Bombay and NTU Singapore."
        >
          <div className="grid md:grid-cols-2 gap-6">
            {researchProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <ResearchCard project={project} />
                </Link>
              </motion.div>
            ))}
          </div>
        </TrackSection>

        {/* ── 2. Personal Projects ── */}
        <TrackSection
          icon={<Wrench className="w-4 h-4" />}
          label="Personal Projects"
          color="text-rust"
          badge="bg-rust-pale text-rust border border-rust/20"
          description="Things I built because they seemed too interesting not to."
        >
          <div className="grid md:grid-cols-2 gap-6">
            {personalProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <PersonalCard project={project} />
                </Link>
              </motion.div>
            ))}
          </div>
        </TrackSection>

        {/* ── 3. Course Work ── */}
        <TrackSection
          icon={<BookOpen className="w-4 h-4" />}
          label="Course Work & Labs"
          color="text-science-dark"
          badge="bg-science-pale text-science-dark border border-science/20"
          description="Course projects and explorations from IIT Bombay."
        >
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {cwCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCwFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tag-mono transition-all duration-200 ${
                  cwFilter === cat
                    ? "bg-science-dark text-white shadow-sm"
                    : "bg-white border border-parchment-darker text-ink/60 hover:border-science/40 hover:text-science-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCW.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <CourseCard project={project} />
                </Link>
              </motion.div>
            ))}
          </div>
        </TrackSection>

      </div>
    </section>
  );
}

/* ── Track section wrapper ── */
function TrackSection({ icon, label, color, badge, description, children }: {
  icon: React.ReactNode; label: string; color: string; badge: string;
  description: string; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className={`p-1.5 rounded-md bg-parchment-darker ${color}`}>{icon}</span>
        <div>
          <span className={`text-xs font-bold tag-mono px-2.5 py-0.5 rounded-full ${badge}`}>{label}</span>
          <p className="text-ink/45 text-xs mt-1">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Research card: paper/journal style ── */
function ResearchCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="paper-card p-6 rounded-xl h-full flex flex-col gap-4 cursor-pointer group hover:shadow-lg hover:shadow-indigo/8 transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="tag-mono text-xs bg-indigo-pale text-indigo px-2.5 py-0.5 rounded-full">Research</span>
          {(project as any).institute && (
            <span className="tag-mono text-xs text-ink/40">{(project as any).institute}</span>
          )}
        </div>
        {(project as any).arxiv && (
          <a
            href={`https://arxiv.org/abs/${(project as any).arxiv}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 tag-mono text-xs bg-amber-pale text-amber-dark px-2.5 py-0.5 rounded-full border border-amber/20 hover:bg-amber/10 transition-colors flex items-center gap-1"
          >
            arXiv <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <div>
        <h3 className="font-bold text-ink text-base leading-snug group-hover:text-indigo transition-colors duration-200 mb-2">
          {project.title}
        </h3>
        <p className="text-ink/55 text-sm leading-relaxed">{project.description}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t, i) => (
          <span key={i} className="tag-mono text-xs bg-parchment-dark text-ink/60 px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="tag-mono text-xs text-ink/35 px-1">+{project.tech.length - 4}</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-parchment-darker">
        <span className="tag-mono text-xs text-ink/40">{project.date}</span>
        <span className="text-indigo opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1">
          View details <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}

/* ── Personal project card: richer, feature-forward ── */
function PersonalCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="paper-card p-6 rounded-xl h-full flex flex-col gap-4 cursor-pointer group hover:shadow-lg hover:shadow-rust/8 transition-shadow duration-300 border-l-4 border-l-rust/30 hover:border-l-rust"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="tag-mono text-xs bg-rust-pale text-rust px-2.5 py-0.5 rounded-full border border-rust/20">Personal</span>
        <span className="tag-mono text-xs text-ink/35">{project.date}</span>
      </div>

      <div>
        <h3 className="font-bold text-ink text-lg leading-snug group-hover:text-rust transition-colors duration-200 mb-2">
          {project.title}
        </h3>
        <p className="text-ink/55 text-sm leading-relaxed">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((t, i) => (
          <span key={i} className="tag-mono text-xs bg-parchment-dark text-ink/60 px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="tag-mono text-xs text-ink/35 px-1">+{project.tech.length - 5}</span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-end pt-2 border-t border-parchment-darker">
        <span className="text-rust opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1 font-medium">
          View project <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}

/* ── Course work card: compact ── */
function CourseCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="paper-card p-5 rounded-xl h-full flex flex-col gap-3 cursor-pointer group hover:shadow-md hover:shadow-science/8 transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        <span className="tag-mono text-xs bg-science-pale text-science-dark px-2 py-0.5 rounded-full border border-science/20">
          {project.category}
        </span>
        <span className="tag-mono text-xs text-ink/35">{project.date}</span>
      </div>

      <h3 className="font-semibold text-ink text-sm leading-snug group-hover:text-science-dark transition-colors duration-200">
        {project.title}
      </h3>

      <p className="text-ink/50 text-xs leading-relaxed flex-1 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1">
        {project.tech.slice(0, 3).map((t, i) => (
          <span key={i} className="tag-mono text-xs bg-parchment-dark text-ink/50 px-1.5 py-0.5 rounded">
            {t}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="tag-mono text-xs text-ink/30">+{project.tech.length - 3}</span>
        )}
      </div>
    </motion.div>
  );
}
