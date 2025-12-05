"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Folder, Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [project, setProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const foundProject = projects.find(p => p.slug === slug);
    setProject(foundProject || null);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary-600/20 rounded-lg">
                <Folder className="w-6 h-6 text-primary-400" />
              </div>
              <span className="px-3 py-1 bg-primary-600/20 text-primary-300 text-sm rounded-full">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan text-sm font-semibold rounded-full">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.date}</span>
              </div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-800/50 text-primary-300 rounded-lg border border-gray-700 hover:border-primary-500 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Full Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Project Details</h2>
            <div className="glass-effect p-8 rounded-xl">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.fullDescription}
              </p>
            </div>
          </motion.div>

          {/* Images Section - Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Images & Media</h2>
            <div className="glass-effect p-8 rounded-xl text-center">
              <p className="text-gray-400 italic">
                You can add project images and videos here later.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Add your images to the public folder and reference them here.
              </p>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center"
          >
            <button
              onClick={() => router.push("/#projects")}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600 transition-all duration-300 glow-purple hover:scale-105 transform"
            >
              View All Projects
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
