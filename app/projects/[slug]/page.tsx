"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Folder, Image, Video, FileText } from "lucide-react";
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

  const hasImages = project.images && project.images.length > 0;
  const hasVideos = project.videos && project.videos.length > 0;
  const hasPdfs = project.pdfs && project.pdfs.length > 0;
  const hasMedia = hasImages || hasVideos || hasPdfs;

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

          {/* Images Section */}
          {hasImages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-bold text-white">Images</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {project.images!.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="glass-effect p-2 rounded-xl overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${project.title} image ${idx + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Videos Section */}
          {hasVideos && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-bold text-white">Videos</h2>
              </div>
              <div className="space-y-6">
                {project.videos!.map((video, idx) => (
                  <div key={idx} className="glass-effect p-4 rounded-xl">
                    {video.endsWith(".mp4") || video.endsWith(".webm") || video.endsWith(".mov") ? (
                      <video
                        controls
                        className="w-full rounded-lg"
                        preload="metadata"
                      >
                        <source src={video} type={`video/${video.split('.').pop()}`} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      // YouTube / external embed
                      <div className="aspect-video">
                        <iframe
                          src={video}
                          className="w-full h-full rounded-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PDFs Section */}
          {hasPdfs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-bold text-white">Documents</h2>
              </div>
              <div className="space-y-4">
                {project.pdfs!.map((pdf, idx) => (
                  <div key={idx} className="glass-effect rounded-xl overflow-hidden">
                    {/* PDF Viewer */}
                    <div className="aspect-[4/3] bg-gray-900">
                      <iframe
                        src={pdf}
                        className="w-full h-full"
                        title={`${project.title} document ${idx + 1}`}
                      />
                    </div>
                    {/* Download Link */}
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        Document {idx + 1}
                      </span>
                      <a
                        href={pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-600/20 text-primary-300 rounded-lg text-sm hover:bg-primary-600/30 transition-colors"
                      >
                        Open PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Show placeholder only if no media at all */}
          {!hasMedia && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Media</h2>
              <div className="glass-effect p-8 rounded-xl text-center">
                <p className="text-gray-400 italic">
                  Images, videos, and documents will be added here.
                </p>
              </div>
            </motion.div>
          )}

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
