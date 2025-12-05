"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Experience & <span className="text-gradient">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-neon-cyan mx-auto mb-8" />
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            My professional journey in research, engineering, and innovation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-600 via-neon-cyan to-primary-600" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="w-4 h-4 bg-primary-600 rounded-full border-4 border-gray-950 glow-purple"
                  />
                </div>

                {/* Content */}
                <div className="md:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-effect p-6 rounded-xl hover:bg-gray-800/40 transition-all duration-300 group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-600/20 rounded-lg group-hover:bg-primary-600/30 transition-colors">
                          <Briefcase className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-primary-400 font-medium">{exp.organization}</p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-neon-cyan mt-1 flex-shrink-0" />
                          <p className="text-sm text-gray-400 leading-relaxed">{achievement}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect p-8 rounded-xl inline-block">
            <p className="text-lg text-gray-300 mb-4">
              Interested in working together?
            </p>
            <a
              href="#contact"
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600 transition-all duration-300 glow-purple inline-block"
            >
              Let's Connect
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
