"use client";

import { motion } from "framer-motion";
import { Brain, Code, Leaf, Lightbulb } from "lucide-react";
import { hobbies } from "@/lib/data";

const iconMap: Record<string, any> = {
  Brain,
  Code,
  Leaf,
  Lightbulb,
};

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Interests & <span className="text-gradient">Hobbies</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-neon-cyan mx-auto mb-8" />
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Beyond coding and research, here's what drives my curiosity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, index) => {
            const Icon = iconMap[hobby.icon] || Lightbulb;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <HobbyCard hobby={hobby} Icon={Icon} index={index} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HobbyCard({
  hobby,
  Icon,
  index,
}: {
  hobby: typeof hobbies[0];
  Icon: any;
  index: number;
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        rotateY: 5,
        rotateX: 5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-effect p-6 rounded-xl hover:bg-gray-800/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-neon-cyan/0 group-hover:from-primary-600/10 group-hover:to-neon-cyan/10 transition-all duration-300 rounded-xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 bg-primary-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600/30 transition-colors"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-8 h-8 text-primary-400 group-hover:text-neon-cyan transition-colors" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
          {hobby.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {hobby.description}
        </p>

        {/* Decorative element */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary-600/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)`,
        }}
      />
    </motion.div>
  );
}
