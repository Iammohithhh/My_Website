"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { about } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 section-alt">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="tag-mono text-indigo/70 uppercase tracking-widest mb-2">Background</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-indigo to-science mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bio + Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-ink/70 leading-relaxed text-base">
              {about.bio}
            </p>

            <div className="paper-card p-5 rounded-xl group hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-indigo-pale rounded-lg">
                  <GraduationCap className="w-5 h-5 text-indigo" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink text-base">{about.education.degree}</h3>
                  <p className="text-indigo font-medium text-sm mt-0.5">{about.education.institution}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-ink/50 tag-mono">
                    <span>{about.education.year}</span>
                    <span>·</span>
                    <span>CGPA {about.education.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="paper-card p-4 rounded-xl">
              <p className="text-sm text-ink/60">
                Minor in <span className="text-science-dark font-semibold">Artificial Intelligence & Data Science</span>
                {" "}— C-MInDS Department, IIT Bombay
              </p>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="paper-card p-6 rounded-xl h-full">
              <div className="flex items-center gap-2 mb-5">
                <Award className="w-4 h-4 text-amber" />
                <h3 className="font-semibold text-ink text-sm uppercase tracking-wide tag-mono">Achievements</h3>
              </div>
              <ul className="space-y-3">
                {about.achievements.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                    <p className="text-sm text-ink/65 leading-relaxed">{a}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
