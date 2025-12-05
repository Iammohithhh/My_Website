"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  const roles = [
    "AI/ML Researcher",
    "Chemical Engineering Student",
    "Full-Stack Developer",
    "Problem Solver"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient">Mohith H</span>
          </motion.h1>

          <motion.div
            className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-8 h-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TypewriterText roles={roles} />
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            IIT Bombay | Building intelligent systems at the intersection of AI, Chemistry, and Engineering
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SocialLink href={personalInfo.github} icon={<Github className="w-6 h-6" />} label="GitHub" />
            <SocialLink href={personalInfo.linkedin} icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
            <SocialLink href={`mailto:${personalInfo.email}`} icon={<Mail className="w-6 h-6" />} label="Email" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600 transition-all duration-300 glow-purple hover:scale-105 transform"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 glass-effect rounded-lg font-semibold hover:bg-gray-800/50 transition-all duration-300 border border-primary-600/50 hover:border-primary-500"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
        >
          <ArrowDown className="w-6 h-6 text-primary-400" />
        </motion.div>
      </div>
    </section>
  );
}

function TypewriterText({ roles }: { roles: string[] }) {
  const [currentRole, setCurrentRole] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <motion.span
      key={currentRole}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-primary-400"
    >
      {roles[currentRole]}
    </motion.span>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 glass-effect rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 transform group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <span className="text-gray-400 group-hover:text-primary-400 transition-colors">
        {icon}
      </span>
    </motion.a>
  );
}

// Add React import
import React from "react";
