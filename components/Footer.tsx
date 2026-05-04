"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-ink border-t border-ink/20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-2">
              <span className="text-gradient">Mohith H</span>
            </h3>
            <p className="text-parchment/40 text-sm leading-relaxed">
              AI/ML Researcher & Engineer. Building at the intersection of molecules and models.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold text-parchment/40 mb-4 uppercase tracking-widest tag-mono">Quick Links</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {["About", "Experience", "Projects", "Publications", "Hobbies", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-parchment/50 hover:text-indigo-light transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold text-parchment/40 mb-4 uppercase tracking-widest tag-mono">Connect</h4>
            <div className="flex gap-3 mb-3">
              <SocialLink href={personalInfo.github} icon={<Github className="w-4 h-4" />} label="GitHub" />
              <SocialLink href={personalInfo.linkedin} icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
              <SocialLink href={`mailto:${personalInfo.email}`} icon={<Mail className="w-4 h-4" />} label="Email" />
            </div>
            <p className="text-parchment/30 text-xs tag-mono">{personalInfo.email}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-6 border-t border-parchment/10 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p className="text-parchment/30 text-xs tag-mono">
            © {currentYear} Mohith H — All rights reserved
          </p>
          <p className="text-parchment/20 text-xs">
            Built with Next.js · Tailwind CSS · Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg border border-parchment/10 text-parchment/40 hover:text-indigo-light hover:border-indigo/30 transition-all duration-200"
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}
