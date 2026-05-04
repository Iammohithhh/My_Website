"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment dot-grid">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="tag-mono text-indigo/70 uppercase tracking-widest mb-2">Contact</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-indigo to-science mx-auto mt-4" />
          <p className="text-ink/55 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-ink/60 leading-relaxed text-sm">
              I'm always open to discussing new projects, creative ideas, or opportunities.
              Whether you want to collaborate on research, build something, or just talk AI and science — I'd love to hear from you.
            </p>

            <div className="space-y-3">
              <ContactMethod
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
              />
              <ContactMethod
                icon={<MapPin className="w-4 h-4" />}
                label="Location"
                value="Mumbai, India"
              />
            </div>

            <div>
              <p className="text-xs tag-mono text-ink/40 uppercase tracking-widest mb-3">Find me on</p>
              <div className="flex gap-3">
                <SocialButton href={personalInfo.github} icon={<Github className="w-5 h-5" />} label="GitHub" />
                <SocialButton href={personalInfo.linkedin} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
                <SocialButton href={`mailto:${personalInfo.email}`} icon={<Mail className="w-5 h-5" />} label="Email" />
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="paper-card p-7 rounded-xl space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Name" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
                <FormField label="Email" id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
              </div>
              <FormField label="Subject" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" />
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-ink/60 mb-1.5 uppercase tracking-wide tag-mono">Message</label>
                <textarea
                  id="message" name="message" value={formData.message} onChange={handleChange}
                  required rows={4}
                  className="w-full px-4 py-3 bg-parchment border border-parchment-darker rounded-lg focus:outline-none focus:border-indigo/50 transition-colors text-ink text-sm resize-none placeholder:text-ink/30"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit" disabled={status === "sending"}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-indigo text-white rounded-lg font-semibold text-sm hover:bg-indigo-dark transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {status === "sending" ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Sending...</span></>
                ) : status === "success" ? (
                  <span>Message Sent!</span>
                ) : (
                  <><Send className="w-4 h-4" /><span>Send Message</span></>
                )}
              </motion.button>

              {status === "success" && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center text-science text-sm">
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, id, name, type = "text", value, onChange, placeholder }: {
  label: string; id: string; name: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-ink/60 mb-1.5 uppercase tracking-wide tag-mono">{label}</label>
      <input
        type={type} id={id} name={name} value={value} onChange={onChange} required
        className="w-full px-4 py-3 bg-parchment border border-parchment-darker rounded-lg focus:outline-none focus:border-indigo/50 transition-colors text-ink text-sm placeholder:text-ink/30"
        placeholder={placeholder}
      />
    </div>
  );
}

function ContactMethod({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3 p-4 paper-card rounded-xl group hover:shadow-md transition-all duration-200">
      <div className="p-2 bg-indigo-pale rounded-lg"><span className="text-indigo">{icon}</span></div>
      <div>
        <p className="text-xs text-ink/40 tag-mono uppercase tracking-wide">{label}</p>
        <p className="text-ink font-medium text-sm">{value}</p>
      </div>
    </div>
  );
  if (href) return <motion.a href={href} target="_blank" rel="noopener noreferrer" whileHover={{ x: 4 }}>{content}</motion.a>;
  return content;
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
      className="p-3 paper-card rounded-xl text-ink/50 hover:text-indigo transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}
