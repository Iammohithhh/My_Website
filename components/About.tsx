"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Trophy } from "lucide-react";
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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
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
                    <span className="font-semibold text-primary-300">CGPA: {about.education.cgpa}</span>
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

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-effect p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-neon-cyan" />
                <h3 className="text-2xl font-bold text-white">Achievements</h3>
              </div>

              <div className="space-y-4">
                {about.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="mt-1">
                      <Award className="w-5 h-5 text-primary-400 group-hover:text-neon-cyan transition-colors" />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed flex-1">
                      {achievement}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-effect p-4 rounded-xl text-center"
              >
                <div className="text-3xl font-bold text-gradient mb-1">10+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-effect p-4 rounded-xl text-center"
              >
                <div className="text-3xl font-bold text-gradient mb-1">3</div>
                <div className="text-sm text-gray-400">Research Works</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-effect p-4 rounded-xl text-center"
              >
                <div className="text-3xl font-bold text-gradient mb-1">8.37</div>
                <div className="text-sm text-gray-400">CGPA</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
