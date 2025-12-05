"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-3">
              <span className="text-gradient">Mohith H</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI/ML Researcher & Engineer passionate about building intelligent systems and solving complex problems.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {["About", "Projects", "Skills", "Experience", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <SocialLink href={personalInfo.github} icon={<Github className="w-5 h-5" />} label="GitHub" />
              <SocialLink href={personalInfo.linkedin} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
              <SocialLink href={`mailto:${personalInfo.email}`} icon={<Mail className="w-5 h-5" />} label="Email" />
            </div>
            <p className="text-gray-400 text-sm">{personalInfo.email}</p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-400 text-sm flex items-center gap-2">
            © {currentYear} Mohith H. Made with{" "}
            <Heart className="w-4 h-4 text-red-500 animate-pulse" /> and Next.js
          </p>
          <p className="text-gray-500 text-xs">
            Designed & Built by Mohith H
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 glass-effect rounded-lg hover:bg-gray-800/40 transition-all duration-300"
      aria-label={label}
    >
      <span className="text-gray-400 hover:text-primary-400 transition-colors">
        {icon}
      </span>
    </motion.a>
  );
}
