"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="tag-mono text-indigo/70 uppercase tracking-widest mb-2">Career</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink">
            Experience & <span className="text-gradient">Journey</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-indigo to-science mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo/40 via-science/40 to-parchment-darker" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-5 w-12 h-12 items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                    className="w-3 h-3 rounded-full bg-indigo border-4 border-parchment shadow-sm"
                    style={{ boxShadow: "0 0 0 3px rgba(91,79,217,0.15)" }}
                  />
                </div>

                <div className="paper-card p-6 rounded-xl hover:shadow-md transition-shadow duration-300 group">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-pale rounded-lg mt-0.5">
                        <Briefcase className="w-4 h-4 text-indigo" />
                      </div>
                      <div>
                        <h3 className="font-bold text-ink text-lg leading-snug">{exp.title}</h3>
                        <p className="text-indigo font-medium text-sm">{exp.organization}</p>
                        {(exp as any).guide && (
                          <p className="text-ink/40 text-xs mt-0.5 italic">{(exp as any).guide}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0 ml-9 sm:ml-0">
                      <span className="tag-mono text-xs bg-parchment-dark text-ink/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{exp.date}
                      </span>
                      <span className="tag-mono text-xs bg-parchment-dark text-ink/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-ink/60 text-sm mb-4 leading-relaxed ml-0 sm:ml-11">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-2 sm:ml-11">
                    {exp.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.06 }}
                        className="flex items-start gap-2"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-science mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-ink/60 leading-relaxed">{achievement}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
