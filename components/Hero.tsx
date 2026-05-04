"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

const tags = [
  { label: "AI / ML", color: "bg-indigo-pale text-indigo border border-indigo/20" },
  { label: "Computational Science", color: "bg-science-pale text-science-dark border border-science/20" },
  { label: "Research", color: "bg-amber-pale text-amber-dark border border-amber/20" },
  { label: "Building Cool Stuff", color: "bg-rust-pale text-rust border border-rust/20" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-parchment dot-grid">
      {/* Warm ambient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-indigo/8 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-science/8 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-amber/6 rounded-full filter blur-2xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile photo */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg"
              style={{ boxShadow: "0 0 0 4px #E0D9CE, 0 8px 32px rgba(91,79,217,0.15)" }}
            >
              <img
                src="/profile.jpeg"
                alt="Mohith H"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (img.src.includes('.jpeg')) {
                    img.src = "/profile.jpg";
                  } else {
                    img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23EDE8DF'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='72' fill='%235B4FD9'%3EMH%3C/text%3E%3C/svg%3E";
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl sm:text-7xl font-bold mb-4 text-ink"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="text-gradient">Mohith H</span>
          </motion.h1>

          {/* Identity tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide tag-mono ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-base sm:text-lg text-ink/60 mb-10 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Molecules → Models → Products.
            <br />
            <span className="text-ink/40 text-sm">Chemical Engineering · AI/ML · IIT Bombay</span>
          </motion.p>

          {/* Social links */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            <SocialLink href={personalInfo.github} icon={<Github className="w-5 h-5" />} label="GitHub" />
            <SocialLink href={personalInfo.linkedin} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
            <SocialLink href={`mailto:${personalInfo.email}`} icon={<Mail className="w-5 h-5" />} label="Email" />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <a
              href="#projects"
              className="px-7 py-3 bg-indigo text-white rounded-lg font-semibold text-sm hover:bg-indigo-dark transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo/20 hover:scale-105 transform"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-7 py-3 bg-white border border-parchment-darker text-ink rounded-lg font-semibold text-sm hover:border-indigo/40 hover:text-indigo transition-all duration-300 shadow-sm"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-ink/30" />
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2.5 bg-white border border-parchment-darker rounded-lg hover:border-indigo/40 hover:text-indigo text-ink/50 transition-all duration-200 shadow-sm"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}
