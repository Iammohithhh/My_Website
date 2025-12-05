"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Globe, Wrench } from "lucide-react";
import { skills } from "@/lib/data";

const categoryIcons: Record<string, any> = {
  "Programming Languages": Code2,
  "ML/AI Frameworks": Brain,
  "Web Development": Globe,
  "Tools & Software": Wrench,
  "Databases": Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-neon-cyan mx-auto mb-8" />
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => {
            const Icon = categoryIcons[category] || Code2;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl hover:bg-gray-800/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary-600/20 rounded-lg group-hover:bg-primary-600/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {skillList.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      className="relative group/skill"
                    >
                      <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-primary-500 transition-all duration-300 cursor-pointer">
                        <span className="text-sm font-medium text-gray-300 group-hover/skill:text-primary-400 transition-colors">
                          {skill}
                        </span>
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-primary-600/20 rounded-lg opacity-0 group-hover/skill:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <SkillHighlight
            icon="🧠"
            title="Machine Learning"
            description="Deep expertise in PyTorch, TensorFlow, and modern ML architectures"
          />
          <SkillHighlight
            icon="🔬"
            title="Research"
            description="Published research in physics-informed ML and molecular dynamics"
          />
          <SkillHighlight
            icon="💻"
            title="Full-Stack Dev"
            description="Building modern web applications with React, Next.js, and Tailwind"
          />
        </motion.div>
      </div>
    </section>
  );
}

function SkillHighlight({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-effect p-6 rounded-xl text-center hover:bg-gray-800/40 transition-all duration-300 group"
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
        {title}
      </h4>
      <p className="text-sm text-gray-400">{description}</p>
    </motion.div>
  );
}
