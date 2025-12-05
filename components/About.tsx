"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { about } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-neon-cyan mx-auto mb-16" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed text-center mb-8">
              {about.bio}
            </p>

            {/* Education Card */}
            <div className="glass-effect p-6 rounded-xl hover:bg-gray-800/40 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-600/20 rounded-lg group-hover:bg-primary-600/30 transition-colors">
                  <GraduationCap className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{about.education.degree}</h3>
                  <p className="text-primary-400 font-medium mb-1">{about.education.institution}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{about.education.year}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <p className="text-sm text-gray-400 italic">
                Pursuing a Minor in <span className="text-primary-400 font-semibold">Artificial Intelligence and Data Science</span> from C-MInDS Department, IIT Bombay
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
